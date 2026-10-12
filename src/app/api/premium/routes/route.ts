import { cookies } from "next/headers";
import { routes } from "@/data/routes";
import { ENTITLEMENT_COOKIE, LEIDEN_PRODUCT_ID, verifyEntitlement } from "@/lib/entitlement-token";

export const dynamic = "force-dynamic";

export async function GET() {
  const token = (await cookies()).get(ENTITLEMENT_COOKIE)?.value;
  const entitlement = await verifyEntitlement(token, process.env.CWS_ENTITLEMENT_SECRET, LEIDEN_PRODUCT_ID);
  const headers = { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow" };
  if (!entitlement) return Response.json({ error: "access_required" }, { status: 403, headers });
  return Response.json({ routes }, { headers });
}
