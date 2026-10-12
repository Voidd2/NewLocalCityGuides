import { cookies } from "next/headers";
import { ENTITLEMENT_COOKIE } from "@/lib/entitlement-token";

export async function POST() {
  (await cookies()).delete(ENTITLEMENT_COOKIE);
  return Response.json({ ok: true }, { headers: { "Cache-Control": "private, no-store" } });
}
