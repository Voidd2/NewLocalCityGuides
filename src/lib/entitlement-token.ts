const encoder = new TextEncoder();

export const ENTITLEMENT_COOKIE = "cws_entitlement";
export const LEIDEN_PRODUCT_ID = "leiden-guide";

export type Entitlement = {
  subject: string;
  productId: string;
  status: "active";
  expiresAt: number;
};

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array | null {
  if (!/^[A-Za-z0-9_-]+$/.test(value)) return null;
  try {
    const decoded = atob(value.replace(/-/g, "+").replace(/_/g, "/"));
    return Uint8Array.from(decoded, (character) => character.charCodeAt(0));
  } catch {
    return null;
  }
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

export async function signEntitlement(entitlement: Entitlement, secret: string): Promise<string> {
  if (secret.length < 32) throw new Error("Entitlement signing secret is missing or too short");
  const payload = toBase64Url(encoder.encode(JSON.stringify(entitlement)));
  const signature = await crypto.subtle.sign("HMAC", await hmacKey(secret), encoder.encode(payload));
  return `${payload}.${toBase64Url(new Uint8Array(signature))}`;
}

export async function verifyEntitlement(token: string | undefined, secret: string | undefined, productId: string): Promise<Entitlement | null> {
  if (!token || !secret || secret.length < 32 || token.length > 2048) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const payloadBytes = fromBase64Url(parts[0]);
  const signatureBytes = fromBase64Url(parts[1]);
  if (!payloadBytes || !signatureBytes) return null;
  const signature = new Uint8Array(new ArrayBuffer(signatureBytes.length));
  signature.set(signatureBytes);
  const valid = await crypto.subtle.verify("HMAC", await hmacKey(secret), signature, encoder.encode(parts[0]));
  if (!valid) return null;
  try {
    const parsed = JSON.parse(new TextDecoder().decode(payloadBytes)) as Partial<Entitlement>;
    if (parsed.status !== "active" || parsed.productId !== productId || !parsed.subject ||
      typeof parsed.expiresAt !== "number" || parsed.expiresAt <= Date.now()) return null;
    return parsed as Entitlement;
  } catch {
    return null;
  }
}
