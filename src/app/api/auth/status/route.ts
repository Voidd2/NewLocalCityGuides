import { cookies } from "next/headers";
import { getUserFromSession, SESSION_COOKIE } from "@/lib/auth-server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getUserFromSession((await cookies()).get(SESSION_COOKIE)?.value);
    return Response.json({ user: user ? { email: user.email, name: user.name, hasPaid: user.hasPaid, city: "leiden" } : null }, { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return Response.json({ user: null }, { status: 503, headers: { "Cache-Control": "private, no-store" } });
  }
}
