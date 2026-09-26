# SEO, AI visibility and premium-content boundary

This document explains how to add new public places, routes and articles without publishing the paid experience.

## What is public

Public pages may contain:

- a short factual summary of a place or route;
- the name, category, verified address and verified coordinates;
- practical visit context, such as normal market days with a warning that schedules can change;
- relationships between Leiden, sights, routes and local businesses;
- a clear invitation to buy the Leiden package for the complete experience.

Public pages are included in the sitemap, linked from the Leiden hub and may use factual schema.org markup. They must have a canonical URL and Dutch, English and German alternates.

## What stays premium

Do not publish or add to structured data, `llms.txt`, RSS or the sitemap:

- complete historical stories or full transcripts;
- audio, video or premium media URLs;
- detailed paid route instructions or the full ordered experience;
- account, purchase, progress or saved-route data;
- unpublished research notes;
- ratings, reviews, awards, prices or opening hours that have not been verified.

Public route-preview pages may be indexed, but their paid execution layer remains protected. Premium location and story pages remain `noindex`. Robots rules also exclude account, login, dashboard, custom-route and API paths. Robots rules are not an authentication mechanism: protected data must never depend on `robots.txt` for security.

## Adding a public place

1. Verify the name, address, coordinates, category and any time-sensitive details.
2. Add only a concise multilingual summary to the relevant public hub or create one substantial entity page when the place merits it.
3. Add `LocalBusiness`, `TouristAttraction` or `Place` schema only when the page visibly supports every property.
4. Never add `aggregateRating` or `Review` until genuine, attributable reviews exist.
5. Add internal links from one relevant hub and one relevant article. Avoid making several pages for the same search intent.
6. Add the path to `src/app/sitemap.ts` only if it is public, canonical and useful on its own.

## Adding a route

1. Keep the operational route and full stop experience in the protected route data. Public route copy belongs in `src/data/public-route-seo.ts` and must be written separately; never derive it by slicing paid text.
2. On a public overview or route preview, describe the theme, approximate duration or distance only when verified, and a small selection of highlights.
3. Do not expose all narrative text or premium media in public JSON-LD.
4. Link the public overview to the protected route with a clear purchase or sign-in CTA.
5. For day-dependent routes, keep selection logic in one helper. Schaapsvishandel currently uses `src/data/schaapsvis.ts`: Wednesday selects the Nieuwe Rijn stall, Saturday selects the Vismarkt stall, and other days select the Herenstraat 48 shop.

## Adding a blog article

1. Choose one search intent that is not already owned by another page.
2. Provide a useful answer before the subscription CTA; do not make a thin teaser page.
3. Add the article in all three languages to `src/data/seo-content.ts`.
4. Use factual headings, link to the relevant Leiden hub/entity/route page and add a related article.
5. Add the post to the sitemap and RSS feed through the existing `blogPosts` collection.
6. Update `publishedAt` and `updatedAt` accurately.

## Current intent map

| Search intent | Canonical page |
| --- | --- |
| Leiden overview | `/[locale]/leiden` |
| City guide Leiden | `/[locale]/city-guide-leiden` |
| Leiden tours / walking tours | `/[locale]/leiden-tours` |
| Things to do in Leiden | `/[locale]/leiden/things-to-do` |
| Schaapsvishandel Leiden | `/[locale]/leiden/schaapsvishandel` |
| Market days and market walk | `/[locale]/blog/leiden-market-days-schaapsvishandel` |
| Individual route | `/[locale]/routes/[slug]` (indexable public preview; paid execution loads only after access check) |
| Individual premium story/place | `/[locale]/locations/[slug]` and `/[locale]/ontdek/[id]` (`noindex`) |

## Release checklist

- Run `npm run lint`, `npm test` and `npm run build`.
- Inspect canonical, hreflang, Open Graph and JSON-LD in the built page.
- Confirm premium paths are absent from `sitemap.xml`, RSS and `llms.txt`.
- Confirm public facts are visible in the page body, not only in schema.
- Check mobile layout and links.
- Commit with a descriptive message and push `main`.
