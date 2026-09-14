# COLLABORATION PROTOCOL — CLAUDE + CODEX WORKING AT THE SAME TIME

Version: 1.0
Date: 2026-09-13
Status: **BINDING** for every agent on this project
Authority: implements master §23, §24 and §26. If this file and the master file disagree,
the master file wins — and whoever spots the conflict fixes it.

---

## 0. WHY THIS FILE EXISTS

Claude and Codex now work on this repository **at the same time**, in separate sessions
that cannot see each other. Neither agent can read the other's chat. The only thing both
can read is **what has been pushed to GitHub**.

That has one hard consequence:

> **Work that is not pushed does not exist.**
> An uncommitted brilliant analysis is invisible to the other agent, and it will be
> duplicated, contradicted, or overwritten.

Everything below follows from that single fact.

---

## 1. THE THREE NON-NEGOTIABLE RULES

### RULE 1 — PUSH OFTEN
Push **at minimum**:
- after every completed task;
- after every meaningful chunk of work — roughly every 30–60 minutes of effort, or any
  time you have produced something the other agent could act on;
- **always** before you end a session or hand back to the user;
- **always** before you start a long research or build phase (so your starting point is
  visible to the other agent).

Never end a turn with uncommitted work in the tree. Never.

If a chunk is half-finished, push it anyway with `[WIP]` in the commit subject and say so
on the task board. A visible half-finished thing beats an invisible finished thing.

### RULE 2 — ALWAYS HAVE AN OPEN PULL REQUEST
The moment your branch has its first commit, **open a pull request** — as a draft if the
work is not finished. Never work on a branch that has no PR.

The PR is how the other agent reads your work in progress. Its description is a **live
status document**, not a one-time summary: update it every time you push something
meaningful.

One PR per work stream. Do not batch a week of unrelated work into one giant PR.

### RULE 3 — READ BEFORE YOU WRITE
Before starting any work block:

```bash
git fetch origin
git log --oneline origin/main -10          # what landed since you last looked
```

Then read, in this order:
1. `YOURLOCALCITYGUIDE_MASTER_V1.md` §36 CURRENT STATUS
2. `docs/TASKBOARD.md`
3. `docs/handoffs/HANDOFF-LOG.md` — the top entry
4. **The other agent's open PR** — its description and its changed files

If the other agent is mid-task on something that touches your work, say so on the board
before you start, rather than after you have collided.

---

## 2. THE WORK CYCLE

Every work block, every time:

```
  START
   │
   ├─ 1. git fetch origin && git merge origin/main
   ├─ 2. read master §36 → TASKBOARD → HANDOFF-LOG → other agent's PR
   ├─ 3. claim your task on docs/TASKBOARD.md  →  IN PROGRESS + your name
   ├─ 4. commit + push that claim IMMEDIATELY   ◀── this is how the other agent
   │                                                 knows not to take it
   ├─ 5. DO THE WORK
   │      └─ push whenever you finish a meaningful chunk (RULE 1)
   │
   ├─ 6. update docs/TASKBOARD.md  →  DONE / REVIEW / BLOCKED
   ├─ 7. append a handoff to docs/handoffs/HANDOFF-LOG.md  (master §25)
   ├─ 8. update master §36 CURRENT STATUS if the project state changed
   ├─ 9. update your PR description
   └─ 10. git push
  END
```

Step 4 is the one everyone skips and the one that prevents the most damage. **Claim loudly
and early.**

---

## 3. BRANCHES

| Agent | Branch pattern | Example |
|---|---|---|
| Claude | `claude/<topic>` | `claude/leiden-verification` |
| Codex | `codex/<topic>` | `codex/tech-stack-decision` |

- Never push to `main` directly.
- Never push to a branch belonging to the other agent.
- Never force-push a branch the other agent might have read. If you need to fix history on
  your own branch and nobody has built on it, that is fine; otherwise add a commit.
- Keep branches short-lived. Merge, then start a new one.

---

## 4. FILE OWNERSHIP — HOW WE AVOID FIGHTING OVER THE SAME LINES

This is the practical core of working simultaneously.

### Claude owns (Codex: do not edit without saying so on the board)
```
content/leiden/**          research, candidates, sources, stories, routes content
docs/research/**           research output
docs/ux/**                 wireframe inventory, UX specs
docs/qa/**                 historical, story and source QA
```

### Codex owns (Claude: do not edit without saying so on the board)
```
src/**                     all application code
package.json, lockfiles, configs, CI
public/**                  technical asset pipeline
docs/decisions/DEC-009*    the tech stack decision record
```

### Shared — both agents edit these, so edit them carefully
```
YOURLOCALCITYGUIDE_MASTER_V1.md
docs/TASKBOARD.md
docs/handoffs/HANDOFF-LOG.md
docs/COLLABORATION-PROTOCOL.md   (this file)
README.md
```

**Rules for shared files:**
1. Edit **only the rows or sections that are yours**. Do not reformat, reorder or rewrap
   the rest of the file — that turns a one-line change into an unmergeable diff.
2. Handoffs are **append-at-the-top**. Never edit someone else's handoff entry.
3. Commit shared-file edits **separately** from your content/code work, and **push them
   immediately**. A task-board claim sitting unpushed for an hour is worse than useless.
4. If you hit a conflict in a shared file: keep **both** sides, then reconcile on the board.
   Never resolve a conflict by deleting the other agent's work.

### The one sanctioned cross-boundary edit
`ENG-GEO-001` requires **Codex to write into a Claude-owned file**
(`content/leiden/candidates/leiden-candidate-register.md`).

Codex may, for that task only:
- replace the text `**Coordinates:** TBD` with real coordinates plus their source;
- change **nothing else** in that file — not a word of the research text.

Any other cross-boundary edit needs a note on the task board first.

---

## 5. COMMITS

Format (master §24 and §26):

```
[TASK-ID] Clear description in the imperative

Body: what changed, why, and anything the other agent must know.
```

Examples:
```
[LDN-VERIFY-001] Resolve LOW-confidence candidates and unsourced superlatives
[FND-002] Propose Next.js + MapLibre stack for user approval
[ENG-GEO-001] Add PDOK coordinates for 52 candidates
[WIP][LDN-DISC-002] Partial gap pass — women's history section drafted
```

- One task ID per commit where possible.
- If a commit touches a shared file for a status update only, say so: `[FND-002] Claim task on board`.

---

## 6. PULL REQUESTS

### Open it early
First commit on the branch → open the PR, as a **draft** if unfinished. The PR exists so
the other agent and the user can read the current state at any moment without asking.

### PR title
`[TASK-ID] Short description` — same as the lead commit.

### PR description — keep it live
It must always answer, for whoever reads it right now:

```markdown
## Status
IN PROGRESS / READY FOR REVIEW / BLOCKED ON <what>

## Task IDs
LDN-VERIFY-001, LDN-DISC-002

## What is in this PR so far
- ...

## What the other agent needs to know
- Anything that changes the schema, the content model, a locked decision,
  or a file the other agent owns.

## What is NOT done yet
- ...

## Master file / task board updated
YES / NO
```

Update this description on every meaningful push. A stale PR description is a lie that the
other agent will act on.

### Before requesting review
- Task board updated
- Handoff appended
- Master §36 updated if project state changed
- Branch merged with the latest `origin/main`

### Merging
- The user merges, or explicitly says an agent may.
- Never merge your own PR without being told to.
- Never merge the other agent's PR.

---

## 7. WHEN YOU ARE BLOCKED

Do not go quiet, and do not guess. In this order:

1. Write the blocker on `docs/TASKBOARD.md` §4 (waiting on the user) or in the task row.
2. Push it.
3. Note it in your PR description under **Status**.
4. **Then move to the next unblocked task on your track.** Blocked on one thing is never a
   reason to stop entirely — there is always something in your lane that is `READY`.

Master §38 is explicit: unresolved questions must not be guessed silently.

---

## 8. WHAT COUNTS AS "DONE"

From master §0.12: *never mark a task DONE because it looks good.*

A task is DONE when **all** of these are true:
- the required quality gate (master §27) passes;
- the output is committed **and pushed**;
- `docs/TASKBOARD.md` says DONE;
- a handoff exists in `docs/handoffs/HANDOFF-LOG.md`;
- master §36 reflects the new state;
- the PR description is current.

Six things. Missing any one of them means the other agent is working from a false picture.

---

## 9. QUICK REFERENCE

```bash
# start of every work block
git fetch origin && git merge origin/main

# claim your task, push immediately
git add docs/TASKBOARD.md
git commit -m "[TASK-ID] Claim task on board"
git push -u origin <your-branch>

# during work — push every meaningful chunk
git add -A && git commit -m "[TASK-ID] What changed" && git push

# end of every work block
#   board updated → handoff appended → master §36 → PR description → push
```

**If you remember nothing else from this file:**
push often, keep a PR open, read before you write, and stay in your lane.
