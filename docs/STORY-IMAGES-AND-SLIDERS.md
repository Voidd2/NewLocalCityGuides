# Verhaalbeelden en vroeger/nu-slider

De locatieverhalen gebruiken één herbruikbare vergelijkingsslider. Links staat het historische beeld ("Vroeger"), rechts de actuele foto ("Nu"). Zolang een bestand ontbreekt, toont de website de redactionele opdracht uit `src/data/story-media.ts` in dit formaat:

`{ IMAGE: concrete omschrijving van het benodigde beeld }`

Deze tekst is bewust zichtbaar in de testomgeving: zo is exact duidelijk welk beeld nog gemaakt of aangeleverd moet worden en wordt nooit per ongeluk een nepbeeld als echt historisch materiaal gepubliceerd.

## Een beeld toevoegen

1. Plaats het geoptimaliseerde bestand in `public/images/stories/<locatie-slug>/`.
2. Gebruik bij voorkeur WebP of JPG, liggend 16:10 of 16:9, minimaal 1600 pixels breed en bij voorkeur maximaal 500 KB.
3. Open `src/data/story-media.ts` en vervang bij de juiste locatie `src: null` door bijvoorbeeld `src: "/images/stories/de-burcht/nu.webp"`.
4. Controleer de alt-tekst en pas die aan als het beeld specifieke informatie toont.
5. Test de slider op telefoonbreedte en controleer beide uiterste posities met muis, aanraking en toetsenbord.

De actuele en historische foto werken het best wanneer plek, kijkrichting en belangrijkste gebouwvorm ongeveer gelijk zijn. Een perfecte match is niet verplicht, maar een totaal andere kijkhoek maakt de vergelijking minder bruikbaar.

## Regels voor AI-beelden

- Een AI-beeld mag alleen worden gebruikt als historisch onderbouwde impressie, nooit als archieffoto of hard historisch bewijs.
- Zet in de uiteindelijke bijschriftdata altijd duidelijk "Historische AI-impressie" (vertaald in NL, EN en DE).
- Baseer kleding, bouwvorm, straatbeeld en voorwerpen op betrouwbare bronnen. Leg gebruikte bronnen bij voorkeur vast in de contentnotities.
- Voeg geen sensationele, grafische of verzonnen personen/gebeurtenissen toe.
- Voor vervolging, verzet en burgerdoden gelden strengere regels. Voor L014 (Cleveringa en de Jodenvervolging) is AI-reconstructie niet toegestaan; gebruik alleen rechtenvrij archiefmateriaal of documenten. Voor L009 en L012 is in de huidige briefing eveneens gekozen voor historische kaarten of prenten in plaats van een verzonnen foto.
- Een huidige foto van Schaapsvishandel moet een echte foto van de winkel of marktwagen zijn. Gebruik geen AI-beeld alsof dit de familiezaak in werkelijkheid is.

## Nieuwe locatie toevoegen

Zonder aparte configuratie maakt `getStoryMedia()` automatisch twee duidelijke placeholders voor een nieuwe locatie. Voeg voor een belangrijk verhaal daarna een eigen regel toe aan `historicalBriefs` in `src/data/story-media.ts`. Beschrijf periode, zichtbare situatie, gewenste stijl en wat nadrukkelijk niet mag worden verzonnen.

De presentatiecomponent staat in `src/components/story/BeforeAfterSlider.tsx`. De inhoud en beeldbriefings blijven daarvan gescheiden in `src/data/story-media.ts`, zodat nieuwe beelden geen aanpassing aan de slidercode vereisen.

## Kaartworker bij builds

De MapLibre-worker wordt voor `dev` en `build` naar `public/maplibre/` gekopieerd door `scripts/copy-maplibre-worker.mjs`. Die map is gegenereerd en staat daarom in `.gitignore`. Verwijder de `predev`- en `prebuild`-scripts niet: zonder deze losse workerbestanden kan Turbopack een witte kaart tonen.
