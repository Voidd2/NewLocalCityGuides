import { cookies } from "next/headers";
import { getLocationById } from "@/data/locations";
import { getLocationStory } from "@/data/stories";
import { getUserFromSession, SESSION_COOKIE } from "@/lib/auth-server";

export const dynamic = "force-dynamic";

const privateHeaders = { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow" };

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!getLocationById(id)) return Response.json({ error: "not_found" }, { status: 404, headers: privateHeaders });
  const locale = new URL(request.url).searchParams.get("locale");
  if (locale !== "nl" && locale !== "en" && locale !== "de") {
    return Response.json({ error: "invalid_locale" }, { status: 400, headers: privateHeaders });
  }

  let user = null;
  try { user = await getUserFromSession((await cookies()).get(SESSION_COOKIE)?.value); } catch { /* returns access_required below */ }
  if (!user?.hasPaid) return Response.json({ error: "access_required" }, { status: 403, headers: privateHeaders });

  const story = getLocationStory(id);
  if (!story) return Response.json({ error: "story_unavailable" }, { status: 404, headers: privateHeaders });
  return Response.json({ readingText: story.readingText[locale], voiceOver: story.voiceOver[locale] }, { headers: privateHeaders });
}
