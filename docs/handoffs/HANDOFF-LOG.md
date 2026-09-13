# HANDOFF LOG

Append-only. Newest entry at the top. Format from master §25.
No handoff = task incomplete.

---

## HANDOFF 001

**Agent:** Claude (Opus)
**Role:** A — City Discovery Researcher (+ E, partial, for the wireframe reading)
**Date:** 2026-09-13
**Task IDs:** `FND-003`, `FND-004`, `LDN-DISC-001`, `LDN-SRC-001`
**Status:** DONE
**Branch:** `claude/affectionate-rubin-t48oom`

### Completed
- Built the repository structure from master §22 (`docs/`, `content/leiden/`, `public/`).
- Created `docs/TASKBOARD.md` — the operational task board the project was missing. It holds
  the critical path, per-agent task tables, statuses, the open questions for the user, and a
  written brief to Codex.
- Created `docs/handoffs/HANDOFF-LOG.md` (this file).
- `FND-004` — read the user's wireframe and mapped every drawn screen onto the `W##` codes in
  master §19; recorded the visual identity; listed conflicts, gaps and copy errors.
- `LDN-DISC-001` — delivered the Leiden Candidate Location Register: **52 candidates** across
  7 thematic clusters, within the 30–60 target.
- `LDN-SRC-001` — delivered the source-lead register with 19 institutions ranked by master §6 level.

### Files changed
- `YOURLOCALCITYGUIDE_MASTER_V1.md` — status, phase checkboxes, task statuses, decisions, changelog
- `docs/TASKBOARD.md` — new
- `docs/ux/wireframe-inventory.md` — new
- `docs/ux/wireframe-website-v1.png` — moved from repo root (`git mv`)
- `content/leiden/candidates/leiden-candidate-register.md` — new
- `content/leiden/sources/leiden-source-leads.md` — new
- `docs/handoffs/HANDOFF-LOG.md` — new
- `README.md` — new

### Facts added
52 candidate entries, each with era, theme, event/person/process, what physically happened,
present-day visibility, accessibility, source leads, estimated story/video strength, route
value, overlap and a confidence flag. Cross-checked this pass: the Burcht mound's 9th–10th c.
timber and archaeological-monument status; the relief of Leiden on 3 October 1574 and the
inundation under Boisot; the 1575 university founding; the Hortus in 1590 with Clusius from
1593 and Boerhaave 1709–1730; Kamerlingh Onnes' 1908 helium and 1911 superconductivity; the
Laecken-Halle decision of 8 May 1639 and opening 8 August 1641; the 1807 gunpowder disaster
of 12 January with 151 dead and Louis Napoleon's response; the Pilgrims 1609–1620 and John
Robinson's 1625 burial; Leiden's ~35 hofjes with St. Annahofje from 1492 and Jean Pesijnhofje
1683/1686; the Meelfabriek 1884–1988; Zijlpoort 1667 by Van der Helm with Verhulst sculpture;
Cleveringa's 1940 protest; the October 1940 and January 1941 anti-Jewish measures.

### Sources added
19 institutions in `content/leiden/sources/leiden-source-leads.md`, ranked Level 1–5 per
master §6. Erfgoed Leiden en Omstreken is identified as the project's primary dependency.

### Decisions made
- Repository structure follows master §22 exactly. (Implementation of an existing decision.)
- The wireframe PNG lives in `docs/ux/` and is the reference artefact for UX work.
- **Coordinates were deliberately not invented.** All 52 read `TBD`; `ENG-GEO-001` resolves them.
- Estimated story/video strengths are explicitly *not* the master §5 Phase 1B scores.
- C047 and C048 (persecution and resistance) are flagged as **unsuitable for AI video
  reconstruction** on ethical grounds, consistent with master §3.
- Proposed two new codes for the user to confirm: page `W63` (About/legal/contact) and task
  `LDN-DISC-002` (second discovery pass for the identified gaps).

### Uncertainty / risks
- Every `LOW` confidence entry (C013 site, C015 viewpoint, C028, C035 address, C044) is a lead
  only and must be verified or dropped.
- Unverified superlatives sit in C020, C026, C040, C044 — source them or delete the word.
- Five strong stories currently have no defensible place to stand (C013, C015, C036, C037, C039).
- The register's seven known gaps are listed in full at the end of the register. The most
  serious are **women's history** (no candidate is about a documented Leiden woman), modern
  Leiden, and the 1944 bombing.
- The wireframe's video screen lacks the AI-reconstruction disclosure that master §15 mandates.

### What must NOT be assumed
- That any location is selected, lead, hero or flagship. None is. `LDN-MVP-001` is `BLOCKED`.
- That Pieterskerk is the lead location because the wireframe uses it as an example, or that
  De Waag is, because master §36 names it — §36 names it as a *warning*.
- That `HIGH` confidence means publication-ready. It means one cross-check passed.
- That the five route names in wireframe 5.1 are the real routes. Master §17: routes follow
  discovery.
- That the 4 languages in wireframe 1.2 override master §30's NL+EN lock.

### Recommended next task
`LDN-VERIFY-001` — resolve every `LOW` confidence entry and every superlative **before**
scoring. Scoring unverified claims produces confident nonsense.
In parallel, Codex takes `FND-002` (lock the tech stack — the project's top blocker) and
`ENG-GEO-001` (geocoding), both of which are unblocked today.

### Master file updated
YES
