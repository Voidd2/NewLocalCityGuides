# YOURLOCALCITYGUIDE — MASTER PROJECT OPERATING SYSTEM
Version: 1.1
Last updated: 2026-09-13
Project status: FOUNDATION / CITY DISCOVERY — Phase 1A discovery pass COMPLETE
Primary city: Leiden, Netherlands
Repository status: In Git. Not yet linked to domain or production hosting.
Purpose of this file: SINGLE SOURCE OF TRUTH for Claude, Codex and any future AI agent or human contributor.

## WHERE THINGS LIVE (read this with §22 and §23)

| File | What it is | Owner |
|---|---|---|
| `YOURLOCALCITYGUIDE_MASTER_V1.md` | This file. Vision, locked decisions, rules, phases, status. **Wins every conflict.** | shared |
| `docs/TASKBOARD.md` | **The operational view: who is doing what, right now, and what is blocked.** Start here after reading this file. | shared |
| `docs/COLLABORATION-PROTOCOL.md` | **How Claude and Codex work simultaneously: push cadence, always-open PR, file ownership.** BINDING. | shared |
| `docs/handoffs/HANDOFF-LOG.md` | Every completed task's handoff (§25). No handoff = task incomplete. | shared |
| `docs/ux/wireframe-inventory.md` | The user's wireframe mapped onto the `W##` codes in §19, with gaps and conflicts | Role E |
| `docs/ux/wireframe-website-v1.png` | The user's original wireframe artefact | user |
| `content/leiden/candidates/leiden-candidate-register.md` | **The Phase 1A output: 65 candidate locations.** Nothing is selected. | Role A |
| `docs/research/leiden-theme-coverage.md` | Phase 1C: what an MVP taken off the ranking would never get to say | Role A/G |
| `content/leiden/locations/MVP-PROPOSAL.md` | ⚠️ **Phase 1D: 14 locations PROPOSED, awaiting the user.** Not locked. | Role A |
| `content/leiden/candidates/leiden-candidate-scores.md` | **Phase 1B: all 60 scored, Tier A/B/C assigned.** Still no MVP. | Role A |
| `docs/qa/LDN-VERIFY-001-verification-log.md` | What was checked, what was wrong, what stays unresolved | Role B/G |
| `content/leiden/sources/leiden-source-leads.md` | Institutions and source leads, ranked by the §6 policy | Role A/B |
| `docs/decisions/` | Decision records (`DEC-0xx`). A decision is not LOCKED until the user approves it. | shared |

---

# 0. ABSOLUTE RULE: READ THIS FIRST

This project must never be built from random ideas, isolated chats, or unsourced historical claims.

This file is the CENTRAL OPERATING SYSTEM of YourLocalCityGuide.

Every agent must:
1. Read this file before starting any task.
2. Read CURRENT STATUS.
3. Read LOCKED DECISIONS.
4. Read the active task and its dependencies.
5. Work only from verified project state.
6. Update this file after every meaningful task.
7. Leave a clear handoff for the next agent.
8. Never silently overwrite another agent's work.
9. Never invent historical facts.
10. Never choose a "main location" before the citywide discovery phase is complete.
11. Never write a final historical video before historical research and source verification are complete.
12. Never mark a task DONE because it "looks good". DONE means all required checks passed.

If there is a conflict between:
- a chat message,
- a code comment,
- an agent assumption,
- an old note,
- this file,

THIS FILE WINS unless the user explicitly changes a decision.

---

# 1. PROJECT VISION

## Product name
YourLocalCityGuide

## First city
Leiden

## Long-term product
A mobile-first city discovery platform that lets visitors physically explore a city and experience its history, stories and local context exactly where those stories happened.

The platform combines:
- interactive map;
- GPS / nearby discovery;
- curated routes;
- historical storytelling;
- short cinematic historical AI reconstructions;
- voice-over;
- fun facts;
- "look around you" physical details;
- then-versus-now comparisons;
- practical city information;
- future local business discovery;
- future multi-city expansion.

## Core promise
"Stand where history happened. See the story come alive."

## Product principle
The city itself is part of the interface.

The visitor should regularly be told:
- look above you;
- look across the canal;
- turn around;
- notice this stone;
- compare this building;
- walk 120 metres;
- imagine this street in another century.

The website must connect digital content to the physical environment.

---

# 2. WHAT THIS PRODUCT IS NOT

YourLocalCityGuide is NOT:
- a generic tourist information website;
- a Wikipedia clone;
- only an audio tour;
- only an AI chatbot;
- only a map;
- only a historical video library;
- only a Rembrandt tour;
- a single fixed walking route;
- a native app that must be installed;
- a project where one location is arbitrarily chosen as the centre of Leiden.

No location is automatically the flagship.

A flagship location may emerge later based on:
- historical significance;
- visual reconstruction potential;
- tourist foot traffic;
- source quality;
- narrative quality;
- geographic usefulness;
- route connectivity;
- uniqueness;
- production feasibility.

---

# 3. LOCKED DECISIONS

These decisions may only be changed with explicit user approval.

- City #1 = Leiden.
- Mobile-first.
- Web app / PWA first.
- No mandatory app installation.
- No mandatory account for normal use.
- Visitors can explore freely on a map.
- Visitors can also choose curated routes.
- GPS may suggest nearby places.
- GPS is optional; the site must still work without permission.
- Historical videos are pre-produced, not generated live.
- AI-generated historical content must be labelled appropriately.
- Historical accuracy is more important than visual spectacle.
- The system must support multiple cities later.
- English and Dutch must be supported early.
- All historical content must be structurally stored, not scattered randomly in UI code.
- Research comes before storytelling.
- Storytelling comes before final video production.
- No location is labelled "main", "hero" or "flagship" before Phase 1 scoring.
- Every location has a source trail.
- Every final historical claim must be traceable to evidence.
- Every reconstruction assumption must be documented separately from verified facts.

---

# 4. AGENT OPERATING MODEL

Claude, Codex and other agents may work on the same repository, but they must not behave as independent projects.

## Working simultaneously — READ `docs/COLLABORATION-PROTOCOL.md`

Claude and Codex now work on this repository **at the same time**, in separate sessions
that cannot see each other. Neither can read the other's chat. The only shared reality is
**what has been pushed to GitHub**.

Therefore, binding on every agent:

1. **Push often.** After every completed task, after every meaningful chunk of work
   (roughly every 30–60 minutes), and always before ending a session. Never end a turn with
   uncommitted work. Work that is not pushed does not exist.
2. **Always keep a pull request open.** Open it — as a draft if unfinished — as soon as your
   branch has its first commit. Its description is a live status document, updated on every
   meaningful push. Never work on a branch with no PR.
3. **Read before you write.** `git fetch origin`, then master §36 → `docs/TASKBOARD.md` →
   `docs/handoffs/HANDOFF-LOG.md` → the other agent's open PR.
4. **Claim your task on the board and push that claim immediately**, before doing the work.
5. **Stay in your lane.** File ownership is defined in the protocol: Claude owns
   `content/**`, `docs/research/**`, `docs/ux/**`, `docs/qa/**`; Codex owns `src/**`,
   configs, `public/**`. Shared files are edited section-by-section, never reformatted
   wholesale.

The full rules, including the work cycle and the one sanctioned cross-boundary edit, are in
`docs/COLLABORATION-PROTOCOL.md`.

## Shared state
All agents share:
- this master file;
- the Git repository;
- the content model;
- task IDs;
- source records;
- decision log;
- status fields;
- handoffs.

## Recommended roles

### ROLE A — City Discovery Researcher
Best suited to Claude or another research-capable agent.

Purpose:
Find ALL relevant candidate places in Leiden before deep-diving.

Responsibilities:
- citywide historical inventory;
- landmarks;
- streets;
- squares;
- bridges;
- canals;
- churches;
- university locations;
- industrial heritage;
- war history;
- disasters;
- hidden stories;
- markets;
- famous people;
- archaeology;
- social history;
- architecture;
- trade;
- water;
- science;
- art;
- migration;
- religion;
- government;
- everyday life.

Output:
Candidate Location Register.

### ROLE B — Historical Researcher
Purpose:
Deeply research one selected location.

Responsibilities:
- primary sources;
- official archives;
- academic sources;
- timelines;
- facts;
- disputed claims;
- historic maps;
- paintings;
- photos;
- people;
- events;
- physical environment;
- reconstruction constraints.

### ROLE C — Story Architect
Purpose:
Turn verified research into an excellent visitor experience.

Responsibilities:
- hooks;
- short story;
- extended story;
- fun facts;
- "look around you";
- visitor interaction;
- story arc;
- route relevance;
- emotional pacing.

### ROLE D — Historical Video Director
Purpose:
Translate verified research into cinematic reconstruction.

Responsibilities:
- choose period/event;
- script;
- shot list;
- camera position;
- visual references;
- character actions;
- costumes;
- architecture;
- props;
- soundscape;
- narration;
- continuity;
- historical constraints;
- AI generation prompts.

### ROLE E — Product / UX Designer
Purpose:
Design the experience across map, routes and place pages.

Responsibilities:
- wireframes;
- information hierarchy;
- navigation;
- route progress;
- location discovery;
- mobile interaction;
- accessibility;
- failure states;
- GPS permission flow.

### ROLE F — Engineer
Best suited to Codex.

Responsibilities:
- application architecture;
- components;
- content schema;
- map;
- geolocation;
- routes;
- video player;
- analytics;
- language system;
- performance;
- tests;
- deployment config;
- developer tooling.

### ROLE G — Quality Reviewer
Purpose:
Challenge completed work.

Checks:
- historical accuracy;
- source quality;
- duplicated content;
- weak storytelling;
- accessibility;
- mobile UX;
- technical regressions;
- broken route logic;
- unsupported claims;
- inconsistent tone.

---

# 5. PROJECT PHASES

The project must progress in this order.

---

## PHASE 0 — FOUNDATION
Status: IN PROGRESS

Goal:
Create a stable system before producing content or code at scale.

Required:
- [x] Product concept
- [x] Leiden first
- [x] Map + route model
- [x] Location storytelling concept
- [x] Shared master file system
- [x] Agent roles
- [x] No arbitrary flagship location rule
- [x] Repository initialized (`FND-001`)
- [x] Repository structure built per §22 (`FND-003`)
- [x] Task board initialized — `docs/TASKBOARD.md` (`FND-003`)
- [x] Wireframe inventory extracted — `docs/ux/wireframe-inventory.md` (`FND-004`)
- [x] Source lead register built — `content/leiden/sources/leiden-source-leads.md` (`LDN-SRC-001`)
- [ ] Tech stack locked — `FND-002`, **assigned to Codex, top blocker**
- [ ] Content schema locked — `FND-005`, blocked by `FND-002`
- [ ] Design principles locked — awaiting user confirmation of the identity read in the wireframe inventory
- [ ] Wireframe inventory **approved by user** (extracted, not yet approved)
- [ ] Research source policy approved by user

Exit criteria:
Claude and Codex can work without guessing the workflow.

Remaining blockers to leaving Phase 0: `FND-002` (Codex) and the user decisions listed in
`docs/TASKBOARD.md` §4.

---

## PHASE 1 — LEIDEN CITY DISCOVERY
Status: IN PROGRESS — 1A complete, 1B not started
IMPORTANT: NO DEEP VIDEO PRODUCTION YET.

Goal:
Build the most complete practical inventory possible of places and stories in Leiden that could deserve a location experience.

### Phase 1A — Candidate discovery
Research Leiden broadly.

Do not start with only famous tourist attractions.

Search for:
- major landmarks;
- hidden history;
- streets with specific stories;
- unusual architecture;
- historical businesses;
- old gates;
- bridges;
- canals;
- market areas;
- university history;
- science;
- famous residents;
- artists;
- wars;
- sieges;
- religious conflict;
- disasters;
- fires;
- explosions;
- epidemics;
- industry;
- textiles;
- migration;
- working-class history;
- elite history;
- public punishment / justice;
- trade;
- shipping;
- guilds;
- hospitals;
- orphanages;
- almshouses;
- archaeology;
- medieval city development;
- Golden Age;
- 19th century;
- WWII;
- resistance;
- post-war development;
- modern cultural stories when historically relevant.

### Required output
Create a Candidate Location Register with at least these fields:

- Candidate ID
- Name
- Coordinates if known
- Type
- Era(s)
- Main historical theme
- Known event/person/process
- Tourist relevance
- Visual reconstruction potential
- Physical visibility today
- Existing source quality
- Route connectivity
- Estimated story strength
- Estimated video strength
- Accessibility
- Potential overlap with other locations
- Research confidence
- Notes

### Minimum discovery target
Do not stop after 10 locations.

Initial target:
30–60 candidate places/stories.

The purpose is to avoid prematurely building around only the most obvious attractions.

### STATUS — Phase 1A: COMPLETE, VERIFIED (2026-09-13)
Delivered: `content/leiden/candidates/leiden-candidate-register.md` — **60 candidates**
across 8 thematic clusters. Gate A passed for all 60.

`LDN-DISC-002` closed five of the seven gaps: Roman Leiden (C053), justice (C054), care and
orphanages (C055), the 1944 bombardments (C058), post-war Leiden (C060), and women's history
in its most substantial form — women's labour (C057) and the Leiden women's movement (C059).

`LDN-VERIFY-001` checked every `LOW` entry and every superlative. Of five superlatives: one
verified, one overstated, one disputed between reputable sources, one **plainly false**
(the "oldest hofje" claim, wrong by 25 years). C013, C015 and C035 remain `LOW` and are
**barred from MVP selection** until resolved. Full log: `docs/qa/LDN-VERIFY-001-verification-log.md`.

Two gaps remain, for `LDN-DISC-003`: **migration to Leiden since 1960**, and **named Leiden
women documented in their own right**.

---

## PHASE 1B — Candidate scoring
Status: **COMPLETE (2026-09-13)** → `content/leiden/candidates/leiden-candidate-scores.md`

Every discovered candidate receives a score from 1–5 for:

1. Historical significance
2. Story quality
3. Visual reconstruction potential
4. Source quality
5. Physical place still visible
6. Tourist footfall potential
7. Geographic usefulness
8. Route connectivity
9. Uniqueness
10. Mobile storytelling potential
11. "Look around you" potential
12. Then-vs-now potential
13. Accessibility
14. Family friendliness
15. International visitor appeal

Weighted scoring may later be introduced.

### Output
Create:
- Tier A locations
- Tier B locations
- Tier C locations

Tier A:
strong MVP candidates

Tier B:
good future content

Tier C:
interesting archive / future expansion

Do not call anything "flagship" yet.

---

## PHASE 1C — Story coverage analysis
Status: **COMPLETE (2026-09-13)** → `docs/research/leiden-theme-coverage.md`.
Finding: an MVP taken off the ranking would contain **no Siege and no WWII** — two themes this
section names explicitly. Resolved by reserving three MVP slots, visibly, rather than by
re-weighting the rubric after seeing the results.

Before choosing the MVP, check if Leiden's history is represented broadly.

Required theme coverage review:
- medieval Leiden
- Siege / Relief of Leiden
- Rembrandt / art
- university
- science
- trade
- markets
- textiles
- water
- religion
- architecture
- disaster
- social history
- WWII
- hidden everyday stories

Avoid an MVP consisting of ten locations that all tell essentially the same Golden Age story.

---

## PHASE 1D — MVP location selection
Status: ⚠️ **PROPOSED, NOT DECIDED (2026-09-13)** → `content/leiden/locations/MVP-PROPOSAL.md`
14 locations: 10 from Tier A, plus reserved slots for the Siege, textile labour, and WWII.
All fifteen §1C themes covered. **Awaiting the user (board Q8, Q9).**

Only now select the first production locations.

Initial target:
8–15 locations.

Selection must optimize:
- story variety;
- geographical walkability;
- tourist usefulness;
- video feasibility;
- source quality;
- production cost;
- route design.

After this selection, assign official IDs:
L001, L002, L003...

IMPORTANT:
IDs follow selection order or internal registry order.
They do NOT imply importance.

---

# 6. SOURCE POLICY

Historical reliability is a product feature.

## Preferred sources

Level 1 — PRIMARY
- archival documents
- historic maps
- historic paintings
- contemporary drawings
- contemporary newspapers
- government records
- original letters
- photographs

Level 2 — OFFICIAL HERITAGE
- Erfgoed Leiden
- Museum De Lakenhal
- Leiden municipality
- Rijksmuseum
- RCE
- National Archives
- university archives
- official monument registers

Level 3 — ACADEMIC
- peer-reviewed research
- university publications
- scholarly books
- theses where appropriate

Level 4 — TRUSTED SECONDARY
- reputable historical organizations
- well-sourced cultural publications
- established reference works

Level 5 — DISCOVERY ONLY
- travel blogs
- general commercial tourism sites
- social media
- unsourced articles

Level 5 may lead to a story, but may not be the sole support for important historical claims.

## Wikipedia rule
Wikipedia may be used to:
- discover names;
- discover dates;
- discover source leads.

Wikipedia may NOT be the final evidence source for key claims when better sources exist.

---

# 7. CANDIDATE LOCATION REGISTER TEMPLATE

For every candidate:

## Candidate
Candidate ID:
Name:
Alternative names:
Coordinates:
Address:
Place type:
Visible today: YES / PARTIAL / NO
Publicly accessible: YES / PARTIAL / NO

## History summary
Era(s):
Main theme:
Known historical events:
Known people:
Known processes:
What physically happened here:

## Story potential
Core possible hook:
What makes it surprising:
What could a visitor physically notice:
Potential emotional angle:
Potential "day in the life":
Potential major event:
Potential process explanation:

## Media potential
Historic maps:
Paintings:
Drawings:
Photos:
Film:
3D references:
Current photography needed:

## Video potential
Score 1–5:
Possible target year(s):
Possible scene:
Major uncertainty:

## Route value
Nearby candidates:
Natural route themes:
Walking usefulness:

## Sources
List source records.

## Score
Historical significance:
Story:
Visual:
Sources:
Visibility:
Footfall:
Connectivity:
Uniqueness:
Mobile:
Look-around:
Then-now:
Accessibility:
International appeal:
TOTAL:

## Decision
Tier:
Reason:
Next action:

---

# 8. SELECTED LOCATION DEEP RESEARCH PIPELINE

Once a candidate is selected for production, it receives an L-ID.

Example only:
L00X — [Location Name]

Every selected location must go through these work packages.

### R01 — Historical research
Deep factual investigation.

### R02 — Source verification
Challenge important claims.

### R03 — Visual reconstruction research
Determine:
- street shape;
- buildings;
- water;
- surfaces;
- vehicles;
- ships;
- clothing;
- signage;
- objects;
- vegetation;
- weather context if relevant.

### R04 — Human activity research
What did people actually DO there?

### R05 — Uncertainty register
Separate:
- verified;
- probable;
- plausible;
- unknown;
- disputed.

### C01 — Core visitor story
Short and powerful.

### C02 — Extended story
For visitors who want more.

### C03 — Fun facts
Minimum 3, ideally 5+ candidates.

### C04 — Look Around You
Physical observations.

### C05 — Timeline
3–8 milestones.

### C06 — Then vs Now
Historical comparison.

### C07 — FAQ / visitor questions
Possible questions:
- What was this used for?
- Who lived here?
- Is this original?
- Why does it look like this?
- What happened next?

### V01 — Video opportunity analysis
Before choosing one video, generate multiple concepts.

### V02 — Video concept selection
Select strongest historically defensible concept.

### V03 — Storyboard
Shot-by-shot.

### V04 — Narration
Voice-over.

### V05 — Historical constraints
Things AI must get right.

### V06 — Negative constraints
Things AI must NOT show.

### V07 — Generation prompt pack
Tool-agnostic prompts and references.

### V08 — Subtitle text
Short readable subtitles.

### UX01 — Location page content structure
How content appears on phone.

### MAP01 — Map metadata
Coordinates, time, tags, accessibility.

### RT01 — Route connections
Which routes include it and why.

### Q01 — Historical QA
### Q02 — Story QA
### Q03 — Video QA
### Q04 — Mobile QA
### Q05 — Source QA

Location status may only become PRODUCTION READY after all required work packages pass.

---

# 9. WHAT RESEARCH MUST ANSWER FOR EVERY LOCATION

Agents must not research only dates and architect names.

They must answer:

## Place
- What was this place?
- When was it created?
- What changed over time?
- Which parts survive?
- What no longer exists?

## People
- Who came here?
- Who worked here?
- Who lived here?
- Who controlled it?
- Who benefited?
- Who suffered?
- Are specific historical people documented?

## Action
- What physically happened here?
- At what times of day?
- What did workers do?
- What tools were used?
- How did goods/people move?
- What sounds were normal?
- What smells were plausible?
- What would a visitor have noticed?

## Environment
- What did the street look like?
- Was there water?
- Were buildings different?
- What materials were visible?
- What transport existed?
- What signs/lighting existed?
- What was the likely crowd density?

## Narrative
- What is the one story someone will remember?
- Is there conflict?
- Is there transformation?
- Is there a human perspective?
- Is there an unexpected detail?

## Physical connection
- What can a visitor still see?
- Where should they stand?
- Which direction should they look?
- Can current geometry be matched to historical references?

## Video
- What exactly should be shown?
- What is visually meaningful?
- What should NOT be invented?
- What is the strongest transition from present to past?

---

# 10. STORY SYSTEM

Each location should support layered storytelling.

## Layer 1 — Instant hook
Maximum 12 words.

Purpose:
Stop the scroll.

Example structure:
"You are standing where..."
"Three centuries ago..."
"This quiet square once..."
"Look at the water..."

## Layer 2 — 20–45 second experience
Video + narration.

Purpose:
Immediate historical payoff.

## Layer 3 — 100–180 word story
Short reading.

## Layer 4 — Deeper detail
Optional:
- timeline;
- people;
- event;
- process;
- archival image;
- FAQ.

## Layer 5 — physical interaction
"Look around you."

## Layer 6 — continue
Nearby place or route.

---

# 11. FUN FACT SYSTEM

Fun facts must not be random trivia.

A good fun fact is:
- surprising;
- memorable;
- relevant to the place;
- sourced;
- not already obvious from the main story.

Each fun fact record:
- fact ID;
- claim;
- short explanation;
- source;
- certainty;
- whether visible physically;
- whether suitable for children;
- whether suitable for social sharing.

Avoid:
- generic dates;
- unsourced legends presented as fact;
- repeated facts from the main story.

---

# 12. "LOOK AROUND YOU" SYSTEM

This feature is central.

For every location research:
- architectural details;
- inscriptions;
- statues;
- reliefs;
- stones;
- windows;
- bridges;
- waterlines;
- sightlines;
- street shape;
- old walls;
- surviving objects.

Each item must include:
- instruction;
- direction;
- target object;
- explanation;
- historical relevance;
- accessibility note;
- confidence.

Example:
"Look above the entrance."
Only use this if the relevant object is definitely visible from the visitor position.

---

# 13. THEN VS NOW SYSTEM

Possible implementations:
- image slider;
- fade transition;
- matched camera angle;
- historic overlay;
- side-by-side.

Required:
- historical source;
- date;
- current photo;
- approximate viewpoint;
- caption;
- known changes.

Do not fake a "then" image if it is presented as archival.
AI reconstruction must be labelled as reconstruction.

---

# 14. HISTORICAL VIDEO SYSTEM

Videos are a signature feature, but not every location necessarily needs the same type.

## Candidate video types

### Type A — Present-to-past transformation
Same camera position:
today → historical period.

### Type B — How it worked
Visual process:
arrival → action → result.

### Type C — Day in the life
Follow a plausible documented type of person.

### Type D — Major event
Reconstruct a specific historical event.

### Type E — Before / After
Show a destroyed, rebuilt or transformed place.

### Type F — Hidden layer
Reveal what no longer exists.

### Type G — Person-centered
A documented historical person at the place.

## Before selecting a video
The agent must propose 2–5 concepts.

For each:
- historical defensibility;
- visual impact;
- source availability;
- emotional value;
- production difficulty;
- risk of hallucination;
- mobile suitability.

Then select the best.

---

# 15. VIDEO SCRIPT TEMPLATE

## Video ID
Location:
Video type:
Target period:
Target length:
Language base:
Aspect strategy:
Historical confidence:

## One-sentence concept

## Visitor starting position

## Scene 1
Time:
Visual:
Camera:
People:
Action:
Architecture:
Props:
Sound:
Narration:
Source(s):
Uncertainty:

Repeat per scene.

## Ending
- return to present?
- freeze on historic detail?
- ask visitor to look somewhere?
- suggest next place?

## On-screen disclosure
"AI historical reconstruction based on historical and archival sources."

---

# 16. VIDEO HISTORICAL CONSTRAINT PACK

Every video gets:

## Must show
Verified required elements.

## May show
Plausible elements supported by era research.

## Must not show
Anachronisms or unsupported details.

Examples:
- modern road markings;
- electric lighting;
- modern windows;
- wrong ship type;
- wrong clothing;
- modern street furniture;
- inaccurate church tower;
- cars;
- asphalt;
- plastic;
- wrong flags;
- historically impossible crowd composition.

This is essential for AI generation quality.

---

# 17. ROUTE SYSTEM

The platform must support BOTH:

1. Curated routes
2. Free map exploration

Neither is secondary.

## Free exploration
User opens map:
- current location;
- nearby history;
- categories;
- distance;
- estimated experience length;
- visited status.

## Curated routes
Routes are stories, not only stop lists.

Possible categories:
- Leiden Essentials
- Leiden Through Time
- Siege & Relief
- Rembrandt & Art
- University & Science
- Trade, Markets & Water
- Hidden Leiden
- Disasters & Rebuilding
- Family route
- Quick 30-minute route

These are examples only.
Final routes must be based on Phase 1 location discovery.

## Route research requirements
For every route:
- story arc;
- stop order;
- walking logic;
- distance;
- duration;
- accessibility;
- start/end convenience;
- thematic consistency;
- narrative progression;
- poor-weather feasibility;
- optional shortcuts.

---

# 18. MAP EXPERIENCE

Required map abilities:
- show user location;
- nearby locations;
- selected route;
- visited locations;
- categories;
- time period;
- walking distance;
- preview cards;
- optional filters;
- open place page;
- resume route.

Do not overload the map.

Mobile user must understand:
"Where am I?"
"What is nearby?"
"Why should I go there?"
"How long will it take?"

---

# 19. REQUIRED PAGE INVENTORY / WIREFRAME SYSTEM

Before code is finalized, wireframes should exist for:

## Entry / onboarding
W01 — Splash / loading
W02 — Language choice
W03 — Location permission
W04 — Short product introduction

## Main discovery
W10 — Leiden home
W11 — Explore near me
W12 — Map
W13 — Location list
W14 — Search
W15 — Filters

## Location experience
W20 — Location hero
W21 — Historical video
W22 — Short story
W23 — Extended story
W24 — Fun facts
W25 — Look Around You
W26 — Then vs Now
W27 — Timeline
W28 — Practical information
W29 — Nearby places
W30 — Location completion / continue

## Routes
W40 — All routes
W41 — Route detail
W42 — Start route
W43 — Route navigation
W44 — Route stop
W45 — Route progress
W46 — Route completion

## Saved / progress
W50 — Saved locations
W51 — Visited history
W52 — Route progress

## City
W60 — About Leiden
W61 — Practical city information
W62 — How it works

## Utility
W70 — No GPS state
W71 — Offline / bad connection
W72 — Video failed
W73 — Empty search
W74 — 404
W75 — Language fallback
W76 — Accessibility options

## Later / optional
W80 — Local recommendations
W81 — Partner listing
W82 — Premium route
W83 — Purchase/pass
W84 — AI Q&A historical guide

Do not build all optional pages in MVP.

---

# 20. UX PRINCIPLES

- mobile-first;
- cinematic but fast;
- minimal clutter;
- strong hierarchy;
- one obvious primary action;
- large tap targets;
- tourist-friendly;
- no account walls;
- content visible even when GPS denied;
- videos never block the entire experience;
- subtitle support;
- slow connection fallback;
- map must not feel like a developer demo;
- avoid generic tourism-template design;
- no endless walls of text;
- physical environment should regularly become part of UX.

---

# 21. CONTENT DATA MODEL

Conceptual model only; implementation may evolve.

```ts
type City = {
  id: string;
  slug: string;
  name: string;
  center: Coordinates;
  languages: string[];
  locationIds: string[];
  routeIds: string[];
};

type CandidateLocation = {
  candidateId: string;
  name: string;
  coordinates?: Coordinates;
  themes: string[];
  eras: string[];
  summary: string;
  scores: CandidateScore;
  sources: SourceRecord[];
  tier?: "A" | "B" | "C";
  decisionNotes?: string;
};

type Location = {
  id: string;
  cityId: string;
  slug: string;
  name: string;
  coordinates: Coordinates;
  address?: string;
  eras: string[];
  categories: string[];
  durationMinutes: number;

  hook: LocalizedText;
  shortStory: LocalizedText;
  extendedStory?: LocalizedText;
  whyItMatters?: LocalizedText;

  funFacts: FunFact[];
  lookAround: LookAroundItem[];
  timeline: TimelineItem[];
  thenVsNow?: ThenVsNow[];
  videos: HistoricalVideo[];

  practicalInfo?: PracticalInfo;
  routeIds: string[];
  nearbyLocationIds: string[];

  sources: SourceRecord[];
  uncertainty: UncertaintyRecord[];
  status: LocationStatus;
};

type SourceRecord = {
  id: string;
  title: string;
  institution?: string;
  url?: string;
  sourceType:
    | "PRIMARY"
    | "OFFICIAL"
    | "ACADEMIC"
    | "SECONDARY"
    | "DISCOVERY_ONLY";
  claimsSupported: string[];
  notes?: string;
};

type HistoricalVideo = {
  id: string;
  type: string;
  period: string;
  concept: string;
  script: string;
  scenes: VideoScene[];
  sources: string[];
  mustShow: string[];
  mayShow: string[];
  mustNotShow: string[];
  disclosure: string;
};
```

---

# 22. REPOSITORY STRUCTURE — RECOMMENDED

```text
yourlocalcityguide/
│
├── YOURLOCALCITYGUIDE_MASTER.md
├── README.md
├── package.json
│
├── docs/
│   ├── research/
│   ├── ux/
│   ├── decisions/
│   └── qa/
│
├── content/
│   └── leiden/
│       ├── candidates/
│       ├── locations/
│       ├── routes/
│       └── sources/
│
├── public/
│   ├── images/
│   ├── video/
│   ├── audio/
│   └── archive-references/
│
└── src/
    ├── app/
    ├── components/
    ├── features/
    ├── lib/
    ├── styles/
    └── types/
```

IMPORTANT:
This master file remains the management source of truth.
Large research bodies may live in structured files under `/content` or `/docs`, but the master file must always contain status, decisions and references to them.

---

# 23. ONE FILE VS MANY FILES RULE

The user wants Claude and Codex to "work from one file".

Interpretation:
- ONE master control file = this file.
- NOT all code and research literally dumped into one physical file.

Why:
A single giant file containing all source code, every video script and every historical source would become unstable and difficult to merge.

Correct architecture:
- this file = central brain;
- research/content files = detailed records;
- code = normal project structure;
- Git = version history;
- every task updates this file with status and links/paths.

Agents MUST NOT create hidden project state that exists only in chat.

---

# 24. TASK ID SYSTEM

## Foundation
FND-001 etc.

## City discovery
LDN-DISC-001

## Candidate research
CAN-[ID]-R01

## Selected location
L001-R01
L001-C01
L001-V01
etc.

## Routes
RT001-R01
RT001-C01
RT001-UX01

## UX
UX-W10
UX-W20

## Engineering
ENG-MAP-001
ENG-LOC-001
ENG-VIDEO-001

## QA
QA-HIST-001
QA-MOBILE-001

Task IDs must appear in:
- commits;
- master updates;
- handoffs;
- issue names if GitHub Issues are used.

---

# 25. AGENT HANDOFF FORMAT

At the end of EVERY meaningful task, append/update:

## HANDOFF
Agent:
Role:
Date:
Task ID:
Status:

### Completed
- ...

### Files changed
- ...

### Facts added
- ...

### Sources added
- ...

### Decisions made
- ...

### Uncertainty / risks
- ...

### What must NOT be assumed
- ...

### Recommended next task
- ...

### Master file updated
YES / NO

No handoff = task incomplete.

---

# 26. GIT WORKFLOW

**Full rules: `docs/COLLABORATION-PROTOCOL.md`. This section is the summary.**

Because Claude and Codex work at the same time and cannot see each other's sessions,
GitHub is the only shared reality. Push frequently, and always keep a PR open.

Before work:
```bash
git fetch origin
git merge origin/main
# then read: master §36 → docs/TASKBOARD.md → HANDOFF-LOG → the other agent's open PR
```

Claim your task on the board and push that claim **before** starting:
```bash
git add docs/TASKBOARD.md
git commit -m "[TASK-ID] Claim task on board"
git push -u origin <your-branch>
```

During work — push every meaningful chunk, at least every 30–60 minutes:
```bash
git add -A
git commit -m "[TASK-ID] Clear description"
git push -u origin <your-branch>
```

Unfinished work is pushed too, marked `[WIP]`. A visible half-finished thing beats an
invisible finished thing.

Always keep a pull request open for your branch — draft while in progress — and keep its
description current. The PR is how the other agent and the user read your work without
asking you.

Never end a session with uncommitted work. Never push to `main` or to the other agent's
branch. Never merge your own PR unless the user says so.

Examples:
```text
[LDN-DISC-001] Build Leiden candidate location inventory
[CAN-023-R01] Research candidate Pieterskerk
[L004-R02] Verify historical sources
[L004-V03] Create historical video storyboard
[ENG-MAP-001] Build map foundation
```

If simultaneous work creates conflict:
use branches.

Examples:
```text
claude/leiden-discovery
claude/location-research-l004
codex/map-engine
codex/location-template
```

---

# 27. QUALITY GATES

## Gate 0 — What "DONE" means for any task
A task is DONE only when **all six** are true:
1. its quality gate below passes;
2. the output is committed **and pushed**;
3. `docs/TASKBOARD.md` says DONE;
4. a handoff exists in `docs/handoffs/HANDOFF-LOG.md` (§25);
5. §36 CURRENT STATUS reflects the new state;
6. the pull request description is current.

Missing any one of them means the other agent is working from a false picture of the project.

## Gate A — Candidate discovered
Must have:
- place;
- why relevant;
- at least one credible source lead;
- basic story potential.

## Gate B — Candidate shortlisted
Must have:
- score;
- source quality assessment;
- video potential;
- route value.

## Gate C — Location research complete
Must have:
- source trail;
- uncertainty register;
- physical activity;
- environment;
- people;
- visual references.

## Gate D — Story ready
Must have:
- hook;
- short story;
- fun facts;
- look around;
- timeline.

## Gate E — Video ready
Must have:
- selected concept;
- storyboard;
- narration;
- constraints;
- references.

## Gate F — Production ready
Must pass:
- historical QA;
- copy QA;
- UX QA;
- mobile QA;
- performance QA.

---

# 28. ANALYTICS PLAN

Eventually track:

Acquisition:
- QR source;
- direct;
- search;
- partner.

Discovery:
- map opened;
- near-me opened;
- route viewed;
- search used.

Location:
- page viewed;
- video started;
- 25%;
- 50%;
- 75%;
- 100%;
- fun fact opened;
- look-around used;
- then-now used;
- next location clicked.

Route:
- started;
- stop reached;
- stopped;
- resumed;
- completed.

Technical:
- GPS accepted;
- GPS denied;
- video failure;
- slow connection fallback.

No invasive tracking is required for MVP.

---

# 29. PERFORMANCE RULES

Tourists may have:
- roaming;
- weak signal;
- old phones;
- low battery.

Therefore:
- fast first paint;
- no autoplay giant video before consent/interaction;
- lazy-load heavy assets;
- compressed video;
- poster images;
- basic story accessible without video;
- map load optimized;
- graceful GPS failure;
- offline-like caching considered later;
- avoid excessive JavaScript.

---

# 30. LANGUAGE RULES

Canonical historical facts should be language-neutral in research.

Visitor-facing languages:
Initial:
- English
- Dutch

Later:
- German
- French
- Spanish

Translation rules:
- do not translate proper names incorrectly;
- do not create historical contradictions between languages;
- voice-over scripts may be localized;
- user-facing tone may differ slightly;
- all language versions point to the same factual source base.

---

# 31. LOCAL BUSINESS / MONETIZATION — LATER

Not part of initial historical research.

Future possibilities:
- nearby cafés;
- traditional food;
- museums;
- canal cruises;
- shops;
- hotels;
- partner routes;
- premium passes.

Critical rule:
Paid placement must never corrupt historical ranking or factual content.

Commercial recommendations must be clearly distinguished from historical content.

---

# 32. MVP DEFINITION — NOT YET FINAL

Do NOT finalize MVP location list before Phase 1.

Likely MVP functional scope:
- Leiden home;
- map;
- nearby;
- location pages;
- historical videos;
- stories;
- fun facts;
- look-around;
- then-now;
- routes;
- English/Dutch;
- QR attribution;
- analytics.

Likely first content scope:
8–15 locations.

This number may change after discovery.

---

# 33. FIRST REQUIRED TASKS

> The authoritative, continuously updated task list is **`docs/TASKBOARD.md`**.
> This section holds the headline status only. If the two disagree, the task board is
> more current — and whoever notices must fix this section.

## Task FND-001
Initialize GitHub repository and add this file.

Status: **DONE**

## Task FND-003
Build repository structure (§22), task board and handoff log.

Status: **DONE** — 2026-09-13, Claude

## Task FND-004
Extract the wireframe inventory from the user's wireframe.

Status: **DONE** — 2026-09-13, Claude → `docs/ux/wireframe-inventory.md`
Awaiting user approval of the reading and of the visual identity.

## Task FND-002
Lock technical stack.

Status: **NEEDS USER / ASSIGNED TO CODEX**
Codex writes `docs/decisions/DEC-009-tech-stack.md` with a recommendation and trade-offs;
the user approves. **This is the project's top blocker** — all engineering waits on it.
Per §3, Codex may not self-approve a locked decision.

## Task LDN-SRC-001
Build the Leiden source lead register.

Status: **DONE** — 2026-09-13, Claude → `content/leiden/sources/leiden-source-leads.md`

## Task LDN-DISC-001
Build full Leiden Candidate Location Register.

Status: **DONE** — 2026-09-13, Claude
Output: `content/leiden/candidates/leiden-candidate-register.md` — 52 candidates, Gate A passed.

## Task LDN-VERIFY-001
Resolve every `LOW` confidence entry and every unverified superlative in the register.

Depends on: LDN-DISC-001
Status: **READY** — must run **before** scoring. Scoring unverified claims produces
confident nonsense.

## Task LDN-DISC-002
Second discovery pass targeting the seven gaps documented in the register
(Roman Leiden; the 1944 bombing; post-war and modern Leiden; **women's history**; guilds,
hospitals and orphanages; justice and punishment; and any location lacking a viewpoint).

Depends on: LDN-DISC-001
Status: **READY**

## Task ENG-GEO-001
Resolve coordinates for all 52 candidates from PDOK/BAG. Coordinates were deliberately not
invented during discovery.

Depends on: LDN-DISC-001
Status: **READY** — assigned to Codex

Agent:
ROLE A — City Discovery Researcher

Instructions:
Research Leiden broadly.
Do not start by deep-diving De Waag or any other single place.
Do not stop after famous attractions.
Find 30–60 viable historical locations/stories.
Add initial source leads.
Score only after discovery pass is complete.

Output:
`content/leiden/candidates/leiden-candidate-register.md`
or structured equivalent.

Update this master file when done.

## Task LDN-SCORE-001
Score all candidate locations on the 15 criteria in §5 Phase 1B; assign Tier A/B/C.

Depends on:
LDN-DISC-001 (done), LDN-VERIFY-001 (recommended first)

Status: **READY** — but do `LDN-VERIFY-001` first

## Task LDN-COVERAGE-001
Check story/theme coverage.

Depends on:
LDN-SCORE-001

Status: BLOCKED

## Task LDN-MVP-001
Select first production locations.

Depends on:
LDN-COVERAGE-001

Status: BLOCKED

Only after LDN-MVP-001:
start deep location research.

---

# 34. CLAUDE START INSTRUCTION

Use this exact operating logic:

You are working on YourLocalCityGuide.

Before doing anything:
1. Read `YOURLOCALCITYGUIDE_MASTER.md` completely.
2. Follow CURRENT STATUS.
3. Do not select a flagship location.
4. Do not start final scripts/videos before city discovery and selection are complete.
5. Never invent history.
6. Store detailed work in structured project files.
7. Update the master file after meaningful work.
8. Leave a handoff.

Your first major research task is:
`LDN-DISC-001 — Build a broad Candidate Location Register for Leiden.`

Research the city as a whole.

Target:
30–60 candidate locations or historically meaningful physical places.

Cover:
major attractions AND hidden history.

Do not only collect names.
For each candidate, record:
- historical theme;
- event/person/process;
- era;
- why it matters;
- what happened physically there;
- surviving visual connection;
- source leads;
- story potential;
- possible video potential;
- route value.

Do not yet write final videos.

---

# 35. CODEX START INSTRUCTION

You are the lead engineer for YourLocalCityGuide.

Before writing code:
1. Read `YOURLOCALCITYGUIDE_MASTER.md`.
2. Respect all locked decisions.
3. Do not hardcode historical content randomly in components.
4. Build around structured city/location/route content.
5. Do not assume a flagship location.
6. Do not implement speculative features that are not needed.
7. Update the master file and leave a handoff.

Initial engineering work should support:
- many candidate locations;
- selected production locations;
- many cities later;
- map;
- routes;
- video;
- structured research references;
- multiple languages;
- QR attribution;
- analytics;
- GPS fallback;
- fast mobile performance.

Do not let engineering force the historical research into a poor structure.

---

# 36. CURRENT STATUS

Updated: 2026-09-13 · by Claude · after `FND-003`, `FND-004`, `LDN-DISC-001`, `LDN-SRC-001`

Current project phase:
**PHASE 0 — FOUNDATION (engineering side) running alongside PHASE 1 — CITY DISCOVERY (research side)**

Current research state:
**NO location has been approved as the main or flagship location.** Discovery (three passes),
verification, scoring and coverage are all complete: **65 candidates** registered, C001–C060
scored and tiered, Gate A and Gate B passed.

⚠️ **PHASE 1 IS FINISHED EXCEPT FOR ONE DECISION.** A 14-location MVP is **proposed** in
`content/leiden/locations/MVP-PROPOSAL.md` and is waiting on the user (board Q8, Q9). Until
that is approved: **no L-IDs are assigned and `R01` deep research must not start.**

Current content state:
Phase 1A COMPLETE and VERIFIED. Phase 1B COMPLETE — Tier A 19, Tier B 34, Tier C 7.
Phase 1C COMPLETE. Phase 1D PROPOSED, not decided. C061–C065 are unscored (`LDN-SCORE-002`).
No location has an L-ID. No story, fun fact, Look Around item or video script exists, and none
may be written yet.

**The scoring produced one result the user must decide on (board Q7):** not a single Tier A
candidate is primarily about the **Siege and Relief of Leiden**, and the city's entire WWII
experience falls to Tier B/C — because the unweighted rubric rewards visible, central,
filmable places, and those stories are none of those things. Selecting the MVP on rank alone
would omit the story Leiden is most famous for. See `leiden-candidate-scores.md` §4.

Current engineering state:
Nothing built. Blocked on `FND-002` (tech stack). Two engineering tasks are unblocked today:
`ENG-GEO-001` (geocoding) and the `FND-002` proposal itself.

## What is blocking the project right now

1. **`FND-002` — the tech stack is not locked.** Every engineering task waits on it.
   Assigned to Codex; needs the user's approval, not Codex's.
2. **User decisions** — six of them, listed in `docs/TASKBOARD.md` §4. The video-length
   conflict (wireframe 1:28 vs. §10's 20–45s) and the missing AI-reconstruction disclosure
   are the two that change the product, not just the plan.
3. **`LDN-VERIFY-001`** — the register contains `LOW` confidence entries and unsourced
   superlatives that must not travel any further downstream.

## Immediate priority order

1. Codex: propose the tech stack (`FND-002`); geocode the register (`ENG-GEO-001`).
2. User: answer the six open questions in `docs/TASKBOARD.md` §4.
3. Claude: ~~verification~~ ✔, ~~gap passes~~ ✔, ~~scoring~~ ✔, ~~coverage~~ ✔ done.
4. **User: approve or amend the MVP proposal (Q8, Q9).** This is now the research track's
   only blocker — everything downstream waits on it.
5. Then: `R01` deep research per approved location → `R02` verification → stories → videos,
   and `LDN-ROUTE-001` for routes.
5. Only then: deep location research, then stories, then videos.

DO NOT:
- start building the whole experience around De Waag, or around Pieterskerk because it
  appears in the wireframe mock-up;
- produce ten polished videos about any one place;
- assume the obvious tourist attractions are automatically the best locations;
- code a location-specific architecture;
- treat a `HIGH` confidence flag in the register as permission to publish. It means one
  cross-check passed, nothing more;
- generate AI reconstruction imagery for candidates C047, C048 or **C058** (persecution,
  resistance, and the 1944 bombardment victims) — archival material only;
- write a superlative — "oldest", "first", "only" — that the verification log has not
  cleared. Four of five checked were wrong, overstated or disputed;
- select C013, C015 or C035 for the MVP. They are unresolved `LOW` and barred.

# 37. DECISION LOG

## DEC-001
Leiden is the first city.
Status: LOCKED

## DEC-002
Mobile-first web/PWA before native apps.
Status: LOCKED

## DEC-003
Map exploration and curated routes both matter.
Status: LOCKED

## DEC-004
Historical videos are pre-produced.
Status: LOCKED

## DEC-005
Historical accuracy beats spectacle.
Status: LOCKED

## DEC-006
No single location is preselected as flagship.
Status: LOCKED

## DEC-007
Citywide discovery must happen before MVP location selection.
Status: LOCKED

## DEC-008
Claude/Codex share project state through Git + this master file.
Status: LOCKED

## DEC-009
Technical stack.
Status: **OPEN** — Codex to propose in `docs/decisions/DEC-009-tech-stack.md`, user to approve.

## DEC-010
Coordinates are never estimated or invented. They are resolved from an authoritative Dutch
source (PDOK/BAG) or left `TBD`.
Status: LOCKED — proposed by Claude 2026-09-13, follows directly from §3 "never invent".

## DEC-011
Candidates covering persecution, deportation, resistance and civilian bombing deaths
(currently C047, C048, C058) receive **no AI-generated reconstruction imagery**. Archival
photographs, documents, named individuals and place only.
Status: LOCKED — proposed by Claude 2026-09-13, follows from §3 (accuracy over spectacle) and §16.

## DEC-013
No superlative — "oldest", "first", "only", "largest" — may appear in visitor-facing content
unless it has been cleared in `docs/qa/LDN-VERIFY-001-verification-log.md` or an equivalent
verification record, with the exact permitted wording. Where reputable sources disagree, the
product states the undisputed facts instead of picking a side.
Status: LOCKED — proposed by Claude 2026-09-13. Of the first five superlatives checked, one
was verified, one overstated, one disputed and one plainly false.

## DEC-012
`docs/TASKBOARD.md` is the operational task list. This master file holds status, decisions
and rules; the board holds assignments and blockers. Neither may contradict the other, and
this file wins if they do.
Status: LOCKED — proposed by Claude 2026-09-13, implements §23.

---

# 38. OPEN QUESTIONS

These are unresolved and must not be guessed silently.
Those now formally raised with the user are tracked in `docs/TASKBOARD.md` §4.

Raised by the wireframe reading (`FND-004`) and needing a decision:
- **Video length** — the wireframe shows 1:28; §10 Layer 2 specifies 20–45 seconds. Which wins?
- **AI disclosure** — §15 mandates an on-screen reconstruction label; the wireframe has none.
  This is not optional under §3 and must be added to the design.
- **Languages** — the wireframe offers NL/EN/DE/FR; §30 locks NL+EN first.
- **Map filters** — the wireframe's `Food` and `Nature` chips are commercial/non-historical.
  §31 requires commercial content to be clearly separated from historical content.
- **Look Around You is missing from the wireframe** entirely, despite §12 calling it central.

Still open from v1.0:
- Exact technical stack?
- MapLibre vs Leaflet?
- Content stored as Markdown, JSON, TypeScript or CMS later?
- Final visual identity?
- Primary homepage CTA: near me, routes, or map?
- Exact onboarding length?
- Which route types emerge after research?
- Which video tool(s) will be used?
- Which archive image licenses allow reuse?
- Which locations require permission for filming/photography?
- Which accessibility features are MVP?
- Which local institutions should be approached later?
- Exact monetization model?

---

# 39. CHANGELOG

## v1.4 — 2026-09-13 (Claude)
- `LDN-DISC-003` complete: 65 candidates. Women's-history and guild gaps **closed**
  (C061–C064). Migration since 1960 **deliberately left open** as C065, a placeholder that
  asserts no Leiden facts, because only national-level sources were found and applying them
  to Leiden would be invention.
- `LDN-COVERAGE-001` complete. Phase 1C marked COMPLETE.
- `LDN-MVP-001` **proposed**: 14 locations, awaiting user approval. Phase 1D marked PROPOSED.
- Three more false trails on record: Jacobs (Groningen), Van Schurman (Utrecht),
  Westerdijk (Utrecht). None is a Leiden story.
- New tasks: `LDN-SCORE-002` (score C061–C065).

## v1.3 — 2026-09-13 (Claude)
- `LDN-SCORE-001` complete: all 60 candidates scored on the fifteen §5 criteria.
  Tier A 19, Tier B 34, Tier C 7. Gate B passed.
- Recorded the three systematic biases in the unweighted rubric, and the finding that no
  Tier A candidate is about the Siege. Raised as board Q7 rather than silently corrected.
- Phase 1B marked COMPLETE in §5 and §36.

## v1.2 — 2026-09-13 (Claude)
- `LDN-VERIFY-001` complete — see `docs/qa/LDN-VERIFY-001-verification-log.md`.
- `LDN-DISC-002` complete — register extended from 52 to **60** candidates, closing five
  of the seven documented gaps.
- Added DEC-013: no unverified superlatives in visitor-facing content.
- Extended DEC-011 to C058 (the 1944 bombardment victims).
- Added `FND-006` (collaboration protocol) and the parallel-work rules in §4, §26 and §27.
- Two gaps remain for `LDN-DISC-003`: migration since 1960, and named Leiden women.

## v1.1 — 2026-09-13 (Claude)
- Added the "WHERE THINGS LIVE" index at the top of the file.
- Marked `FND-001`, `FND-003`, `FND-004`, `LDN-SRC-001` and `LDN-DISC-001` DONE.
- Recorded Phase 1A as COMPLETE: 52 Leiden candidates registered, Gate A passed.
- Added tasks `LDN-VERIFY-001`, `LDN-DISC-002`, `ENG-GEO-001`.
- Reassigned `FND-002` to Codex and named it the project's top blocker.
- Rewrote §36 CURRENT STATUS with what is actually blocking the project.
- Added decisions DEC-009 (open), DEC-010 (no invented coordinates), DEC-011 (no AI
  reconstruction of persecution), DEC-012 (task board is the operational list).
- Added the wireframe-derived open questions to §38.
- Moved the wireframe artefact into `docs/ux/` and built the §22 repository structure.

## v1.0
- Rebuilt master file from the ground up.
- Removed De Waag as assumed flagship.
- Added mandatory citywide discovery phase.
- Added 30–60 candidate target.
- Added candidate scoring system.
- Added theme coverage review.
- Added strict location deep-research pipeline.
- Added historical video concept selection process.
- Added fun fact and Look Around systems.
- Added Then vs Now system.
- Added wireframe/page inventory.
- Added source policy.
- Added quality gates.
- Added role separation for Claude and Codex.
- Added Git workflow and task IDs.
- Added explicit rule that no final videos are written before research verification.
