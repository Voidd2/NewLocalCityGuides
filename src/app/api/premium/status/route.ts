import { cookies } from "next/headers";
import { ENTITLEMENT_COOKIE, LEIDEN_PRODUCT_ID, verifyEntitlement } from "@/lib/entitlement-token";

export const dynamic = "force-dynamic";

export async function GET() {
  const token = (await cookies()).get(ENTITLEMENT_COOKIE)?.value;
  const entitlement = await verifyEntitlement(token, process.env.CWS_ENTITLEMENT_SECRET, LEIDEN_PRODUCT_ID);
  return Response.json(
    entitlement ? { hasPaid: true, subject: entitlement.subject } : { hasPaid: false },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
