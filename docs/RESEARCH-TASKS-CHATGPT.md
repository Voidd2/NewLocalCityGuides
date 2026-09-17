# Research Tasks for ChatGPT / Codex

Status: Handoff list from Claude Code session
Date: 2026-09-17

These are research and content tasks that need to be completed before the website can go live. Each task has a clear deliverable and priority level.

---

## 1. PDOK/BAG Coordinate Lookup (ENG-GEO-001)

**Priority**: High
**Deliverable**: JSON with lat/lng for each location

For each of the 14 MVP locations, look up the exact coordinates via PDOK BAG (Basisregistratie Adressen en Gebouwen) or Kadaster APIs. Do NOT estimate or use Google Maps approximations.

Locations needing coordinates:
- L001: De Burcht (Burgsteeg, Leiden)
- L002: Vismarkt (Vismarkt, Leiden)
- L003: Koornbrug (Koornbrug, Leiden)
- L004: De Blauwe Steen (Breestraat, Leiden)
- L005: Gravensteen (Pieterskerkhof 6, Leiden)
- L006: Pieterskerk (Kloksteeg 16, Leiden)
- L007: Engelse Poort / William Brewster Steeg (William Brewstersteeg, Leiden)
- L008: Jean Pesijnhofje (Kloksteeg 21, Leiden)
- L009: Van der Werffpark (Van der Werffstraat, Leiden)
- L010: Hortus Botanicus (Rapenburg 73, Leiden)
- L011: Weddesteeg / Rembrandt (Weddesteeg, Leiden)
- L012: 3 Oktober / Stadhuisplein (Stadhuisplein, Leiden)
- L013: Wevershuis (Middelweg 45, Leiden)
- L014: Academiegebouw (Rapenburg 73, Leiden)

**Format needed**:
```json
{
  "L001": { "lat": 52.XXXXX, "lng": 4.XXXXX, "source": "PDOK BAG", "accuracy": "building" },
  ...
}
```

**Rule**: If a location cannot be found in PDOK/BAG, return null. Never estimate.

---

## 2. R02 Verification Round 4 - Erfgoed Leiden Contact

**Priority**: High
**Deliverable**: Verification status per claim

Contact Erfgoed Leiden (heritage organization) to verify remaining unconfirmed historical claims for these locations. The R02 verification process requires each visitor-facing claim to have a SourceRecord with:
- Source name and type (primary/secondary/tertiary)
- Date accessed
- Specific page/section
- Verbatim quote or paraphrase
- Confidence level

**Claims still needing verification**:
- L001 De Burcht: Exact construction date range, motte height measurement
- L004 De Blauwe Steen: Origin story and historical function (multiple competing narratives)
- L007 Engelse Poort: William Brewster's exact residence period and activities
- L009 Van der Werffpark: Details of the 1807 gunpowder ship explosion (casualties, blast radius)
- L012 3 Oktober: Specific details of the 1574 siege relief sequence
- L013 Wevershuis: Operating period and weaving techniques demonstrated
- L014 Academiegebouw: Cleveringa speech date and context (ensure L014 includes substance of what happened to Leiden's Jewish citizens, not just Cleveringa's courage - per DEC-016)

**Rules**:
- No superlatives ("oldest", "first", "only") unless the source explicitly states it (DEC-013)
- No AI reconstruction imagery for persecution, resistance, or civilian bombing deaths (DEC-011)
- All content fields stay null until R02 passes for that location

---

## 3. Location Content: Hook Lines and Short Stories

**Priority**: Medium (blocked by R02)
**Deliverable**: Per-location content in NL/EN/DE

After R02 verification passes for each location, write the following fields:
- `hook`: One compelling sentence that makes visitors want to stop (NL/EN/DE)
- `shortStory`: 150-200 word narrative combining history with sensory detail (NL/EN/DE)
- `funFacts`: 3 verified facts per location (NL/EN/DE)
- `lookAround`: What to notice at the physical location - architectural details, hidden symbols, viewpoints (NL/EN/DE)

**Tone**: Conversational, curious, not academic. Like a knowledgeable local friend.
**Constraint**: Every historical claim must trace back to a verified SourceRecord from R02.

---

## 4. Walking Route Narratives

**Priority**: Medium
**Deliverable**: Turn-by-turn walking directions with transition text

For each of the 3 standard routes, write walking/cycling directions between stops:
- Route 1 (Historisch Leiden, walking): 10 stops, city center
- Route 2 (Centrumwandeling, walking): 12 stops
- Route 3 (Fietstour Leiden, cycling): 15 stops, outer ring

Each transition needs:
- Distance and estimated time between stops
- Clear directions (street names, landmarks)
- Transition narrative: what to notice along the way
- All in NL/EN/DE

---

## 5. Hidden Gems Research

**Priority**: Medium
**Deliverable**: Curated list of authentic local spots in Leiden

Research and verify these types of hidden gems for the website:
- Stroopwafel stands at the market (which days, which vendor is the local favorite?)
- Artisanal fish shops (name, address, specialty, opening hours)
- Hidden courtyards/hofjes beyond Jean Pesijnhofje (which are publicly accessible?)
- Authentic brown cafes in alleys (name, address, what makes them special)
- Best local cheese shops
- Independent bookshops
- Breakfast/lunch spots locals actually go to (not tourist-oriented)

**For each gem provide**:
- Name and exact address
- Why it's special (one paragraph)
- Opening hours / market days
- Whether it's tourist-friendly (English spoken?)
- Photo brief: what to photograph there

**Rule**: These must be REAL, currently operating businesses. Verify they still exist.

---

## 6. Practical Information per Location

**Priority**: Medium
**Deliverable**: Structured data per location

For each of the 14 MVP locations, verify and provide:
- Current address
- Opening hours (if applicable)
- Admission fee (if applicable)
- Wheelchair accessibility
- Nearest parking
- Nearest public transport stop
- Estimated visit duration
- Best time to visit (avoid crowds)
- Allowed photography? (some churches restrict)

**Sources**: Official websites, Google Maps (for hours), municipality websites.

---

## 7. Photography Shot List

**Priority**: Medium
**Deliverable**: Detailed brief per image placeholder code

For each of the 59 image placeholder codes (10001-10059), write a photographer's brief:
- Exact location to stand for the shot
- Time of day (golden hour, midday, etc.)
- Season preference
- Composition notes (what to include/exclude)
- Style reference (warm, editorial, candid, architectural)
- Technical notes (wide angle, portrait, etc.)

The full list of codes and descriptions is in `docs/TODO-WEBSITE.md`.

---

## 8. Video Script Outlines

**Priority**: Low (blocked by content and video infrastructure)
**Deliverable**: Script outline per location

For each location that will have an interactive video:
- Opening hook (5 seconds)
- Main story (60-90 seconds)
- Interactive choice point: "Wil je meer weten over [X] of [Y]?"
- Branch A content (30-45 seconds)
- Branch B content (30-45 seconds)
- Closing with "look around" prompt

Scripts needed in NL, EN, DE. Start with the 5 most popular locations:
L001 De Burcht, L006 Pieterskerk, L010 Hortus Botanicus, L003 Koornbrug, L011 Weddesteeg/Rembrandt

---

## 9. Competitor and Pricing Research

**Priority**: Low
**Deliverable**: Comparison table

Research competing city tour apps and guides in the Netherlands:
- iZi.travel (free model)
- GPS My City
- Vidi Guides
- Local walking tour operators in Leiden (prices, duration, languages)
- Audio guide apps at Dutch museums

For each, note: pricing model, number of cities, content type (audio/video/text), languages, reviews/ratings.

---

## 10. SEO Keyword Research

**Priority**: Medium
**Deliverable**: Keyword list with search volumes

Research search volumes (Google Keyword Planner or similar) for:
- "Leiden wandeling" / "Leiden walking tour"
- "Leiden bezienswaardigheden" / "Leiden sightseeing"
- "Leiden stadstour" / "Leiden city tour"
- "Leiden fietstour" / "Leiden bike tour"
- "Leiden verborgen parels" / "Leiden hidden gems"
- "Pilgrim Fathers Leiden"
- "Leiden met kinderen" / "Leiden with kids"
- "Stadtfuhrer Leiden" / "Leiden Sehenswurdigkeiten" (German)
- Related long-tail keywords

**Deliverable**: Priority keywords per page, suggested blog/landing page topics.

---

## 11. Legal / GDPR Requirements

**Priority**: Medium
**Deliverable**: Requirements checklist

Research requirements for a Dutch commercial website:
- KvK (Chamber of Commerce) registration requirements
- Privacy policy requirements (AVG/GDPR)
- Cookie consent implementation (specifically for NL and DE markets)
- Terms of service for digital product sales
- Refund policy requirements for digital products in the EU
- VAT requirements for digital services

---

## 12. Open Board Questions (Q11-Q19)

**Priority**: Low
**Deliverable**: Research to inform decisions

These questions from the project board need research input:
- Q11: Which payment provider? (Mollie vs Stripe for Dutch market, iDEAL support)
- Q12: Hosting costs estimate (Vercel Pro vs alternatives for NL-focused site)
- Q13: Video hosting costs (Cloudflare Stream pricing for ~50 videos x 3 languages)
- Q14: Audio content production (Dutch/English/German voiceover costs and providers)
- Q15: Photography costs (Leiden-based photographer day rate)
- Q16: Beta testing strategy (how to recruit first users in Leiden)
- Q17: Launch timeline (what's the minimum viable content for soft launch?)
- Q18: Marketing budget for first 3 months
- Q19: Expansion roadmap (which city after Leiden? Delft most requested)

---

## Important Constraints for All Research

1. **No fabrication**: If you cannot verify something, say so. Do not fill gaps with plausible-sounding content.
2. **Source everything**: Every fact needs a source URL or reference.
3. **DEC-010**: Coordinates must come from PDOK/BAG, never estimated.
4. **DEC-011**: No AI-generated imagery for sensitive historical events.
5. **DEC-013**: No superlatives without explicit source confirmation.
6. **DEC-016**: L014 content must address what happened to Leiden's Jewish citizens.
7. **Three languages**: All visitor-facing content needs NL, EN, and DE versions.
8. **No emojis**: None in any deliverable.
