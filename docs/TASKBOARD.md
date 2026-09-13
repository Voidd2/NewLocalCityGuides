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
   ├── FND-002  tech stack                     READY — PRE-APPROVED (Codex)
   ├── FND-005  content schema                  READY  (Codex)
   └── FND-006  collaboration protocol          DONE
   │
LDN-DISC-001  candidate register             DONE   52 candidates
LDN-DISC-002  gap pass                       DONE   → 60
LDN-DISC-003  women, guilds, migration       DONE   → 65 (migration still open)
   │
LDN-VERIFY-001  verification pass             DONE   1 claim false, 1 overstated, 1 disputed
   │
LDN-SCORE-001  score C001–C060                DONE   Tier A 19 / B 34 / C 7
   │
LDN-COVERAGE-001  theme coverage check        DONE   Tier A alone fails §1C
   │
LDN-MVP-001  select production locations    DONE   ✅ APPROVED — L001–L014
   │
L0xx-R01…  deep research per location         READY  ◀── Claude starts here
   │
L0xx-R02…  source verification                 BLOCKED on each R01
   │
L0xx-C01…  stories        L0xx-V01…  videos    BLOCKED on R02
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
| LDN-DISC-003 | Third pass: migration since 1960, named Leiden women, guilds | `DONE` | Claude | LDN-DISC-002 | C061–C065. Women ✔ guilds ✔ — **migration still open**, C065 is a placeholder asserting no Leiden facts |
| LDN-SCORE-001 | Score all 60 candidates on the 15 criteria (master §5 Phase 1B) | `DONE` | Claude | LDN-VERIFY-001 ✔ | `leiden-candidate-scores.md` — Tier A **19**, B **34**, C **7**. Gate B passed. |
| LDN-COVERAGE-001 | Theme coverage analysis + resolve the three scoring biases | `DONE` | Claude | LDN-SCORE-001 ✔ | `docs/research/leiden-theme-coverage.md` — Tier A alone fails §1C on Siege and WWII |
| LDN-SCORE-002 | Score C061–C065 (not covered by LDN-SCORE-001) | `READY` | — | LDN-DISC-003 | scores appended |
| LDN-MVP-001 | Select first 8–15 production locations, assign L-IDs | ✅ **`DONE`** | Claude | LDN-COVERAGE-001 ✔ | **APPROVED: L001–L014** → `content/leiden/locations/README.md` + `locations.json` |
| L001-R01 … L014-R01 | Deep research, one per location (master §8) | ✅ **`DONE`** | Claude | LDN-MVP-001 ✔ | `content/leiden/locations/L0xx-*/R01-research.md` — **all 14** |

**`R01` progress — ALL 14 COMPLETE (2026-09-13).** Each answers master §9, carries a source
trail, and has an `R05` uncertainty register separating verified from probable from legend.
`R02` (source verification) is now `READY` for all fourteen. **No visitor-facing copy may be
written for any location until its `R02` passes.**

| | Location | R01 | R02 |
|---|---|:-:|:-:|
| L001 | De Burcht | ✅ | 🔄 |
| L002 | Vismarkt | ✅ | 🔄 |
| L003 | Koornbrug | ✅ | 🔄 |
| L004 | De Blauwe Steen | ✅ | — |
| L005 | Gravensteen | ✅ | — |
| L006 | Pieterskerk | ✅ | 🔄 |
| L007 | Pilgrims' quarter | ✅ | — |
| L008 | Jean Pesijnhofje | ✅ | 🔄 |
| L009 | Buskruitramp 1807 | ✅ | 🔄 |
| L010 | Hortus Botanicus | ✅ | 🔄 |
| L011 | Weddesteeg | ✅ | — |
| L012 | Leidens Ontzet | ✅ | 🔄 |
| L013 | Wevershuis | ✅ | — |
| L014 | Cleveringa 1940 | ✅ | — |

| L001-R02 … L014-R02 | Source verification per location (master §8) | `IN PROGRESS` | **Claude** | R01 ✔ | rounds 1–2 done: L001, L002, L003, L006, L008, L009, L010, L012 → `docs/qa/R02-verification-round-{1,2}.md` |
| LDN-ROUTE-001 | Route proposals from L001–L014 | `DONE` | Claude | — | `content/leiden/routes/leiden-route-proposals.md` — 6 routes proposed |
| R03-SHARED | Shared city-wide reconstruction references | `STARTED` | Claude | L011-R01 | `docs/research/leiden-reconstruction-references.md` |
| LDN-ROUTE-002 | Recompute routes from real coordinates; resolve the RT005 question | `BLOCKED` | — | ENG-GEO-001 | `content/leiden/routes/` |

**Hard rule reminder:** there is **no** flagship, hero or main location, and there will not be
one — not even now that L001–L014 exist. IDs follow walking order (master §5).
No final video script before `R01`+`R02` pass for that location.

---

## 3. CODEX — ENGINEERING TRACK

> # ⚡ MESSAGE TO CODEX / CHATGPT — START HERE
>
> **You are unblocked. Everything you were waiting on has been decided. Start building.**
>
> ## First, read these four things (20 minutes, not optional)
> 1. `YOURLOCALCITYGUIDE_MASTER_V1.md` — especially §3 locked decisions, §21 content model,
>    §35 your start instruction, §36 current status, §37 decision log.
> 2. `docs/COLLABORATION-PROTOCOL.md` — **Claude is working in this repo at the same time as
>    you, in a session you cannot see.** Push often, always keep a PR open, read before you
>    write, stay in your lane.
> 3. `content/leiden/locations/README.md` — the fourteen approved locations.
> 4. `docs/ux/wireframe-inventory.md` — the wireframe mapped to master §19's `W##` codes.
>
> ## What changed — the two things that were blocking you
>
> **1. The tech stack is pre-approved (DEC-009).** The user approved it in advance rather than
> waiting for a proposal. So: **write `docs/decisions/DEC-009-tech-stack.md`** with your
> recommendation and the trade-offs — framework, map library (MapLibre vs Leaflet, master §38
> asks explicitly), content format, i18n, hosting, video delivery — and then **build on it
> without waiting for a second approval.** Record it properly anyway: the choice must be
> explicable and reversible. Say plainly in the record that it is cheap to reverse now and
> expensive later, so the user can object while objecting is still cheap.
>
> **2. The MVP is locked (DEC-014): fourteen locations, `L001`–`L014`.** They are in
> `content/leiden/locations/locations.json` — real IDs, real slugs, real themes.
>
> ## ⚠️ The thing that will bite you if you skip it
>
> **Every content field in `locations.json` is `null` on purpose.** `hook`, `shortStory`,
> `funFacts`, `lookAround`, `timeline`, `thenVsNow`, `videos` — all empty. These locations are
> **selected, not researched.** Claude's deep research (`R01`) starts now and will fill them.
>
> **Do not put plausible-looking history in there to make the UI look good.** Use tokens that
> are obviously fake — `LOREM_LOCATION_A`, `«hook not yet researched»`. Inventing history is
> the one thing this project forbids above all others (master §0.9, §3). A screenshot with
> invented Leiden facts in it is a bug, not a demo.
>
> ## Requirements the research produced — these are schema constraints, not nice-to-haves
>
> 1. **Time-conditional practical info is mandatory.** `L013` has opening hours, and candidate
>    C052 (a market) only exists on market days. A visitor must never be sent to something that
>    is closed or not happening. `PracticalInfo` needs opening hours, days, and a closed-state.
> 2. **`allowsAIReconstruction` is a real field and it is `false` for `L014`.** Per DEC-011,
>    persecution, resistance and civilian bombing deaths get archival material only. The video
>    component must respect this flag, not just document it.
> 3. **`L012` has no building at all.** It is a tradition, not an address. The model must
>    support a location whose coordinates are a viewpoint rather than a structure.
> 4. **Coordinates are `null` everywhere, deliberately (DEC-010).** `ENG-GEO-001` resolves them
>    from PDOK/BAG. Never estimate one.
> 5. **Every claim needs a `SourceRecord`** (master §21) naming the institution, document and
>    the specific claim it supports. Build for that from the start; retrofitting is miserable.
> 6. **Multi-city, multi-language from day one.** Leiden is city #1, not the only city.
>    NL + EN ship first (§30); the wireframe shows DE + FR, so build for four and hide two.
>
> ## Two mandatory design items the wireframe is missing
>
> - **The AI-reconstruction disclosure.** Master §15 requires an on-screen
>   *"AI historical reconstruction based on historical and archival sources"* label. The
>   wireframe's video screen has none. Not optional under §3.
> - **Look Around You.** Master §12 calls it *central to the product*, and the wireframe omits
>   it entirely. It is the single biggest gap in the design. Flag it; do not quietly skip it.
>
> ## Your task order
>
> `FND-002` (write the record, then build) → `FND-005` (schema, incl. the six constraints above)
> → `ENG-GEO-001` (geocode — genuinely useful and completely independent) → `ENG-SKEL-001`
> (shell, fake content) → the rest.
>
> ## What you must not do
>
> - do not hardcode historical content in components (master §35.3);
> - do not write historical copy — that is Claude's Role C and it must be sourced;
> - do not call any location the flagship, hero or main one. IDs follow walking order and do
>   not imply importance (master §5). There is no flagship and there will not be one;
> - do not change a `LOCKED` decision without the user;
> - do not edit `content/leiden/**` except the one sanctioned edit: writing coordinates into
>   the candidate register for `ENG-GEO-001`, and nothing else in that file;
> - do not restructure `content/leiden/` without saying so on this board first.
>
> ## Every time you finish a chunk
>
> Update this board → append a handoff to `docs/handoffs/HANDOFF-LOG.md` → update master §36 if
> the project state changed → update your PR description → **push**. Commit with the task ID.
> Your branch pattern is `codex/<topic>`. Never push to `main` or to a `claude/*` branch.
>
> Claude's work is on PR #1. Read it before you start.
>
> ## ⚡ UPDATE FOR CODEX — 2026-09-13, after your PR #2
>
> **Your DEC-009 is reviewed and approved** → `docs/qa/REVIEW-DEC-009-tech-stack.md`. It is good
> work: it refuses to hardcode a location, it picked up the C052 time-conditional requirement,
> and its architecture boundaries keep a wrong call cheap to reverse.
>
> **You are waiting for approval you already have.** Your ADR says "PROPOSED — USER APPROVAL
> REQUIRED" and that nothing should be treated as locked. The user answered board Q1 with
> "I approve" **before you started** — master §37 records DEC-009 as **pre-approved by
> delegation**. Mark it approved-by-delegation, add the note master §37 asks for (cheap to
> reverse now, expensive later), and **go to `FND-005`.**
>
> **Before you write the schema, read §4 of the review.** Four requirements the ADR predates:
> `allowsAIReconstruction` is a **location-level** field, not just video metadata; a fact must be
> publishable **as a range** (the 1807 toll is 151 against a widely repeated ~160); three
> locations have **no surviving building** and one has no structure at all; and a location can be
> closed **with a signposted alternative** (the Koornbrug closure had a stated period, a
> temporary reopening in the middle, and three named diversions).
>
> **Your `content/cities/leiden/…` path is better than master §22's** and is raised with the
> user as **Q15** rather than treated as a lane violation. Don't move Claude's research files;
> the migration belongs in your promotion step.

| ID | Task | Status | Owner | Depends on | Output |
|---|---|---|---|---|---|
| FND-002 | Stack decision record | ✅ **`DONE`** | **Codex** | — | `docs/decisions/DEC-009-tech-stack.md` — PR #2. **Reviewed by Claude: APPROVE** → `docs/qa/REVIEW-DEC-009-tech-stack.md` |
| FND-005 | Executable content schema from master §21 + `locations.json` | ✅ **`READY — GO`** | **Codex** | FND-002 ✔ | `src/types/`, validation. **Read the review's §4 first — four requirements the ADR predates** |
| ENG-GEO-001 | Geocode all **60** candidates from PDOK/BAG | `READY` | **Codex** | LDN-DISC-001 | updated register |
| ENG-SKEL-001 | App skeleton + navigation shell per wireframe | `READY` | **Codex** | FND-002 | `src/app/` |
| ENG-MAP-001 | Map foundation (layers, markers, clustering, filters) | `READY` | **Codex** | ENG-GEO-001 | map feature |
| ENG-LOC-001 | Location page template (W20–W30), fake content only | `READY` | **Codex** | FND-005 | location feature |
| ENG-VIDEO-001 | Video player + poster + fallback + subtitles + **the §15 AI disclosure** | `READY` | **Codex** | FND-002 | video feature |
| ENG-I18N-001 | NL/EN language system | `READY` | **Codex** | FND-002 | i18n |
| ENG-GPS-001 | Geolocation + full no-GPS fallback (W70) | `READY` | **Codex** | ENG-SKEL-001 | feature |

---

## 4. WAITING ON THE USER

These block real work. Nothing should be guessed here (master §38).

| # | Question | Blocks | Claude's recommendation |
|---|---|---|---|
| ~~Q1~~ | ~~Approve the tech stack~~ | — | ✅ **PRE-APPROVED BY DELEGATION** → **DEC-009**. Codex writes the record and builds on it without waiting. Revocable by the user at any time |
| Q2 | Content format: Markdown+frontmatter, JSON, or TS modules? | FND-005 | Markdown + frontmatter for stories, JSON for map/geo data — researchers can edit prose, engineers get typed data |
| Q3 | Primary homepage CTA — the wireframe (2.1) shows three equal buttons: *Explore near me* / *Choose a route* / *Open map* | ENG-SKEL-001 | Keep all three, but make *Explore near me* visually primary and make it degrade to "Popular nearby" when GPS is denied |
| Q4 | Wireframe shows 4 languages (NL/EN/DE/FR); master §30 locks NL+EN first | ENG-I18N-001 | Build for 4, ship content for NL+EN, hide DE/FR until translated |
| Q5 | Is the wireframe's visual identity (navy + warm sand, serif wordmark) locked? | design system | Treat as locked-by-default; say so if not |
| Q6 | Budget/tooling for AI video generation? | all `V0x` tasks | Not needed until after LDN-MVP-001 — safe to defer |
| ~~Q7~~ | ~~Weighted scoring?~~ | — | ✅ **APPROVED by the user: Option C** → **DEC-015**. Scores stand as scored; coverage reserves slots visibly |
| ~~Q8~~ | ~~Approve the 14-location MVP~~ | — | ✅ **DECIDED 2026-09-13** — user delegated the call to Claude; approved as proposed → **DEC-014**, locations `L001`–`L014` |
| ~~Q9~~ | ~~The WWII slot's binding content condition~~ | — | ✅ **APPROVED by the user** → **DEC-016**. Binding on all later agents |
| Q10 | **Migration to Leiden since 1960 (C065)** — needs oral history, not archives. Scope, budget, and who tells it? | C065, release 2 | Worth doing properly or not at all. Not an MVP blocker |
| Q11 | **The 1856 execution (L005)** — how much detail belongs in a tourist app about a named murdered 18-year-old? | L005 copy | Name both, state it plainly, do not narrate the killing, no reconstruction. Full reasoning in `L005-R01` §7 |
| Q12 | **"Leiden Essentials" (RT005) drops all three reserved slots** — the same bias the coverage analysis corrected, reappearing at the route layer | route design | **Option C**: add L012, anchored at De Waag, which already sits between two stops on the route. Nearly free |
| Q13 | **L012's anchor is De Waag (C008)** — a candidate deliberately left out of the MVP. It does not add a stop; it gives an unanchored one an address | L012 | Accept. Reasoning in `L012-R01` §3 |
| Q14 | **Archive licensing** — Rijksmuseum 1807 prints (L009) and Erfgoed Leiden's Rembrandt VR (L011). Master §38 flagged this; it is now concrete | L009, L011 video | Start the Erfgoed Leiden conversation early — it is probably a partnership, not a licence fee |
| Q15 | **Amend master §22's content structure?** Codex proposes `content/cities/leiden/…` instead of `content/leiden/…`, which makes multi-city structural rather than aspirational | `FND-005` | **Adopt it.** Codex owns `content/cities/**` (validated production records); Claude keeps the research inputs where they are. Reasoning in `docs/qa/REVIEW-DEC-009-tech-stack.md` §3 |
| Q16 | **Two vendors (Vercel + Cloudflare Stream)** at this stage — two accounts, two bills | hosting | Defensible and well argued by Codex. Worth your eyes before spend is authorised |

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
  (LDN-DISC-002): register to **60**. Third pass done (LDN-DISC-003): **65**; women's and
  guild gaps closed, migration explicitly left open. Scoring done (LDN-SCORE-001): Tier A 19,
  B 34, C 7. Coverage done (LDN-COVERAGE-001): Tier A alone fails §1C on the Siege and WWII.
  **MVP APPROVED (LDN-MVP-001): L001–L014, locked as DEC-014.** User also approved Q7
  (Option C scoring → DEC-015), Q9 (L014's binding condition → DEC-016) and pre-approved the
  tech stack by delegation (Q1 → DEC-009). **Phase 1 complete. Both tracks unblocked.**
