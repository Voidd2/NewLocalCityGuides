# YOURLOCALCITYGUIDE — ACTIVE TASK BOARD

Version: 1.0
Last updated: 2026-09-13
Owner of this file: shared (Claude + Codex + user)
Authority: `YOURLOCALCITYGUIDE_MASTER_V1.md` is the source of truth. This file is the
**operational view** of it: who is working on what, right now, and what is blocked.

---

## 0. HOW TO USE THIS FILE

> ### ⚠ CLAUDE AND CODEX WORK AT THE SAME TIME
> Read **`docs/COLLABORATION-PROTOCOL.md`** before your first commit. It is binding.
>
> The three rules that matter most:
> 1. **Push often** — after every task, every 30–60 minutes of work, and always before
>    ending a session. Work that is not pushed does not exist to the other agent.
> 2. **Always keep a PR open** — draft while unfinished, description kept current. It is
>    how the other agent reads your work in progress.
> 3. **Read before you write** — `git fetch`, then master §36 → this board → the handoff
>    log → the other agent's open PR.
>
> And: **claim your task here and push that claim immediately, before doing the work.**

1. Read `YOURLOCALCITYGUIDE_MASTER_V1.md` first. Always.
2. Read this board second.
3. `git fetch origin` and read the other agent's open PR.
4. Pick a task that is `READY` **and assigned to your role**.
5. Set it to `IN PROGRESS`, put your agent name in `Owner`, **commit and push that now**.
6. Push again every meaningful chunk while you work.
7. When done: set `DONE`, write a handoff in `docs/handoffs/HANDOFF-LOG.md`, update
   `§36 CURRENT STATUS` + `§33` in the master file, update your PR description, push.
8. Never take a task assigned to the other agent without saying so on this board.

### File ownership while working in parallel
Full table in the protocol. Short version:

| Lane | Owned by | Do not edit if you are the other agent |
|---|---|---|
| `content/leiden/**`, `docs/research/**`, `docs/ux/**`, `docs/qa/**` | **Claude** | Codex |
| `src/**`, `package.json`, configs, `public/**`, `docs/decisions/DEC-009*` | **Codex** | Claude |
| master file, this board, handoff log, protocol, `README.md` | **shared** | edit only your own rows/sections; never reformat the whole file |

One sanctioned exception: for `ENG-GEO-001`, Codex may replace `**Coordinates:** TBD` in the
candidate register with real coordinates + source — and change nothing else in that file.

### Status vocabulary
| Status | Meaning |
|---|---|
| `READY` | Dependencies met. Can be started now. |
| `IN PROGRESS` | Someone is actively working on it. |
| `BLOCKED` | Waiting on another task or on a user decision. |
| `NEEDS USER` | Waiting on a decision only the user can make. |
| `REVIEW` | Delivered, waiting for QA / the other agent to challenge it. |
| `DONE` | All quality gates for that task passed. |

### Role assignment (from master §4)
| Role | Agent | Scope |
|---|---|---|
| A — City Discovery Researcher | **Claude** | Citywide inventory, candidate register |
| B — Historical Researcher | **Claude** | Deep per-location research, source verification |
| C — Story Architect | **Claude** | Hooks, stories, fun facts, Look Around You |
| D — Historical Video Director | **Claude** | Video concepts, storyboards, constraint packs |
| E — Product / UX Designer | **Claude + user** | Wireframe inventory, IA, flows |
| F — Engineer | **Codex** | Stack, schema, app, map, routes, player, i18n, perf |
| G — Quality Reviewer | **whoever did NOT do the work** | Challenge completed work |

---

## 1. THE CRITICAL PATH

Nothing downstream may start before its predecessor is `DONE`.

```
FND-001  repo + master in Git                 DONE
   │
   ├── FND-003  repo structure + taskboard     DONE   (Claude)
   ├── FND-004  wireframe inventory            DONE   (Claude)
   ├── FND-002  lock tech stack                NEEDS USER  ◀── blocks all Codex code
   └── FND-005  lock content schema            BLOCKED by FND-002   (Codex)
   │
LDN-DISC-001  candidate register (30–60)       DONE   (Claude)
   │
LDN-VERIFY-001  source verification pass       READY  (Claude)
   │
LDN-SCORE-001  score every candidate           READY  (Claude)
   │
LDN-COVERAGE-001  theme coverage check         BLOCKED
   │
LDN-MVP-001  select 8–15 production locations  BLOCKED
   │
L0xx-R01…  deep research per location          BLOCKED
   │
L0xx-C01…  stories        L0xx-V01…  videos    BLOCKED
```

**Engineering can run in parallel** with research — but only against the *schema*,
never against specific historical content. See §3.

---

## 2. CLAUDE — RESEARCH & CONTENT TRACK

| ID | Task | Status | Owner | Depends on | Output |
|---|---|---|---|---|---|
| FND-003 | Create repo structure, task board, handoff log | `DONE` | Claude | — | this file, `docs/`, `content/` |
| FND-004 | Extract wireframe inventory from `docs/ux/wireframe-website-v1.png` | `DONE` | Claude | — | `docs/ux/wireframe-inventory.md` |
| LDN-DISC-001 | Build broad Leiden Candidate Location Register (30–60) | `DONE` | Claude | — | `content/leiden/candidates/leiden-candidate-register.md` |
| LDN-SRC-001 | Build source-lead register + institution list | `DONE` | Claude | — | `content/leiden/sources/leiden-source-leads.md` |
| LDN-VERIFY-001 | Raise every `LOW` confidence candidate to `MEDIUM+` or drop it; resolve unsourced superlatives | `DONE` | Claude | LDN-DISC-001 | `docs/qa/LDN-VERIFY-001-verification-log.md` — 1 false claim, 1 overstated, 1 disputed, 1 verified; C013/C015/C035 stay `LOW`, barred from MVP |
| LDN-DISC-002 | Second discovery pass for the 7 documented gaps | `DONE` | Claude | LDN-DISC-001 | register now **60 candidates** (C053–C060) |
| LDN-DISC-003 | Third pass: migration to Leiden since 1960, named Leiden women, guilds | `READY` | — | LDN-DISC-002 | extended register |
| LDN-SCORE-001 | Score all 60 candidates on the 15 criteria (master §5 Phase 1B) | `DONE` | Claude | LDN-VERIFY-001 ✔ | `leiden-candidate-scores.md` — Tier A **19**, B **34**, C **7**. Gate B passed. |
| LDN-COVERAGE-001 | Theme coverage analysis (master §1C) **+ decide how to handle the three scoring biases** | `READY` | — | LDN-SCORE-001 ✔ | `docs/research/leiden-theme-coverage.md` |
| LDN-MVP-001 | Select first 8–15 production locations, assign L-IDs | `BLOCKED` | — | LDN-COVERAGE-001 | `content/leiden/locations/` + master decision |
| LDN-ROUTE-001 | Derive route candidates from the selected MVP set | `BLOCKED` | — | LDN-MVP-001 | `content/leiden/routes/` |

**Hard rule reminder:** no location is `flagship`, `hero` or `main` until LDN-MVP-001 is DONE.
No final video script before `R01`+`R02` pass for that location.

---

## 3. CODEX — ENGINEERING TRACK

> **MESSAGE TO CODEX / CHATGPT — READ THIS BEFORE WRITING ANY CODE.**
>
> Claude has completed the citywide discovery pass (`LDN-DISC-001`). There are now
> **60** candidate locations in `content/leiden/candidates/leiden-candidate-register.md`.
> **None of them is selected yet.** Do not build screens, routes or seed data around
> Pieterskerk, De Waag, De Burcht or any other specific place — the MVP set does not
> exist yet and will be decided in `LDN-MVP-001`.
>
> What you *can* do right now, and what actually unblocks the project:
>
> 1. **FND-002 — propose and lock the tech stack.** This is the single biggest blocker.
>    The master file (§38) leaves it open on purpose. Write a short decision record in
>    `docs/decisions/DEC-009-tech-stack.md` with a recommendation and the trade-offs for:
>    framework (Next.js App Router vs. Astro vs. SvelteKit), map library (MapLibre GL JS
>    vs. Leaflet — note master §38 asks this explicitly), content format (Markdown +
>    frontmatter vs. JSON vs. TypeScript modules vs. a CMS later), i18n approach,
>    hosting, and video delivery. Then ask the user to approve. **Do not self-approve a
>    LOCKED decision** — master §3 requires explicit user approval.
> 2. **FND-005 — turn master §21 into a real, versioned schema.** The conceptual TS types
>    in §21 are the contract. Make them executable (`src/types/` + runtime validation,
>    e.g. Zod) and make them support: many candidates, few selected locations, multiple
>    cities, multiple languages, per-claim source records, and an uncertainty register.
>    The `CandidateLocation` type must be able to round-trip the register Claude wrote —
>    read that file first and make sure every field it uses has a home in the schema.
> 3. **ENG-GEO-001 — geocoding.** Claude deliberately did **not** invent coordinates.
>    Every candidate has `Coordinates: TBD`. Resolve them from an authoritative Dutch
>    source (PDOK Locatieserver / BAG), not by guessing, and write them back into the
>    register. This is a genuinely useful, unblocked task.
> 4. **ENG-SKEL-001 — app skeleton against the wireframe.** `docs/ux/wireframe-inventory.md`
>    maps the user's wireframe to the `W##` page codes in master §19. Build the *shell*:
>    routing, layout, bottom tab bar, language switch, GPS permission flow with a working
>    denied-state, and empty/loading/error states. Use placeholder content that is
>    obviously fake (`LOREM_LOCATION_A`), never real historical text.
>
> What you must **not** do:
> - do not hardcode historical content in components (master §35.3);
> - do not pick a flagship location (master §3);
> - do not write historical copy — that is Claude's Role C, and it must be sourced;
> - do not change a `LOCKED` decision without the user;
> - do not restructure `content/leiden/` without saying so on this board.
>
> **How we work in parallel — read `docs/COLLABORATION-PROTOCOL.md` before your first commit.**
> Claude is working in this repository at the same time as you, in a session you cannot see.
> Push after every completed task and every 30–60 minutes of work; always keep a pull
> request open (draft is fine) with a current description, because that PR is the only way
> Claude and the user can read what you are doing. Before you start: `git fetch origin`,
> then read master §36, this board, the handoff log, and Claude's open PR. Claim your task
> on this board and push that claim *before* you begin.
>
> Your branch pattern is `codex/<topic>`. Never push to `main` or to a `claude/*` branch.
>
> When you finish a task: update this board, append a handoff to
> `docs/handoffs/HANDOFF-LOG.md`, update master §36, update your PR description, and push.
> Commit with the task ID.

| ID | Task | Status | Owner | Depends on | Output |
|---|---|---|---|---|---|
| FND-002 | Propose + lock technical stack | `NEEDS USER` | **Codex** | — | `docs/decisions/DEC-009-tech-stack.md` |
| FND-005 | Executable content schema from master §21 | `BLOCKED` | **Codex** | FND-002 | `src/types/`, validation |
| ENG-GEO-001 | Geocode all **60** candidates from PDOK/BAG | `READY` | **Codex** | LDN-DISC-001 | updated register |
| ENG-SKEL-001 | App skeleton + navigation shell per wireframe | `BLOCKED` | **Codex** | FND-002 | `src/app/` |
| ENG-MAP-001 | Map foundation (layers, markers, clustering, filters) | `BLOCKED` | **Codex** | FND-002, ENG-GEO-001 | map feature |
| ENG-LOC-001 | Location page template (W20–W30) | `BLOCKED` | **Codex** | FND-005 | location feature |
| ENG-VIDEO-001 | Video player + poster + fallback + subtitles | `BLOCKED` | **Codex** | FND-002 | video feature |
| ENG-I18N-001 | NL/EN language system | `BLOCKED` | **Codex** | FND-002 | i18n |
| ENG-GPS-001 | Geolocation + full no-GPS fallback (W70) | `BLOCKED` | **Codex** | ENG-SKEL-001 | feature |

---

## 4. WAITING ON THE USER

These block real work. Nothing should be guessed here (master §38).

| # | Question | Blocks | Claude's recommendation |
|---|---|---|---|
| Q1 | Approve the tech stack once Codex proposes it (FND-002) | all engineering | Let Codex write DEC-009, you approve |
| Q2 | Content format: Markdown+frontmatter, JSON, or TS modules? | FND-005 | Markdown + frontmatter for stories, JSON for map/geo data — researchers can edit prose, engineers get typed data |
| Q3 | Primary homepage CTA — the wireframe (2.1) shows three equal buttons: *Explore near me* / *Choose a route* / *Open map* | ENG-SKEL-001 | Keep all three, but make *Explore near me* visually primary and make it degrade to "Popular nearby" when GPS is denied |
| Q4 | Wireframe shows 4 languages (NL/EN/DE/FR); master §30 locks NL+EN first | ENG-I18N-001 | Build for 4, ship content for NL+EN, hide DE/FR until translated |
| Q5 | Is the wireframe's visual identity (navy + warm sand, serif wordmark) locked? | design system | Treat as locked-by-default; say so if not |
| Q6 | Budget/tooling for AI video generation? | all `V0x` tasks | Not needed until after LDN-MVP-001 — safe to defer |
| Q7 | **Weighted scoring?** The unweighted 15-criterion sum puts **no Siege candidate in Tier A**, drops Leiden's whole WWII story to Tier B/C, and buries the textile/labour stories | `LDN-MVP-001` | **Option C**: keep the scores honest and let `LDN-COVERAGE-001` reserve MVP slots for under-ranked themes. Full reasoning in `leiden-candidate-scores.md` §4 |

---

## 5. QUALITY GATES IN FORCE

From master §27. A task is not `DONE` until its gate passes.

- **Gate A (candidate discovered)** — place + why relevant + ≥1 credible source lead + story potential.
  → `LDN-DISC-001` was checked against this. Every candidate has ≥1 source lead.
- **Gate B (candidate shortlisted)** — requires `LDN-SCORE-001`. Not yet reached.
- **Gate C–F** — not yet reachable.

---

## 6. CHANGE LOG FOR THIS BOARD

- **2026-09-13** — Board created (FND-003). Repo structure built. Wireframe inventory
  extracted (FND-004). Candidate register delivered with 52 candidates (LDN-DISC-001).
  Source-lead register delivered (LDN-SRC-001). Codex brief written. FND-002 raised as
  the top blocker.
- **2026-09-13** — Collaboration protocol written (FND-006) ahead of parallel work.
  PR #1 opened. Verification pass done (LDN-VERIFY-001): one superlative false, one
  overstated, one disputed, one verified; C028's story changed completely. Gap pass done
  (LDN-DISC-002): register now **60 candidates**. Scoring (LDN-SCORE-001) started.
