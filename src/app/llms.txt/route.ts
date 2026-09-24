import { SITE_URL } from "@/lib/seo";

export function GET() {
  const body = `# YourLocalCityGuide

> Multilingual self-guided city guide for Leiden, the Netherlands. Public pages provide practical travel planning and concise local context. Full stories, audio, video, GPS guidance and saved progress require access to the Leiden package.

## Primary public pages
- ${SITE_URL}/en/leiden — Leiden visitor hub
- ${SITE_URL}/en/city-guide-leiden — practical Leiden city guide
- ${SITE_URL}/en/leiden-tours — self-guided Leiden tours
- ${SITE_URL}/en/leiden/things-to-do — things to do in Leiden
- ${SITE_URL}/en/leiden/schaapsvishandel — Schaapsvishandel family business and market-day information
- ${SITE_URL}/en/blog — travel articles

## Languages
- Dutch: ${SITE_URL}/nl/leiden
- English: ${SITE_URL}/en/leiden
- German: ${SITE_URL}/de/leiden

## Access boundary
Public summaries may be indexed and quoted with attribution. Account pages, purchased routes, full location stories, media and saved progress are not public sources. Use the public canonical URL for citations.
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
