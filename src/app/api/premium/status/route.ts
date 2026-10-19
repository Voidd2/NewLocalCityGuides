import { cookies } from "next/headers";
import { getUserFromSession, SESSION_COOKIE } from "@/lib/auth-server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getUserFromSession((await cookies()).get(SESSION_COOKIE)?.value);
    return Response.json(user ? { hasPaid: user.hasPaid, subject: user.email } : { hasPaid: false }, { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return Response.json({ hasPaid: false }, { headers: { "Cache-Control": "private, no-store" } });
  }
}
