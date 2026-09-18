# Website TODO Overview

Status: Front-end skeleton complete, all pages built and compiling in NL/EN/DE.
Date: 2026-09-17

## Completed

- [x] Next.js 15 project initialized with TypeScript, Tailwind CSS
- [x] Three-language routing (NL/EN/DE) with next-intl
- [x] Homepage (wireframe Screen 1): hero, features bar, price comparison, popular routes, upcoming cities
- [x] Tours overview page (wireframe Screen 2): all 6 route cards, custom route CTA, "meer steden" section
- [x] Route detail page (wireframe Screen 3): stats bar, tabs (overview/route & stops/videos/reviews), video preview, numbered stop list, pricing
- [x] Pricing/checkout page (wireframe Screen 4): 4-step flow, person counter, extra devices, payment methods, total
- [x] About page (sales/conversion): tour guide comparison, app preview section, video placeholder, kid-friendly section, hidden gems
- [x] Custom route builder: pick locations, smart zone-based ordering, Google Maps/Apple Maps link
- [x] Map page: category filters, list/map toggle, location list with search
- [x] Location experience page: "Ik ben er" flow (preview -> choose -> video/story/practical)
- [x] Test login: paid account (test@yourlocalcityguide.com / LeidenTest2026!) and free account
- [x] Dashboard: paid view (all routes + locations) vs free view (locked preview)
- [x] Header with language switcher, search, hamburger menu, login link
- [x] Bottom navigation bar (mobile)
- [x] Footer with social links
- [x] SEO metadata: OG, Twitter Card, keywords, alternates
- [x] Design system: navy-800 header, orange-500 accents, warm-50 background, Caveat handwriting font
- [x] Image placeholder codes (10001-10059) for future photo assets
- [x] Location data for all 14 MVP locations (L001-L014)
- [x] Route data for 6 routes
- [x] Git pushes after each major milestone

## Todo - Front-end

- [ ] **Real images**: Replace all image placeholder codes (10001-10059) with actual photographs
  - Need: hero photo, route thumbnails, location photos, review avatars, city previews, hidden gem photos, app preview screenshots
- [ ] **Video integration**: Connect Cloudflare Stream for location videos (no autoplay, "Ik ben er" trigger)
- [ ] **MapLibre GL JS**: Integrate map with real coordinates (waiting for ENG-GEO-001 / PDOK/BAG)
- [ ] **Responsive polish**: Test all breakpoints, ensure no horizontal scroll on phone
- [ ] **Animations**: Subtle page transitions, scroll animations for sections
- [ ] **Dark mode**: Currently light only; consider adding dark mode support
- [ ] **PWA support**: Service worker, offline capability, app manifest
- [ ] **Favicon and app icons**: Replace default Next.js favicon with brand icon
- [ ] **Loading states**: Skeleton loaders for routes, locations, map
- [x] **Error pages**: Custom 404 and 500 pages matching design language
- [ ] **Cookie consent**: GDPR-compliant cookie banner (NL/DE especially)

## Todo - Backend

- [ ] **Payment integration**: Stripe or Mollie for Dutch payments (iDEAL, credit card, Apple Pay, Google Pay)
- [ ] **User authentication**: Replace localStorage test login with real auth (NextAuth.js or similar)
- [ ] **Database**: User accounts, purchases, saved routes (PostgreSQL via Supabase or similar)
- [ ] **Content API**: Serve location content from verified research data
- [ ] **Email system**: Purchase confirmation, welcome email, newsletter signup

## Todo - Content

- [ ] **R02 verification round 4**: Contact Erfgoed Leiden for remaining claims
- [ ] **Fill location content**: After R02 passes, populate hook, shortStory, funFacts, lookAround fields
- [ ] **Route narratives**: Walking directions, transition text between stops
- [ ] **Hidden gems content**: Research and write up authentic local spots (stroopwafel stand, fishmonger, etc.)
- [ ] **Audio content**: Dutch/English/German voiceover for each location
- [ ] **Video scripts**: Write scripts for interactive location videos
- [ ] **Photography brief**: List of needed shots per location for photographer
- [ ] **Review content**: Replace placeholder reviews with real testimonials

## Todo - SEO & Marketing

- [x] **Sitemap.xml**: Auto-generated from routes
- [x] **robots.txt**: Proper crawl directives
- [x] **Structured data**: JSON-LD for TouristAttraction, Route (City still open)
- [ ] **Page-level SEO titles**: Unique titles per page per language (currently using default)
- [ ] **Internal linking**: Cross-link routes, locations, about page
- [ ] **Blog/content pages**: SEO landing pages for "Leiden wandeling", "Leiden bezienswaardigheden", etc.
- [ ] **Analytics**: Google Analytics 4 or Plausible
- [ ] **Hreflang tags**: Verify correct implementation across NL/EN/DE

## Todo - Infrastructure

- [ ] **Vercel deployment**: Configure for production
- [ ] **Custom domain**: yourlocalcityguide.com or yourlocalcityguide.nl
- [ ] **CI/CD**: GitHub Actions for build verification
- [ ] **Testing**: Vitest unit tests + Playwright E2E tests
- [ ] **Performance**: Lighthouse audit, Core Web Vitals optimization
- [ ] **CDN**: Image optimization via Vercel Image Optimization

## Test Accounts

| Account | Email | Password | Access |
|---------|-------|----------|--------|
| Paid (full) | test@yourlocalcityguide.com | LeidenTest2026! | All routes, videos, locations |
| Free (preview) | free@yourlocalcityguide.com | FreeUser2026! | Limited preview, locked content |

## Image Placeholder Codes

| Code | Description |
|------|-------------|
| 10001 | Hero foto van Leiden binnenstad, grachten met historische gebouwen |
| 10002 | Foto van historische gracht Leiden met Pieterskerk op achtergrond |
| 10003 | Foto van sfeervolle smalle straat in Leiden centrum |
| 10004 | Foto van fietser langs Leidse singel met bomen |
| 10005 | Foto van verborgen hofje in Leiden met bloemen |
| 10006 | Foto van binnenplaats Jean Pesijnhofje |
| 10007 | Foto van gezin dat wandelt langs Leidse gracht |
| 10008 | Hero foto van Leiden grachten panorama voor tours pagina |
| 10010 | Foto van Delft centrum met Nieuwe Kerk |
| 10011 | Foto van Oudegracht Utrecht |
| 10012 | Foto van Amsterdam grachten |
| 10013 | Foto van Binnenhof Den Haag |
| 10020 | Foto van De Burcht motteheuvel met trappen |
| 10021 | Foto van Vismarkt plein Leiden |
| 10022 | Foto van Koornbrug met overdekte galerij |
| 10023 | Foto van De Blauwe Steen in het wegdek |
| 10024 | Foto van Gravensteen gevel |
| 10025 | Foto van Pieterskerk interieur of exterieur |
| 10026 | Foto van Engelse Poort / William Brewster steeg |
| 10027 | Foto van Jean Pesijnhofje binnenplaats |
| 10028 | Foto van Van der Werffpark (locatie explosie) |
| 10029 | Foto van Hortus Botanicus Leiden tuin |
| 10030 | Foto van Weddesteeg met Rembrandt muurschildering |
| 10031 | Foto van 3 Oktober festiviteiten of haring en wittebrood |
| 10032 | Foto van Wevershuis interieur met weefgetouw |
| 10033 | Foto van Academiegebouw Leiden |
| 10034 | Video thumbnail van Pieterskerk interactieve video |
| 10035 | Review avatar foto |
| 10040 | Screenshot van pricing pagina op telefoon |
| 10041 | Screenshot van routes kiezen op telefoon |
| 10042 | Screenshot van locatie ervaring op telefoon |
| 10043 | Preview video thumbnail van app in gebruik op locatie |
| 10056 | Foto van een stroopwafeltent op de markt |
| 10057 | Foto van ambachtelijke vishandel in Leiden |
| 10058 | Foto van verborgen hofje binnenplaats |
| 10059 | Foto van authentiek bruin cafe in steeg |
