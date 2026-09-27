# SEO launch checklist — both websites

This is the operational checklist for the final domain switch. Do not treat a
successful build as proof that a production domain is indexable.

## Current state (27 September 2026)

- Current cityguide deployment: `https://newlocalcityguide-fawn.vercel.app`.
- `https://newlocalcityguide.vercel.app` returns 404 and must not be used as a canonical or backlink.
- Schaapsvishandel currently serves the coming-soon page with
  `X-Robots-Tag: noindex, nofollow`; this is intentional while `SITE_PUBLIC` is
  not `on`.
- A `schaapsvishandel.nl` Domain property exists in Google Search Console, but
  the currently signed-in account (`lucashaasnoot909@gmail.com`) has no access.
  Use the Google account that owns the property or ask that owner to grant
  access. The site also contains an HTML verification meta token.
- YourLocalCityGuide now accepts `GOOGLE_SITE_VERIFICATION`; its final token and
  final domain are still required.
- The Schaapsvishandel backlink is implemented but remains hidden until
  `CITYGUIDE_URL` contains the final cityguide origin.

## Environment variables at launch

### YourLocalCityGuide

```text
NEXT_PUBLIC_SITE_URL=https://FINAL-CITYGUIDE-DOMAIN
GOOGLE_SITE_VERIFICATION=TOKEN-FROM-SEARCH-CONSOLE
REVIEW_WEBHOOK_URL=PRIVATE-MODERATION-ENDPOINT
REVIEW_WEBHOOK_TOKEN=OPTIONAL-BEARER-TOKEN
```

Rebuild after changing `NEXT_PUBLIC_SITE_URL` or the verification token.

### Schaapsvishandel

```text
CITYGUIDE_URL=https://FINAL-CITYGUIDE-DOMAIN
SITE_PUBLIC=on
```

`SITE_PUBLIC=on` is the actual public launch. Set it only when prices, orders,
legal pages and final images are ready. In the same release, confirm that:

1. `/nl`, `/en` and `/de` no longer return `X-Robots-Tag: noindex, nofollow`;
2. `/robots.txt` allows public pages and lists the sitemap;
3. `/sitemap.xml` is XML and contains canonical `www.schaapsvishandel.nl` URLs;
4. preview deployments remain blocked;
5. the cityguide footer link appears in NL, EN and DE and points to the matching language page.

## Google Search Console

For each final domain:

1. Add a **Domain property** in the correct Google account.
2. Add the supplied DNS TXT record at the DNS provider and wait for verification.
3. Keep the HTML verification token as a second verification method where available.
4. Submit `/sitemap.xml`.
5. Inspect the homepage plus one route/entity page in every language.
6. Check indexing after deployment; do not request indexing for account, login,
   custom-route or other intentionally private pages.

This cannot be completed in code: it requires the final cityguide domain,
access to its DNS and the owner's Google account. For Schaapsvishandel, first
resolve access to the already existing property instead of creating a duplicate.

## Crawl command

Run from the YourLocalCityGuide repository after both production deployments:

```text
npm run seo:crawl -- --base https://FINAL-CITYGUIDE-DOMAIN --output reports/seo/final-cityguide.json --max-pages 2000
npm run seo:crawl -- --base https://www.schaapsvishandel.nl --output reports/seo/final-schaapsvishandel.json --max-pages 2000
```

The crawler checks status codes, redirect chains, titles, descriptions,
canonicals, robots directives, hreflang links, internal links and suspicious
premium field names in public HTML. Review every warning; `noindex` is expected
only on deliberate private/utility pages.

## Release gate

Launch is approved only when:

- both crawls finish without unexpected errors;
- the non-`www` and `www` policy resolves in one permanent redirect;
- every indexed page has a self-referencing canonical on the final domain;
- hreflang links are reciprocal for NL, EN and DE;
- the sitemap contains only 200-status canonical URLs;
- public HTML contains no full premium story, private media ID or exact paid GPS route;
- Search Console accepts both sitemaps;
- real reviews have been moderated and contain publication consent before any
  `Review` or `aggregateRating` schema is added.
