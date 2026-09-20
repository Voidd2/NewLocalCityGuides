# DEC-009 — Technical stack

- **Task:** FND-002
- **Status:** APPROVED BY DELEGATION — user, 2026-09-13, board Q1
- **Date:** 2026-09-13
- **Owner:** Codex / engineering
- **Decision scope:** application framework, map, content storage, internationalization,
  hosting, and video delivery

> The user pre-approved this decision by delegation in board Q1, as recorded in
> master §37. Claude reviewed the record on PR #2 and confirmed that authorization.
> Engineering may build on it without requesting the same approval again.
> This choice is cheap to reverse now and becomes more expensive as implementation
> grows; the user can object or revoke the delegation at any time.

## 1. Context and constraints

The stack must support the project's already locked product constraints:

- a mobile-first web app/PWA with no required install or account;
- a useful non-GPS fallback and graceful failure when permission is denied;
- a map, nearby discovery, curated routes, and location pages;
- Dutch and English early, with more languages and cities later;
- pre-produced video, without making video a prerequisite for reading a story;
- structured, source-traceable historical content outside UI components;
- fast first paint on old phones and weak or roaming connections;
- no architecture based on a presumed flagship or MVP location.

The approved MVP is L001–L014 under DEC-014, recorded on Claude's PR #1. Selection
does not approve historical content. This decision defines generic platform
capabilities and must not be used to hardcode Pieterskerk, De Waag, De Burcht,
or any other location into application components.

## 2. Proposed decision at a glance

| Area | Recommendation | Why |
|---|---|---|
| Language/runtime | TypeScript on a current supported Node.js LTS | Shared types, mature web tooling, and predictable CI/builds |
| Framework | Next.js App Router, React, server-rendered/static-first | Strong routing, metadata, image/font optimization, server rendering, and selective client-side interactivity |
| Map | MapLibre GL JS behind a small application adapter | Vector maps, flexible styling, efficient data layers, and a better path to richer route/heritage overlays |
| Production content | Repository-owned YAML records, validated with Zod at build/test time | Human-reviewable content without coupling records to application code; strict schema and useful validation errors |
| Editorial prose | Markdown only in explicitly schema-designated rich-text fields | Comfortable authoring while keeping identity, coordinates, schedules, sources, and relationships structured |
| UI translations | `next-intl`, using locale routes (`/nl/...`, `/en/...`) and ICU messages | Explicit URLs, plural/date support, and separation of interface copy from historical content |
| Hosting | Vercel for the web app and preview deployments | Lowest operational burden for Next.js and straightforward preview/rollback workflow |
| Video | Cloudflare Stream for adaptive delivery; WebVTT captions; poster/fallback assets | Adaptive streaming and video-specific delivery without shipping large files in Git or through the app host |
| Validation/quality | Zod + TypeScript + ESLint + Vitest; Playwright for critical browser journeys | Catches malformed content early and covers GPS/map/video fallbacks in a real browser |

Versions should be pinned when implementation starts, not in this architectural
decision. Pinning an unverified version now would become stale before approval.

## 3. Framework decision

### Recommendation: Next.js App Router with a static-first rendering policy

Use React Server Components by default. Add `"use client"` only at interactive
boundaries such as the map, geolocation control, route progress, language
switcher, and video player. Pre-render city, route, and location pages wherever
the repository content permits it. A server runtime may be used for genuinely
dynamic endpoints, but ordinary historical pages must not depend on a live
database or CMS request.

This gives the project:

- indexable and shareable pages for cities, routes, and locations;
- usable text before map/video JavaScript is downloaded;
- nested layouts and locale-aware routes;
- first-party image, font, metadata, and deployment integrations;
- a clear escape hatch for future server features without requiring them now;
- incremental components rather than a monolithic client-side map application.

### Alternatives considered

#### Astro

Astro is attractive for content-heavy, mostly static sites and minimizes client
JavaScript well. It was not selected because map state, route progress,
geolocation, saved/progress behavior, and future app-like transitions form a
meaningful interactive core. Multiple framework islands could save JavaScript,
but would add state-sharing and integration decisions at those boundaries.

#### Vite + React SPA

This is simple and gives maximum client control. It was not selected because the
team would need to assemble routing, metadata, static generation/server
rendering, localization routing, and deployment conventions itself. It also
makes it easier to accidentally require JavaScript before basic story content is
available.

#### SvelteKit or Nuxt

Both are credible full-stack alternatives. They were not selected because they
do not offer a project-specific advantage large enough to outweigh React/Next.js
ecosystem familiarity and integration breadth. This is an operational tradeoff,
not a claim that they are technically incapable.

### PWA boundary

The initial implementation should include a web app manifest, installable icons,
theme metadata, and HTTPS. A service worker must be added only with an explicit
caching design and update strategy. An uncontrolled "cache everything" plugin
can leave visitors with stale historical records or broken map/video requests.
Offline map packs and background GPS tracking are out of scope for the first
foundation pass.

## 4. Map decision: MapLibre versus Leaflet

### Recommendation: MapLibre GL JS

MapLibre is the proposed renderer, isolated behind an adapter owned by the app.
UI components should consume application concepts such as `LocationMarker`,
`RouteLine`, bounds, and selection events rather than importing MapLibre types
throughout the codebase.

| Criterion | MapLibre GL JS | Leaflet |
|---|---|---|
| Rendering model | WebGL vector/raster renderer | Primarily DOM/canvas raster-tile map with plugins |
| Styling | Rich, data-driven vector styling and layer ordering | Straightforward markers/polylines; richer styling commonly needs plugins |
| Route and thematic layers | Strong native fit for multiple styled sources/layers | Excellent for simple overlays; complexity grows with plugins/custom renderers |
| Mobile resource cost | Higher startup/GPU cost; must lazy-load and test low-end devices | Usually lighter for a simple marker map |
| Accessibility | Canvas map itself needs an equivalent list/navigation UI | Markers can be simpler DOM objects, but an equivalent non-map UI is still required |
| Provider coupling | Open-source renderer; style/tile provider remains replaceable | Open-source renderer; tile provider also remains a separate choice |
| Long-term fit | Strong for custom city styling, route emphasis, clustering, and future historical overlays | Strongest when the desired product remains a conventional raster map with modest overlays |

MapLibre wins because the product vision is not merely “pins on a map.” It calls
for curated routes, visual hierarchy, multiple cities, candidate/location
layers, and likely historical or thematic overlays later. Those needs benefit
from vector styles and data-driven layers. The tradeoff is real: MapLibre must
be dynamically loaded only where needed, use conservative effects, and be
tested against the project's performance budget on low-end mobile hardware.

Required safeguards regardless of renderer:

- show a location list and route stop list that works without the canvas;
- never make GPS permission necessary to browse;
- provide keyboard-operable controls and visible focus;
- keep attribution visible and comply with the chosen style/tile provider;
- separate the renderer from the basemap provider;
- do not commit a provider token or assume that map data is free of usage terms;
- define a reduced-motion response and a non-WebGL failure state.

### Why not Leaflet now?

Leaflet would be preferred if the approved MVP were intentionally limited to a
small raster basemap, markers, popups, and a few route polylines, especially if
testing showed unacceptable WebGL support or memory use. It remains the fallback
because the adapter prevents map-vendor details from entering the domain model.
It is not the primary recommendation because the expected visual and data-layer
requirements would likely force additional plugins or a later renderer migration.

### Deferred provider decision

MapLibre is a renderer, not a complete basemap service. Tile/style/geocoding
providers require a separate evaluation of Dutch coverage, attribution, rate
limits, privacy, uptime, caching terms, and cost. PDOK/BAG may be used for
verified Dutch geocoding in ENG-GEO-001, but that does not silently make it the
production basemap provider.

## 5. Content format and validation

### Recommendation: YAML records + schema-designated Markdown

Store production content in Git under a city-neutral hierarchy, for example:

```text
content/
  cities/leiden/city.yaml
  cities/leiden/locations/<location-id>.yaml
  cities/leiden/routes/<route-id>.yaml
  sources/<source-id>.yaml
```

YAML is recommended over TypeScript because content should not execute code or
require editors to understand imports. It is recommended over monolithic JSON
because multiline localized prose and review are easier to read. Markdown is
allowed only inside fields declared by the schema (or referenced by a declared
content-file field), not as unstructured front matter that becomes a second
implicit database.

The FND-005 schema is authoritative for exact fields. Its implementation must:

- validate all records with Zod during tests and production builds;
- reject unknown keys to catch misspellings instead of silently discarding them;
- enforce stable IDs and validate all cross-record references;
- model coordinates as numeric WGS84 longitude/latitude with bounds;
- keep source records and claim/source links structurally queryable;
- distinguish verified facts, editorial copy, and reconstruction assumptions;
- model localized visitor content independently from language-neutral research;
- support time-dependent practical information, including per-day schedules and
  exceptions, so candidate C052/market-day content is not flattened into static
  prose;
- retain explicit draft/review/published status rather than treating presence in
  Git as publication approval;
- produce path-specific validation messages suitable for non-engineers.

Candidate research registers may remain Markdown while discovery is underway.
They are research inputs, not automatically publishable `Location` records. A
deliberate, validated promotion step should create production content only after
selection and historical review.

### Alternatives considered

- **JSON:** unambiguous and universally supported, but unpleasant for multiline
  editorial work and comments. It remains suitable for generated artifacts.
- **TypeScript objects:** excellent inference, but couples content to builds,
  permits executable logic, and raises the authoring barrier.
- **Markdown with front matter:** good for articles, but relationships, schedules,
  source trails, videos, coordinates, and localized variants quickly become an
  under-specified database.
- **Headless CMS now:** useful later for editorial workflow, but introduces cost,
  credentials, migrations, availability, and vendor coupling before the content
  schema and publishing workflow are proven.

The schema/parser should expose a repository interface so a future CMS can
replace file loading without changing page components or domain types.

## 6. Internationalization

### Recommendation: `next-intl` and explicit locale-prefixed URLs

- Use `/nl/...` and `/en/...`; never infer language solely from GPS.
- Keep interface messages in ICU-compatible locale files.
- Keep visitor-facing historical text alongside its content record, keyed by
  locale and validated against the city's required locales.
- Keep research facts, source metadata, coordinates, dates, and IDs
  language-neutral.
- Define one explicit source locale per text field and track translation review
  status; never silently fall back to another language for published historical
  claims.
- Generate `hreflang`, localized metadata, canonical URLs, and a language switch
  that preserves the current city/location/route when a translation exists.
- Use `Intl` for dates, numbers, and durations rather than hand-built formatting.

Framework routing and the content model must depend on the project's own locale
configuration, not directly on `next-intl`, so a library change does not rewrite
content records.

## 7. Hosting and environments

### Recommendation: Vercel for the application

Use three environment classes:

1. local development;
2. automatic preview deployments for pull requests;
3. protected production deployment from the approved main branch.

Reasons for Vercel are operational: close Next.js compatibility, preview URLs,
HTTPS/CDN, rollbacks, and minimal infrastructure for a small team. This is not a
requirement to use Vercel-only data services. Domain code and content remain in
Git, standard Web APIs are preferred, and environment access is wrapped so a
move to another Node-capable host remains feasible.

Required controls:

- production secrets exist only in host environment configuration;
- preview builds use non-production analytics and media credentials;
- security headers and a Content Security Policy are configured deliberately;
- deployment fails on type, schema, link/reference, lint, test, and build errors;
- analytics is privacy-conscious and consent requirements are reviewed before
  enabling a vendor;
- a deploy can be rolled back without reverting content history.

### Alternatives considered

- **Cloudflare Pages/Workers:** attractive edge footprint and could consolidate
  vendors, but Next.js compatibility and runtime boundaries add operational
  considerations. Re-evaluate if Cloudflare consolidation or price becomes more
  important than framework-native deployment.
- **Netlify:** capable previews and edge/CDN hosting, but offers no clear advantage
  for the proposed Next.js stack.
- **Self-hosted container:** maximum control, but patching, monitoring, rollbacks,
  TLS, and scaling are unnecessary operational load for the MVP.

Before vendor activation or spending, pricing, data-processing terms, EU requirements, bandwidth, and
expected traffic must be checked against current vendor terms. No cost claim is
locked into this ADR.

## 8. Video delivery

### Recommendation: Cloudflare Stream, not Git or the application bundle

Store masters in controlled production storage and upload delivery renditions to
Cloudflare Stream. Pages receive a provider-neutral `VideoAsset` record, not an
embedded vendor URL scattered through content. The player component translates
that record into playback.

Each publishable video needs:

- a stable internal asset ID and provider asset ID;
- poster image and short accessible title/description;
- duration and aspect ratio;
- Dutch and English WebVTT captions where that language's audio/video is offered;
- disclosure/label metadata for AI-generated reconstruction;
- source and historical-constraint references in the content model;
- processing/published/failed state;
- transcript or equivalent story content available without playback.

Delivery rules:

- no autoplay with sound and no eager download below the fold;
- render the poster and basic story before loading the player;
- use adaptive streaming; cap default quality sensibly on mobile;
- show a useful error/fallback when media fails;
- collect only coarse, approved playback events;
- honor reduced motion and data-saving signals where practical;
- use signed playback later only if content rights or abuse require it.

### Alternatives considered

- **Vercel Blob/object storage + native MP4:** simple for a tiny pilot, but lacks a
  complete encoding/adaptive-streaming workflow and risks inefficient delivery.
- **Mux:** an excellent video-focused alternative with strong playback and
  analytics. It should replace the recommendation if current pricing, EU/data
  terms, or team preference are better at approval time.
- **YouTube/Vimeo embeds:** lower operational effort, but introduce third-party UI,
  tracking/cookie considerations, branding, and less control over the historical
  experience.
- **Video files in Git:** rejected due to repository growth and unsuitable media
  delivery.

## 9. Architecture boundaries

To keep this decision reversible:

- `src/domain` owns framework-independent city, location, route, source, schedule,
  localization, and video types;
- `src/content` parses and validates repository content;
- `src/features/map` is the only layer aware of MapLibre;
- `src/features/video` is the only layer aware of the video provider;
- page/components receive validated domain objects, never raw YAML;
- geocoding is an ingestion tool and never runs in a visitor's page request;
- generated build artifacts are reproducible and are not hand-edited.

This boundary also enables Leaflet, a CMS, another host, or another video service
to be substituted without rewriting historical records.

## 10. Risks and mitigations

| Risk | Mitigation / validation gate |
|---|---|
| MapLibre harms low-end mobile performance | Lazy-load map, benchmark on a representative low-end device, limit layers/effects, and retain list fallback |
| Next.js ships excessive JavaScript | Server Components by default, client-boundary review, and bundle/performance budgets |
| YAML syntax or implicit typing causes editorial mistakes | Restrictive parser settings, quoted ambiguous values, Zod validation, fixtures, and clear file/field errors |
| Localized historical versions drift | Shared fact/source records plus per-locale review status and parity checks |
| Vendor lock-in | Provider-neutral domain records and adapters; no Vercel database requirement |
| Video cost or privacy terms are unsuitable | Verify current quotes/terms before approval; retain Mux and self-managed object storage as evaluated alternatives |
| Stale service-worker content | Do not add runtime caching until cache ownership, versioning, and invalidation are tested |
| Basemap terms or token leakage | Select provider separately, restrict public tokens by origin where supported, and test attribution |

## 11. Implementation checks and consequences

The delegated stack decision is approved. Before vendor activation, production
spending, or declaring the relevant implementation production-ready, engineering
must still confirm:

1. whether Vercel and Cloudflare accounts/vendors are acceptable;
2. the expected launch traffic and media volume for a cost check;
3. whether the project's privacy/data-location requirements permit those vendors;
4. a low-end mobile MapLibre spike with a route and representative marker count;
5. that the FND-005 schema can represent every candidate-register field,
   especially recurring/per-day content such as C052;
6. that Dutch/English locale routing and untranslated-draft behavior match the
   intended editorial workflow.

Follow-up work must record exact package/runtime versions in the
repository, create small time-boxed spikes for map and content validation, and
then scaffold the app. Approval does **not** select locations, approve historical
copy, approve a basemap license, or authorize production vendor spend.

## 12. User decision

- [x] Approve by delegation (board Q1, recorded in master §37)
- [ ] Approve with changes (record them below)
- [ ] Reject and request another option

**User decision/date:** Approved by delegation, 2026-09-13. This corrects the
outdated pending wording; it does not claim a new user decision.

**Requested changes:** Claude's PR #2 review requests the approval-status correction
and carries four additional schema requirements into FND-005. Vendor spending,
historical publication and the Q15 content-directory migration remain separate.
