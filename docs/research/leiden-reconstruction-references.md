# LEIDEN — SHARED RECONSTRUCTION REFERENCES

Task ID: `R03-SHARED` (new) · Agent: Claude (Role B/D) · Date: 2026-09-13
Status: **STARTED — this file grows as `R02` and `R03` proceed**

---

## 0. WHY THIS FILE EXISTS

`L011-R01` found that Erfgoed Leiden's VR reconstruction of Rembrandt's birth house was built
from a small set of **named primary sources** — and that those sources are **city-wide, not
location-specific**.

Without this file, fourteen separate `R03` packages would each rediscover the same three maps.
With it, they start from a shared, cited base and only research what is genuinely local.

**Master §16 requires every video to carry a Must show / May show / Must not show constraint
pack.** Most of what goes in those packs is city-wide: what Leiden's streets, water, materials
and skyline actually looked like in a given century. That belongs here.

---

## 1. THE CORE CARTOGRAPHIC SOURCES

Identified because Erfgoed Leiden's building historians used them for the Rembrandt
reconstruction. If they are good enough for that, they are the baseline for the whole MVP.

| Source | Date | What it gives | Useful for |
|---|---|---|---|
| ***Straetbouc*** of **Van Dulmanhorst and Dou** | **1588–1597** | Street-by-street record of the city | L002, L004, L006, L007, L011 — any pre-1600 streetscape |
| **Bast**, bird's-eye view map | **1600** | The city in three-quarter view: massing, roofs, water | Skylines, building heights, the pre-1612 extent |
| **Blaeu**, bird's-eye view map | **1633** | The same, a generation later | Golden Age streetscapes; change between 1600 and 1633 |

**Rule:** any video set between roughly 1580 and 1650 should be checked against all three
before a single prompt is written. Where they disagree, that disagreement goes in the
uncertainty register — not into a confident image.

---

## 2. OTHER CITY-WIDE VISUAL EVIDENCE IDENTIFIED SO FAR

| Source | Period | Notes |
|---|---|---|
| **Erfgoed Leiden topographic-historical atlas** — 125,000+ maps, photos and prints | All | The single largest resource. Not yet systematically searched |
| **Erfgoed Leiden — Schatkamer *Toen & Nu*** | Mixed | Ready-made then-and-now pairings. Vismarkt confirmed (L002) |
| **Erfgoed Leiden — Schatten in 3D: Entreepoort Burcht** | 17th c. | A 3D record of the Burcht gate (L001) |
| **Rijksmuseum** — 1807 disaster prints | 1807 | **Genuine archival then-and-now for L009. No reconstruction needed** |
| **Erfgoed Leiden — VR Rembrandt birth house** | c. 1606 | Existing reconstruction + published method (L011) |
| **Clusiustuin reconstruction** (design from 2008, based on the 1594 plan) | c. 1600 | A physical reconstruction on site (L010) |
| **Museum Het Leids Wevershuis** — surviving c. 1560 interior | 16th–19th c. | **A real interior of the right type.** Reference for any domestic/working interior (L013, L007) |
| **Leiden American Pilgrim Museum** — late-medieval house interior | c. 1600 | Second surviving interior reference (candidate C043) |
| Photographs of the **1929 Stadhuis fire** | 1929 | Candidate C007 |
| Photographs of the **3 October tradition from 1886** | 1886– | L012's then-and-now |

---

## 3. PEOPLE WHO RECUR ACROSS LOCATIONS

Found while verifying, not by looking for them. They are useful twice over: as route threads
(master §17 wants narrative, not lists) and as research shortcuts — one archive visit serves
several locations.

| Person | Appears at |
|---|---|
| **Willem van der Helm**, city architect | L001 (Burcht gate, 1658–59) · C011 Morspoort · C012 Zijlpoort |
| **Rombout Verhulst**, sculptor | L001 (the 1662 lion) · C012 Zijlpoort · C028 Pesthuis relief (1660) |
| **Arent van 's-Gravesande**, architect | C032 Lakenhal · C026 Bibliotheca Thysiana · C044 Marekerk |
| **Salomon van der Paauw**, city architect 1816–1862 | L003 Koornbrug roofs (1824) — and much of 19th-c. Leiden |
| **Herman Boerhaave** | L010 Hortus · L006 (buried) · C022 |
| **Carolus Clusius** | L010 · the tulip story city-wide |
| **John Robinson** | L007 · L006 (buried) |
| **Marie de Lannoy** | L008 (founder) · L007 (bought the Pilgrims' site) |

**Buried in the Pieterskerk (L006):** Robinson, Boerhaave, Jan Steen, Arminius, Dodoens, and
**Rembrandt's parents**. Four MVP locations have someone lying in that building.

---

## 4. MASTER §16 — CITY-WIDE "MUST NOT SHOW" LIST

A first draft of the anachronism constraints that apply to **every** Leiden video, so each
location's pack only has to add its local specifics.

**Never, in any pre-1850 Leiden scene:**
- asphalt, road markings, kerbstones of modern profile;
- electric or gas street lighting (gas is 19th-c. — check the date before using it);
- modern window glass, uPVC, standardised brick, cement pointing;
- cars, bicycles, modern street furniture, bollards, signage, wheelie bins;
- plastic, in any form;
- modern canal railings and quayside edging;
- tourists, and modern clothing or posture;
- the **Pieterskerk with a tower** after **March 1512** (→ L006) — a specific and very easy error;
- the **Koornbrug with its roofs** before **1824** (→ L003) — likewise.

**Check the date before showing:**
- the Burcht's entrance gate (not before **1658**) and its lion (not before **1662**);
- the Visfontein (not before **1693**);
- the Koornbrug's present bridge (not before **1642**);
- tulips in the Hortus (not before the **1590s**).

⚠️ This list is a **draft** and is not yet sourced claim by claim. It must be reviewed in `R03`
before it governs any generation prompt.

---

## 5. OPEN — TO BE FILLED BY `R02` / `R03`

- Systematic search of the Erfgoed Leiden topographic atlas per location.
- Licensing terms for Rijksmuseum and Erfgoed Leiden images. **Master §38 flags this as an open
  question; L009 and L011 make it concrete and urgent.**
- Period-correct clothing references for Leiden's working population (not court dress).
- Water levels, quay heights and bank treatments by period.
- What Leiden's streets were actually surfaced with, by century.
- Crowd composition and density — master §16 names this as a common failure.
