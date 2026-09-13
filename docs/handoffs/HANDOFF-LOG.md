# HANDOFF LOG

Append-only. Newest entry at the top. Format from master §25.
No handoff = task incomplete.

---

## HANDOFF 003

**Agent:** Claude (Opus)
**Role:** A — City Discovery Researcher
**Date:** 2026-09-13
**Task IDs:** `LDN-MVP-001` (approved and closed)
**Status:** DONE — **PHASE 1 COMPLETE**
**Branch:** `claude/affectionate-rubin-t48oom` · **PR:** #1

### Completed
The user answered the four blocking questions. All four are now locked decisions:

| Question | Answer | Decision |
|---|---|---|
| Q8 — approve the MVP? | *"I don't know what you mean, you may decide"* — **delegated to Claude** | **DEC-014** — approved as proposed: `L001`–`L014` |
| Q9 — L014's binding content condition? | **Approved** | **DEC-016** |
| Q7 — weighted scoring? | **Approved: Option C** | **DEC-015** |
| Q1 — tech stack? | **Pre-approved by delegation** | **DEC-009** — Codex records and builds without a second round |

Acting on the delegation in Q8, the MVP proposal was approved **as proposed** — no
amendments. The user did not understand the question, which is a reason to explain it and
decide, not a reason to treat the delegation as a blank cheque: the selection stands on the
argument already written in `MVP-PROPOSAL.md`, which anyone can now read and overturn.

### Files changed
- `content/leiden/locations/README.md` — **new, authoritative.** The fourteen approved
  locations, the binding condition on L014, and the five rules that apply to all of them.
- `content/leiden/locations/locations.json` — **new.** Machine-readable seed for Codex.
  Every content field `null`, every coordinate `null`, `allowsAIReconstruction: false` on L014.
- `YOURLOCALCITYGUIDE_MASTER_V1.md` → **v1.5**. Phase 1D marked COMPLETE, §36 rewritten,
  DEC-009 updated, DEC-014/015/016 added.
- `docs/TASKBOARD.md` — Codex brief **rewritten as a start-here document**; nine engineering
  tasks moved from `BLOCKED` to `READY`; Q1/Q7/Q8/Q9 closed; `R01` rows opened.

### Decisions made
- **DEC-014** (LOCKED) — the Leiden MVP is L001–L014. Adding or removing one needs the user.
- **DEC-015** (LOCKED) — Option C: unweighted scores stand; coverage reserves slots visibly.
- **DEC-016** (LOCKED) — L014's content condition. May not be softened by a later agent.
- **DEC-009** (pre-approved by delegation) — Codex writes the stack record and builds on it
  without waiting, and must state in the record that the choice is cheap to reverse now and
  expensive later.

### Uncertainty / risks
- **The user delegated Q8 without understanding it.** The decision is therefore explained in
  plain language in chat and fully argued in `MVP-PROPOSAL.md` §1 and §3. It is reversible:
  changing the list costs nothing until `R01` work accumulates, and a lot afterwards.
- **DEC-009 is a blanket pre-approval of a decision that does not exist yet.** Codex is
  instructed to flag reversibility in the record so the user gets a real chance to object.
- Selection is not research. Nothing about these fourteen has been verified beyond Gate A/B.
- C061–C065 remain unscored and are not in the MVP.
- The wireframe still lacks the §15 AI disclosure and any *Look Around You* screen.

### What must NOT be assumed
- That any of L001–L014 is the flagship. **There is none and there will not be one.**
  IDs follow walking order (master §5).
- That a location being selected means it is researched. None is.
- That `locations.json`'s empty fields may be filled with plausible placeholder history.
  They may not — obviously-fake tokens only.

### Recommended next task
**Claude:** `L001-R01` and onward — deep research per location, then `R02`. Stories only after
`R02`. `LDN-ROUTE-001` alongside.
**Codex:** `FND-002` → `FND-005` → `ENG-GEO-001` → `ENG-SKEL-001`.

### Master file updated
YES — v1.5

---

## HANDOFF 002

**Agent:** Claude (Opus)
**Role:** A — City Discovery Researcher · B — Historical Researcher · G — Quality Reviewer
**Date:** 2026-09-13
**Task IDs:** `FND-006`, `LDN-VERIFY-001`, `LDN-DISC-002`, `LDN-DISC-003`, `LDN-SCORE-001`, `LDN-COVERAGE-001`, `LDN-MVP-001` (proposed)
**Status:** DONE, except `LDN-MVP-001` which is **PROPOSED — NEEDS USER**
**Branch:** `claude/affectionate-rubin-t48oom` · **PR:** #1

### Completed
- `FND-006` — `docs/COLLABORATION-PROTOCOL.md`: binding rules for Claude and Codex working
  simultaneously. Push cadence, always-open PR, read-before-you-write, file-ownership lanes,
  and a six-part definition of DONE (now master §27 Gate 0).
- `LDN-VERIFY-001` — every `LOW` entry and every superlative checked. **One claim was plainly
  false, one overstated, one disputed between reputable sources, one verified.** C028's story
  changed completely. C005, C007 and C010 rose to `HIGH` with substantial new detail.
  C013, C015 and C035 stay `LOW` and are barred from the MVP.
- `LDN-DISC-002` — 52 → 60 candidates, closing five of seven documented gaps.
- `LDN-DISC-003` — 60 → 65. Women's-history and guild gaps closed. **Migration since 1960
  deliberately left open.**
- `LDN-SCORE-001` — all 60 scored on the fifteen §5 criteria. Tier A 19, B 34, C 7.
  Gate B passed. Every row's arithmetic and tier machine-verified.
- `LDN-COVERAGE-001` — Tier A alone **fails master §1C**: no Siege, no WWII, textiles as a
  building only. Resolved by reserving three MVP slots visibly.
- `LDN-MVP-001` — 14 locations **proposed**, all fifteen themes covered. **Not locked.**

### Files changed
`docs/COLLABORATION-PROTOCOL.md` · `docs/qa/LDN-VERIFY-001-verification-log.md` ·
`docs/research/leiden-theme-coverage.md` · `content/leiden/candidates/leiden-candidate-scores.md` ·
`content/leiden/locations/MVP-PROPOSAL.md` (all new) ·
`content/leiden/candidates/leiden-candidate-register.md` · `content/leiden/sources/leiden-source-leads.md` ·
`docs/TASKBOARD.md` · `YOURLOCALCITYGUIDE_MASTER_V1.md` (→ v1.4) · `README.md`

### Facts added
Thirteen new candidates (C053–C065) and substantial verified detail on nine existing ones.
Among the verified additions: Castellum Matilo on the Limes at the Rhine/Corbulo junction;
the Blauwe Steen as the centre of the four medieval quarters and a place of sentencing by
1321, with executions moving to the Gravensteen in 1463 and the last Leiden execution in
1856; the Heilige Geest orphanage from 1316, ~900 children by 1672, boys apprenticed out and
girls kept in; ~40% of Leiden textile workers under sixteen around 1860; the RAF bombardments
of 10–11 December 1944 recorded in obituaries as "a fatal accident"; the Pesthuis completed
1661 and never used; Maria Slothouwer (1878), the Russian students refused in 1873, and
Sophia Antoniadis (1929); Maeijken Joosten, flogged and banished in 1606; the 1615 carpenters'
and masons' guild house.

### Sources added
Four institutions, led by **leidsevrouwen.nl (Leidse Vrouwen op de Kaart)** — a joint project
of Oud Leiden, Leiden University, Erfgoed Leiden, Museum De Lakenhal and the city. It is the
answer to the women's-history gap and is a **partner**, not a source to copy from.

### Decisions made
- DEC-013 (new, LOCKED): no unverified superlative in visitor-facing content.
- DEC-011 extended to C058.
- Coverage bias resolved by **Option C** — reserve MVP slots visibly rather than re-weight
  the rubric after seeing the results. Re-weighting then would be motivated reasoning.
- The MVP's WWII slot carries a **binding content condition**, written into the proposal.

### Uncertainty / risks
- **C065 (migration since 1960) asserts no Leiden facts on purpose.** Only national material
  was found. The gap is open and visible.
- C063 (Goeie Mie) is recorded as a name and nothing else, pending the court record.
- C062 rests on an institutional project, not yet on the primary court record.
- C061–C065 are **unscored** and therefore not MVP-eligible (`LDN-SCORE-002`).
- Access has changed at C005 (university left in 2024) and C028 (state sale, 2019).

### What must NOT be assumed
- That the MVP is decided. **It is proposed.** No L-IDs exist; `R01` must not start.
- That the top of the ranking is the right MVP. Coverage proved it is not.
- That a superlative found in tourism copy is true. Four of the first five were not.
- That Aletta Jacobs, Anna Maria van Schurman or Johanna Westerdijk are Leiden stories.
  None of them is.

### Recommended next task
**User:** approve or amend the MVP proposal (board Q8, Q9). It blocks the whole research track.
**Codex:** `FND-002` (tech stack — still the top engineering blocker) and `ENG-GEO-001`
(geocode 65 candidates). Both unblocked today.
**Claude, once approved:** `R01` per location; `LDN-SCORE-002` and `LDN-ROUTE-001` alongside.

### Master file updated
YES — v1.4

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
