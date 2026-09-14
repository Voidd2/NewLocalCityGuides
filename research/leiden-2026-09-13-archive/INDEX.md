# Archived Leiden research — imported 2026-09-14

## What this is

While building the current Next.js app (this branch's history), a **separate, disconnected**
line of work was going on in parallel on other branches, rooted in a different initial commit
("Add files via upload") that this repo's `main` no longer shares history with. That line did
NOT touch application code — it did the actual Leiden content research the app is meant to be
built on. It was never merged, and nobody had it in front of them at once until now.

This folder is a **verbatim, read-only import** of that work, pulled from
`origin/claude/affectionate-rubin-t48oom` (tip commit `77ae70af`, dated 2026-09-13) using
`git show <branch>:<path>`, unedited. Nothing here has been rewritten, summarized, or checked
by this session — treat it as source material to review, not as verified, ready-to-publish
content.

**Nothing in the live app changed because of this import.** `content/cities/leiden/**` (the
5 placeholder locations the site currently reads) is untouched.

## Why it matters

The archived work is substantial and already represents real, non-trivial effort:

- **65 candidate locations** discovered and registered city-wide (`content/leiden/candidates/`).
- All 65 **scored and tiered**; **14 locations (L001–L014) approved as the MVP set**
  (`content/leiden/locations/MVP-PROPOSAL.md`, `locations.json`).
- **Deep research (R01) completed for all 14** locations — one markdown file per location
  under `content/leiden/locations/L0xx-*/R01-research.md` — each with sources, an uncertainty
  register (verified vs. probable vs. legend), a "Look Around You" audit, and video-opportunity
  notes with **no video concept chosen**.
- **Source verification (R02) done for 10 of the 14** locations, across three rounds
  (`docs/qa/R02-verification-round-{1,2,3}.md`); 4 remain unverified.
- Consolidated **practical info** (hours/price/accessibility) for the MVP set
  (`content/leiden/locations/PRACTICAL-INFO.md`).
- A proposed **route structure** (`content/leiden/routes/leiden-route-proposals.md`) and a
  **theme-coverage analysis** (`docs/research/leiden-theme-coverage.md`).
- A **project/task board and handoff log** (`docs/TASKBOARD.md`, `docs/handoffs/HANDOFF-LOG.md`)
  recording exactly what was done, by whom, and what was left open.

None of this content exists anywhere in the code currently deployed — the site is still
running on 5 hand-written placeholder locations while 14 real, sourced ones sit unused.

## What still needs a person's decision before this goes further

This session did **not** make any of the following calls — they're either explicitly
"ask the user first" items under this project's own rules, or genuine judgment calls:

1. **Two master files disagree.** The current `YOURLOCALCITYGUIDE_MASTER_V1.md` (v1.0) on this
   branch says citywide discovery hasn't started. The archived one
   (`MASTER-V1.1-snapshot.md`) says discovery, scoring, MVP selection and most of R01/R02 are
   done. Both can't be the live master file. Someone needs to decide which project-management
   trail is authoritative going forward (most likely: treat the archived research as real
   completed work, and refresh the current master file's status section to say so — but that's
   a call for the user, not something to do silently).
2. **Tier-A scoring gap flagged by the researcher (board "Q7"):** none of the top-tier
   candidates is primarily about the Siege and Relief of Leiden, and Leiden's WWII history
   scored Tier B/C — because the scoring rubric rewards visible, central, filmable places, not
   necessarily the story Leiden is most known for. Picking the MVP by rank alone would miss
   that story entirely. Needs a decision: adjust the rubric, override the ranking for one slot,
   or accept the gap.
3. **R02 verification is only 10/14 done.** Per this project's own rule, no story, fun fact, or
   video script may be written for a location until its R02 has passed — so L001–L014 are not
   all ready for content authoring yet.
4. **A route/date conflict was raised and never resolved:** the Hortus Botanicus (in the
   proposed "Essentials" route) is closed on 3 October, which is also the one day Leidens Ontzet
   (L012) is worth visiting — and L012 isn't in that route. The researcher's notes call this a
   product problem (routes may need a date-aware variant), not just a content one.
5. **Several other stray branches exist** with unmerged work from the same old, disconnected
   history: `claude/project-scaffold`, `codex/content-schema`,
   `codex/lock-de-tech-stack-voor-het-project`. They were not imported here. Worth a look before
   they're deleted or forgotten.

## Suggested next step (not yet done)

Once the user has weighed in on the above: take the 10 verified (R02-passed) locations, write
their actual bilingual `content` fields (title/subtitle/story/lookAround/thenVsNow/funFacts)
against the existing `content/schema/index.ts` shape used by the live app, add them under
`content/cities/leiden/locations/`, and retire the 5 placeholders. That is real content-writing
work this session did not attempt, since it requires the tier-gap and R02 decisions above first.
