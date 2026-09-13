# LEIDEN — THEME COVERAGE ANALYSIS

Task ID: `LDN-COVERAGE-001`
Phase: **1C — Story coverage analysis**
Agent: Claude (Role A / Role G)
Date: 2026-09-13
Input: 60 scored candidates, Tier A 19 / B 34 / C 7
Status: **COMPLETE** — output feeds `LDN-MVP-001`

---

## 0. WHAT THIS TASK IS FOR

Master §1C: *"Before choosing the MVP, check if Leiden's history is represented broadly.
Avoid an MVP consisting of ten locations that all tell essentially the same Golden Age story."*

The scoring pass (`LDN-SCORE-001`) produced a ranking. This pass asks a different question:
**if we simply took the top of that ranking, what would Leiden never get to say?**

---

## 1. WHAT TIER A ALONE WOULD COVER

The nineteen Tier A candidates, mapped against master §1C's fifteen required themes:

| Required theme | Covered in Tier A by | Verdict |
|---|---|---|
| Medieval Leiden | C001, C002, C005, C054, C010, C049 | ✅ Very strong |
| **Siege / Relief of Leiden** | — | ❌ **ABSENT** |
| Rembrandt / art | C029 | ✅ Adequate |
| University | C019, C022 | ⚠️ Indirect — via institutions, not the university itself |
| Science | C019, C022 | ✅ Strong |
| Trade | C010, C009, C052 | ✅ Strong |
| Markets | C009, C052 | ✅ Strong |
| Textiles | C032 | ⚠️ **The building only.** The industry and its workers are Tier B |
| Water | C002, C033, C049 | ✅ Strong |
| Religion | C003, C040, C041, C042 | ✅ Very strong |
| Architecture | C032, C033, C049 | ✅ Adequate |
| Disaster | C045, C007 | ✅ Strong |
| Social history | C040, C041, C042 | ✅ Strong |
| **WWII** | — | ❌ **ABSENT** |
| Hidden everyday stories | C054, C009, C010, C052 | ✅ Strong |

### The verdict

**An MVP selected purely on score would fail master §1C.** Not in the way §1C predicted — it
would not be ten Golden Age locations. It would be a **medieval, religious and mercantile
city with no siege and no war**, which is a stranger omission and a worse one:

1. **The Siege and Relief of Leiden is absent.** This is the event the city is nationally
   known for, that it still celebrates every 3 October, and that caused the founding of its
   university. Six candidates cover it; the best four sit at 60, three points under the line.
2. **The Second World War is absent.** Four candidates cover it; the best is at 61, and the
   others are suppressed precisely because DEC-011 forbids reconstructing them.
3. **Textiles is present as a building and absent as an industry.** The Lakenhal is where
   cloth was *inspected*. The people who made it — the migrant weavers, the spinsters, the
   children — are all Tier B.

Two of these three are themes master §1C names explicitly and by itself.

---

## 2. WHY THE RANKING DID THIS

Not a scoring error. Three structural properties of the rubric, documented in
`leiden-candidate-scores.md` §4:

| Bias | Mechanism | What it suppresses |
|---|---|---|
| **Visibility** | `Seen`, `Look`, `Then` = 3/15 | Events whose physical traces are gone — a siege of a rebuilt city, an inundation of drained fields |
| **Filmability** | `Vis` = 1/15, forced to 1–2 by DEC-011 | Exactly the stories it would be wrong to reconstruct |
| **Centrality** | `Foot`, `Geo`, `Conn` = 3/15, all measuring the same thing | Everything outside the ten-minute core, and every process without an address |

Together these are **7 of 15 criteria** — nearly half the rubric — measuring, in effect,
*"is there a photogenic building here that tourists already walk past?"* That is a reasonable
thing to measure for a walking app. It is not a measure of historical importance, and the
master file is explicit (§3) that accuracy and significance come first.

---

## 3. THE DECISION

Three options were put to the user as board **Q7**. This analysis recommends **Option C**,
and proceeds on that basis:

> Keep the unweighted scores exactly as they are — they are honest, reproducible, and were
> made before anyone saw the consequences. Then use **this** task, which master §1C created
> for precisely this purpose, to reserve a small number of MVP slots for themes the ranking
> suppresses.

Re-weighting the rubric after seeing which candidates it disadvantaged would be motivated
reasoning dressed as method. Reserving slots is the same intervention, made **visibly**.

**If the user prefers Option A (pure rank) or Option B (re-weight), this analysis must be
redone. It is not a decision an agent should make alone, and it is flagged, not assumed.**

---

## 4. RESERVED SLOTS — RECOMMENDATION

Three slots, one per absent or hollow theme. Each names a first choice and the alternates,
with the reasoning, so the user can overrule any of them individually.

### Slot 1 — The Siege and Relief of Leiden

| Option | Score | Case for | Case against |
|---|---|---|---|
| **C016 — Herring and white bread** ⭐ | 60 | It is *the* story: famine, relief, and a tradition still observed every 3 October. Family 5, international 4. Needs no building. | `Seen` 2 — the moment left no physical trace; carried by narration and by the living tradition |
| C017 — University as the reward | 60 | Structurally superb: one stop covering both the siege and the founding of the university. Central, on the Rapenburg. | Tells the *aftermath*, not the siege. A visitor who hears only this never learns what happened |
| C014 — Van der Werffpark | 60 | Central, green, accessible, layers 1574 memory onto the 1807 scar | Overlaps C045 heavily — if the gunpowder disaster is already in the MVP, this is a repeat |
| C013 / C015 | 41 / 45 | The most cinematic material in the register | **Barred** — unresolved `LOW`, no place to stand |

**Recommended: C016.** The Siege slot should tell the siege, not its consequences. C017
remains valuable and should be picked up in a later release or folded into C019/C022's
route narration, since it is thirty seconds' walk away.

### Slot 2 — The Second World War

| Option | Score | Case for | Case against |
|---|---|---|---|
| **C046 — Cleveringa's protest, 1940** ⭐ | 61 | Highest-scoring WWII candidate. Nationally significant, precisely dated, in a building that still stands and is central. Needs no reconstruction — it is a story about words | Risks becoming a heroic-professor story that never mentions the colleagues he spoke *for* |
| C047 — Jewish Leiden | 56 | The more important story, ethically and historically | Distributed across the city, no single stop, and rightly unfilmable |
| C058 — The forgotten bombardments | 51 | Extraordinary: killed by the liberators, then written out of the obituaries | Peripheral, and DEC-011 applies |

**Recommended: C046, with a binding content condition.** The location is the Academiegebouw;
the *story* must carry C047's substance — the dismissal of Jewish staff, and what happened to
Leiden's Jewish residents afterwards — not a standalone tale of one brave man. A WWII slot
that produces only a hero narrative would be worse than no WWII slot.
**This condition must be written into the location brief at `R01`, not left to the copywriter.**

### Slot 3 — Textiles as an industry, not a building

| Option | Score | Case for | Case against |
|---|---|---|---|
| **C056 — Het Leids Wevershuis** ⭐ | 58 | The physical anchor the cloth story lacked: one house, one loom, one family. Also the honest link between the Pilgrims and the trade that actually employed them | Small house, accessibility 2, opening hours |
| C057 — Spinsters and factory children | 54 | Carries the women's-history gap and the 40%-under-sixteen figure | No address of its own — needs C056 or C032 to stand in |
| C036 — The cloth industry | 57 | The full seven-century sweep | Same problem: a process without a place |

**Recommended: C056 as the stop, carrying C057's content.** This is the one slot that solves
two gaps at once — industrial labour *and* women's history — because in Leiden they are the
same story. C032 (Lakenhal, Tier A) stays for the trade-and-quality side; C056 supplies the
people.

---

## 5. REDUNDANCY INSIDE TIER A

Tier A is geographically concentrated, which is good for walking and bad for repetition.
Overlaps that `LDN-MVP-001` must resolve rather than ignore:

| Cluster | Candidates | Recommendation |
|---|---|---|
| "Why the city is here" | C001 Burcht (68), C002 confluence (63) | **Keep C001, fold C002 into it.** The confluence is visible *from* the Burcht — it becomes that stop's "look around you" instead of a second stop |
| The water market cluster, all within ~150 m | C010 Koornbrug (65), C009 Vismarkt (64), C052 Nieuwe Rijn market (66), C008 Waag (62) | **Keep at most two.** C010 has the strongest verified object; C009 has the strongest then-vs-now. C052 is time-dependent and should not be a required stop |
| The Kloksteeg cluster, within ~50 m | C003 Pieterskerk (68), C042 Pilgrims (69), C041 Jean Pesijnhofje (63), C040 hofjes (66) | **Keep C003 and C042 as stops; let C041 be the hofje you actually enter** and C040 the theme it carries. Four stops in fifty metres would be absurd |
| Breestraat | C054 Blauwe Steen (67), C007 Stadhuis (63) | **Keep C054.** It is cheaper, more surprising, always open, and the Stadhuis is visible from it |
| Connective tissue, not stops | C033 Rapenburg (65), C049 Singel (63) | **Route narration, not stops.** Both are things you walk *along*; forcing a pin onto a whole street wastes a slot |

This is why Tier A holds nineteen and the MVP holds eight to fifteen: several Tier A entries
are better used as content *inside* another stop than as stops of their own.

---

## 6. GEOGRAPHIC CHECK

Every Tier A candidate and all three reserved slots lie inside the historic centre, within
roughly a fifteen-minute walk end to end. The Burcht sits at the natural centre of gravity;
the Rapenburg runs south-west from it and the Nieuwe Rijn east.

Consequences for route design (master §17):
- A single loop of 1.5–2 hours can reach every recommended stop. The wireframe's
  "1,5 uur · 8 locaties" estimate (5.1) is realistic.
- Nothing recommended requires public transport.
- The register's peripheral candidates — C053 Matilo, C038 Meelfabriek, C060 Bio Science
  Park, C058 — are **not** in the recommendation. That is a walkability decision, not a
  judgement on their history, and it should be revisited when the product supports
  multi-district or cycling routes.

---

## 7. WHAT IS STILL MISSING AFTER ALL OF THIS

Honest closing account. Even with the three reserved slots:

1. **Roman Leiden** (C053) is out, on geography alone. A thousand years of the city's
   prehistory absent from the first release.
2. **Modern Leiden** (C060) is out. The product will tell visitors about 1574 and 1807 and
   nothing about why the medieval centre still exists — which was decided in the 1970s.
3. **Named Leiden women** remain absent. C056+C057 covers women's *labour*, which matters
   more, but no woman in the MVP has a name. `LDN-DISC-003` must fix this.
4. **Migration since 1960** is absent from the register entirely, never mind the MVP.
5. **Guilds** never made it into the register.

Items 3–5 are `LDN-DISC-003`. Items 1–2 are a release-two argument, and should be recorded
as such rather than quietly forgotten.

---

## 8. OUTPUT

**Coverage check: PASSES on condition** that the three reserved slots are honoured.
Without them the MVP fails master §1C on two named themes.

Recommended MVP shape for `LDN-MVP-001`:
- **10 stops drawn from Tier A**, after resolving the redundancies in §5
- **+ 3 reserved slots**: C016 (Siege), C046 (WWII, with the binding content condition),
  C056 (textile labour and women's work)
- **= 13 locations**, within master §5's 8–15 range

The selection itself is `LDN-MVP-001`.
