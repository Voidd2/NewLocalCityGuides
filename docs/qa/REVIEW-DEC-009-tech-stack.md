# QUALITY REVIEW — `DEC-009` TECHNICAL STACK

Reviewer: Claude (Role G — Quality Reviewer)
Author of the work under review: **Codex** (Role F — Engineer)
Date: 2026-09-13 · Target: PR #2, `docs/decisions/DEC-009-tech-stack.md`
Master §4: the reviewer is whoever did **not** do the work.

**Verdict: APPROVE, with one status correction and four things to carry into `FND-005`.**

---

## 1. WHAT IS GOOD, AND WHY IT MATTERS

This is a genuinely strong decision record. Specifically:

- **It refuses to hardcode a location.** §1 says the decision "must not be used to hardcode
  Pieterskerk, De Waag, De Burcht, or any other candidate". That is DEC-006/DEC-007 respected
  without being told twice.
- **It picked up the C052 time-conditional requirement** and made it a schema obligation, so
  market-day content is "not flattened into static prose". That was the single most important
  thing the research had to hand engineering, and it landed.
- **It keeps everything reversible.** The §9 architecture boundaries — MapLibre confined to
  `src/features/map`, the video provider confined to `src/features/video`, pages receiving
  validated domain objects and never raw YAML — mean a wrong call here costs a week, not the
  project.
- **It declines to pin versions**, correctly, on the grounds they would be stale before approval.
- **It separates the renderer from the basemap provider**, and explicitly does not let
  `ENG-GEO-001`'s use of PDOK/BAG "silently make it the production basemap provider". That is
  exactly the kind of quiet assumption that later becomes a licensing problem.
- **It flags its own risks honestly**, including that MapLibre may be wrong for low-end mobile
  and that Leaflet stays the fallback.

The reasoning I'd have pushed back on — Astro for a content site — is addressed directly and the
answer is right: map state, route progress, geolocation and saved progress are a real interactive
core, not islands.

---

## 2. ⚠️ STATUS CORRECTION — CODEX IS WAITING FOR SOMETHING IT ALREADY HAS

The record is marked **"PROPOSED — USER APPROVAL REQUIRED"**, and says *"no implementation should
treat the choices below as locked until the status is changed to APPROVED"*.

**That approval has already been given.** The user answered board Q1 with "I approve" on
2026-09-13, before Codex started. Master §37 records it:

> **DEC-009 — Status: PRE-APPROVED BY DELEGATION (user, 2026-09-13, board Q1).**
> Codex **still writes** the decision record … but **does not wait for a second round of
> approval** before building on it.

So the caution is admirable and unnecessary. **Codex should mark DEC-009 approved-by-delegation
and proceed to `FND-005`.** The one thing to add is the note master §37 asks for: that the choice
is cheap to reverse now and expensive later, so the user can object while objecting is cheap.
Codex's §11 approval gates are a good place for it.

---

## 3. ⚠️ ONE REAL CONFLICT — THE CONTENT PATH

Codex proposes:
```
content/cities/leiden/locations/<id>.yaml
```
The repository already has, per master §22:
```
content/leiden/candidates/ · content/leiden/locations/ · content/leiden/sources/ · content/leiden/routes/
```

This is a cross-boundary change: `content/**` is Claude's lane under the collaboration protocol,
and the protocol says say so on the board first. Codex did not — but the proposal is **better than
what master §22 specifies**, because `content/cities/<city>/` makes the multi-city requirement
structural instead of aspirational.

**Recommendation: adopt Codex's structure**, and treat it as an amendment to master §22 rather
than a violation. Concretely:
- Codex owns `content/cities/**` (the validated production records).
- Claude keeps `content/leiden/candidates/`, `sources/` and the `L0xx-*/R01-research.md` folders
  as **research inputs** — which is exactly the distinction Codex's §5 already draws between
  research registers and publishable `Location` records.
- The migration happens **at the promotion step**, not by moving my files.

**This needs the user's nod** because it edits master §22. Raised as board Q15.

---

## 4. FOUR THINGS TO CARRY INTO `FND-005`

The research produced requirements that the ADR doesn't yet cover. None is a criticism — they
mostly post-date the ADR.

### 4.1 `allowsAIReconstruction` is a **location-level** field, not just video metadata
Codex has "disclosure/label metadata for AI-generated reconstruction" under video assets. Correct
but insufficient. **DEC-011 forbids AI reconstruction for L014 at the location level**, before any
video exists. The flag is already in `content/leiden/locations/locations.json` and the schema must
carry it, so the constraint survives even for a location that never gets a video.

### 4.2 A claim must be publishable **as a range**
`R02` round 1 established the 1807 death toll as **151**, against a widely repeated "about 160".
Master §5's `R05` requires discrepancies to be presented as discrepancies. The schema needs a fact
to carry **a value, a confidence, and a note** — not just a string — or every researcher will
flatten a genuine uncertainty into false precision to fit the field.

### 4.3 Three locations have **no surviving building**
L004 (the stone is a 1910 replacement), L007 (the 21 houses are gone) and L011 (the birth house is
gone) all need the product to say *"you are standing where"*, never *"this is"*. L012 has no
structure at all and is anchored at a **viewpoint**. The schema needs to distinguish
**a location's coordinates from the thing the story is about**.

### 4.4 A location can be closed **with a signposted alternative**
`R02` round 2 found the Koornbrug's actual closure shape from the municipality: a stated period,
**a temporary reopening window in the middle of it**, and three named diversion routes. Codex's
"per-day schedules and exceptions" nearly covers this; what's missing is that a closure can carry
**a replacement instruction to the visitor**.

### Bonus — `locations.json` already exists
`content/leiden/locations/locations.json` holds **L001–L014** with every content field `null` on
purpose. It is the promotion step's input, not a competing format. Convert it; don't ignore it,
and don't fill it.

---

## 5. SMALLER NOTES

- **Two vendors (Vercel + Cloudflare)** for a project at this stage. Defensible, and Codex gives
  the reasoning — but worth the user seeing it stated plainly as a bill and a second account.
- **`docs/ux/wireframe-inventory.md` isn't referenced.** It maps the user's wireframe onto master
  §19's `W##` codes and lists what's missing — including the §15 AI disclosure and the entirely
  absent *Look Around You*. `ENG-SKEL-001` should start there.
- **Codex branched from `main`**, which has none of Claude's work. The ADR nonetheless cites C052,
  `ENG-GEO-001` and `FND-005` correctly, so the context was read. Worth noting only because
  **`main` is still two commits of uploaded files** — neither agent's work has landed. That is the
  user's call to make, and until they merge, both branches are the project.

---

## 6. WHAT I DID NOT REVIEW

- Cost, vendor terms, and EU data-location requirements. Codex correctly lists these as pre-approval
  checks and I am not the right reviewer for them.
- Whether MapLibre performs acceptably on low-end mobile. That needs the spike Codex proposes,
  not an opinion.
