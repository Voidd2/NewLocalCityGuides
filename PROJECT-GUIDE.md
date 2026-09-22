# YourLocalCityGuide - Project Reference

Single source of truth for any AI agent or contributor working on this project.

## Product

YourLocalCityGuide is a mobile-first city discovery platform for Leiden, Netherlands.
Visitors explore the city physically and experience history, stories and local context
on location. The platform combines an interactive map, GPS/nearby discovery, curated
walking routes, historical storytelling, audio tours, video tours, fun facts,
practical city info and local business discovery.

**Core promise:** "Stand where history happened. See the story come alive."

**Live site:** https://newlocalcityguide-fawn.vercel.app

## Tech Stack

- **Framework:** Next.js 16.3.5 (Turbopack) with TypeScript
- **Styling:** Tailwind CSS v4
- **i18n:** next-intl with NL/EN/DE locales, middleware routing (`/nl/...`, `/en/...`, `/de/...`)
- **Fonts:** Inter (body) + Caveat (handwritten accents via `text-hand` class)
- **Hosting:** Vercel
- **Git branch:** `claude/affectionate-rubin-t48oom` (always push to BOTH this branch AND `main`)

## Design System

| Token | Value | Use |
|---|---|---|
| orange-500 | #FF6B00 | Primary accent, CTAs, active states |
| navy-800 | #1B2A4A | Headers, dark backgrounds, text |
| warm-50 | #FEFCF9 | Page background |
| Inter | sans-serif | All body text |
| Caveat | cursive | Handwritten style (`text-hand`) |

## Key Architecture

### Data Files
- `src/data/locations.ts` - 14 MVP historical locations (L001-L014) with LocationData interface
- `src/data/local-spots.ts` - 40+ local spots (museums, shops, markets, restaurants) with LocalSpot interface
- `src/data/routes.ts` - 6 curated walking routes
- `messages/nl.json`, `messages/en.json`, `messages/de.json` - UI translation strings (flat structure with namespaces)

### Key Interfaces
- **LocationData:** id, slug, name, coords, address, era, category, hook, shortStory, readingText, voiceOver (each with {nl,en,de}), entryFee, ticketUrl
- **LocalSpot:** id, name, category, address, coords, website, phone, description {nl,en,de}, tags, hours (7-element array Mon-Sun), featured, ticketUrl
- **LocationStory:** voiceOver {nl,en,de}, readingText {nl,en,de}
- **ExperienceState:** "preview" | "arrived" | "video" | "story" | "practical"

### Translation Pattern
```tsx
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
const t = useTranslations("namespace");
const locale = useLocale() as "nl" | "en" | "de";
```

### Pages
- `/` - Homepage (conversion/sales page with paywall)
- `/ontdek` - Discover page (featured spots, categories, search)
- `/tours` - All routes overview
- `/tours/[slug]` - Route detail with stops, tabs, pricing
- `/kaart` - Map page with filters
- `/locatie/[slug]` - Location experience page ("Ik ben er" flow)
- `/mijn-routes` - My saved routes (with walker mode)
- `/account` - User account
- `/checkout` - Pricing/checkout flow

### Authentication (demo only)
- Paid: test@yourlocalcityguide.com / LeidenTest2026!
- Free: free@yourlocalcityguide.com / FreeUser2026!
- These are test credentials in `src/lib/auth.ts`, not real auth

## Content Rules (BINDING)

These rules are locked and may not be changed without explicit user approval:

- **DEC-010:** Coordinates are never estimated. Use PDOK/BAG or null.
- **DEC-011:** No AI reconstruction imagery for persecution, resistance, or civilian bombing deaths (C047, C048, C058, L014).
- **DEC-013:** No superlative ("oldest", "first", "only") in visitor-facing content unless cleared in a verification log.
- **DEC-016:** L014 must carry the substance of what was done to Leiden's Jewish citizens, not just Cleveringa's courage.
- All content fields in locations data that are null are null ON PURPOSE per these rules. No visitor-facing copy until R02 verification passes.
- Do NOT promote other fish vendors besides Schaapsvishandel/Schaapsvis (user's family business since 1938).

## Working Rules

- No emojis in any output or files
- Always push to BOTH `claude/affectionate-rubin-t48oom` AND `main`
- User has given full control: "je hebt volledig beheer" / "Ik review niks je pusht het automatisch"
- Use `useTranslations()` hook for all UI strings, add keys to all 3 language files
- The `hours` field is a 7-element array [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
- Opening hours display uses `getTodayHours()` helper in OntdekPage

## Image Placeholder System

Images use placeholder codes (10001-10059). Real photos need to be provided by the user.
See `TODOLIST.md` for the full list of needed images and how to deliver them.

## Affiliate Links

GetYourGuide affiliate links are used for paid attractions. The partner link format:
`https://www.getyourguide.nl/leiden-l1275/[activity]/?partner_id=W9KB6MF&currency=EUR&travel_agent=1&cmp=share_to_earn`

Locations with entryFee + ticketUrl show a ticket CTA in the walker/route detail views.

## Phase 1 Research (Historical)

65 candidate locations were researched, scored and verified. 14 were selected as MVP (L001-L014).
Deep research (R01) is complete for all 14. Source verification (R02) is partially complete.
The research files live in `content/leiden/` and `docs/` directories - these are reference archives,
not active instruction files.

## What To Work On Next

See `TODOLIST.md` for the complete prioritized task list.
