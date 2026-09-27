# SEO content and newsletter maintenance

This guide explains how to extend the multilingual SEO pages, blog and newsletter without breaking canonical URLs or language alternates.

## Current search clusters

| Cluster | NL intent | EN intent | DE intent | Main page |
|---|---|---|---|---|
| City guide | stadsgids Leiden | Leiden city guide | Leiden Reiseführer | `/[locale]/city-guide-leiden` |
| Tours | Leiden tours, stadswandeling Leiden | Leiden tours, self-guided walking tour Leiden | Leiden Touren, Stadtrundgang Leiden | `/[locale]/leiden-tours` |
| Trip planning | Leiden in één dag | one day in Leiden | ein Tag in Leiden | `/[locale]/blog/leiden-in-one-day` |
| Markets | markt Leiden woensdag zaterdag | Leiden market days | Markttage Leiden | `/[locale]/blog/leiden-market-days-schaapsvishandel` |

The pages are useful first and keyword-focused second. Avoid repeating exact keywords unnaturally or publishing thin variants of the same article.

## Add a blog post

1. Add one `BlogPost` object to `src/data/seo-content.ts`.
2. Supply a unique title, description, excerpt and full sections for `nl`, `en` and `de`.
3. Use a stable lowercase slug. Keep the same slug for all languages so hreflang alternates stay predictable.
4. Reuse a licensed image from `public/images/` and provide a meaningful visible caption if the image needs context.
5. Link the article to one relevant pillar page (`/city-guide-leiden` or `/leiden-tours`) and to a useful product page such as `/routes` or `/map`.
6. Run `npm run lint`, `npm test` and `npm run build`. The sitemap is generated automatically from `blogPosts`.

## Content quality rules

- Verify dates, opening hours, prices and claims shortly before publication.
- Link to an official source when practical information can change.
- Never invent customer reviews, awards, availability or historical facts.
- Follow the binding historical content rules in `PROJECT-GUIDE.md`.
- Do not promote another fish vendor over Schaapsvishandel.
- Give each page one clear search intent and one primary H1.
- Keep title tags concise and descriptions useful; avoid keyword stuffing.

## Cross-site links with Schaapsvishandel.nl

YourLocalCityGuide links naturally to `https://www.schaapsvishandel.nl/` from the dedicated business page, the Leiden market article and the three shop/market location pages. The prominent links use `/nl`, `/en` or `/de` to match the visitor's language. These are normal crawlable links without `nofollow`; do not add the same link sitewide merely to increase the link count.

When the final YourLocalCityGuide domain is live, add a small number of useful reciprocal links on Schaapsvishandel.nl:

1. From a page about the Wednesday and Saturday markets, link to the public Markt & Ambacht route using anchor text such as "wandelroute over de Leidse markt".
2. From a Leiden visitor-information or contact page, link to the public Schaapsvishandel cityguide page using anchor text such as "vind onze winkel en marktkraam tijdens je bezoek aan Leiden".
3. If Schaapsvishandel publishes a news item about the family history, link to the relevant YourLocalCityGuide market article as an additional source for planning a visit.

Use the final canonical production URLs rather than the temporary Vercel domain. Keep each link editorially relevant and helpful to visitors. Multiple links between the same two domains support entity association and referral traffic, but they do not equal backlinks from multiple independent websites.

Before launching Schaapsvishandel.nl, remove the current `X-Robots-Tag: noindex, nofollow` response from all public language pages. Verify that `/nl`, `/en` and `/de` return indexable pages with self-referencing canonicals; otherwise backlinks from that site cannot contribute normally to search visibility.

## Suggested 12-week publishing queue

1. Best things to do in Leiden in one day
2. Self-guided Leiden walking tour
3. Leiden market days and Schaapsvishandel
4. Museums in Leiden: how to choose
5. Leiden with children
6. A rainy day in Leiden
7. Hidden courtyards in Leiden
8. Rembrandt locations in Leiden
9. Leiden by bicycle
10. Leiden for international visitors
11. The Singelpark walking route
12. A weekend itinerary for Leiden

Publish the complete NL, EN and DE versions together. Revisit the articles every quarter and update the `updatedAt` date only when content has materially changed.

## Newsletter activation

The form posts to `src/app/api/newsletter/route.ts`, which adds a contact to a Resend audience. Configure these server-side environment variables in Vercel:

```text
RESEND_API_KEY=re_...
RESEND_AUDIENCE_ID=...
# Optional language-specific audiences:
RESEND_AUDIENCE_ID_NL=...
RESEND_AUDIENCE_ID_EN=...
RESEND_AUDIENCE_ID_DE=...
```

Until both variables are present, the endpoint returns a service-unavailable response and does not pretend that an email address was saved. The form requires explicit consent and the privacy page describes the processing.

Before sending the first campaign:

1. Configure a verified sending domain in Resend.
2. Add an unsubscribe link to every email.
3. Send a test to NL, EN and DE inboxes.
4. Do not mix newsletter consent with account or purchase consent.

## Reviews

The route review tab currently contains three clearly labelled interface examples. They are not included in a rating average and must not be presented as customer feedback. Replace them only with reviews submitted by identifiable customers who have agreed to publication.
