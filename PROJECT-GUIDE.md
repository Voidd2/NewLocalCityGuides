# YourLocalCityGuide — project reference

Current operational reference for contributors and AI agents. `TODOLIST.md` is the only current task list; files marked as archives are context, not instructions.

## Product

YourLocalCityGuide is a mobile-first city discovery platform for Leiden. Visitors combine curated routes, GPS guidance, maps, stories, video, practical information and selected local businesses.

Core promise: **Stand where history happened. See the story come alive.**

Current preview: `https://newlocalcityguide-fawn.vercel.app`

Current phase: public product and pre-media preparation complete; real authentication, payments, Cloudflare Stream, final photographs and final launch configuration are next.

## Technology

- Next.js 16.3.5 App Router and React 19
- TypeScript and Tailwind CSS 4
- `next-intl` with `nl`, `en` and `de`
- MapLibre with OpenFreeMap tiles
- Vitest, ESLint and GitHub Actions
- branch: `main`

Read the relevant bundled Next.js documentation in `node_modules/next/dist/docs/` before changing framework conventions.

## Product routes

- `/[locale]` — homepage
- `/[locale]/dashboard` — personal starting point
- `/[locale]/routes` and `/[locale]/routes/[slug]` — route discovery and details
- `/[locale]/locations/[slug]` — member location experience
- `/[locale]/my-routes` — saved and custom routes
- `/[locale]/map` — full map
- `/[locale]/ontdek` — discovery index
- `/[locale]/leiden/places` and `/[locale]/leiden/[entityType]/[slug]` — public SEO place pages
- `/[locale]/blog` — public multilingual articles
- `/[locale]/pricing`, `/privacy` and `/terms` — conversion and legal preparation

## Important data boundaries

- `src/data/locations.ts` — location metadata used by the interface
- `src/data/local-spots.ts` — museums, shops, markets, restaurants and events
- `src/data/routes.ts` — curated route definitions and internal ordered location IDs
- `src/data/stories.ts` — full premium stories and voice-over material
- `src/data/public-entities.ts`, `seo-content.ts`, `public-route-seo.ts` — deliberately limited public content
- `src/data/media-manifest.ts` — public editorial status only; no Stream IDs or signed URLs
- `content/affiliate-links.json` — validated intake file; only manually verified links may later be connected
- `messages/nl.json`, `en.json`, `de.json` — interface translations

The current client-side demo account and purchase state are not a production paywall. Authentication, entitlement checks, purchases, route progress and private media delivery must move server-side before accepting payment.

## Binding content decisions

- Coordinates are never estimated. Use an authoritative source or `null`.
- Do not create AI reconstructions for persecution, resistance or civilian bombing deaths. L014 uses archival material only.
- Avoid unverified superlatives such as “oldest”, “first” and “only”.
- L014 must explain what was done to Leiden's Jewish residents, not only celebrate Cleveringa.
- Unknown or unverified information stays unpublished until verification passes.
- Do not promote competing fish vendors in the Schaapsvishandel route content.
- AI-generated historical visuals must be labelled as impressions.
- Reviews and aggregate ratings may be presented as genuine only when genuine visible reviews exist.

## Implementation rules

- Use `useTranslations()` or server translations for visitor-facing UI and add keys to NL, EN and DE.
- Preserve the seven-item opening-hours order: Monday through Sunday.
- Keep secrets, provider IDs, signed media URLs and payment data out of public data and Git.
- Use `next/image` for interface imagery.
- Run `npm run check` before pushing to `main`.
- Update `TODOLIST.md` and relevant runbooks when completing or deferring work.

## Where to continue

- Active work: `TODOLIST.md`
- Environment handover: `docs/ENVIRONMENT-MATRIX.md`
- Release state: `docs/RELEASE-BASELINE.md`
- GPS and maps: `docs/GPS-ROUTES-AND-MAPS.md`
- Images and sliders: `docs/STORY-IMAGES-AND-SLIDERS.md`
- SEO and public AI access: `docs/SEO-AI-CONTENT-GUIDE.md`
- Video delivery: `docs/VIDEO-PUBLISHING-WORKFLOW.md`
