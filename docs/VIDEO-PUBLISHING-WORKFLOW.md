# Video publishing workflow

This prepares the product for private video delivery without tying the code to Cloudflare Stream before the account and IDs exist. Do not commit provider video IDs, signed playback URLs or API tokens to public data files.

## Files and naming

- master: `L001-de-burcht-master.mp4` using the location ID and slug;
- poster: `public/images/video/L001-de-burcht-poster.webp`;
- captions: `L001-de-burcht.nl.vtt`, `.en.vtt` and `.de.vtt`;
- optional public teaser: a separately edited short preview that reveals no paid story or transcript.

Keep the original master outside Git. Export landscape video in 16:9, with spoken audio clearly above background sound. Produce corrected captions in all three languages; automatic captions are only a starting point.

## Manifest stages

The public `media-manifest.ts` may contain only editorial metadata:

1. `planned`: brief approved; captions are planned.
2. `filmed`: master exists; add duration and a local poster path.
3. `published`: private delivery is configured, all NL/EN/DE captions are ready and a separate preview is available.

Automated tests reject incomplete `filmed` or `published` metadata. `scripts/check-media-assets.mjs` also rejects missing files and referenced images larger than 2 MB.

## Cloudflare phase

Later, store Stream IDs and signing secrets only in a server-side database or environment-backed service. A server endpoint must:

1. authenticate the account;
2. verify that the account owns the Leiden package;
3. accept only a known internal video key;
4. return a short-lived signed playback token;
5. avoid logging tokens or exposing the provider ID in sitemaps, public JSON or source data.

The client should request playback only after entitlement succeeds and the visitor explicitly presses play. Public SEO pages receive a poster and teaser at most, never the full member video, transcript or exact premium route content.

## Pre-publish QA

- verify image and music rights and record the source;
- check captions, language selection, keyboard controls and pause/play labels;
- test portrait phone widths, slow connections and failure states;
- confirm that the full video cannot be fetched in a signed-out browser;
- run `npm run media:check`, tests and a production build.
