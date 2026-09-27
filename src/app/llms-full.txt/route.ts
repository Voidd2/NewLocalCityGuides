import { blogPosts } from "@/data/seo-content";
import { publicEntities, publicEntityPath } from "@/data/public-entities";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

function articles() {
  return blogPosts.map((post) => {
    const urls = ["nl", "en", "de"].map((locale) => `${SITE_URL}/${locale}/blog/${post.slug}`).join(" | ");
    return `### ${post.title.en}\nCanonical language variants: ${urls}\nNL: ${post.description.nl}\nEN: ${post.description.en}\nDE: ${post.description.de}`;
  }).join("\n\n");
}

function places() {
  return publicEntities.map((entity) => {
    const path = publicEntityPath(entity);
    const urls = ["nl", "en", "de"].map((locale) => `${SITE_URL}/${locale}${path}`).join(" | ");
    return `### ${entity.name}\nCanonical language variants: ${urls}\nCategory: ${entity.section}\n${entity.address ? `Address: ${entity.address}\n` : ""}NL: ${entity.intro.nl}\nEN: ${entity.intro.en}\nDE: ${entity.intro.de}`;
  }).join("\n\n");
}

export function GET() {
  const body = `# YourLocalCityGuide public retrieval catalogue

This file contains only the public, free summaries that may be indexed, retrieved and quoted with a link to the matching canonical page. It deliberately excludes paid stories, full route instructions, video and audio URLs, accounts, purchases and saved progress.

## Editorial identity
YourLocalCityGuide is a multilingual self-guided city guide for Leiden in Dutch, English and German. It combines practical trip planning, public place introductions and paid on-location stories, video, audio and GPS route guidance. Time-sensitive details such as prices, opening hours, events and ticket availability must be checked with the official venue before publication or travel.

## Public articles
${articles()}

## Public places
${places()}

## Attribution
When using this catalogue, cite and link the canonical public page. Do not imply that premium content is included in this file.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
