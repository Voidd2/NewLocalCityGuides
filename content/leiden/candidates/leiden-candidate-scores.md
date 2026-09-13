# LEIDEN — CANDIDATE SCORING

Task ID: `LDN-SCORE-001`
Phase: **1B — Candidate scoring**
Agent: Claude (Role A / Role G)
Date: 2026-09-13
Input: `leiden-candidate-register.md` (60 candidates, Gate A passed, verified by `LDN-VERIFY-001`)
Status: **COMPLETE** — tiers assigned, **no MVP selected** (that is `LDN-MVP-001`)

---

## 0. METHOD

Master §5 Phase 1B defines fifteen criteria, each scored **1–5**. Maximum 75.
Master also says *"Weighted scoring may later be introduced."* It has **not** been introduced —
these are **unweighted sums**, exactly as specified. §4 of this document explains why that
matters more than it sounds, and what to do about it.

### The fifteen criteria and how they were applied

| # | Criterion | 1 means | 5 means |
|---|---|---|---|
| 1 | **Hist** — Historical significance | Locally minor | Nationally or internationally significant |
| 2 | **Story** — Story quality | No narrative, only facts | Conflict, transformation, a human at its centre |
| 3 | **Vis** — Visual reconstruction potential | Nothing to show, or must not be shown | Rich, documented, visually transformative |
| 4 | **Src** — Source quality | Lead only | Primary/archival sources exist and are reachable |
| 5 | **Seen** — Physical place still visible | Gone entirely | Standing and legible |
| 6 | **Foot** — Tourist footfall potential | Nobody passes | On the main visitor flow |
| 7 | **Geo** — Geographic usefulness | Outside the walkable core | Central, useful to be sent to |
| 8 | **Conn** — Route connectivity | Isolated | Links naturally to several others |
| 9 | **Uniq** — Uniqueness | Every Dutch city has one | Only here |
| 10 | **Mob** — Mobile storytelling potential | Needs a long read | Works in 45 seconds on a phone |
| 11 | **Look** — "Look around you" potential | Nothing specific to point at | A real, verified, visible object |
| 12 | **Then** — Then-vs-now potential | No comparison possible | Archival image + matched viewpoint |
| 13 | **Acc** — Accessibility | Stairs only / closed | Level, open, free |
| 14 | **Fam** — Family friendliness | Unsuitable for children | Genuinely good with children |
| 15 | **Intl** — International visitor appeal | Needs local knowledge | Lands without any Dutch context |

### Scoring discipline
- Scored against the **verified** register, not the first draft. Where `LDN-VERIFY-001`
  changed a fact, the score reflects the corrected version (C028 in particular).
- `Src` is capped at 3 for any candidate still flagged `LOW` confidence.
- `Vis` is scored **1–2 for C047, C048 and C058** — not because the material is poor, but
  because DEC-011 forbids AI reconstruction there. The rubric is being told the truth.
- No candidate was scored up because it is famous, or down because it is not.

---

## 1. SCORES — ALL 60

| ID | Candidate | Hist | Story | Vis | Src | Seen | Foot | Geo | Conn | Uniq | Mob | Look | Then | Acc | Fam | Intl | **TOTAL** | Tier |
|---|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| C019 | Hortus Botanicus | 5 | 5 | 5 | 5 | 5 | 5 | 5 | 5 | 4 | 4 | 5 | 4 | 5 | 5 | 5 | **72** | A |
| C042 | Pilgrims' quarter | 5 | 5 | 5 | 5 | 3 | 5 | 5 | 5 | 5 | 5 | 3 | 4 | 5 | 4 | 5 | **69** | A |
| C001 | De Burcht | 5 | 5 | 5 | 4 | 5 | 4 | 5 | 5 | 4 | 5 | 5 | 4 | 3 | 5 | 4 | **68** | A |
| C003 | Pieterskerk | 5 | 5 | 4 | 5 | 5 | 5 | 5 | 5 | 4 | 4 | 4 | 3 | 5 | 4 | 5 | **68** | A |
| C045 | Buskruitramp 1807 | 5 | 5 | 5 | 5 | 3 | 4 | 5 | 5 | 5 | 5 | 4 | 5 | 5 | 3 | 4 | **68** | A |
| C054 | De Blauwe Steen | 5 | 5 | 3 | 4 | 5 | 5 | 5 | 5 | 5 | 5 | 5 | 3 | 4 | 4 | 4 | **67** | A |
| C032 | Museum De Lakenhal | 5 | 5 | 5 | 5 | 5 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 5 | 4 | 4 | **66** | A |
| C040 | Leiden's hofjes | 5 | 5 | 4 | 5 | 5 | 4 | 5 | 5 | 5 | 4 | 4 | 3 | 3 | 4 | 5 | **66** | A |
| C052 | Nieuwe Rijn market | 4 | 4 | 4 | 3 | 5 | 5 | 5 | 5 | 4 | 4 | 4 | 5 | 5 | 5 | 4 | **66** | A |
| C010 | Koornbrug | 4 | 4 | 4 | 4 | 5 | 5 | 5 | 5 | 5 | 4 | 5 | 3 | 5 | 4 | 3 | **65** | A |
| C022 | Rijksmuseum Boerhaave | 5 | 5 | 5 | 5 | 4 | 4 | 4 | 4 | 4 | 4 | 3 | 4 | 5 | 4 | 5 | **65** | A |
| C033 | Rapenburg | 4 | 4 | 5 | 4 | 5 | 5 | 5 | 5 | 3 | 4 | 4 | 5 | 5 | 3 | 4 | **65** | A |
| C009 | Vismarkt | 4 | 4 | 5 | 3 | 3 | 5 | 5 | 5 | 4 | 5 | 4 | 5 | 5 | 4 | 3 | **64** | A |
| C029 | Weddesteeg (Rembrandt) | 5 | 5 | 5 | 5 | 3 | 4 | 4 | 4 | 4 | 5 | 3 | 4 | 4 | 4 | 5 | **64** | A |
| C002 | Rhine confluence | 5 | 4 | 4 | 4 | 5 | 4 | 5 | 5 | 3 | 4 | 4 | 5 | 5 | 3 | 3 | **63** | A |
| C005 | Gravensteen | 5 | 5 | 5 | 4 | 5 | 3 | 4 | 5 | 5 | 5 | 5 | 3 | 3 | 2 | 4 | **63** | A |
| C007 | Stadhuis | 4 | 4 | 5 | 5 | 4 | 5 | 5 | 5 | 3 | 4 | 4 | 5 | 4 | 3 | 3 | **63** | A |
| C041 | Jean Pesijnhofje | 5 | 5 | 3 | 5 | 5 | 4 | 5 | 5 | 5 | 4 | 4 | 2 | 3 | 3 | 5 | **63** | A |
| C049 | Singel and ramparts | 4 | 4 | 5 | 4 | 4 | 4 | 5 | 5 | 4 | 4 | 4 | 5 | 4 | 4 | 3 | **63** | A |
| C008 | De Waag | 4 | 4 | 5 | 3 | 4 | 5 | 5 | 5 | 3 | 4 | 4 | 4 | 5 | 4 | 3 | **62** | B |
| C006 | Breestraat | 4 | 4 | 5 | 3 | 3 | 5 | 5 | 5 | 3 | 4 | 4 | 5 | 5 | 3 | 3 | **61** | B |
| C046 | Cleveringa, 1940 | 5 | 5 | 3 | 5 | 5 | 4 | 5 | 5 | 5 | 4 | 3 | 2 | 3 | 2 | 5 | **61** | B |
| C055 | Heilige Geest weeshuis | 5 | 5 | 4 | 5 | 5 | 4 | 5 | 4 | 4 | 4 | 3 | 3 | 3 | 3 | 4 | **61** | B |
| C014 | Van der Werffpark | 5 | 5 | 5 | 4 | 3 | 3 | 4 | 4 | 5 | 4 | 3 | 4 | 5 | 3 | 3 | **60** | B |
| C016 | Herring and white bread | 5 | 5 | 4 | 4 | 2 | 4 | 4 | 4 | 5 | 4 | 2 | 3 | 5 | 5 | 4 | **60** | B |
| C017 | University as reward | 5 | 5 | 3 | 5 | 4 | 4 | 5 | 5 | 4 | 4 | 3 | 2 | 3 | 3 | 5 | **60** | B |
| C018 | Academiegebouw / Zweetkamertje | 4 | 5 | 3 | 4 | 5 | 4 | 5 | 5 | 5 | 4 | 4 | 2 | 3 | 3 | 4 | **60** | B |
| C024 | Japanmuseum SieboldHuis | 4 | 5 | 4 | 4 | 4 | 3 | 4 | 4 | 5 | 4 | 3 | 3 | 4 | 4 | 5 | **60** | B |
| C034 | Molen De Valk | 4 | 5 | 5 | 4 | 5 | 4 | 3 | 3 | 4 | 4 | 4 | 3 | 2 | 5 | 5 | **60** | B |
| C051 | Beestenmarkt | 4 | 4 | 5 | 3 | 3 | 4 | 4 | 4 | 4 | 4 | 3 | 5 | 5 | 5 | 3 | **60** | B |
| C021 | Kamerlingh Onnes Lab | 5 | 5 | 4 | 5 | 4 | 2 | 4 | 4 | 5 | 4 | 3 | 3 | 3 | 3 | 5 | **59** | B |
| C038 | De Meelfabriek | 4 | 4 | 5 | 5 | 5 | 3 | 3 | 3 | 4 | 4 | 4 | 4 | 4 | 4 | 3 | **59** | B |
| C030 | Kort Galgewater | 4 | 5 | 4 | 4 | 3 | 3 | 4 | 4 | 4 | 4 | 3 | 4 | 4 | 3 | 5 | **58** | B |
| C056 | Het Leids Wevershuis | 4 | 5 | 4 | 4 | 5 | 3 | 4 | 4 | 4 | 4 | 4 | 3 | 2 | 4 | 4 | **58** | B |
| C036 | The cloth industry | 5 | 5 | 5 | 5 | 2 | 3 | 3 | 3 | 5 | 4 | 2 | 4 | 4 | 3 | 4 | **57** | B |
| C047 | Jewish Leiden | 5 | 5 | 1 | 5 | 3 | 3 | 4 | 4 | 4 | 4 | 4 | 3 | 4 | 2 | 5 | **56** | B |
| C053 | Castellum Matilo | 5 | 5 | 5 | 5 | 2 | 2 | 1 | 1 | 5 | 4 | 3 | 3 | 5 | 5 | 5 | **56** | B |
| C004 | Hooglandse Kerk | 4 | 4 | 4 | 3 | 5 | 3 | 4 | 4 | 3 | 3 | 4 | 3 | 5 | 3 | 3 | **55** | B |
| C012 | Zijlpoort | 4 | 4 | 4 | 4 | 5 | 3 | 3 | 3 | 3 | 3 | 5 | 4 | 4 | 3 | 3 | **55** | B |
| C020 | Oude Sterrewacht | 4 | 4 | 4 | 4 | 5 | 3 | 4 | 4 | 4 | 3 | 4 | 3 | 3 | 3 | 3 | **55** | B |
| C023 | Rijksmuseum van Oudheden | 4 | 3 | 3 | 5 | 4 | 5 | 4 | 4 | 2 | 3 | 2 | 2 | 5 | 4 | 5 | **55** | B |
| C025 | Wereldmuseum Leiden | 4 | 4 | 3 | 4 | 4 | 4 | 4 | 3 | 4 | 3 | 2 | 2 | 5 | 4 | 5 | **55** | B |
| C011 | Morspoort | 4 | 4 | 4 | 4 | 5 | 3 | 3 | 3 | 3 | 3 | 4 | 4 | 4 | 3 | 3 | **54** | B |
| C028 | Pesthuis | 5 | 5 | 4 | 4 | 5 | 2 | 2 | 2 | 5 | 4 | 4 | 3 | 3 | 2 | 4 | **54** | B |
| C031 | Latijnse School | 3 | 4 | 3 | 3 | 5 | 3 | 4 | 4 | 3 | 3 | 4 | 3 | 4 | 4 | 4 | **54** | B |
| C037 | Migrant weavers | 5 | 5 | 4 | 4 | 2 | 3 | 3 | 3 | 4 | 4 | 2 | 3 | 4 | 3 | 5 | **54** | B |
| C044 | Marekerk | 4 | 4 | 3 | 4 | 5 | 3 | 4 | 4 | 4 | 3 | 4 | 2 | 4 | 3 | 3 | **54** | B |
| C048 | Resistance and illegal press | 5 | 5 | 2 | 4 | 3 | 3 | 4 | 4 | 4 | 4 | 3 | 3 | 4 | 2 | 4 | **54** | B |
| C057 | Spinsters and factory children | 5 | 5 | 4 | 4 | 2 | 3 | 3 | 3 | 5 | 4 | 2 | 3 | 4 | 2 | 5 | **54** | B |
| C060 | Post-war Leiden | 4 | 4 | 3 | 4 | 4 | 3 | 4 | 3 | 4 | 3 | 3 | 5 | 5 | 2 | 3 | **54** | B |
| C026 | Bibliotheca Thysiana | 4 | 4 | 3 | 5 | 5 | 2 | 4 | 4 | 5 | 3 | 4 | 2 | 2 | 2 | 3 | **52** | B |
| C039 | 19th-c. poverty | 5 | 5 | 4 | 3 | 3 | 2 | 3 | 3 | 4 | 4 | 3 | 4 | 4 | 2 | 3 | **52** | B |
| C050 | Haven and the Zijl | 4 | 4 | 5 | 3 | 4 | 3 | 3 | 3 | 3 | 3 | 3 | 4 | 4 | 3 | 3 | **52** | B |
| C058 | Forgotten bombardments 1944 | 5 | 5 | 1 | 4 | 3 | 3 | 2 | 2 | 5 | 4 | 3 | 4 | 4 | 2 | 4 | **51** | C |
| C043 | Pilgrim Museum | 3 | 3 | 3 | 4 | 5 | 3 | 4 | 4 | 3 | 2 | 3 | 2 | 2 | 3 | 5 | **49** | C |
| C035 | Jan Steen, Langebrug | 3 | 4 | 4 | 2 | 2 | 3 | 4 | 4 | 3 | 3 | 2 | 3 | 4 | 3 | 4 | **48** | C |
| C015 | Inundation / relief fleet | 5 | 5 | 5 | 4 | 1 | 1 | 1 | 1 | 5 | 3 | 1 | 3 | 2 | 3 | 5 | **45** | C |
| C059 | Leiden women's movement | 4 | 4 | 2 | 3 | 2 | 2 | 3 | 3 | 4 | 3 | 2 | 2 | 4 | 2 | 4 | **44** | C |
| C027 | Naturalis | 3 | 2 | 2 | 4 | 3 | 4 | 2 | 2 | 2 | 2 | 1 | 1 | 5 | 5 | 4 | **42** | C |
| C013 | Lammenschans | 5 | 5 | 5 | 3 | 1 | 1 | 1 | 1 | 4 | 3 | 1 | 2 | 3 | 3 | 3 | **41** | C |

---

## 2. TIERS

Boundaries were set **after** scoring, from the natural break in the distribution, and sized
so that Tier A is meaningfully larger than the 8–15 the MVP needs — leaving room for
`LDN-COVERAGE-001` to choose for variety rather than rank.

| Tier | Score | Count | Meaning (master §5) |
|---|---|---|---|
| **A** | ≥ 63 | **19** | Strong MVP candidates |
| **B** | 52–62 | **34** | Good future content |
| **C** | ≤ 51 | **7** | Interesting archive / future expansion |

### Tier A — the 19
C019 Hortus · C042 Pilgrims · C001 Burcht · C003 Pieterskerk · C045 Buskruitramp 1807 ·
C054 Blauwe Steen · C022 Rijksmuseum Boerhaave · C032 Lakenhal · C040 Hofjes ·
C052 Nieuwe Rijn market · C010 Koornbrug · C033 Rapenburg · C029 Weddesteeg ·
C009 Vismarkt · C002 Rhine confluence · C005 Gravensteen · C007 Stadhuis ·
C041 Jean Pesijnhofje · C049 Singel

**Note for the record:** De Waag (C008) scored **62** and is **Tier B**. Master §36 warned
against building the project around it; the scoring, done blind to that warning, independently
put it just outside the top group. Pieterskerk (C003), used as the example in the wireframe,
did reach Tier A — on its merits, and it is still not selected.

---

## 3. WHAT THE SCORES SAY

**Geography dominates.** Almost every Tier A candidate is within a ten-minute walk of the
others. That is genuinely good news for route design — but see §4.

**The top of the list is thematically varied**, which is the outcome master §1C wanted:
botany and empire (C019), refugees and America (C042), city origins (C001, C002), religion
and memory (C003), catastrophe (C045), justice (C054), medicine (C022), industry (C032),
charity (C040, C041), continuity (C052), trade (C010, C009), wealth (C033), art (C029),
power (C005, C007), and the city edge (C049).

**Not one Tier A candidate is primarily about the Siege and Relief of Leiden.** That is the
most surprising result of this pass. The city's defining national story produced six
candidates (C013–C018) and its best placements are C014, C016, C017 and C018, all at 60,
just under the line — held down by `Seen`, `Look` and `Then`, because the siege happened to a
city that has since been rebuilt, and to fields that have since been drained. Master §1C
warned against an MVP where ten locations tell one Golden Age story; the scoring has produced
the opposite risk, an MVP that omits the story Leiden is actually famous for. **This is
`LDN-COVERAGE-001`'s single most important question.**

**The cheapest strong candidate is C054, the Blauwe Steen.** Free, central, always open,
a verified object underfoot, and it reframes the whole Breestraat. It needs no building,
no opening hours and no ticket. For an MVP it may be the single best value in the register.

---

## 4. WHAT THE SCORES MISS — READ THIS BEFORE `LDN-MVP-001`

The unweighted fifteen-criterion sum, applied honestly, has three systematic biases. They are
not errors in the scoring; they are properties of the rubric, and they push against master §1C.

### Bias 1 — it punishes stories that must not be shown
`Vis` (visual reconstruction) is 1/15th of the score, and DEC-011 forces it to 1–2 for
**C058 (the 1944 bombardments, 51, Tier C)**, **C047 (Jewish Leiden, 56)** and
**C048 (resistance, 54)**. All three score 5 on historical significance and 5 on story.
C058 lands in Tier C *because it would be wrong to make a film of it.* An MVP chosen on
raw score alone would quietly drop Leiden's entire WWII experience.

### Bias 2 — it punishes anything outside the centre
`Foot`, `Geo` and `Conn` are 3/15ths of the score and all three measure roughly the same
thing: *is it central?* **C053 (Castellum Matilo, 56)** scores 5 on significance, story,
visual potential, source quality, uniqueness, accessibility, family appeal **and**
international appeal — and lands in Tier B purely on geography, scoring 1, 1 and 2 on those
three. **C028 (the Pesthuis, 54)** is held down the same way, despite the verification pass
making its story considerably *better*. Any candidate more than fifteen minutes from the
Burcht is effectively capped around 56 no matter how good it is.

### Bias 3 — it punishes processes and people without a building
**C036 (the cloth industry, 57)**, **C057 (spinsters and factory children, 54)** and
**C037 (migrant weavers, 54)** all score 5/5 on significance and story, and are held down by
`Seen` and `Look`. These are the stories the register itself identified as Leiden's most
important and least told. C057 exists specifically to close the women's-history gap — and the
rubric ranks it 47th.

### What to do about it — a decision for the user, not for an agent

Master §5 says *"weighted scoring may later be introduced."* Three options:

| Option | Effect | Claude's view |
|---|---|---|
| **A. Keep unweighted, select on rank** | Simple, defensible, reproducible | **Not recommended.** It drops WWII entirely and buries the textile story. |
| **B. Introduce weights** (e.g. double Hist/Story/Uniq, halve Foot/Geo) | Rebalances toward significance | Defensible, but re-scoring 60 candidates by a rubric invented after seeing the results invites motivated reasoning. |
| **C. Keep the unweighted scores as the ranking, and treat `LDN-COVERAGE-001` as the corrective** | Score stays honest; coverage explicitly reserves MVP slots for under-ranked themes | **Recommended.** It is exactly what master §1C was written for: the coverage check exists precisely so the MVP is not just "the top N". |

Under option C the MVP would be drawn mostly from Tier A, with a small number of **reserved
slots** for themes the rubric suppresses — most obviously one WWII candidate and one textile /
labour candidate. That decision belongs to `LDN-COVERAGE-001` and ultimately to the user.

**This is flagged rather than acted on. No slots have been reserved and no MVP has been chosen.**

---

## 5. BARRED FROM MVP SELECTION

Regardless of score, these may not be selected until resolved (`LDN-VERIFY-001`):

| ID | Score | Why barred |
|---|---|---|
| C013 Lammenschans | 41 | `LOW` — nothing established as visible today |
| C015 Inundation | 45 | `LOW` — no defensible viewpoint found |
| C035 Jan Steen | 48 | `LOW` — address unverified |

All three scored into Tier C anyway, so the bar costs nothing today. It would have mattered
if C015's story quality had carried it higher — which is precisely why the rule exists.

---

## 6. GATE B CHECK (master §27)

Every candidate now has: a score, a source-quality assessment, a video-potential
assessment, and a route-value assessment. **Gate B: PASSED for all 60.**

## 7. NEXT

1. **`LDN-COVERAGE-001`** — theme coverage analysis against master §1C, and the decision on
   how to handle the three biases in §4.
2. **`LDN-MVP-001`** — select 8–15, assign L-IDs.
3. `LDN-DISC-003` and `ENG-GEO-001` run in parallel and do not block either.
