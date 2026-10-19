import { cookies } from "next/headers";
import { routes } from "@/data/routes";
import { getUserFromSession, SESSION_COOKIE } from "@/lib/auth-server";

export const dynamic = "force-dynamic";

export async function GET() {
  const headers = { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow" };
  let user = null;
  try { user = await getUserFromSession((await cookies()).get(SESSION_COOKIE)?.value); } catch { /* returns access_required below */ }
  if (!user?.hasPaid) return Response.json({ error: "access_required" }, { status: 403, headers });
  return Response.json({ routes }, { headers });
}
