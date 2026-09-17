# LEIDEN — SELECTED PRODUCTION LOCATIONS

Task ID: `LDN-MVP-001`
Phase: **1D — MVP location selection**
Status: ✅ **APPROVED AND LOCKED — 2026-09-13**
Approved by: the user, who delegated the selection decision to Claude (board Q8) and
explicitly approved the WWII content condition (Q9) and the scoring approach (Q7).

**Phase 1 is complete. Deep research (`R01`) may now begin.**

---

## 0. WHAT THIS IS

Fourteen locations, selected from 65 candidates after three discovery passes, a verification
pass, a scoring pass and a coverage analysis. The full reasoning is in `MVP-PROPOSAL.md`;
this file is the **authoritative list**, and `locations.json` is the machine-readable version
Codex builds against.

**IDs do not imply importance** (master §5). They follow the walking order of the loop.
There is no flagship location and there will not be one.

## 1. THE FOURTEEN

| ID | Name | From | Theme | Notes that carry into production |
|---|---|---|---|---|
| `L001` | De Burcht | C001 | Origins of the city | Absorbs C002 — the Rhine fork is visible from the wall and becomes this stop's *Look Around You* |
| `L002` | Vismarkt | C009 | Everyday life, trade | The register's strongest sensory story; best then-vs-now |
| `L003` | Koornbrug | C010 | Grain, logistics, design | Three distinct dates — 1443 name, 1642 bridge, **1824** roofs. Do not blur them |
| `L004` | De Blauwe Steen | C054 | Medieval centre, justice | Free, always open, underfoot. Write the *Look Around You* safely — it is in a road |
| `L005` | Gravensteen | C005 | Justice and punishment | Deliberately paired with L004: sentenced there, executed here after 1463. Access changed — the university left in 2024 |
| `L006` | Pieterskerk | C003 | Religion, burial, memory | |
| `L007` | The Pilgrims' quarter | C042 | Refuge, migration, America | Eleven years, not a stopover. Handle the colonial aftermath honestly |
| `L008` | Jean Pesijnhofje | C041 | Charity, old age, refuge | Carries C040's citywide hofje theme. **People live here** — access etiquette is a hard requirement |
| `L009` | Buskruitramp 1807 | C045 | Catastrophe | Contemporary prints of the ruins exist — real archival then-vs-now, no reconstruction needed |
| `L010` | Hortus Botanicus | C019 | Science, botany, empire | Highest-scoring candidate of all 65 |
| `L011` | Weddesteeg | C029 | Art, Rembrandt | Erfgoed Leiden has already built a VR reconstruction of the birth house — approach them |
| `L012` | Leidens Ontzet | C016 | **Siege and Relief — reserved slot** | ⚠️ **Has no building.** Carried by narration and a living tradition. The hutspot origin is partly legend and must be labelled as tradition, not fact |
| `L013` | Het Leids Wevershuis | C056 | **Textile labour — reserved slot** | Carries C057: the spinsters, and ~40% of Leiden textile workers under sixteen around 1860 |
| `L014` | Cleveringa's protest, 1940 | C046 | **WWII — reserved slot** | ⚠️ **Binding content condition — see §2. Approved by the user (Q9).** |

## 2. THE BINDING CONDITION ON L014 — USER-APPROVED, NOT OPTIONAL

L014's `R01` brief and its `C01`/`C02` stories **must** carry the substance of candidate C047:
the dismissal of Jewish staff, the registration measures of October 1940 and January 1941, and
what happened to Leiden's Jewish residents afterwards.

It must **not** be a standalone story about one brave professor ending on his courage.

Per **DEC-011**, L014 receives **no AI-generated reconstruction imagery**. Archival
photographs, documents, named individuals and place only.

This was put to the user as board Q9 and explicitly approved. It is a production constraint,
not a suggestion, and it may not be softened by a later agent or copywriter.

## 3. RULES THAT APPLY TO ALL FOURTEEN

1. **Nothing here is researched.** Selection ≠ research. Every location needs `R01` (deep
   research) and `R02` (source verification) before a single visitor-facing sentence is written.
2. **No superlative** — "oldest", "first", "only" — may be published unless cleared in
   `docs/qa/LDN-VERIFY-001-verification-log.md` with the exact permitted wording (**DEC-013**).
   Of the first five checked, one was verified, one overstated, one disputed and one false.
3. **No invented coordinates** (**DEC-010**). `ENG-GEO-001` resolves them from PDOK/BAG.
4. **Access must be confirmed before any *Look Around You* instruction** (master §12). Never
   point at something that may not be visible. L005 and L008 are the sensitive ones.
5. **Separate tradition from fact** (master §11). L012 especially.

## 4. WHAT WAS LEFT OUT, AND WHY IT MATTERS LATER

Full table in `MVP-PROPOSAL.md` §3. The three worth remembering:

- **C052 Nieuwe Rijn market** (scored 66, Tier A) — left out only because it is time-dependent.
  It returns the moment the schema supports conditional stops.
- **C053 Matilo, C038 Meelfabriek, C060 post-war Leiden** — left out on **geography alone**,
  not on history. They are the case for a second release with cycling or multi-district routes.
- **C065 migration since 1960** — not left out; **not yet known**. The register holds a
  placeholder that asserts no Leiden facts.

## 5. FILES

- `locations.json` — the machine-readable seed. **All content fields are `null` on purpose.**
- `MVP-PROPOSAL.md` — the full argument for this selection.
- `L0xx-*/` — per-location research folders, created as `R01` starts on each.
