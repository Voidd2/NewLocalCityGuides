import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";

export const SESSION_COOKIE = "cws_session";
const SESSION_LIFETIME_SECONDS = 60 * 60 * 24 * 30;

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  hasPaid: boolean;
};

type UserRow = {
  id: string;
  email: string;
  name: string;
  has_paid: number;
  password_hash: string;
  password_salt: string;
};

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToBytes(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(base64);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function sha256(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return bytesToBase64Url(new Uint8Array(digest));
}

async function passwordHash(password: string, salt: string) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    // Cloudflare Workers currently limits PBKDF2 to 100,000 iterations.
    { name: "PBKDF2", salt: base64UrlToBytes(salt), iterations: 100_000, hash: "SHA-256" },
    key,
    256,
  );
  return bytesToBase64Url(new Uint8Array(bits));
}

function randomToken(byteLength = 32) {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  return bytesToBase64Url(bytes);
}

async function database() {
  const { env } = await getCloudflareContext({ async: true });
  if (!env.CWS_AUTH_DB) throw new Error("auth_database_unavailable");
  return env.CWS_AUTH_DB;
}

function toUser(row: Pick<UserRow, "id" | "email" | "name" | "has_paid">): AuthUser {
  return { id: row.id, email: row.email, name: row.name, hasPaid: row.has_paid === 1 };
}

export function sessionCookie(value: string, maxAge = SESSION_LIFETIME_SECONDS) {
  return {
    name: SESSION_COOKIE,
    value,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  };
}

export async function findUserByEmail(email: string) {
  const db = await database();
  const result = await db.prepare("SELECT id, email, name, has_paid, password_hash, password_salt FROM users WHERE email = ?").bind(email.trim().toLowerCase()).first<UserRow>();
  return result;
}

export async function verifyCredentials(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user) return null;
  const expected = await passwordHash(password, user.password_salt);
  if (expected.length !== user.password_hash.length) return null;
  let mismatch = 0;
  for (let index = 0; index < expected.length; index += 1) mismatch |= expected.charCodeAt(index) ^ user.password_hash.charCodeAt(index);
  return mismatch === 0 ? toUser(user) : null;
}

export async function createUser(input: { email: string; password: string; name: string }) {
  const email = input.email.trim().toLowerCase();
  const name = input.name.trim();
  if (!/^\S+@\S+\.\S+$/.test(email) || name.length < 2 || input.password.length < 10) throw new Error("invalid_input");

  const db = await database();
  const id = crypto.randomUUID();
  const salt = randomToken(16);
  const hash = await passwordHash(input.password, salt);
  try {
    await db.prepare("INSERT INTO users (id, email, name, password_hash, password_salt, has_paid, created_at) VALUES (?, ?, ?, ?, ?, 0, ?)")
      .bind(id, email, name, hash, salt, Date.now()).run();
  } catch (error) {
    if (String(error).toLowerCase().includes("unique")) throw new Error("email_exists");
    throw error;
  }
  return { id, email, name, hasPaid: false } satisfies AuthUser;
}

export async function createSession(userId: string) {
  const token = randomToken();
  const db = await database();
  await db.prepare("INSERT INTO sessions (token_hash, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)")
    .bind(await sha256(token), userId, Date.now() + SESSION_LIFETIME_SECONDS * 1000, Date.now()).run();
  return token;
}

export async function getUserFromSession(token: string | undefined) {
  if (!token) return null;
  const db = await database();
  const row = await db.prepare("SELECT users.id, users.email, users.name, users.has_paid FROM sessions JOIN users ON users.id = sessions.user_id WHERE sessions.token_hash = ? AND sessions.expires_at > ?")
    .bind(await sha256(token), Date.now()).first<Pick<UserRow, "id" | "email" | "name" | "has_paid">>();
  return row ? toUser(row) : null;
}

export async function deleteSession(token: string | undefined) {
  if (!token) return;
  const db = await database();
  await db.prepare("DELETE FROM sessions WHERE token_hash = ?").bind(await sha256(token)).run();
}
