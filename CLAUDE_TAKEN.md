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

### FASE 0 — Wachten op research (NU)
**Status: ACTIEF**

ChatGPT is bezig met LDN-DISC-001 (locatie discovery).
Claude wacht hierop voordat code begint.

Claude kan alvast doen:
- [ ] Tech stack besluit DEC-009 met gebruiker doorspreken en goedkeuren of aanpassen
- [ ] Repository structuur opzetten in NewLocalCityGuides
- [ ] `content/` mapstructuur aanmaken (YAML schema ontwerpen)
- [ ] `src/domain/` types definiëren (Location, Route, Stop, etc.)

---

### FASE 1 — Na goedkeuring tech stack (DEC-009)
**Status: GEBLOKKEERD op gebruikersgoedkeuring**

- [ ] Next.js project scaffolden in NewLocalCityGuides
- [ ] MapLibre integreren (achter adapter)
- [ ] Zod schema's schrijven voor content validatie
- [ ] next-intl opzetten (NL + EN routes)
- [ ] Basislay-out: navbar, footer, stad-pagina

---

### FASE 2 — Na LDN-DISC-001 (ChatGPT research klaar)
**Status: GEBLOKKEERD op ChatGPT output**

- [ ] ChatGPT locaties beoordelen en valideren
- [ ] Goede kandidaten omzetten naar YAML content records
- [ ] Kaart tonen met kandidaat-locaties
- [ ] Route-pagina bouwen

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
| Tech stack | PROPOSED — nog niet goedgekeurd |
| Locatie discovery | Bezig bij ChatGPT |
| Code | Nog niet gestart |
| Deployment | Nog niet bepaald |

---

*Bijgewerkt door: Claude*
*Datum: 2026-09-13*
*Versie: 1.0*
