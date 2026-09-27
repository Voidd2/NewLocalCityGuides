# YourLocalCityGuide

Mobile-first city guide for Leiden with public SEO pages, curated routes, local businesses, MapLibre maps and a member experience for on-location stories, video and GPS guidance.

The application is in the pre-integration phase. Public content, route planning, multilingual SEO and the media workflow are prepared. Real authentication, payments, Cloudflare Stream and final production media deliberately belong to the next phase.

## Start locally

Requirements: Node.js 24 and npm.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. Locale routes use `/nl`, `/en` and `/de`.

Before committing:

```bash
npm run check
```

The full check runs TypeScript, ESLint, media validation, affiliate validation, tests and a production build.

## Current architecture

- Next.js 16 App Router, React 19 and TypeScript
- Tailwind CSS 4
- `next-intl` for Dutch, English and German
- MapLibre with OpenFreeMap tiles
- static public location and route data
- local browser storage for the current demo account, saved routes and progress
- public SEO summaries separated from premium story data

Important data files:

- `src/data/locations.ts` — MVP historical locations
- `src/data/local-spots.ts` — museums, markets, businesses and activities
- `src/data/routes.ts` — curated routes
- `src/data/stories.ts` — full member stories; never copy these into public SEO datasets
- `src/data/media-manifest.ts` — public editorial media status, never provider secrets
- `content/affiliate-links.json` — controlled affiliate import file
- `messages/*.json` — interface translations

## Documentation

Read these in order:

1. `PROJECT-GUIDE.md` — product rules and technical map
2. `TODOLIST.md` — the only current task list
3. `docs/ENVIRONMENT-MATRIX.md` — configuration now and in the next phase
4. `docs/RELEASE-BASELINE.md` — stable pre-Cloudflare baseline and known limitations
5. `docs/VIDEO-PUBLISHING-WORKFLOW.md` — media and private delivery workflow
6. `docs/PRE-MEDIA-QA.md` — checks to repeat with final photos and videos

Historical research documents remain useful as evidence, but they are not operational instructions. If an old file conflicts with `PROJECT-GUIDE.md` or `TODOLIST.md`, use the latter two.

## Working rules

- Work on and push to `main`.
- Do not commit `.env` files, access tokens, payment secrets, Stream identifiers or signed playback URLs.
- Never estimate coordinates or invent historical certainty.
- Do not publish fake reviews or Review schema without real visible reviews.
- Do not expose full premium stories, exact paid route execution or private media delivery data through SEO pages or public manifests.
- Use translations for visitor-facing UI in all three languages.

## Integration boundaries

The current login and purchase state are demonstrations, not production security. Before sales, authentication, entitlements, purchases and private media access must move server-side. The exact handover points are listed in `TODOLIST.md` and `docs/ENVIRONMENT-MATRIX.md`.
