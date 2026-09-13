# LEIDEN MVP — PRACTICAL INFORMATION, ALL 14 LOCATIONS

Task ID: `UX01`/`MAP01` input · Agent: Claude · Date: 2026-09-13
Status: **PARTIAL — verified where marked ✅, unverified where marked ⚠️. Nothing here is invented.**

---

## 0. WHY THIS FILE EXISTS, AND WHAT IT IS FOR

Three audiences:

1. **The visitor**, eventually — this is the raw material for master §19's `W28` practical-info panel.
2. **Codex** — this is what the `PracticalInfo` schema actually has to hold. It is a worked
   example, not a wish list: every row below is a real constraint found during `R01`/`R02`.
3. **`R02` round 4** — the ⚠️ rows are a to-do list.

**Rule: a ⚠️ row may not be shown to a visitor.** An app that states opening hours it guessed is
worse than one that says "check before you go".

---

## 1. THE TABLE

| ID | Location | Cost | Hours | Access | Status |
|---|---|---|---|---|---|
| **L001** | De Burcht | Free | ⚠️ Park closing times unverified | ⚠️ **Steps to the mound.** Gate and foot at street level | |
| **L002** | Vismarkt | Free | Always open. **Market Wed & Sat** ✅ | ✅ Level, open | ⚠️ **Visfontein sculpture is wrapped in winter** |
| **L003** | Koornbrug | Free | Always open | ✅ Level, open, **covered — the only rain shelter in the MVP** | ✅ **Reopened 14 May 2026.** Heavy traffic now diverted to the Visbrug |
| **L004** | De Blauwe Steen | Free | Always open | ✅ Level — ⚠️ **but the stone is in a roadway.** Instruction must direct viewing from the pavement | |
| **L005** | Gravensteen | ⚠️ Square free; tour price unverified | ✅ **Pieterskerk guided tours several times weekly, since summer 2025.** Rijnland reading room open to visitors | ⚠️ Square level; interior unverified | ⚠️ **Current use is explicitly temporary.** Erfgoed Leiden is housed here during its own renovation |
| **L006** | Pieterskerk | ⚠️ Ticketed — price unverified | ⚠️ Unverified. **Closes for events** | ⚠️ Reported largely accessible — unverified | |
| **L007** | Pilgrims' quarter | Free | Always open | ✅ Street level | Nothing survives above ground |
| **L008** | Jean Pesijnhofje | Free | ⚠️ **No published hours.** Door generally open ✅ | ✅ **Gate only.** View from the entrance; do not enter further; keep quiet | ⚠️ **People live here.** See §3 |
| **L009** | Buskruitramp, Steenschuur | Free | Always open | ✅ Street level | Rebuilt street; the park is the void |
| **L010** | Hortus Botanicus | ⚠️ Ticketed — price unverified | ⚠️ Unverified. **Strongly seasonal** | ⚠️ Reported largely accessible — unverified | A February and a May visit differ completely |
| **L011** | Weddesteeg | Free | Always open | ✅ Street level | Birth house gone |
| **L012** | Leidens Ontzet (at De Waag) | Free | Always open outside | ✅ Street level | ⚠️ **Radically different on 3 October** — reveille and distribution. ⚠️ Waag interior access unverified |
| **L013** | Het Leids Wevershuis | ✅ **Free** | ✅ **Tue–Sun, 13:00–16:00** | ⚠️ See §2 — **poor wheelchair access, stated honestly** | Middelstegracht 143, 2312 TV |
| **L014** | Cleveringa / Academiegebouw | ⚠️ Unverified | ⚠️ Unverified | ⚠️ **Working university building.** Groot Auditorium access unconfirmed | **Do not promise the room** |

---

## 2. ⚠️ L013 — THE ACCESSIBILITY STATEMENT, CLOSE TO VERBATIM

The museum's own wording, and the app should not soften it:

> Wheelchair accessible **but not entirely**. A **narrow hallway** and **high thresholds** between
> rooms make it **poorly accessible for wheelchairs**. **Only someone with a narrow wheelchair,
> with an accompanying person, can view the ground floor.**

"Partially accessible" would be a lie of omission. A visitor needs to know it is **ground floor
only**, needs a **narrow** chair, and **should not come alone**.

**Contact:** leidswevershuis@gmail.com · 071-3010687 · 06-23203423
Group weaving/spinning demonstrations are possible outside normal hours, possibly for a fee.

---

## 3. ⚠️ L008 — PEOPLE LIVE HERE

Not a practical note. A constraint.

> The large entrance door is open and you can walk in. Most residents don't mind people looking —
> but always respect privacy. **Best to stay at the entrance and view the hofje from there. Don't
> make too much noise. These are real places of rest in the city; keep it that way.**

**The app's instruction: stand at the gate, look in, keep your voice down, go no further.**
The 1683 gate building, its central chimney and the regents' chamber above are all visible from
exactly there.

**The risk this product creates:** "most residents don't mind" describes today's numbers. A stream
of app users is a different proposition. **Board Q17 — consult the foundation before launch.**

---

## 4. WHAT THIS TELLS CODEX ABOUT `PracticalInfo`

Every requirement below is evidenced by a row above, not imagined.

| Requirement | Evidenced by |
|---|---|
| **Always-open is a real state**, distinct from "hours unknown" | L002, L004, L007, L009, L011 — half the MVP |
| **Free is a real state**, distinct from "price unknown" | L013 is confirmed free; L006 and L010 are ticketed at an unverified price |
| **Recurring day-of-week openings** | L013 (Tue–Sun) and the L002 market (Wed & Sat) |
| **A single annual date can transform a location** | L012 on 3 October |
| **Seasonality changes what is visible** | L010; and **L002's fountain is physically wrapped in winter** |
| **Closure with a signposted alternative** | L003's restoration: a stated period, a temporary reopening window inside it, three named diversions |
| **Access is not one flag** | L013 needs *ground floor / narrow chair / not alone*. A boolean would misinform someone |
| **Verified vs unverified must be a field, not a convention** | 14 of the rows above are ⚠️. The app must be able to say "check before you go" and mean it |
| **An arrangement can be temporary** | L005's tenancy and tours are explicitly transitional |
| **Behavioural rules attach to a place** | L008: quiet, gate-only, private homes |
| **The story's subject ≠ the location's coordinates** | L004 (stone in a road), L007/L011 (buildings gone), L012 (no structure at all) |

**The honest-uncertainty field is the one that matters most.** Everything else is scheduling; that
one is the difference between a product that sends someone to a locked door and one that doesn't.

---

## 5. `R02` ROUND 4 — THE ⚠️ LIST

1. **L006 Pieterskerk** — hours, ticket price, event closures, real accessibility.
2. **L010 Hortus** — hours, price, accessibility, and what each season actually shows.
3. **L014 Academiegebouw** — can the Groot Auditorium be visited at all?
4. **L005** — tour price, booking, what it covers, whether the **1556 cells** are on it.
5. **L001** — park closing times; step count to the mound.
6. **L012** — Waag interior access; what 3 October actually looks like for a visitor.
7. **L002** — how long the Visfontein stays wrapped.

Most of these are a phone call or a visit, not archive work. Several are the same trip as the
Erfgoed Leiden visit (board Q18).
