import { cookies } from "next/headers";
import { createSession, createUser, sessionCookie } from "@/lib/auth-server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { email?: string; password?: string; name?: string } | null;
  if (!body?.email || !body.password || !body.name) return Response.json({ error: "invalid_input" }, { status: 400 });
  try {
    const user = await createUser({ email: body.email, password: body.password, name: body.name });
    const token = await createSession(user.id);
    (await cookies()).set(sessionCookie(token));
    return Response.json({ user: { email: user.email, name: user.name, hasPaid: user.hasPaid, city: "leiden" } }, { status: 201, headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "service_unavailable";
    const status = message === "email_exists" ? 409 : message === "invalid_input" ? 400 : 503;
    return Response.json({ error: message }, { status });
  }
}
