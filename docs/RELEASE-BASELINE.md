# Pre-Cloudflare release baseline

Baseline date: 28 September 2026  
Git reference: annotated tag `pre-cloudflare-2026-09-28` on the baseline commit  
Branch: `main`

This reference marks the last prepared state before real authentication, payments, Cloudflare Stream and final media are integrated. Use it to separate integration regressions from issues that already existed.

## Included and working

- NL, EN and DE public site, dashboard, routes, location experiences and blog
- MapLibre map, category filters, route maps and GPS-based progress
- saved/custom routes and date-aware Leiden market logic
- public place and route SEO pages, sitemap, RSS, `llms.txt` and structured data
- separated public SEO summaries and premium story datasets
- provider-independent image/video manifest and pre-media workflow
- privacy/terms launch drafts and private review-moderation intake
- media-size validation, affiliate intake validation and GitHub Actions checks

## Explicitly not production-ready

- authentication and paid status are client-side demonstrations;
- purchases and entitlements are not stored server-side;
- payment checkout and transaction emails are not connected;
- private Cloudflare Stream delivery is not connected;
- final photos, videos and captions are incomplete;
- generic ticket links remain placeholders until the checked affiliate list is imported;
- legal business identity and final legal review are pending;
- remaining historical uncertainties and genuine reviews require human input;
- final mobile, screen-reader, Lighthouse and production SEO crawl happen after media and domain integration.

## Verified baseline commands

```bash
npm run typecheck
npm run lint
npm run media:check
npm run affiliate:check
npm test
npm run build
```

The Windows Codex runtime may produce `uv_os_get_passwd returned ENOMEM` only in the child-process case in `tests/content-io.test.ts`. GitHub Actions on Ubuntu remains the authoritative clean-environment check. Record any new failure separately rather than treating that known host-runtime error as an application regression.

## Compare or inspect

```bash
git diff pre-cloudflare-2026-09-28..main
git switch --detach pre-cloudflare-2026-09-28
```

The second command is for inspection only. Return with `git switch main`; do not reset or overwrite uncommitted work.
