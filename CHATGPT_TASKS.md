# CHATGPT TAKEN — YourLocalCityGuide

> Dit bestand is geschreven door Claude en definieert precies wat ChatGPT doet in dit project.
> ChatGPT voert ALLEEN taken uit die hier staan. Niets meer, niets minder.
> Alle code, architectuur, git en deployment = Claude.

---

## ROL VAN CHATGPT IN DIT PROJECT

ChatGPT doet **uitsluitend research en content**. Geen code. Geen git. Geen architectuurbeslissingen.

De reden: research kost veel tokens maar weinig redeneerwerk. Dat is waar ChatGPT goed in is en tokens spaart bij Claude.

---

## ACTIEVE TAKEN VOOR CHATGPT

### TAAK 1 — Leiden locatie discovery (LDN-DISC-001)
**Prioriteit: HOOG — dit blokkeert alles**

Doe citywide discovery van Leiden. Doel: 30–60 kandidaat-locaties met verhalen.

Geef per locatie:
- Naam
- Type (kerk / brug / plein / gebouw / etc.)
- Adres of coördinaten (zo exact mogelijk)
- Waarom interessant voor bezoekers
- 2–3 historische feiten (met bron vermelden — geen verzinsels)
- Thema-tags: HISTORY / HIDDEN_GEM / FOOD / SCENIC / CULTURE
- Geschatte bezoektijd (minuten)
- Gratis of betaald toegang
- Openingstijden (globaal)

**Lever op als Markdown tabel + per locatie een korte alinea.**

Regels:
- Geen De Waag als "flagship" — behandel alles gelijk
- Geen verzonnen feiten — als je iets niet zeker weet, zeg dat
- Geen toeristische clichés zonder onderbouwing
- Verwijs naar Wikipedia, Erfgoed Leiden, RCE of andere verifieerbare bronnen

---

### TAAK 2 — Concurrentieanalyse
**Prioriteit: MIDDEL**

Onderzoek bestaande audio walking tour apps en stadsguides:
- Rick Steves Audio Europe
- Izi.travel
- VoiceMap
- GPSmyCity
- Detour (opgeheven maar wat kunnen we leren)
- Eventbrite tours Leiden
- Eventful Leiden / VVV Leiden aanbod

Per concurrent:
- Wat doen ze goed
- Wat missen ze
- Prijs
- Beschikbaar voor Leiden ja/nee
- Kans voor YourLocalCityGuide

---

### TAAK 3 — SEO zoekwoorden Leiden
**Prioriteit: MIDDEL**

Geef een lijst van 30–50 zoekwoorden die toeristen gebruiken voor Leiden:
- Nederlands EN Engels
- Korte zoektermen + long-tail
- Inclusief: "what to do in Leiden", "Leiden walking tour", "Leiden bezienswaardigheden" etc.
- Geef aan: zoekintentie (informatief / commercieel / navigatie)

---

### TAAK 4 — Thema-namen en beschrijvingen
**Prioriteit: LAAG — wacht op TAAK 1**

Na afronding van TAAK 1: stel 5–8 route-thema's voor op basis van de gevonden locaties.
Per thema:
- Naam (NL + EN)
- Korte beschrijving (max 2 zinnen, NL + EN)
- Welke kandidaat-locaties passen erbij

---

### TAAK 5 — Nederlandse teksten / vertalingen
**Prioriteit: OP AANVRAAG**

Als Claude een tekst schrijft in het Engels die ook in het Nederlands moet:
- Claude geeft de Engelse tekst
- ChatGPT vertaalt naar correct, natuurlijk Nederlands
- Geen Google Translate kwaliteit — schrijf als een native speaker

---

## WAT CHATGPT NOOIT DOET

- Geen code schrijven
- Geen git commits of pull requests
- Geen architectuurbeslissingen
- Geen keuzes over hosting, framework of database
- Geen taken beginnen die niet in dit bestand staan
- Geen feiten verzinnen zonder bron
- Geen locatie aanwijzen als "hoofd-locatie" of "flagship"
- Niet het master bestand (YOURLOCALCITYGUIDE_MASTER_V1.md) overschrijven

---

## HOE CHATGPT RESULTATEN AANLEVERT

1. Maak een nieuw bestand aan in de map `research/`
2. Gebruik duidelijke bestandsnamen: `research/leiden-locations-discovery.md`, `research/competitor-analysis.md` etc.
3. Begin elk bestand met: datum, taak-ID, versie
4. Commit naar een branch: `chatgpt/[taak-naam]`
5. Maak een PR aan — Claude beoordeelt en merget

**Of: geef de output als tekst in de chat zodat de gebruiker het kan kopiëren naar Claude.**

---

## HANDOFF AAN CLAUDE

Na elke ChatGPT taak geeft ChatGPT aan het einde van zijn output:

```
HANDOFF NAAR CLAUDE:
- Wat is gedaan: [taak-ID]
- Bestand: [pad]
- Volgende stap voor Claude: [wat Claude moet doen met deze output]
- Openstaande vragen: [lijst]
```

---

*Bijgewerkt door: Claude*
*Datum: 2026-09-13*
*Versie: 1.0*
