# ENG-GEO-001 — PDOK/BAG-coördinaten voor de MVP

Datum: 2026-09-17  
Versie: 1.0  
Status: gereed voor inhoudelijke beoordeling

## Resultaat

Van de veertien door Claude opgegeven locaties hebben er elf een passende registratie in
PDOK Locatieserver. Zeven zijn gekoppeld aan een BAG-adres en vier aan het middelpunt van een
geregistreerde straat. Drie locaties blijven volgens de opdracht null: de Koornbrug, De
Blauwe Steen en het Van der Werffpark worden niet als passend object gevonden.

De coördinaten staan in research/eng-geo-001-mvp-coordinates.json. De waarden uit
centroide_ll zijn van POINT(lengtegraad breedtegraad) omgezet naar afzonderlijke
lat- en lng-velden. Er zijn geen handmatige verschuivingen of kaartschattingen toegepast.

Een building_address_centroid is het referentiepunt van het geregistreerde BAG-adres. Het
is niet automatisch de deur, bezoekersingang of veiligste plek om stil te staan. Een
street_centroid is het middelpunt dat PDOK voor de hele straat teruggeeft en is daarom
evenmin geschikt als turn-by-turn navigatiepunt zonder veldcontrole.

## Afwijkingen in de aangeleverde adressen

- **L001 De Burcht:** Claude gaf “Burgsteeg”. Die zoekopdracht vindt alleen de straat. Voor
  het gebouw is het bestaande officiële adres uit het project gebruikt: Van der Sterrepad 5.
  Het resultaat is uitsluitend een BAG-adresreferentie.
- **L013 Wevershuis:** “Middelweg 45” uit de handoff bestaat niet als exact PDOK-adres. De
  officiële website van het museum vermeldt Middelstegracht 143. Dat adres levert een exacte
  BAG-match op en is daarom gebruikt.
- **L009 Van der Werffpark:** PDOK vindt noch “Van der Werffpark” noch “Van der Werfpark”.
  De in de handoff genoemde “Van der Werffstraat” bestaat evenmin; PDOK kent wel Van der
  Werfstraat, maar het middelpunt daarvan is geen bewijs voor de ligging van het park.

## Onopgeloste locaties

| ID | Zoekterm | Uitkomst |
|---|---|---|
| L003 | Koornbrug Leiden | Geen passend brugobject; alleen algemene resultaten voor Leiden |
| L004 | Blauwe Steen Leiden | Geen passend object in Leiden; Breestraat is te ruim om als exacte locatie te gebruiken |
| L009 | Van der Werffpark Leiden | Geen passend parkobject; verwante straatnaam is geen bewijs voor het parkpunt |

## Bronnen

- [PDOK Locatieserver](https://www.pdok.nl/introductie/-/article/pdok-locatieserver-1) —
  beschrijving van de officiële zoekservice en de onderliggende overheidsregistraties.
- De exacte query-URL, het PDOK-object-ID en waar beschikbaar het BAG-nummeraanduidings-ID
  staan bij iedere niet-lege locatie in het JSON-bestand.
- [Museum Het Leids Wevershuis](https://wevershuis.nl/) — officieel bezoekadres voor L013,
  geraadpleegd op 2026-09-17.
- [Open Monumenten Dagen Leiden](https://www.omdleiden.nl/omd-monument/23-de-burcht/) —
  gepubliceerd adres Van der Sterrepad 5 voor L001, geraadpleegd op 2026-09-17.

## Gebruik

De zeven BAG-punten kunnen als adresreferentie worden gebruikt. De vier straatpunten moeten
op de kaart als globale referentie worden behandeld. Geen van de elf punten is in deze taak
ter plaatse als bezoekersingang of veilige routepositie gecontroleerd. L003, L004 en
L009 mogen niet alsnog met een geschatte kaartpositie worden gevuld.

HANDOFF NAAR CLAUDE:
- Wat is gedaan: ENG-GEO-001 voor de veertien MVP-locaties uit de handoff van 2026-09-17
- Bestand: research/eng-geo-001-mvp-coordinates.json
- Volgende stap voor Claude: controleer de drie null-locaties en laat straatpunten vóór routenavigatie ter plaatse valideren
- Openstaande vragen: welk officieel kaartobject of veldpunt moet voor L003, L004 en L009 worden gebruikt?
