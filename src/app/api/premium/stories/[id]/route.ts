import { cookies } from "next/headers";
import { getLocationById } from "@/data/locations";
import { getLocationStory } from "@/data/stories";
import { ENTITLEMENT_COOKIE, LEIDEN_PRODUCT_ID, verifyEntitlement } from "@/lib/entitlement-token";

export const dynamic = "force-dynamic";

const privateHeaders = { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow" };

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!getLocationById(id)) return Response.json({ error: "not_found" }, { status: 404, headers: privateHeaders });
  const locale = new URL(request.url).searchParams.get("locale");
  if (locale !== "nl" && locale !== "en" && locale !== "de") {
    return Response.json({ error: "invalid_locale" }, { status: 400, headers: privateHeaders });
  }

  const token = (await cookies()).get(ENTITLEMENT_COOKIE)?.value;
  const entitlement = await verifyEntitlement(token, process.env.CWS_ENTITLEMENT_SECRET, LEIDEN_PRODUCT_ID);
  if (!entitlement) return Response.json({ error: "access_required" }, { status: 403, headers: privateHeaders });

  const story = getLocationStory(id);
  if (!story) return Response.json({ error: "story_unavailable" }, { status: 404, headers: privateHeaders });
  return Response.json({ readingText: story.readingText[locale], voiceOver: story.voiceOver[locale] }, { headers: privateHeaders });
}
