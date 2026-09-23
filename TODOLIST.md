# YourLocalCityGuide - Task List

Single prioritized list for any AI agent continuing this project.
Read PROJECT-GUIDE.md first for architecture, design system and content rules.

---

## PRIORITY 1: Images from the user

The app uses placeholder codes (10001-10059). The user must deliver real photographs.
Place all images in: `public/images/` with subdirectories below.

### Folder structure

```
public/images/
  hero/           -- Homepage hero, tours hero
  locations/      -- L001-L014 historical location photos
  spots/          -- Local spots (museums, shops, markets, restaurants)
  routes/         -- Route thumbnail/cover images
  reviews/        -- Reviewer avatars (or remove avatar system)
  cities/         -- Future city previews (Delft, Utrecht, Amsterdam, Den Haag)
  app/            -- App preview screenshots for marketing sections
```

### Images needed - Historical locations

| Code  | File name              | What to photograph                                       |
|-------|------------------------|----------------------------------------------------------|
| 10020 | locations/burcht.jpg   | De Burcht motteheuvel with stairs and city view          |
| 10021 | locations/vismarkt.jpg | Vismarkt square, ideally on market day                   |
| 10022 | locations/koornbrug.jpg| Koornbrug with covered gallery and canal                 |
| 10023 | locations/blauwesteen.jpg | De Blauwe Steen in the pavement on Breestraat         |
| 10024 | locations/gravensteen.jpg | Gravensteen facade from square                        |
| 10025 | locations/pieterskerk.jpg | Pieterskerk exterior or interior                      |
| 10026 | locations/pilgrims.jpg | Engelse Poort / William Brewster alley                   |
| 10027 | locations/pesijnhofje.jpg | Jean Pesijnhofje courtyard from gate (respect privacy)|
| 10028 | locations/buskruitramp.jpg | Van der Werffpark (explosion site)                   |
| 10029 | locations/hortus.jpg   | Hortus Botanicus garden, greenhouses                     |
| 10030 | locations/weddesteeg.jpg | Weddesteeg with Rembrandt mural                        |
| 10031 | locations/ontzet.jpg   | 3 Oktober festivities or herring and white bread         |
| 10032 | locations/wevershuis.jpg | Wevershuis interior with loom                          |
| 10033 | locations/academiegebouw.jpg | Academiegebouw Leiden exterior                     |

### Images needed - Local spots

| Spot                  | File name                    | What to photograph                        |
|-----------------------|------------------------------|-------------------------------------------|
| Schaapsvis Viswinkel  | spots/schaapsvis-winkel.jpg  | The fish shop at Herenstraat 48           |
| Schaapsvis Viskar     | spots/schaapsvis-markt.jpg   | The fish cart on market day               |
| Museum De Lakenhal    | spots/lakenhal.jpg           | Building exterior or main hall            |
| Rijksmuseum v Oudheden| spots/rmo.jpg                | Egyptian temple or facade                 |
| Boerhaave             | spots/boerhaave.jpg          | Anatomisch theater or entrance            |
| Wereldmuseum          | spots/wereldmuseum.jpg       | Building or collection highlight          |
| SieboldHuis           | spots/sieboldhuis.jpg        | Rapenburg facade or Japanese interior     |
| Naturalis             | spots/naturalis.jpg          | T. rex or building exterior               |
| Pilgrim Museum        | spots/pilgrim-museum.jpg     | Beschuitsteeg entrance                    |
| Young Rembrandt       | spots/young-rembrandt.jpg    | Studio reconstruction                    |
| Molenmuseum De Valk   | spots/devalk.jpg             | Windmill exterior                         |
| Het Leids Wevershuis  | spots/wevershuis-spot.jpg    | Loom or facade                            |
| Hortus Botanicus      | spots/hortus.jpg             | Garden panorama or greenhouse             |
| CORPUS                | spots/corpus.jpg             | Building exterior                         |
| Pieterskerk           | spots/pieterskerk-spot.jpg   | Interior or Robinson grave                |
| Oude Sterrewacht      | spots/sterrewacht.jpg        | Observatory dome                          |

### Images needed - Homepage and marketing

| Code  | File name            | What to photograph                                |
|-------|----------------------|---------------------------------------------------|
| 10001 | hero/leiden-hero.jpg | Leiden canals with historic buildings (main hero)  |
| 10002 | hero/gracht.jpg      | Canal with Pieterskerk in background               |
| 10003 | hero/straat.jpg      | Atmospheric narrow street in centre                |
| 10004 | hero/fietser.jpg     | Cyclist along Singel with trees                    |
| 10005 | hero/hofje.jpg       | Hidden hofje with flowers                          |
| 10006 | hero/pesijnhofje.jpg | Jean Pesijnhofje courtyard                         |
| 10007 | hero/gezin.jpg       | Family walking along Leiden canal                  |
| 10008 | hero/tours-hero.jpg  | Leiden canal panorama for tours page               |

### Images needed - Future cities

| Code  | File name              | What it shows                |
|-------|------------------------|------------------------------|
| 10010 | cities/delft.jpg       | Delft centre with Nieuwe Kerk|
| 10011 | cities/utrecht.jpg     | Oudegracht Utrecht           |
| 10012 | cities/amsterdam.jpg   | Amsterdam canals             |
| 10013 | cities/denhaag.jpg     | Binnenhof Den Haag           |

### How to deliver images

1. Name files exactly as listed above (or ask the agent to rename)
2. Minimum resolution: 1200px wide, landscape orientation preferred
3. JPG or WebP format, keep file size under 500KB (compress if needed)
4. Place in the correct subfolder under `public/images/`
5. After adding images, tell the agent to update the placeholder codes in components

---

## PRIORITY 2: Code tasks (agent can do these now)

### 2.1 Homepage redesign for conversion
- [x] Move all content from `/about` page to the homepage (before paywall)
- [x] Remove the `/about` page and route
- [x] Create a catchy headline/title for YourLocalCityGuide on the hero
- [x] Reorder homepage sections:
  1. Hero with catchy title
  2. Video preview ("Bekijk de preview video") -- ABOVE the "Over Leiden" block
  3. "Zo werkt het" (how it works)
  4. "Over Leiden" section
  5. Populaire routes
  6. "Maak je eigen route" card (clicking leads to blurred/paywall view)
- [x] FAQ and practical tips sections added
- [x] Updated navigation (header, footer, bottom nav) to remove about links
- [x] Conversion polish (2026-09-23): one dominant hero CTA, supporting trust signals and clearer secondary route CTA
- [x] Replaced visible homepage image/screenshot placeholders with real project imagery and product-style previews
- [x] Made the preview card and popular route cards lead to relevant, browsable product pages
- Focus on conversion: video tours, updated maps, best local spots, free booking help
- Make it persuasive -- visitors should feel they NEED this app

### 2.2 Affiliate link system (ticketUrl)
- [x] Add `ticketUrl` field to `LocalSpot` interface in `src/data/local-spots.ts`
- [x] Add GetYourGuide link to Hortus Botanicus (S011)
- [x] Add ticket CTAs in the Ontdek detail views when `ticketUrl` is present
- [ ] Research and add GetYourGuide affiliate links for all museums with paid entry:
  - Museum De Lakenhal (S001)
  - Rijksmuseum van Oudheden (S002)
  - Rijksmuseum Boerhaave (S003)
  - Wereldmuseum Leiden (S004)
  - Japanmuseum SieboldHuis (S005)
  - Naturalis (S006)
  - Pilgrim Museum (S007)
  - Young Rembrandt Studio (S008)
  - Molenmuseum De Valk (S009)
  - CORPUS (S012)
  - Pieterskerk (S013)
  - Oude Sterrewacht (S014)
- Partner link format: `https://www.getyourguide.nl/leiden-l1275/[activity]/?partner_id=W9KB6MF&currency=EUR&travel_agent=1&cmp=share_to_earn`

### 2.3 Expand museum/attraction descriptions
Every museum and attraction in `src/data/local-spots.ts` needs MUCH more text:
- Use bold subtitles to structure the description
- Explain WHY to visit, what makes it special
- Include practical details (what to see, how long, tips)
- Make descriptions persuasive for visitors
- [x] All museums expanded: S001-S014, S030/S031/S032

### 2.4 Route logic improvements
- GPS-based starting point detection: detect user location and suggest nearest route start
- Start route from current location instead of fixed start point
- Resume any route from any point the user is at
- Smart ordering: reorder stops based on where the user currently is
- Implementation in: `src/app/[locale]/mijn-routes/` and route detail pages

### 2.5 MapLibre GL JS integration
- Replace placeholder map with interactive MapLibre map
- Use real coordinates from locations.ts and local-spots.ts
- Category filters on map
- Cluster markers when zoomed out
- Click marker to see location card
- Walking route overlay when in walker mode

### 2.6 Video integration
- Connect Cloudflare Stream for location videos
- No autoplay -- only play after "Ik ben er" confirmation
- Video player in location experience page
- Video preview on homepage (marketing)

---

## PRIORITY 3: Content creation (agent writes, user records/produces)

### 3.1 Audio tour scripts (TTS)
Write text-to-speech scripts for each of the 14 MVP locations.
Each script needs NL, EN, and DE versions.
Save in: `content/audio-scripts/`

Scripts needed:
- `content/audio-scripts/L001-burcht.md` -- De Burcht
- `content/audio-scripts/L002-vismarkt.md` -- Vismarkt
- `content/audio-scripts/L003-koornbrug.md` -- Koornbrug
- `content/audio-scripts/L004-blauwesteen.md` -- De Blauwe Steen
- `content/audio-scripts/L005-gravensteen.md` -- Gravensteen
- `content/audio-scripts/L006-pieterskerk.md` -- Pieterskerk
- `content/audio-scripts/L007-pilgrims.md` -- Pilgrims' quarter
- `content/audio-scripts/L008-pesijnhofje.md` -- Jean Pesijnhofje
- `content/audio-scripts/L009-buskruitramp.md` -- Buskruitramp 1807
- `content/audio-scripts/L010-hortus.md` -- Hortus Botanicus
- `content/audio-scripts/L011-weddesteeg.md` -- Weddesteeg / Rembrandt
- `content/audio-scripts/L012-ontzet.md` -- Leidens Ontzet
- `content/audio-scripts/L013-wevershuis.md` -- Het Leids Wevershuis
- `content/audio-scripts/L014-cleveringa.md` -- Cleveringa / Academiegebouw

Format per file:
```
# [Location Name] - Audio Tour Script

## Nederlands (60-90 seconds)
[Script text here]

## English (60-90 seconds)
[Script text here]

## Deutsch (60-90 seconds)
[Script text here]
```

Content rules apply:
- DEC-013: No superlatives unless verified
- DEC-011: No AI reconstruction imagery references for L014
- DEC-016: L014 must include what happened to Leiden's Jewish citizens
- DEC-010: Only use verified facts from R01/R02 research

### 3.2 Video brief scripts
Determine which locations get video tours vs audio only.

Video locations (most visited, most visual):
- L001 De Burcht (panoramic view from top)
- L003 Koornbrug (architectural details, ventilation holes)
- L006 Pieterskerk (interior, Robinson grave)
- L009 Buskruitramp (then-vs-now with archival prints)
- L010 Hortus Botanicus (gardens, greenhouses, Clusius garden)

Audio-only locations:
- L002 Vismarkt
- L004 De Blauwe Steen
- L005 Gravensteen
- L007 Pilgrims' quarter
- L008 Jean Pesijnhofje
- L011 Weddesteeg
- L012 Leidens Ontzet
- L013 Het Leids Wevershuis
- L014 Cleveringa (no reconstruction imagery per DEC-011)

Save video briefs in: `content/video-briefs/`

---

## PRIORITY 4: Technical improvements

### 4.1 PWA and offline support
- Service worker for offline access
- App manifest with brand colours
- Cache walking routes for offline use

### 4.2 Authentication
- Replace localStorage test login with real auth (NextAuth.js)
- User accounts, purchases, saved routes

### 4.3 Payment integration
- Stripe or Mollie for Dutch payments
- iDEAL, credit card, Apple Pay, Google Pay
- Purchase flow for route access

### 4.4 SEO
- Auto-generated sitemap.xml
- Proper robots.txt
- JSON-LD structured data (TouristAttraction, City, Route)
- Unique titles per page per language
- Blog/content pages for SEO landing pages

### 4.5 Performance and polish
- Skeleton loaders for routes, locations, map
- Custom 404 and 500 error pages
- Cookie consent banner (GDPR)
- Favicon and app icons with brand design
- Dark mode support
- Page transition animations

---

## PRIORITY 5: Future features

- More cities: Delft, Utrecht, Amsterdam, Den Haag
- Cycling routes (for locations outside walking distance: Matilo, Meelfabriek)
- Date-aware routes (3 Oktober special route swapping Hortus for Ontzet festivities)
- Time-conditional stops (C052 Nieuwe Rijn market on market days only)
- Newsletter and email system
- Real user reviews and ratings
- Social sharing of custom routes

---

## Completed tasks

- [x] PROJECT-GUIDE.md created (consolidated agent reference)
- [x] Schaapsvis split into 3 entries (S030 Viswinkel, S031 Woensdag markt, S032 Zaterdag markt)
- [x] Hortus Botanicus description expanded with subtitles
- [x] ticketUrl field added to LocalSpot interface
- [x] GetYourGuide affiliate link added to Hortus
- [x] Old planning files cleaned up (MASTER_V1, CLAUDE_TAKEN, CHATGPT_TASKS, etc.)
- [x] CLAUDE.md updated to reference PROJECT-GUIDE.md
- [x] 14 MVP locations selected and approved (L001-L014)
- [x] 40+ local spots data created
- [x] 6 walking routes created
- [x] All pages built and compiling in NL/EN/DE
- [x] Three-language routing with next-intl
- [x] Design system implemented
- [x] Test login system (demo)
- [x] Location experience page with "Ik ben er" flow
- [x] Custom route builder with zone-based ordering
