# YourLocalCityGuide

**Real places. Real stories.**
A mobile-first city discovery platform that lets visitors stand where history happened.
First city: **Leiden**.

---

## If you are an AI agent (Claude, Codex, or anything else): read in this order

1. **`YOURLOCALCITYGUIDE_MASTER_V1.md`** — the single source of truth. Vision, locked
   decisions, phases, rules, quality gates. **It wins every conflict.**
2. **`docs/COLLABORATION-PROTOCOL.md`** — **Claude and Codex work here at the same time.**
   Push often, always keep a PR open, read before you write, stay in your lane. Binding.
3. **`docs/TASKBOARD.md`** — who is doing what right now, and what is blocked. Pick a task
   that is `READY` and assigned to your role.
4. **`docs/handoffs/HANDOFF-LOG.md`** — what the previous agent actually did.

Then do the work, update the board, append a handoff, update master §36, update your PR,
and **push**. **No handoff = the task is not done. Not pushed = it does not exist.**

## Working in parallel — the short version

Two agents, two sessions, no shared chat. GitHub is the only shared reality.

- **Push** after every completed task, every 30–60 minutes of work, and always before
  ending a session. Unfinished work gets pushed too, marked `[WIP]`.
- **Always keep a pull request open** — draft while in progress — with a description that
  is kept current. That PR is how the other agent reads your work.
- **Claim your task on the board and push the claim before you start working.**
- **Lanes:** Claude owns `content/**`, `docs/research|ux|qa/**`. Codex owns `src/**`,
  configs, `public/**`. Shared files are edited section-by-section, never reformatted.

## Current state (2026-09-13)

| | |
|---|---|
| Phase | 1A discovery **complete**; 1B scoring not started |
| Candidates registered | **52** |
| Locations selected | **0** — and nothing is "flagship" until `LDN-MVP-001` |
| Code written | none — blocked on `FND-002` (tech stack) |
| Top blocker | **`FND-002`** — Codex proposes the stack, the user approves it |

## Repository map

```
YOURLOCALCITYGUIDE_MASTER_V1.md   the brain — read first
README.md                         you are here
docs/
  TASKBOARD.md                    operational task list + the brief to Codex
  handoffs/HANDOFF-LOG.md         handoff history (§25)
  ux/wireframe-inventory.md       the wireframe mapped to §19's W## codes
  ux/wireframe-website-v1.png     the user's wireframe
  decisions/                      DEC-0xx decision records
  research/  qa/
content/leiden/
  candidates/                     the 52-candidate register (Phase 1A output)
  sources/                        institutions + source leads, ranked by §6
  locations/                      selected production locations — EMPTY, by design
  routes/                         routes — EMPTY, routes follow discovery (§17)
public/                           images, video, audio, archive references
```

## Three rules that are easy to break by accident

1. **Never invent history, and never invent data.** That includes coordinates
   (DEC-010) and includes "probably" dates. Unknown is a valid answer; a guess is not.
2. **No location is the main one.** Pieterskerk appears in the wireframe as a *mock-up
   example*. De Waag is named in master §36 as a *warning*. Neither is selected.
3. **Research → verification → story → video.** In that order, every time. A `HIGH`
   confidence flag in the candidate register means one cross-check passed — not that
   anything is ready to publish.

## Working agreement

Claude does research, story and UX (roles A–E). Codex engineers (role F). Whoever did not
do the work reviews it (role G). Both share state through Git and the master file — never
through chat alone (master §23).

Commits carry the task ID: `[LDN-DISC-001] Build Leiden candidate register`.
