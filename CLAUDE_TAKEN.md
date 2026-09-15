# CLAUDE TAKEN — YourLocalCityGuide

> Dit bestand definieert wat Claude doet en in welke volgorde.
> Claude leest altijd eerst YOURLOCALCITYGUIDE_MASTER_V1.md en dit bestand voor hij iets doet.

---

## ROL VAN CLAUDE IN DIT PROJECT

Claude is de **hoofd-engineer en projectleider**. Claude:
- schrijft alle code
- beheert git (branches, commits, merges)
- neemt architectuurbeslissingen (na goedkeuring gebruiker)
- beoordeelt ChatGPT output voordat het in de codebase komt
- houdt de master file actueel
- stelt de gebruiker gerichte vragen als iets onduidelijk is

---

## ACTIEVE TAKEN VOOR CLAUDE

### FASE 0 — Wachten op research
**Status: GROTENDEELS AFGEROND (code vooruitgelopen op formele goedkeuring, zie opmerking hieronder)**

- [x] Repository structuur opzetten in NewLocalCityGuides
- [x] `content/` mapstructuur aanmaken (YAML schema ontwerpen)
- [x] `src/domain/` (hier: `domain/types.ts`) types definiëren (Location, Route, Stop, etc.)
- [ ] Tech stack besluit DEC-009 met gebruiker doorspreken en formeel goedkeuren of aanpassen
      — **let op:** DEC-009 staat nog op `PROPOSED — USER APPROVAL REQUIRED`, maar de
      implementatie (Next.js, MapLibre, Zod, next-intl) volgt de voorgestelde stack al
      volledig. Dit bestand liep dus achter op de werkelijke voortgang; nu bijgewerkt.
      Formele gebruikersgoedkeuring van DEC-009 is nog niet vastgelegd.

---

### FASE 1 — Applicatie-fundament
**Status: GROTENDEELS AFGEROND**

- [x] Next.js project scaffolden in NewLocalCityGuides
- [x] MapLibre integreren (achter adapter — `features/map/`)
- [x] Zod schema's schrijven voor content validatie (`content/schema/`)
- [x] next-intl opzetten (NL + EN routes)
- [x] Basislay-out: navbar, footer, stad-pagina
- [x] Dark wireframe-faithful redesign (amber accent, `#0F0E0D` bg) doorgevoerd over
      alle pagina's — was eerst alleen toegepast op home/stad/route/locatie-detail,
      nu ook op cities-overzicht, prijzen, over-ons, account, inloggen en de tour-flow
- [x] Homepage "early access" nieuwsbrief-CTA gekoppeld aan `/api/newsletter`
      (stond los, deed voorheen niets bij submit)

---

### FASE 2 — Na LDN-DISC-001 (ChatGPT research klaar)
**Status: GEBLOKKEERD op ChatGPT output**

ChatGPT/Codex heeft LDN-DISC-001 nog niet als leverbaar in `research/` gezet
(map bevat alleen `.gitkeep`). Er staan wel al 5 handmatig/eerder aangeleverde
Leiden-locaties in `content/cities/leiden/locations/` met bronvermelding
(Wikipedia, Erfgoed Leiden) — dit is geen vervanging van de citywide discovery.

- [ ] ChatGPT locaties beoordelen en valideren (wacht op LDN-DISC-001 in `research/`)
- [x] Bestaande kandidaten omgezet naar gevalideerde YAML content records (5 stuks)
- [x] Kaart tonen met locaties (MapLibre, `features/map/`)
- [x] Route-pagina bouwen (`cities/leiden/routes`)

---

### BEKENDE OPEN PUNTEN (niet-blokkerend, voor volgende sessie)

- `app/api/newsletter/route.ts` schrijft naar een lokaal JSON-bestand via `fs`.
  Dat werkt in `next dev`/`next start`, maar Vercel's serverless functions hebben
  een read-only filesystem buiten `/tmp` — in productie op Vercel (de DEC-009
  hosting-keuze) gaat dit vermoedelijk stuk of verliest data tussen deploys.
  Vervangen door een echte opslag (bv. een database of e-maillijst-provider) is
  een vendor/architectuurkeuze en dus expliciet iets voor gebruikersgoedkeuring.
- Geen PWA-manifest/iconen aanwezig (DEC-009 §3 noemt dit als vereist voor de
  eerste implementatie).
- `app/[locale]/cities/[slug]/page.tsx` is voor `slug=leiden` onbereikbare code
  (de statische route `cities/leiden/page.tsx` wint) — nu wel herstijld/becommentarieerd,
  maar op termijn opschoning overwegen.

---

## WERKWIJZE CLAUDE

### Branches
- Eigen werk: `claude/[beschrijving]`
- Nooit direct op main pushen zonder PR
- PR beschrijving altijd in het Nederlands

### Commits
- Duidelijk, in het Engels
- Altijd gesigneerd

### Beslissingen
- Alles wat niet in de master file staat = vraag de gebruiker eerst
- Nooit stilletjes een beslissing nemen over locaties, inhoud of monetisatie

### ChatGPT output verwerken
1. Lees de research
2. Controleer op verzinsels of onverifieerbare claims
3. Pas aan waar nodig
4. Zet om naar gevalideerde YAML records
5. Commit onder Claudes naam

---

## WAT CLAUDE NOOIT DOET

- Nooit een locatie kiezen als "flagship" zonder gebruikersgoedkeuring
- Nooit historische feiten verzinnen
- Nooit ChatGPT output blindelings accepteren
- Nooit de master file overschrijven zonder changelog entry
- Nooit iets deployen naar productie zonder expliciete goedkeuring

---

## HUIDIGE PROJECT STATUS

| Item | Status |
|---|---|
| Repository | NewLocalCityGuides — klaar |
| Master plan | v1.0 aanwezig |
| Tech stack (DEC-009) | Geïmplementeerd, formele gebruikersgoedkeuring nog niet vastgelegd |
| Locatie discovery (LDN-DISC-001) | Nog niet geleverd in `research/` — blokkeert Fase 2 |
| Code | Next.js app functioneel: home, steden, Leiden stad/routes/locaties, GPS-tour, account/auth/pricing/about (allen nu in dark-theme huisstijl) |
| Lint/typecheck/build | Groen (`npm run lint`, `tsc --noEmit`, `next build`) |
| Deployment | Nog niet bepaald — zie open punt over `/api/newsletter` + Vercel read-only fs |

---

*Bijgewerkt door: Claude*
*Datum: 2026-09-15*
*Versie: 1.1*
