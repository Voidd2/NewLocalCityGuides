# WIREFRAME INVENTORY — v1

Task ID: `FND-004`
Source artefact: `docs/ux/wireframe-website-v1.png` (supplied by the user; moved here from repo root)
Status: EXTRACTED — awaiting user confirmation that this reading is correct
Authority: master file `§19 REQUIRED PAGE INVENTORY` defines the `W##` codes. This file
maps the user's actual wireframe onto those codes and records what the wireframe adds,
changes, or leaves open.

---

## 1. WHAT THE WIREFRAME IS

A single-sheet mobile wireframe for Leiden, in Dutch, organised into 7 numbered blocks.
It is notably more decided than master §19 — it already commits to a visual identity, a
bottom tab bar, and a specific location-page flow. Treat it as the **design intent**, and
master §19 as the **completeness checklist**.

Header of the sheet carries the brand:
- Wordmark: **YourLocalCityGuide** (serif), with a circular lighthouse/tower + water mark.
- Tagline: **REAL PLACES. REAL STORIES.**
- City lockup: **LEIDEN — *More than a city. A story.***
- Right-hand triad: **DISCOVER · EXPLORE · EXPERIENCE**
- Closing panel: **SAME STREETS. A RICHER STORY. — *Leiden***

This is consistent with master §1 "Stand where history happened. See the story come alive."

---

## 2. SCREEN-BY-SCREEN MAPPING

### Block 1 — ONBOARDING (eenmalig) · "Korte, snelle onboarding. Geen account verplicht."

| Wireframe | Master code | Content shown | Notes |
|---|---|---|---|
| 1.1 Splash | `W01` | Full-bleed canal photo, wordmark, "LEIDEN", "Discover the past around you.", `Get started →` | One primary action only. Matches master §20. |
| 1.2 Taalkeuze | `W02` | "Choose your language" — Nederlands, English, Deutsch, Français + `Continue` | Wireframe shows **4** languages; master §30 locks **NL + EN** first. Open question Q4 on the board. |
| 1.3 Locatie toegang | `W03` | "Use your location?" · "Find the best stories, hotspots and routes near you." · `Allow location` / **`Not now`** | The `Not now` escape is present. Master §3 requires the site to fully work without GPS — `W70` must therefore be real, not a dead end. |
| 1.4 Intro | `W04` | "Step into the past" · "Walk the same streets, see how they looked, hear the stories and discover Leiden like never before." · 4-dot pager · `Next` | 4 dots implies a 4-step carousel; only one step is drawn. **Gap — see §4.** |

### Block 2 — HOMEPAGE · "Kies hoe je de stad wilt ontdekken."

| Wireframe | Master code | Content shown | Notes |
|---|---|---|---|
| 2.1 Home | `W10` | Hero image, wordmark, "LEIDEN", "What would you like to do?" then three equal cards: **Explore near me** (*See what's around you*), **Choose a route** (*Follow a story*), **Open map** (*Explore freely*) | Master §38 asks "primary homepage CTA?" — the wireframe answers "all three, equally". Board Q3 proposes making *Explore near me* visually primary with a graceful GPS-denied variant. |

**Bottom tab bar** (appears on 2.1, 3.1, 3.2, 6.x, 7.1): `Home · Map · Routes · Saved · More`.
This is a global navigation decision not present in master §19 — recorded here as new.

### Block 3 — KAART & ONTDEKKEN · "Bekijk locaties op de kaart of in een lijst."

| Wireframe | Master code | Content shown | Notes |
|---|---|---|---|
| 3.1 Kaart | `W12` | Map with pins, filter chips **All · History · Art · Food · Nature**, and a bottom preview card: *Pieterskerk · 450 m · "Iconic church with a rich history"* with a `›` affordance | Filter chips include **Food** and **Nature** — these are *not* historical categories. They point at master §31 (local business, later). Flag: keep commercial and historical content visually distinct. |
| 3.2 Lijst | `W13` + `W14` + `W15` | Search field "Search locations…", tabs **All · Nearby · Popular**, list rows with thumbnail + name + distance | Combines list, search and filters into one screen. Master splits them (`W13/W14/W15`); the wireframe's merge is simpler and mobile-correct. Adopt the merge. |

### Block 4 — LOCATIE ERVARING · "Alles op één pagina: video, verhaal, en praktische info."

This is the heart of the product. The wireframe puts `W20`–`W28` on **one scrolling page**.

| Wireframe | Master code | Content shown | Notes |
|---|---|---|---|
| 4.1 Locatie starten | `W20` | Full-bleed hero, back + save (♡), overlay card: *Pieterskerk* / "Leiden's iconic church" / chips `450 m` `History` `30–60 min` / `Start de ervaring →` | Duration and distance are surfaced before commitment — good, matches master §18 "How long will it take?". |
| 4.2 Video ervaring | `W21` | Vertical video, label *Leiden, 1650*, play button, scrubber `0:00 / 1:28`, caption "Step into 1650 — The Pieterskerk and its surroundings come to life." | ~1:28 runtime vs. master §10 Layer 2 "20–45 seconds". **Conflict — see §4.** Note: no AI-reconstruction disclosure label is drawn; master §15 requires one on-screen. |
| 4.3 Na de video (verhaal) | `W22` + `W23` | Title, ~100-word story, pull-quote, `Lees verder ↓`, then archival image strip | Cleanly implements master §10 Layer 3 → Layer 4. |
| 4.4 Extra media (optioneel) | `W26` + `W29` | Tabs **Then & Now** / **In de buurt**; a before/after slider with handle, labelled `ca. 1650` ↔ `Vandaeg` | Master §13 satisfied. Note the label typo `Vandaeg` → should be `Vandaag`. |
| 4.5 Praktische info | `W28` | Adres (*Kloksteeg 16, Leiden*), Openingstijden (*Ma–Zo 09:00–17:00*), Duur ervaring (*± 30–60 minuten*), Toegankelijkheid (*Grotendeels toegankelijk*), `Toon op kaart` | Accessibility is a first-class field. Good — master §12 requires accessibility notes. |

### Block 5 — ROUTES · "Themaroutes door de stad."

| Wireframe | Master code | Content shown | Notes |
|---|---|---|---|
| 5.1 Route overzicht | `W40` | Cards with thumbnail, name, duration, stop count, `Populair` badge. Listed: **Leiden Essentials** (1,5 uur · 8 locaties), **Rembrandt's Leiden** (1,5 u · 6), **Leidens Ontzet** (± 2 u · 10), **Wetenschap & Ontdekkingen** (1,5 u · 7), **Verborgen Verhalen** (1,5 u · 8) | These five route themes are **illustrative only**. Master §17 states final routes must follow Phase 1 discovery. They do, however, align well with the theme clusters that emerged in `LDN-DISC-001` — recorded as a useful signal, not a decision. |

### Block 6 — ROUTE DETAIL & NAVIGATIE

| Wireframe | Master code | Content shown | Notes |
|---|---|---|---|
| 6.1 Route detail | `W41` | *Leiden Essentials · 8 locaties · ± 1,5 uur*, description "De perfecte introductie tot Leiden. Van middeleeuwse vesting tot wetenschapsstad.", numbered stop list (Burcht van Leiden, Pieterskerk, De Waag, Vismarkt, Stadhuis…), `Start route →` | The description frames the route as a **narrative arc**, which is what master §17 demands ("routes are stories, not stop lists"). |
| 6.2 Route navigatie | `W43` + `W44` | Map with numbered path, "Volgende stop — **De Waag**, 350 m · 5 min", `Start navigatie` | `W45` route progress and `W46` completion are **not drawn**. See §4. |

### Block 7 — EXTRA PAGINA'S

| Wireframe | Master code | Content shown | Notes |
|---|---|---|---|
| 7.1 Favorieten | `W50` + `W51` | Tabs **Locaties / Routes**, saved rows | Maps to Saved tab. |
| 7.2 Over Leiden | `W60` + `W61` | "Een stad vol geschiedenis, wetenschap en verhalen…" + accordions: *Geschiedenis in het kort*, *Praktische tips*, *Veelgestelde vragen* | |
| 7.3 Contact / Over ons | — | Onze missie, Contact, Samenwerken, Privacy, Gebruiksvoorwaarden + social icons (Instagram, Facebook, YouTube, web) | New page, no master code. Proposed code: **`W63` — About / legal / contact**. |

---

## 3. VISUAL IDENTITY READ FROM THE WIREFRAME

Recorded so Codex does not invent a second design language. **Not yet user-approved — board Q5.**

| Token | Reading | Use |
|---|---|---|
| Ink / primary dark | Deep navy-charcoal | Headers, wordmark, primary text |
| Sand / accent | Warm tan–taupe | Primary buttons (`Allow location`, `Continue`, `Start de ervaring`, `Lees verder`, `Toon op kaart`) |
| Surface | Off-white / warm paper | Cards, sheets, list backgrounds |
| Photography | Warm, golden-hour, canal- and brick-heavy | Hero images |
| Type | Serif display for wordmark, city names and headings; humanist sans for UI and body | — |
| Shape | Generously rounded cards, full-bleed hero images, floating bottom sheets | — |
| Chrome | iOS-style status bar, bottom tab bar, large tap targets | Matches master §20 |

---

## 4. GAPS AND CONFLICTS — THINGS THE WIREFRAME DOES NOT ANSWER

These are the reason this file exists. None of them should be silently guessed.

**Conflicts with the master file**
1. **Video length.** Wireframe 4.2 shows `1:28`. Master §10 Layer 2 specifies a 20–45 second
   experience. Either the master's Layer 2 becomes "45–90s", or the wireframe video is a
   longer optional cut sitting on top of a short hook. → needs a decision.
2. **AI disclosure missing.** Master §15 mandates an on-screen
   "AI historical reconstruction based on historical and archival sources." label. The video
   screen has no such element. → must be added to the design; non-negotiable per master §3.
3. **Languages.** 4 in the wireframe, 2 locked in master §30. → board Q4.
4. **`Food` / `Nature` map filters.** Master §31 defers local business content and requires
   commercial content to be clearly distinguished from historical content. → either drop
   these chips from MVP or define their visual separation now.

**Missing screens (in master §19, absent from the wireframe)**
- `W11` Explore near me — the home CTA exists but the destination screen is not drawn.
- `W27` Timeline — master §10 Layer 4 and §8 `C05` require 3–8 milestones per location.
- `W25` **Look Around You** — this is described in master §12 as *"central"* to the product,
  and it is **entirely absent from the wireframe**. This is the single most important gap.
- `W30` Location completion / continue.
- `W42` Start route, `W45` Route progress, `W46` Route completion.
- `W62` How it works.
- Utility states: `W71` offline, `W72` video failed, `W73` empty search, `W74` 404,
  `W75` language fallback, `W76` accessibility options.
- `W70` No-GPS state — implied by `Not now` in 1.3 but never drawn, despite being a locked
  requirement (master §3).

**Copy fixes**
- `Vandaeg` → `Vandaag` (4.4).
- `Start de ervaring` / `Start de ervring` — the hero card in 4.1 reads `Start de evraring`;
  correct Dutch is **`Start de ervaring`**.

---

## 5. RECOMMENDED NEXT UX WORK

Not started — these belong to Role E and should be scheduled after the user reacts to §4.

| ID | Task | Why |
|---|---|---|
| `UX-W25` | Design the **Look Around You** screen/section | Master §12 calls it central; it is the product's differentiator and it is missing |
| `UX-W70` | Design the full no-GPS experience | Locked requirement, currently only an escape hatch |
| `UX-W27` | Design the timeline component | Required output of `C05` for every location |
| `UX-W45` | Route progress + completion | Needed before any route can actually be walked |
| `UX-DISC-01` | Add the AI-reconstruction disclosure to the video component | Master §15, mandatory |

---

## 6. WHAT CODEX MAY BUILD FROM THIS FILE

Safe to build now (shell only, fake content):
`W01`, `W02`, `W03`, `W04`, `W10`, `W12`, `W13/14/15`, the bottom tab bar, `W50`, `W60`, `W63`.

Do **not** build yet: `W20`–`W30` with real copy, any route, any video — the content does
not exist and the locations are not selected (`LDN-MVP-001` is `BLOCKED`).
