# Leiden MVP practical information: L001-L014

**Task:** `RESEARCH-PRACTICAL-001`  
**Status:** complete research pass; fields marked `RECHECK` must not be published as settled  
**Checked:** 2026-09-17  
**Purpose:** production input for addresses, access, transport, visit timing and photography

## How to use this file

This file updates and extends `content/leiden/locations/PRACTICAL-INFO.md`. It does not overwrite
that Claude-owned file. Current official operator and government pages take priority over older
notes. Prices, opening times, tours, transit and temporary closures must be rechecked shortly
before release and then periodically in production.

Three confidence labels are used:

- **VERIFIED:** a current official operator, university, municipality or destination page
  directly supports the statement.
- **PLANNING ESTIMATE:** an editorial duration or quieter-time recommendation, clearly not an
  operator promise.
- **RECHECK:** no current authoritative answer was published, or the arrangement is temporary.

The nearest-stop field was cross-checked on 2026-09-17 against current OpenStreetMap transit
platform data using the verified PDOK/BAG anchor from `ENG-GEO-001`. [S26][S27] Distances were straight-line
screening distances, not accessibility routes. The product must link to a live journey planner;
bus lines and platforms can change.

## Shared transport rules

- Leiden's centre is low-car. The municipality directs visitors to garages. Garenmarkt,
  Lammermarkt and Morspoort are operating reservation choices; **Haarlemmerstraat is currently
  closed to entering traffic**. Do not repeat the older Wevershuis instruction that sends cars
  to Haarlemmerstraat. [S01][S02]
- `Garenmarkt` is the practical full-visit garage for L001-L009 and L012. `Morspoort` is the
  practical garage for L011. The operator itself recommends `Haagweg` for L010; it is also the
  useful option for L014. These are route-planning recommendations, not reserved spaces.
- `Waardkerkplein` is the nearer short-parking option for L013 but has a maximum two-hour stay.
  For a longer visit use an operating centre garage. [S03]
- On 3 October, normal access changes materially: Lammermarkt closes for a wider period and
  Garenmarkt has timed closures. Always show the municipal event notice instead of a static
  promise. [S02]

## Location records

### L001 - De Burcht

| Field | Value |
|---|---|
| Address | **Van der Sterrepad 5, 2312 EK Leiden** (visitor entrance anchor). Visit Leiden also labels the attraction from Burgsteeg; route to the Van der Sterrepad entrance. **VERIFIED** [S04][S05] |
| Hours | Free access is confirmed, but no authoritative daily gate schedule was published. **RECHECK gate hours on the visit day.** Do not import conflicting map-platform hours. [S04] |
| Admission | Free. **VERIFIED** [S04] |
| Wheelchair access | The mound/ring wall is not wheelchair accessible; Open Monumentendagen explicitly marks it inaccessible for wheelchairs. The foot of the mound and gate approach can still be viewed. **VERIFIED** [S05] |
| Parking | Garenmarkt for a normal centre visit. **Current operating garage; planning recommendation.** [S01][S02] |
| Public transport | `Breestraat` stop, then roughly 250 m straight-line screening distance. Confirm live route in 9292. |
| Visit duration | **15-25 minutes, PLANNING ESTIMATE**; add time for steps and panorama. |
| Best time | Early morning for quieter paths and an unobstructed panorama; gate hours still require a same-day check. **PLANNING ESTIMATE.** |
| Photography | Handheld exterior/panorama visitor photography only assumed. Commercial production, equipment or exclusive access: **RECHECK with Gemeente Leiden**. The 2026 gate restoration was scheduled through early June and the underpass remained open; verify that no new works are active. [S06] |

### L002 - Vismarkt and Visfontein

| Field | Value |
|---|---|
| Address | **Vismarkt, Leiden**; use the Visfontein/Visbrug as the on-site anchor. **VERIFIED street anchor** [S07] |
| Hours | Public outdoor space, always accessible. The city-centre market operates **Wednesday and Saturday, 08:00-17:00** around Nieuwe Rijn/Vismarkt. **VERIFIED** [S07] |
| Admission | Free. |
| Wheelchair access | Level public street/market area. Crowding, stalls and service vehicles can narrow the route on market days. **Physical layout verified in prior R01/R02; live obstruction remains variable.** |
| Parking | Garenmarkt. [S01][S02] |
| Public transport | `Breestraat`, roughly 75-100 m straight-line screening distance; confirm live route. |
| Visit duration | **10-15 minutes, PLANNING ESTIMATE**; 20-30 minutes if the market is part of the experience. |
| Best time | For the market: Wednesday/Saturday after opening but before the lunch peak. For architecture/fountain: a non-market early morning. The fountain may be protected in winter; **RECHECK seasonal cover**. |
| Photography | Public-space photography; avoid identifiable close-ups of stallholders/customers without permission and do not block the market route. Commercial set-up: check municipal requirements. |

### L003 - Koornbrug

| Field | Value |
|---|---|
| Address | **Nieuwe Rijn, 2312 JC Leiden. VERIFIED** [S08] |
| Hours | Open public bridge. It reopened on 14 May 2026 after restoration; heavy traffic is permanently diverted. **VERIFIED in R02 round 3; recheck municipal works before launch.** |
| Admission | Free. |
| Wheelchair access | Level bridge route and covered passage; ordinary city-surface tolerances apply. |
| Parking | Garenmarkt. [S01][S02] |
| Public transport | `Breestraat`, roughly 60-135 m straight-line screening distance; confirm live route. |
| Visit duration | **8-12 minutes, PLANNING ESTIMATE.** |
| Best time | Early morning for a clear view through the covered bridge; market hours create more activity but also crowding. |
| Photography | Public-space photography. Keep through-passage and market access clear; commercial equipment may require municipal permission. |

### L004 - De Blauwe Steen

| Field | Value |
|---|---|
| Address | **In the carriageway at the junction Breestraat / Pieterskerk-Choorsteeg / Maarsmansteeg. VERIFIED** [S09] |
| Hours | Public street, always visible, subject to traffic and events. |
| Admission | Free. |
| Wheelchair access | View **from the pavement**. The object itself lies in the roadway; the product must never direct a visitor into traffic. |
| Parking | Garenmarkt. [S01][S02] |
| Public transport | `Breestraat`, roughly 65-95 m straight-line screening distance; confirm live route. |
| Visit duration | **5-8 minutes, PLANNING ESTIMATE.** |
| Best time | Early morning/Sunday morning for lower pedestrian and delivery traffic; never frame a quieter period as permission to enter the road. |
| Photography | Use a long/normal lens from the pavement. No tripod or staged shot in the carriageway. Commercial traffic control would require formal permission. |

### L005 - Gravensteen

| Field | Value |
|---|---|
| Address | **Pieterskerkhof 6, Leiden. VERIFIED** [S10] |
| Hours | Exterior square is public. Current operator page: guided tours **Saturday and Sunday afternoons**, start **15:00**, door closes at start; max 10, often sold out. This arrangement is temporary and must be date-checked/booked. **VERIFIED current page, TEMPORARY** [S10] |
| Admission | Exterior free. Tour price is not exposed in accessible official page content. **RECHECK in live booking flow; do not publish a guessed price.** |
| Wheelchair access | Tour is explicitly unsuitable for wheelchair users, people with visual impairments and people with limited mobility; narrow passages, uneven floors and steep stairs. No toilets in the building. **VERIFIED** [S10] |
| Parking | Garenmarkt; Haagweg plus shuttle is an operator-backed alternative for the Pieterskerk area. [S01][S11] |
| Public transport | `Breestraat`, roughly 230-300 m straight-line screening distance; confirm live route. |
| Visit duration | Exterior **10-15 minutes, estimate**; booked tour **about 60 minutes, verified**. [S10] |
| Best time | Exterior before the afternoon tour queue. For interior, arrive before 15:00 with a confirmed ticket; late entry is not possible. |
| Photography | Exterior public-space photography. Interior policy is not published on the tour page: **ask the guide before photographing or filming**. Commercial/press photography at Pieterskerk-managed sites requires prior contact. [S12] |

### L006 - Pieterskerk

| Field | Value |
|---|---|
| Address | **Kloksteeg 16, 2311 SL Leiden. VERIFIED** [S11] |
| Hours | **Tuesday-Sunday 11:00-18:00; closed 25 December and 1 January.** Events can close parts or the whole monument; operator says call ahead. **VERIFIED** [S11] |
| Admission | Adults and ages 12+: **EUR 6**; under 12 free; Museumkaart currently EUR 3 pending audit; ICOM/ICOMOS free. **VERIFIED 2026-09-17** [S11] |
| Wheelchair access | Accessible entrance, accessible toilet, ramp/lift platform to choir. The 17th-century Kerkmeesterskamer has three steps and is not wheelchair accessible. Assistance/guide dogs allowed on lead. **VERIFIED** [S11] |
| Parking | Garenmarkt or operator-recommended Haagweg P&R with shuttle. [S11] |
| Public transport | `Breestraat`, about 165-235 m screening distance. Operator says buses stop on Breestraat and it is then about a two-minute walk. **VERIFIED route description** [S11] |
| Visit duration | **30-45 minutes, PLANNING ESTIMATE** for self-guided visit; current weekend walk-in tour is one hour. [S11] |
| Best time | Shortly after 11:00 on a weekday, after checking the event calendar. Avoid assuming normal access during concerts/private events. |
| Photography | General visitor rule not stated on practical page. Event house rules ban image/audio recording, and press/commercial photography requires advance permission via `info@pieterskerk.com`. **RECHECK at entry for an ordinary museum visit.** [S12][S13] |

### L007 - Pilgrims' quarter / William Brewstersteeg

| Field | Value |
|---|---|
| Address | **William Brewstersteeg 1, 2311 NE Leiden** as the public-space anchor. **VERIFIED** [S14] |
| Hours | Public street/alley, always accessible; the adjacent building is in private use and is not a promised interior. |
| Admission | Free. |
| Wheelchair access | Street level, but it is a narrow historic alley; no interior access is included. |
| Parking | Garenmarkt. [S01][S02] |
| Public transport | `Breestraat`, roughly 105-190 m screening distance; confirm live route. |
| Visit duration | **10-15 minutes, PLANNING ESTIMATE.** |
| Best time | Morning or late afternoon to reduce through-footfall; respect the current childcare/private uses. |
| Photography | Public-space exterior only. Do not photograph children or through windows; obtain permission for identifiable people or any private interior. |

### L008 - Jean Pesijnhofje

| Field | Value |
|---|---|
| Address | **Kloksteeg 21, 2311 SK Leiden. VERIFIED** [S15] |
| Hours | No authoritative public visiting hours found. It remains an inhabited hofje. **RECHECK; do not promise an open door.** [S15] |
| Admission | No visitor fee published; access is not a commercial attraction. |
| Wheelchair access | Product experience is **gate-only**: view from the entrance, keep quiet, do not proceed into the residential courtyard. Threshold/door status varies. |
| Parking | Garenmarkt. [S01][S02] |
| Public transport | `Breestraat`, roughly 230-275 m screening distance; confirm live route. |
| Visit duration | **5-8 minutes, PLANNING ESTIMATE**, with no group dwell time. |
| Best time | Daylight outside meal/early-rest hours; groups should not be routed here. The foundation must be consulted before launch about visitor volume. |
| Photography | Photograph the gate/exterior only. Do not photograph residents, house interiors, names or private activity. Courtyard production requires explicit foundation permission. |

### L009 - Buskruitramp / Van der Werfpark

| Field | Value |
|---|---|
| Address | **Van der Werfpark / Kruitschip, 2311 RS Leiden**; use the memorial/park edge as the visitor anchor, not the unrelated Van der Werffstraat. **VERIFIED** [S16] |
| Hours | Visit Leiden lists the park open every day. **VERIFIED** [S16] |
| Admission | Free. |
| Wheelchair access | Street-level park paths; actual temporary obstructions/weather conditions need live checking. |
| Parking | Garenmarkt. [S01][S02] |
| Public transport | `Breestraat`, about 170-185 m screening distance; `Korevaarstraat` is another nearby option. Confirm live route. |
| Visit duration | **15-20 minutes, PLANNING ESTIMATE.** |
| Best time | Morning for lower park use and a clear sightline to the memorial marker across the water. Check the city event calendar; the park hosts events. |
| Photography | Public park photography. Avoid staging tragedy-themed content around uninvolved park users; commercial equipment/events require municipal permission. |

### L010 - Hortus botanicus Leiden

| Field | Value |
|---|---|
| Address | **Rapenburg 73, 2311 GJ Leiden. VERIFIED** [S17] |
| Hours | **21 March-20 September daily 09:00-18:00; 21 September-20 March daily 10:00-17:00. Closed 3 October and 25 December-1 January. VERIFIED** [S17] |
| Admission | Adults EUR 14 gate / EUR 13.50 online; ages 0-3 free, 4-18 EUR 6; Museumkaart/ICOM free; other concessions listed by operator. Card-only at ticket desk/shop. **VERIFIED 2026-09-17** [S17] |
| Wheelchair access | Large parts accessible; free wheelchairs and accessible toilet. Tropical Terrace, Tropical Greenhouse walkway, Victoria greenhouse, Winter Garden walkway and some soft paths are not wheelchair accessible. Companion free when visitor cannot move independently. **VERIFIED** [S17] |
| Parking | Operator recommends **Parkeerterrein Haagweg**, about ten minutes' walk, with free shuttle. **VERIFIED** [S17] |
| Public transport | Operator directs visitors to NS/9292 and says Leiden Centraal is about a 15-minute walk. Nearest stop screening result: `Paterstraat` (about 255-290 m), but **verify a suitable live bus route before displaying it**. [S17] |
| Visit duration | **About two hours. VERIFIED operator estimate** [S17] |
| Best time | Operator identifies weekdays outside holidays and **10:00-11:00 or 16:00-17:00** as relatively quiet. **VERIFIED** [S17] |
| Photography | Personal photography is allowed in the Japanese garden if visitors/plants are not disturbed; professional shoots have separate rules. Apply that cautious rule site-wide and book commercial production in advance. [S18] |

### L011 - Weddesteeg / Rembrandt birthplace marker

| Field | Value |
|---|---|
| Address | **Rembrandtpark / Weddesteeg, 2311 WX Leiden**; the former birthplace is around Weddesteeg 27, but the building no longer exists. **VERIFIED** [S19][S20] |
| Hours | Rembrandtpark is listed open every day. **VERIFIED** [S20] |
| Admission | Free. |
| Wheelchair access | Street-level public park/marker; inspect live path works and surfaces. |
| Parking | **Morspoortgarage** is the closest operating municipal garage in the location screening. [S02] |
| Public transport | `Noordeinde`, roughly 60-95 m screening distance; confirm live route. |
| Visit duration | **10-15 minutes, PLANNING ESTIMATE.** |
| Best time | Morning or later afternoon for fewer passers-by around the compact marker/mural area. |
| Photography | Public-space exterior. Do not imply a surviving birth house in framing/caption. Commercial set-up: check municipal rules. |

### L012 - Leidens Ontzet at De Waag

| Field | Value |
|---|---|
| Address | **De Waag, Aalmarkt 21, 2311 EC Leiden. VERIFIED** [S21] |
| Hours | Historical stop is the public exterior and always viewable. De Waag's interior is a restaurant/event venue, not a guaranteed heritage interior. **RECHECK venue access.** On **3 October 2026, Haring en Wittebrood is scheduled 07:30-09:30** after prior registration. [S21][S22] |
| Admission | Exterior free. Festival participation/registration rules are event-specific; do not present the private restaurant as free heritage access. |
| Wheelchair access | Level public square/market area; 3 October crowds and barriers materially alter access. Interior accessibility not verified. |
| Parking | Garenmarkt, but it has timed 3 October closures; on the festival date use current municipal traffic advice. [S02] |
| Public transport | `Breestraat`, roughly 50-65 m screening distance; routes are disrupted during major events, so confirm live. |
| Visit duration | Ordinary day **10-15 minutes, estimate**; festival participation is event-driven. |
| Best time | Ordinary visit: morning. On 3 October this is not a quiet stop; present a dedicated date-aware route and crowd/access notice. |
| Photography | Exterior public-space photography. During the distribution, respect participant privacy and organiser/media rules; commercial coverage requires organiser/venue coordination. |

### L013 - Museum Het Leids Wevershuis

| Field | Value |
|---|---|
| Address | **Middelstegracht 143, 2312 TV Leiden. VERIFIED** [S23] |
| Hours | **Tuesday-Sunday 13:00-16:00; closed Monday, both Christmas days and New Year's Day. VERIFIED** [S23] |
| Admission | Free; voluntary contribution welcome. No PIN. **VERIFIED** [S23] |
| Wheelchair access | Poor: narrow hallway and high thresholds. Only a narrow wheelchair with a companion can visit the ground floor. **VERIFIED; retain this precise wording** [S23] |
| Parking | Do **not** follow the museum's old Haarlemmerstraat instruction: that garage is closed to entering traffic. Nearest verified public short parking is `Waardkerkplein` (max two hours); use an operating centre garage for longer stays. **RECHECK immediately before release.** [S02][S03][S24] |
| Public transport | Official museum route content is inconsistent/outdated on bus numbers. Location screening gives `Hooigracht` at about 80 m; link to live 9292 rather than publishing a line number. [S24] |
| Visit duration | **30-45 minutes, PLANNING ESTIMATE**; allow more time for a live weaving/spinning demonstration. |
| Best time | Shortly after 13:00 Tuesday-Friday; weekend/demonstration crowd levels vary. The three-hour window makes this an afternoon-only route stop. |
| Photography | No current public policy found. **Ask the volunteer before interior photography**, especially the hallway wall, residents' records and temporary art. Commercial shoot requires prior museum permission. |

### L014 - Cleveringa / Academiegebouw

| Field | Value |
|---|---|
| Address | **Rapenburg 73, 2311 GJ Leiden. VERIFIED** [S25] |
| Hours | Exterior always viewable. No current general public opening schedule found. The cited university tour was **21 July-8 August 2025 only** and must not be presented as recurring. **RECHECK for a new dated event.** [S25] |
| Admission | Exterior free. The 2025 summer tour cost EUR 4.50, but that is expired and **must not be used as a current price**. [S25] |
| Wheelchair access | Exterior approach is available; the expired 2025 tour was explicitly unsuitable for people with physical disabilities because of narrow spaces/many stairs. A future event requires fresh accessibility data. [S25] |
| Parking | Haagweg is a practical nearby option, or Garenmarkt; verify event-day access. |
| Public transport | Nearest stop screening result `Paterstraat` at about 255-290 m; the Hortus at the same address directs visitors to live NS/9292 and notes a 15-minute walk from Leiden Centraal. [S17] |
| Visit duration | Exterior **10-15 minutes, PLANNING ESTIMATE**; a future booked tour sets its own duration. |
| Best time | Weekday outside graduation/ceremonial arrivals for a quieter exterior. Never obstruct university functions or grieving/celebrating groups. |
| Photography | Exterior public-space photography. Interior access and photography only under the rules of a confirmed event; request permission. DEC-011/DEC-016 still forbid AI reconstruction imagery for this story regardless of photography access. |

## Release blockers and corrections

1. **L001 gate hours:** free access is sourced; daily opening/closing times are not. The app
   must say “check before you go” until the municipality confirms a schedule.
2. **L005 price and permanence:** the current Gravensteen tour now confirms weekends, 15:00,
   one hour, cells and gallery, but accessible official content did not expose a price and the
   arrangement is temporary.
3. **L008 resident consent/volume:** no public hours and no permission for product-driven group
   traffic. Gate-only behaviour remains mandatory.
4. **L012 date-aware mode:** 3 October changes crowds, transport and parking. A static route is
   unsafe and misses the actual tradition.
5. **L013 directions:** the museum still directs drivers to Haarlemmerstraat, while the
   municipality says that garage is closed to entering traffic. Product copy must follow the
   current municipality notice.
6. **L014 old tour:** remove any claim that Monday/Tuesday tours are regularly available. The
   source described a fixed 2025 summer window.
7. **Photography unknowns:** L005, L006 ordinary visits, L013 and any L014 interior require
   direct operator confirmation before a commercial photo shoot.

## Sources

All web sources checked 2026-09-17 unless stated otherwise.

- **S01** Gemeente Leiden, [Reserveer en parkeer in de parkeergarage](https://gemeente.leiden.nl/inwoners-en-ondernemers/parkeren/parkeerlocaties/reserveer-en-parkeer-in-de-parkeergarage/)
- **S02** Gemeente Leiden, [Gemeentelijke parkeergarages](https://gemeente.leiden.nl/inwoners-en-ondernemers/parkeren/parkeerlocaties/gemeentelijke-parkeergarages/)
- **S03** Gemeente Leiden, [Nieuwe straatparkeren centrum](https://gemeente.leiden.nl/projecten/nieuwe-straatparkeren-centrum/)
- **S04** Visit Leiden, [De Burcht](https://www.visitleiden.nl/nl/locaties/2380897422/de-burcht)
- **S05** Open Monumentendagen Leiden, [De Burcht](https://www.omdleiden.nl/omd-monument/23-de-burcht/)
- **S06** Gemeente Leiden, [Restauratie Burchtpoort van start](https://gemeente.leiden.nl/nieuws-en-publicaties/nieuws/restauratie-burchtpoort-van-start/)
- **S07** Visit Leiden, [De Leidse markt](https://www.visitleiden.nl/nl/doen/winkelen/de-leidse-markt)
- **S08** Visit Leiden, [Koornbrug](https://www.visitleiden.nl/nl/locaties/2666699515/koornbrug)
- **S09** Geschiedenis van Leiden, [De Blauwe Steen in de Breestraat](https://www.geschiedenisvanleiden.nl/plaatsen-van-herinnering/de-blauwe-steen-in-de-breestraat/)
- **S10** Pieterskerk Leiden, [Ontdek het Gravensteen](https://pieterskerk.com/gravensteen/)
- **S11** Pieterskerk Leiden, [Praktische informatie](https://pieterskerk.com/uw-bezoek/openingstijden-prijzen-route/)
- **S12** Pieterskerk Leiden, [Nieuws en pers](https://pieterskerk.com/nieuws/)
- **S13** Pieterskerk Leiden, [Huisregels (PDF)](https://pieterskerk.com/app/uploads/2021/12/Pieterskerk-Leiden-Huisregels.pdf)
- **S14** Visit Leiden, [William Brewstersteeg](https://www.visitleiden.nl/nl/locaties/1921009046/william-brewstersteeg)
- **S15** Jean Pesijnhofje, [official site](https://www.jeanpesynhof.nl/)
- **S16** Visit Leiden, [Van der Werfpark](https://www.visitleiden.nl/nl/locaties/3278528638/van-der-werfpark)
- **S17** Hortus botanicus Leiden, [Bezoek info](https://hortusleiden.nl/bezoek-info)
- **S18** Hortus botanicus Leiden, [Japanse tuin visitor FAQ](https://hortusleiden.nl/zien-en-doen/ontdek-de-botanische-tuin/tuinen/japanse-tuin)
- **S19** Visit Leiden, [Weddesteeg](https://www.visitleiden.nl/nl/locaties/2409467302/weddesteeg-geboortehuis-rembrandt)
- **S20** Visit Leiden, [Rembrandtpark](https://www.visitleiden.nl/nl/locaties/1706027937/rembrandtpark)
- **S21** Visit Leiden, [De Leidse Waag](https://www.visitleiden.nl/nl/locaties/3402150775/waag-leiden)
- **S22** Visit Leiden, [Uitreiking Haring en Wittebrood 2026](https://www.visitleiden.nl/nl/agenda/234033342/uitreiking-haring-en-wittebrood-1)
- **S23** Museum Het Leids Wevershuis, [Openingstijden and accessibility](https://wevershuis.nl/openingstijden/)
- **S24** Museum Het Leids Wevershuis, [Bereikbaarheid](https://wevershuis.nl/bereikbaarheid/)
- **S25** Universiteit Leiden, [Summer tours 2025](https://www.universiteitleiden.nl/en/events/2025/07/summer-tours)
- **S26** PDOK coordinate evidence and method, `research/eng-geo-001-mvp-coordinates.json` and `research/eng-geo-001-method.md` on PR #6
- **S27** OpenStreetMap contributors, public-transport platform and parking screening, queried through Overpass API on 2026-09-17; always pair with live [9292](https://9292.nl/) before travel
