# YourLocalCityGuide — openstaande taken

Lees voor werkzaamheden eerst `PROJECT-GUIDE.md`. Dit bestand bevat alleen nog openstaand werk en een korte samenvatting van wat al af is.

## 1. Foto's van de gebruiker

Definitieve eigen foto's blijven de belangrijkste contentafhankelijkheid. Lever bij voorkeur liggende JPG- of WebP-bestanden van minimaal 1200 px breed en maximaal ongeveer 500 KB.

### Eerst nodig

- [ ] `public/images/spots/schaapsvis-winkel.jpg` — herkenbare winkelgevel aan Herenstraat 48, inclusief naam en ingang.
- [ ] `public/images/spots/schaapsvis-woensdagmarkt.jpg` — exacte viskar van familie Schaap aan de Nieuwe Rijn, inclusief bedrijfsnaam en verkoopluik.
- [ ] `public/images/spots/schaapsvis-zaterdagmarkt.jpg` — exacte viskar van familie Schaap tegenover De Waag, inclusief bedrijfsnaam, verkoopluik en De Waag als herkenningspunt.
- Voeg alle drie later toe aan de Schaapsvishandel-pagina. Gebruik geen AI-, stock- of foto van een andere viskraam: de beelden dienen als herkenningshulp tussen meerdere visboeren op de markt.

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
- [x] Gecontroleerd importbestand, documentatie en automatische validator voorbereid; algemene stadlinks worden niet als exacte activiteiten geaccepteerd.

### Video

- [ ] Cloudflare Stream koppelen zodra accountgegevens en video-ID's beschikbaar zijn.
- [ ] Homepage-videokaarten een echte previewvideo laten openen zodra een videobestand of Stream-ID beschikbaar is.
- [x] Video pas afspelen na de actie "Ik ben er"; geen autoplay.
- [ ] Echte marketing-preview op de homepage plaatsen zodra videomateriaal beschikbaar is.
- [x] Provider-onafhankelijk videomanifest uitgebreid met poster, duur, NL/EN/DE-ondertitels en private-deliverystatus; publicatiewerkwijze vastgelegd in `docs/VIDEO-PUBLISHING-WORKFLOW.md`.

### Accounts en betalen

- [ ] Testlogin vervangen door echte authenticatie.
- [ ] Accounts, aankopen en route-toegang server-side opslaan.
- [ ] Mollie of Stripe kiezen en iDEAL, kaart en wallets integreren.
- [ ] Productievoorwaarden, privacy en herstel van aankopen testen.

### Technische verbetering

- [x] Bestaande `<img>`-elementen vervangen door geoptimaliseerde Next.js-afbeeldingen.
- [x] Verouderde Next.js `middleware`-conventie migreren naar `proxy`.
- [ ] Offline caching opnieuw beoordelen wanneer echte premium media wordt toegevoegd.
- [x] Automatische premium-contentgrens toegevoegd: openbare datasets mogen geen volledige verhalen, exacte stopvolgorde of private playbackvelden bevatten.
- [x] Media-check uitgebreid met een harde limiet van 2 MB per gerefereerde interfaceafbeelding.
- [x] Acht bestaande zware JPG's teruggebracht van circa 2–4 MB naar circa 0,5–0,8 MB en een herhaalbaar optimalisatiescript toegevoegd.

### Domeinen en cross-site SEO

- [x] Crawlbare links naar de NL-, EN- en DE-versies van Schaapsvishandel.nl toegevoegd op relevante bedrijfs-, blog- en locatiepagina's.
- [ ] Verwijder bij de lancering van Schaapsvishandel.nl de huidige `X-Robots-Tag: noindex, nofollow` van alle openbare taalpagina's.
- [ ] Voeg na vaststelling van het definitieve YourLocalCityGuide-domein inhoudelijke teruglinks toe vanaf Schaapsvishandel.nl volgens `docs/SEO-CONTENT-AND-NEWSLETTER.md`.
- [x] Teruglinkcode in Schaapsvishandel klaargezet; deze verschijnt pas wanneer `CITYGUIDE_URL` het definitieve domein bevat.
- [x] Herbruikbare volledige SEO-crawler toegevoegd en een nulmeting van beide huidige productiesites opgeslagen in `reports/seo/`.
- [x] Google-verificatie via omgevingsvariabele voorbereid voor YourLocalCityGuide; Schaapsvishandel bevat al een verificatietoken.
- [ ] Search Console afronden: de property `schaapsvishandel.nl` bestaat al, maar het ingelogde account heeft geen toegang; gebruik het eigenaaraccount of vraag toegang. Voeg daarna het definitieve cityguide-domein toe, verifieer DNS en dien beide sitemaps in.
- [ ] Na de definitieve domeinkoppeling canonicals, redirects en indexeerbaarheid opnieuw controleren volgens `docs/SEO-LAUNCH-CHECKLIST.md`.

## 3. Contentproductie

### Audio — bewust gepauzeerd

- [ ] TTS-scripts in NL, EN en DE schrijven voor L001–L014.
- Doel: 60–90 seconden per taal en locatie.
- Opslaan in `content/audio-scripts/`.

### Video-briefs

- [x] Briefs maken voor De Burcht, Koornbrug, Pieterskerk, Buskruitramp en Hortus.
- [x] Overige MVP-locaties blijven voorlopig audio-only.
- Opslaan in `content/video-briefs/`.

### SEO-content

- [x] Nieuwe meertalige artikelen toegevoegd over Leiden met kinderen, slecht weer, gratis activiteiten, weekenden en musea.
- [x] Duitse vraaggerichte koppen en zichtbare FAQ-antwoorden toegevoegd, naast volledige Nederlandse en Engelse versies.
- [x] Bronlinks, FAQ-schema, actuele wijzigingsdatums in de sitemap en een uitgebreid openbaar `llms-full.txt`-catalogusbestand toegevoegd.
- Het bestaande Schaapsvishandel-artikel bevat adres, marktdagen, bezoekreden en een link naar de locatiepagina.

### Reviews

- [ ] Echte beoordelingen verzamelen en pas daarna score- of Review-schema publiceren.
- De huidige interface blijft duidelijk als voorbeeldweergave gemarkeerd.
- [x] Meertalig reviewformulier met privé-e-mail, expliciete publicatietoestemming en moderatiestatus toegevoegd; activeer de echte inbox met `REVIEW_WEBHOOK_URL`.
- [x] Moderatie-, privacy- en bewaarbeleid voor echte reviews voorbereid; reviewinzendingen krijgen een uniek ID, timeout en controledatum na 90 dagen.

## 4. Lancering en controle

- [ ] Resterende historische claims uit de R01-onzekerheidsregisters verifiëren voordat ze in publieke tekst, audio of video worden gebruikt.
- [x] R02-ronde 4 uitgevoerd met institutionele bronnen; veilige formuleringen en resterend archiefwerk staan in `docs/qa/R02-verification-round-4.md`.
- [ ] Productieomgeving en eigen domein configureren, inclusief alle vereiste omgevingsvariabelen.
- [ ] Privacyvriendelijke analytics kiezen en alleen na passende cookietoestemming activeren wanneer dat juridisch nodig is.
- [ ] Vlak voor publicatie een volledige crawl uitvoeren op statuscodes, canonicals, hreflang, sitemap, interne links en mogelijke premium-contentlekken.
- [x] Voorlopige volledige crawl uitgevoerd; daarbij drie kapotte evenementlinks gevonden en in de huidige code hersteld. De definitieve crawl blijft een releasegate na domeinkoppeling.
- [ ] Lighthouse/Core Web Vitals en handmatige mobiele toegankelijkheid controleren met het definitieve beeld- en videomateriaal.
- [ ] Transactionele e-mails voor aankoop, welkom en herstel van toegang toevoegen zodra accounts en betalingen server-side werken.
- [x] Concept privacybeleid en gebruiksvoorwaarden in NL/EN/DE uitgebreid met gegevensdoelen, grondslagen, bewaartermijnen, rechten, digitale inhoud en klachten. Definitieve bedrijfsgegevens en juridische controle blijven een releasegate.
- [x] Misleidende optionele cookertoestemming verwijderd zolang alleen noodzakelijke browseropslag actief is.
- [x] Eerste toegankelijkheidsronde uitgevoerd: zichtbare focus, kaartlandmark, semantische routetabs en focusbeheer/Escape voor de routekiezer.
- [x] Herhaalbare pre-media QA-checklist toegevoegd in `docs/PRE-MEDIA-QA.md`; handmatige schermlezer-, device- en Lighthousecontrole blijft open voor de definitieve media.
- [x] Volledige environmentmatrix en veilige configuratievolgorde vastgelegd voor domein, reviews, nieuwsbrief, authenticatie, betalingen en Cloudflare.
- [x] Pre-Cloudflare release-baseline gedocumenteerd en vastgezet met Git-tag `pre-cloudflare-2026-09-28`.

## 5. Later

- [ ] Meer steden: Delft, Utrecht, Amsterdam en Den Haag.
- [ ] Fiets- en buitengebiedroutes voor onder andere Matilo en Meelfabriek.
- [ ] Nieuwsbriefproductie activeren met echte Resend-omgevingsvariabelen.
- [ ] Handmatige mobiele, toegankelijkheids- en linkcontrole door de gebruiker; voorlopig geen extra automatische QA-uitbreiding.

## Recent afgerond

- [x] Verouderde README en PROJECT-GUIDE vervangen door actuele onboarding, routes, databoundaries en verwijzingen naar de enige geldige takenlijst.
- [x] Pre-media launchvoorbereiding afgerond voor privacy/voorwaarden, reviewmoderatie, toegankelijkheid, veilige videometadata en automatische controle op publieke premium-contentlekken.
- [x] Vijf nieuwe NL/EN/DE SEO-artikelen en een veilige, machineleesbare openbare contentcatalogus toegevoegd voor zoekmachines en AI-retrieval, zonder premiumverhalen vrij te geven.
- [x] Search Console-verificatie, cross-site backlinkconfiguratie, echte-reviewinzendingen en een reproduceerbare SEO-launchchecklist voorbereid zonder de vergrendelde Schaapsvishandel-site voortijdig openbaar te zetten.
- [x] Centraal media-manifest toegevoegd voor beeldrechten, historische briefings en video-statussen; geheime Stream-ID's blijven bewust server-side.
- [x] Alle bestaande interfaceafbeeldingen gemigreerd naar `next/image`, Google Fonts via `next/font` geladen en Next.js `middleware` vervangen door `proxy`.
- [x] Openbare SEO-pagina's toegevoegd voor alle vaste musea, historische plekken, markten en lokale favorieten, met menselijke URL's, gratis introducties, NL/EN/DE metadata, canonical/hreflang, sitemap, veilige structured data en interne links.
- [x] Een meertalige plekindex op `/leiden/places` toegevoegd, plus member-CTA's voor volledig verhaal en geplande video's zonder premiumtekst publiek te laden.
- [x] Openbare routepreviews aangevuld met een globale kaartindruk zonder de betaalde stopvolgorde prijs te geven; de dubbele eigen-routekaart op `/routes` is verwijderd.
- [x] Opnamebriefs voor De Burcht, Koornbrug, Pieterskerk, Buskruitramp en Hortus toegevoegd in `content/video-briefs/`.
- [x] Dashboard opnieuw ingedeeld volgens de mobiele wireframe: actieve routes, standaardroutes, eigen route, ontdekken en kaart vormen nu een duidelijke volgorde.
- [x] Kaartcategorie "Tourplekken" verduidelijkt naar "Verhalen & video's" en teruggebracht tot herkenbare bezoekerstypen zoals musea, vis, markt en eten.
- [x] SEO/paywall-implementatiebrief toegevoegd en verwerkt in een veilige eerste fase met indexeerbare routepreviews en een afgescheiden premium route-ervaring.
- [x] Routekaarten zijn openbaar leesbaar in plaats van geblurd; alleen volledige verhalen, exacte route-uitvoering, media, GPS en voortgang blijven betaald.
- [x] Homepage logisch heringedeeld: uitleg, appmogelijkheden, routes, prijs/voordelen en achtergrondinformatie volgen nu één duidelijke bezoekersreis; de dubbele videopreview is verwijderd.
- [x] Homepage herbouwd voor conversie en bestaande about-content samengevoegd.
- [x] Homepage-appuitleg uitgebreid met videoverhalen, lokale winkels en eetplekken, museumtickets en GPS-voordelen.
- [x] Routeoverzicht aangevuld met een duidelijke kaart voor eigen routes, slimme volgorde en live GPS.
- [x] GPS-start, hervatten, route-optimalisatie en MapLibre-kaart toegevoegd.
- [x] MapLibre-worker voor Next.js/Turbopack gerepareerd en een zichtbare kaartfallback toegevoegd.
- [x] Locatieverhalen ingekort tot circa 2–3 minuten, met enkele duidelijke tussenkoppen en zonder uitklapbare tekstblokken.
- [x] Vroeger/nu-beeldslider en concrete `{ IMAGE: ... }`-briefings toegevoegd.
- [x] Routevoortgang synchroniseert direct en GPS markeert een routestop automatisch binnen 75 meter als bezocht.
- [x] Eén werkende routekiezer toegevoegd voor historische locaties, musea en lokale plekken, inclusief standaard- en eigen routes.
- [x] Kaartfilters voor tourplekken, musea, viswinkels, markten en andere categorieën toegevoegd, met herkenbare kaarticonen.
- [x] Discover-teksten renderen Markdown-achtige tussenkoppen en nadruk zonder zichtbare `**`-tekens.
- [x] Schaapsvishandel schakelt tussen woensdagmarkt, zaterdagmarkt en Herenstraat 48.
- [x] Op 3 oktober vervangt de route Singels & Stad de Hortus door Leidens Ontzet.
- [x] C052 Nieuwe Rijn-markt verschijnt alleen woensdag en zaterdag van 08:00 tot 17:00 Leidse tijd.
- [x] Meertalige Leiden-hub, SEO-landingspagina's, blog, sitemap, RSS, `llms.txt` en structured data toegevoegd.
- [x] Publieke SEO-samenvattingen gescheiden van premium verhalen, media en routebeleving.
- [x] PWA-basis, foutpagina's, cookie-uitleg, nieuwsbriefkoppeling en route-sharing toegevoegd.
- [x] Donkere modus bewust afgewezen door de gebruiker.

Onderhoudsinformatie staat in `docs/GPS-ROUTES-AND-MAPS.md`, `docs/STORY-IMAGES-AND-SLIDERS.md`, `docs/SEO-AI-CONTENT-GUIDE.md` en `docs/SEO-CONTENT-AND-NEWSLETTER.md`.
