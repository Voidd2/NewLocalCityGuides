# YourLocalCityGuide — openstaande taken

Lees voor werkzaamheden eerst `PROJECT-GUIDE.md`. Dit bestand bevat alleen nog openstaand werk en een korte samenvatting van wat al af is.

## 1. Foto's van de gebruiker

Definitieve eigen foto's blijven de belangrijkste contentafhankelijkheid. Lever bij voorkeur liggende JPG- of WebP-bestanden van minimaal 1200 px breed en maximaal ongeveer 500 KB.

### Eerst nodig

- `public/images/spots/schaapsvis-winkel.jpg` — winkel aan Herenstraat 48.
- `public/images/spots/schaapsvis-markt.jpg` — viskar op een Leidse marktdag.
- Voeg één van deze later toe aan het Schaapsvishandel-blog en de bedrijfspagina; gebruik tot die tijd geen nep- of stockfoto alsof die van de zaak is.

### Historische locaties

- Burcht, Vismarkt, Koornbrug, Blauwe Steen, Gravensteen en Pieterskerk.
- Pilgrims/Brewster, Jean Pesijnhofje, Buskruitramp/Van der Werffpark.
- Hortus, Weddesteeg, Leidens Ontzet, Wevershuis en Academiegebouw.
- [ ] Maak per belangrijke locatie een actuele foto en een historisch beeld voor de vroeger/nu-slider.
- AI-impressies moeten als impressie worden gelabeld; L014 gebruikt uitsluitend rechtenvrij archiefmateriaal. Alle beeldbriefings en de werkwijze staan in `docs/STORY-IMAGES-AND-SLIDERS.md`.

### Lokale plekken en marketing

- Museum De Lakenhal, RMO, Boerhaave, Wereldmuseum, SieboldHuis en Naturalis.
- Pilgrim Museum, Young Rembrandt Studio, Molenmuseum De Valk, CORPUS en Oude Sterrewacht.
- Homepagebeelden, routecovers, app-screenshots en toekomstige stadsbeelden.

## 2. Openstaande code en integraties

### Affiliate-links

- [ ] Controleer en voeg geldige GetYourGuide-affiliate-links toe voor betaalde musea en attracties.
- [ ] Laat iedere activiteit handmatig controleren voordat de link wordt gepubliceerd.
- Partner-ID: `W9KB6MF`.

### Video

- [ ] Cloudflare Stream koppelen zodra accountgegevens en video-ID's beschikbaar zijn.
- [ ] Video pas afspelen na de actie "Ik ben er"; geen autoplay.
- [ ] Echte marketing-preview op de homepage plaatsen zodra videomateriaal beschikbaar is.

### Accounts en betalen

- [ ] Testlogin vervangen door echte authenticatie.
- [ ] Accounts, aankopen en route-toegang server-side opslaan.
- [ ] Mollie of Stripe kiezen en iDEAL, kaart en wallets integreren.
- [ ] Productievoorwaarden, privacy en herstel van aankopen testen.

### Technische verbetering

- [ ] Bestaande `<img>`-elementen stapsgewijs vervangen door geoptimaliseerde Next.js-afbeeldingen.
- [ ] Verouderde Next.js `middleware`-conventie migreren naar `proxy`.
- [ ] Offline caching opnieuw beoordelen wanneer echte premium media wordt toegevoegd.

## 3. Contentproductie

### Audio

- [ ] TTS-scripts in NL, EN en DE schrijven voor L001–L014.
- Doel: 60–90 seconden per taal en locatie.
- Opslaan in `content/audio-scripts/`.

### Video-briefs

- [ ] Briefs maken voor De Burcht, Koornbrug, Pieterskerk, Buskruitramp en Hortus.
- [ ] Overige MVP-locaties blijven voorlopig audio-only.
- Opslaan in `content/video-briefs/`.

### SEO-content — bewust gepauzeerd

- [ ] Nieuwe artikelen over Leiden met kinderen, slecht weer, gratis activiteiten, weekenden en musea.
- Eerst wachten op verdere instructie van de gebruiker.
- Het bestaande Schaapsvishandel-artikel bevat wel adres, marktdagen, bezoekreden en een link naar de locatiepagina.

### Reviews

- [ ] Echte beoordelingen verzamelen en pas daarna score- of Review-schema publiceren.
- De huidige interface blijft duidelijk als voorbeeldweergave gemarkeerd.

## 4. Later

- [ ] Meer steden: Delft, Utrecht, Amsterdam en Den Haag.
- [ ] Fiets- en buitengebiedroutes voor onder andere Matilo en Meelfabriek.
- [ ] Nieuwsbriefproductie activeren met echte Resend-omgevingsvariabelen.
- [ ] Handmatige mobiele, toegankelijkheids- en linkcontrole door de gebruiker; voorlopig geen extra automatische QA-uitbreiding.

## Recent afgerond

- [x] Homepage herbouwd voor conversie en bestaande about-content samengevoegd.
- [x] GPS-start, hervatten, route-optimalisatie en MapLibre-kaart toegevoegd.
- [x] MapLibre-worker voor Next.js/Turbopack gerepareerd en een zichtbare kaartfallback toegevoegd.
- [x] Lange locatieverhalen opgedeeld in samenvatting, hoofdstukken en inklapbare verdiepingen.
- [x] Vroeger/nu-beeldslider en concrete `{ IMAGE: ... }`-briefings toegevoegd.
- [x] Schaapsvishandel schakelt tussen woensdagmarkt, zaterdagmarkt en Herenstraat 48.
- [x] Op 3 oktober vervangt de route Singels & Stad de Hortus door Leidens Ontzet.
- [x] C052 Nieuwe Rijn-markt verschijnt alleen woensdag en zaterdag van 08:00 tot 17:00 Leidse tijd.
- [x] Meertalige Leiden-hub, SEO-landingspagina's, blog, sitemap, RSS, `llms.txt` en structured data toegevoegd.
- [x] Publieke SEO-samenvattingen gescheiden van premium verhalen, media en routebeleving.
- [x] PWA-basis, foutpagina's, cookie-uitleg, nieuwsbriefkoppeling en route-sharing toegevoegd.
- [x] Donkere modus bewust afgewezen door de gebruiker.

Onderhoudsinformatie staat in `docs/GPS-ROUTES-AND-MAPS.md`, `docs/STORY-IMAGES-AND-SLIDERS.md`, `docs/SEO-AI-CONTENT-GUIDE.md` en `docs/SEO-CONTENT-AND-NEWSLETTER.md`.
