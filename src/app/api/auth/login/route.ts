import { cookies } from "next/headers";
import { createSession, sessionCookie, verifyCredentials } from "@/lib/auth-server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { email?: string; password?: string } | null;
  if (!body?.email || !body.password) return Response.json({ error: "invalid_input" }, { status: 400 });
  try {
    const user = await verifyCredentials(body.email, body.password);
    if (!user) return Response.json({ error: "invalid_credentials" }, { status: 401 });
    const token = await createSession(user.id);
    (await cookies()).set(sessionCookie(token));
    return Response.json({ user: { email: user.email, name: user.name, hasPaid: user.hasPaid, city: "leiden" } }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    console.error("Authentication request failed", error);
    return Response.json({ error: "service_unavailable" }, { status: 503 });
  }
}
