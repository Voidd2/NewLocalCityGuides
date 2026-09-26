# SEO/paywall-implementatie: status voor lancering

Bron: `docs/YourLocalCityGuide-SEO-Paywall-Implementation-Brief.pdf`.

De brief is volledig uitgelezen en visueel gecontroleerd. De implementatie volgt het belangrijkste uitgangspunt uit het document: zoekmachines en bezoekers krijgen een nuttige, zelfstandig leesbare preview, terwijl de betaalde ervaring niet in openbare HTML, JSON-LD of de eerste openbare paginabundel terechtkomt.

## Nu geïmplementeerd

- De drie bestaande routes hebben een openbare, indexeerbare routepreview in Nederlands, Engels en Duits.
- Iedere preview bevat een eigen titel, meta-omschrijving, introductie, globale afstand en duur, drie geselecteerde highlights en interne links.
- De preview gebruikt `TouristTrip`- en breadcrumb-structured data met uitsluitend informatie die ook zichtbaar op de pagina staat.
- Canonical-URL's en taalalternatieven worden door de bestaande metadata-helper opgebouwd.
- Alle routepreviews staan in de meertalige sitemap.
- De routes-overzichtspagina gebruikt alleen de expliciet openbare dataset uit `src/data/public-route-seo.ts`.
- De volledige route wordt pas client-side geladen nadat de huidige toegangscontrole een actief pakket bevestigt.
- Niet-betalende bezoekers zien een duidelijke koop- of inlogactie en geen onleesbare geblurde routekaarten.

## Wat bewust premium blijft

- volledige historische verhalen en transcripties;
- video-, audio- en andere premium media-URL's;
- de volledige geordende lijst met routestops;
- GPS-uitvoering, voortgang, opgeslagen routes en accountgegevens;
- interne onderzoeksnotities of ongepubliceerde content.

`robots.txt` is hierbij alleen een zoekmachine-instructie en nooit de beveiligingslaag. Beschermde data mag niet in de openbare pagina of openbare route-dataset worden opgenomen.

Let op: de huidige demo-authenticatie en aankoopstatus zijn nog client-side. De scheiding voorkomt onbedoelde publicatie in HTML, metadata, structured data en de eerste paginabundel, maar is nog geen beveiligde productiepaywall. Voor lancering moeten account, aankoopcontrole en levering van premium routegegevens server-side worden uitgevoerd; dit staat ook als openstaande launchtaak in `TODOLIST.md`.

## Nieuwe routes toevoegen

1. Voeg de operationele route met stops toe aan de bestaande premium routedataset.
2. Schrijf los daarvan een compacte, feitelijk gecontroleerde preview in `src/data/public-route-seo.ts` voor NL, EN en DE.
3. Gebruik maximaal enkele representatieve highlights. Kopieer of knip geen stukken uit betaalde verhalen.
4. Controleer dat de slug in beide datasets gelijk is; de betaalgrens koppelt ze pas na de toegangscontrole.
5. Controleer metadata, structured data, interne links en de sitemap via de build.

## Vervolg vóór lancering

- Maak openbare entitypagina's voor geselecteerde, waardevolle plekken met geverifieerde feiten en eigen zoekintentie.
- Voeg alleen geverifieerde openingstijden, prijzen en ticketlinks toe; tijdgevoelige gegevens moeten een bron- en controledatum krijgen.
- Voeg nooit verzonnen beoordelingen, `Review`- of `aggregateRating`-schema toe.
- Verbind relevante blogartikelen, Leiden-landingspagina's, routepreviews en entitypagina's met gerichte interne links.
- Voer vlak voor productie een crawl uit op canonicals, hreflang, sitemap, statuscodes, indexeerbaarheid en mogelijke premium-contentlekken.
