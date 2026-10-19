import { cookies } from "next/headers";
import { deleteSession, SESSION_COOKIE, sessionCookie } from "@/lib/auth-server";

export async function POST() {
  const store = await cookies();
  try { await deleteSession(store.get(SESSION_COOKIE)?.value); } catch { /* Clearing the browser session remains safe. */ }
  store.set(sessionCookie("", 0));
  return Response.json({ ok: true }, { headers: { "Cache-Control": "private, no-store" } });
}
