import type { Locale } from "@/i18n/config";

export type LocalizedText = Record<Locale, string>;

export interface ContentSection {
  heading: LocalizedText;
  paragraphs: Record<Locale, string[]>;
  bullets?: Record<Locale, string[]>;
}

export interface SeoLanding {
  slug: "city-guide-leiden" | "leiden-tours";
  title: LocalizedText;
  description: LocalizedText;
  eyebrow: LocalizedText;
  intro: LocalizedText;
  image: string;
  primaryCta: LocalizedText;
  primaryHref: string;
  secondaryCta: LocalizedText;
  secondaryHref: string;
  sections: ContentSection[];
  faq: Array<{ question: LocalizedText; answer: LocalizedText }>;
}

export interface BlogPost {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  excerpt: LocalizedText;
  category: LocalizedText;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  image: string;
  sections: ContentSection[];
}

const lt = (nl: string, en: string, de: string): LocalizedText => ({ nl, en, de });

export const seoLandings: SeoLanding[] = [
  {
    slug: "city-guide-leiden",
    title: lt("Stadsgids Leiden: ontdek de stad als een local", "Leiden city guide: explore the city like a local", "Leiden Reiseführer: die Stadt wie ein Local entdecken"),
    description: lt(
      "Complete stadsgids voor Leiden met bezienswaardigheden, wandelroutes, musea, marktdagen en lokale tips voor een dag of weekend in de stad.",
      "A practical Leiden city guide with sights, walking routes, museums, market days and local tips for a day trip or weekend.",
      "Praktischer Leiden-Reiseführer mit Sehenswürdigkeiten, Rundgängen, Museen, Markttagen und lokalen Tipps für einen Tag oder ein Wochenende.",
    ),
    eyebrow: lt("Jouw complete stadsgids", "Your complete city guide", "Dein kompletter Reiseführer"),
    intro: lt(
      "Leiden is compact genoeg om te voet te ontdekken, maar rijk genoeg voor meerdere dagen. Deze gids helpt je kiezen tussen historische plekken, musea, hofjes, grachten en de markt, met routes die je zelfstandig vanaf iedere plek kunt starten.",
      "Leiden is compact enough to explore on foot, yet rich enough to fill several days. This guide helps you choose between historic places, museums, courtyards, canals and the market, with routes you can start independently from wherever you are.",
      "Leiden ist kompakt genug, um es zu Fuß zu entdecken, und zugleich vielseitig genug für mehrere Tage. Dieser Reiseführer verbindet historische Orte, Museen, Höfe, Grachten und den Markt mit Routen, die du an jedem Punkt beginnen kannst.",
    ),
    image: "/images/heroes/10001-leiden-canal-historic-buildings.jpg",
    primaryCta: lt("Bekijk routes door Leiden", "Browse Leiden routes", "Routen durch Leiden ansehen"),
    primaryHref: "/routes",
    secondaryCta: lt("Open de interactieve kaart", "Open the interactive map", "Interaktive Karte öffnen"),
    secondaryHref: "/map",
    sections: [
      {
        heading: lt("Wat mag je niet missen in Leiden?", "What should you not miss in Leiden?", "Was sollte man in Leiden nicht verpassen?"),
        paragraphs: {
          nl: ["Begin in het historische centrum bij de Burcht, de Vismarkt en de Pieterskerk. Vanaf daar liggen de universiteit, het Rapenburg, de Hortus en verschillende hofjes op korte loopafstand. De kracht van Leiden zit niet alleen in losse monumenten, maar vooral in de verhalen die straten, handel, wetenschap en bewoners met elkaar verbinden."],
          en: ["Start in the historic centre at De Burcht, the fish market and Pieterskerk. From there, the university, Rapenburg, the botanical garden and several courtyards are a short walk away. Leiden is not just a collection of monuments: its streets connect stories of trade, science and the people who shaped the city."],
          de: ["Beginne im historischen Zentrum bei der Burcht, dem Fischmarkt und der Pieterskerk. Universität, Rapenburg, Botanischer Garten und mehrere Höfe liegen von dort nur wenige Gehminuten entfernt. Leidens Reiz entsteht nicht nur durch einzelne Denkmäler, sondern durch die Verbindung von Handel, Wissenschaft und Stadtgeschichte."],
        },
        bullets: {
          nl: ["De Burcht en het historische centrum", "Pieterskerk, Academiegebouw en Rapenburg", "Hortus Botanicus en Leidse musea", "Vismarkt en Nieuwe Rijn op marktdagen"],
          en: ["De Burcht and the historic centre", "Pieterskerk, the Academy Building and Rapenburg", "Hortus Botanicus and Leiden's museums", "The fish market and Nieuwe Rijn on market days"],
          de: ["Burcht und historisches Zentrum", "Pieterskerk, Akademiegebäude und Rapenburg", "Hortus Botanicus und Leidener Museen", "Fischmarkt und Nieuwe Rijn an Markttagen"],
        },
      },
      {
        heading: lt("Een dag of weekend plannen", "Planning a day or weekend", "Einen Tag oder ein Wochenende planen"),
        paragraphs: {
          nl: ["Voor één dag werkt een combinatie van een stadswandeling, lunch rond de Nieuwe Rijn en één museum het best. Blijf je een weekend, verdeel dan het centrum en de singels over twee dagen. Zo houd je ruimte voor een hofje, een terras of een onverwachte stop.", "Kom je op woensdag of zaterdag, neem dan de markt mee in je planning. De route Markt & Ambacht leidt je langs de Vismarkt en de marktkraam van Schaapsvishandel. Op andere dagen verwijst de route naar de vaste viswinkel aan de Herenstraat."],
          en: ["For a day trip, combine a city walk, lunch near Nieuwe Rijn and one museum. For a weekend, divide the historic centre and the outer canals over two days. This leaves time for a courtyard, café or an unplanned stop.", "If you visit on Wednesday or Saturday, include the market. The Market & Craft route passes the historic fish market and the Schaapsvishandel fish stall. On other days, the route directs you to the family shop on Herenstraat."],
          de: ["Für einen Tagesausflug eignet sich eine Kombination aus Stadtrundgang, Mittagspause an der Nieuwe Rijn und einem Museum. An einem Wochenende kannst du Zentrum und Singelpark auf zwei Tage verteilen und hast Zeit für einen Hof oder eine spontane Pause.", "Mittwochs und samstags lohnt sich der Markt. Die Route Markt & Handwerk führt am historischen Fischmarkt und am Stand von Schaapsvishandel vorbei. An anderen Tagen verweist die Route auf das feste Fischgeschäft in der Herenstraat."],
        },
      },
      {
        heading: lt("Zelfstandig wandelen met GPS", "Walk independently with GPS", "Selbstständig mit GPS unterwegs"),
        paragraphs: {
          nl: ["Je hoeft niet op een vast tijdstip bij een gids te verzamelen. Kies een route, deel je locatie en start bij de dichtstbijzijnde stop. De route kan onderweg opnieuw worden geoptimaliseerd en eerder bezochte plekken blijven bewaard."],
          en: ["There is no fixed meeting time or group to wait for. Choose a route, share your location and start at the nearest stop. The order can be optimised again while you walk, and completed stops remain saved."],
          de: ["Du musst nicht zu einer festen Uhrzeit auf eine Gruppe warten. Wähle eine Route, teile deinen Standort und beginne am nächsten Halt. Die Reihenfolge kann unterwegs neu optimiert werden; besuchte Stationen bleiben gespeichert."],
        },
      },
    ],
    faq: [
      { question: lt("Hoeveel tijd heb je nodig voor Leiden?", "How much time do you need in Leiden?", "Wie viel Zeit braucht man für Leiden?"), answer: lt("In één dag kun je het historische centrum, een wandelroute en één museum combineren. Met een weekend heb je ook tijd voor de singels, meerdere musea en rustige lokale plekken.", "In one day you can combine the historic centre, a walking route and one museum. A weekend also gives you time for the outer canals, more museums and quieter local places.", "An einem Tag lassen sich Altstadt, Rundgang und ein Museum verbinden. An einem Wochenende bleibt zusätzlich Zeit für den Singelpark, weitere Museen und ruhigere Orte.") },
      { question: lt("Is Leiden goed te voet te verkennen?", "Is Leiden easy to explore on foot?", "Kann man Leiden gut zu Fuß erkunden?"), answer: lt("Ja. De belangrijkste plekken in het centrum liggen dicht bij elkaar. Voor locaties verder buiten het centrum is een fiets handig.", "Yes. The main sights in the centre are close together. A bicycle is useful for places farther outside the centre.", "Ja. Die wichtigsten Ziele im Zentrum liegen nah beieinander. Für weiter entfernte Orte ist ein Fahrrad praktisch.") },
      { question: lt("Wanneer is er markt in Leiden?", "When is the Leiden market?", "Wann findet der Markt in Leiden statt?"), answer: lt("De grote warenmarkt in het centrum vindt normaal plaats op woensdag en zaterdag. Controleer bij feestdagen altijd de actuele gemeentelijke informatie.", "The main city-centre market normally takes place on Wednesday and Saturday. Around public holidays, always check current municipal information.", "Der große Innenstadtmarkt findet normalerweise mittwochs und samstags statt. Rund um Feiertage solltest du die aktuellen städtischen Angaben prüfen.") },
    ],
  },
  {
    slug: "leiden-tours",
    title: lt("Leiden tours: kies een stadswandeling die bij je past", "Leiden tours: choose the right city walk", "Leiden Touren: den passenden Stadtrundgang wählen"),
    description: lt("Vergelijk zelfgeleide Leiden tours langs geschiedenis, markten, ambacht en groene singels. Start wanneer je wilt met GPS en lokale verhalen.", "Compare self-guided Leiden tours focused on history, markets, crafts and green canals. Start whenever you like with GPS and local stories.", "Vergleiche selbstgeführte Leiden-Touren zu Geschichte, Märkten, Handwerk und grünen Grachten. Flexibel starten mit GPS und lokalen Geschichten."),
    eyebrow: lt("Routes voor ieder tempo", "Routes for every pace", "Routen für jedes Tempo"),
    intro: lt("Een tour door Leiden hoeft niet aan een groep of vertrektijd vast te zitten. Met een zelfgeleide route bepaal je zelf wanneer je start, waar je pauzeert en welke verhalen je uitgebreider bekijkt.", "A Leiden tour does not have to be tied to a group or departure time. With a self-guided route, you decide when to start, where to pause and which stories deserve more time.", "Eine Tour durch Leiden muss nicht an eine Gruppe oder Abfahrtszeit gebunden sein. Bei einer selbstgeführten Route entscheidest du über Start, Pausen und Tempo."),
    image: "/images/routes/10002-leiden-canal-pieterskerk.jpg",
    primaryCta: lt("Vergelijk alle tours", "Compare all tours", "Alle Touren vergleichen"),
    primaryHref: "/routes",
    secondaryCta: lt("Maak je eigen route", "Build your own route", "Eigene Route erstellen"),
    secondaryHref: "/routes/custom",
    sections: [
      {
        heading: lt("Welke Leiden tour past bij jou?", "Which Leiden tour suits you?", "Welche Leiden-Tour passt zu dir?"),
        paragraphs: {
          nl: ["Kies Centrum Route voor de belangrijkste historische plekken en een compacte kennismaking. Markt & Ambacht past bij bezoekers die handel, lokale smaken en familiebedrijven willen combineren. Singels & Stad is langer en werkt goed op de fiets."],
          en: ["Choose the City Centre Route for major historic places and a compact introduction. Market & Craft combines trade, local flavours and family businesses. Canals & City is longer and works well by bicycle."],
          de: ["Die Zentrumsroute verbindet wichtige historische Orte in einer kompakten Einführung. Markt & Handwerk kombiniert Handelsgeschichte, lokale Geschmäcker und Familienbetriebe. Singel & Stadt ist länger und eignet sich gut fürs Fahrrad."],
        },
        bullets: {
          nl: ["Centrum Route: geschiedenis en hoofdlocaties", "Markt & Ambacht: marktdagen en lokale verhalen", "Singels & Stad: groen, wetenschap en fietsen", "Eigen route: zelf plekken en volgorde kiezen"],
          en: ["City Centre Route: history and key sights", "Market & Craft: market days and local stories", "Canals & City: greenery, science and cycling", "Custom route: choose your own stops"],
          de: ["Zentrumsroute: Geschichte und Hauptsehenswürdigkeiten", "Markt & Handwerk: Markttage und lokale Geschichten", "Singel & Stadt: Grün, Wissenschaft und Fahrrad", "Eigene Route: Stationen selbst wählen"],
        },
      },
      {
        heading: lt("Waarom een zelfgeleide tour?", "Why choose a self-guided tour?", "Warum eine selbstgeführte Tour?"),
        paragraphs: {
          nl: ["Een zelfgeleide tour combineert de vrijheid van zelf wandelen met de structuur van een uitgestippelde route. Je kunt stoppen voor koffie, langer in een museum blijven of de route later hervatten. GPS helpt je vanaf je actuele locatie verder."],
          en: ["A self-guided tour combines the freedom of exploring alone with the structure of a planned route. Stop for coffee, spend longer in a museum or resume later. GPS helps you continue from your current position."],
          de: ["Eine selbstgeführte Tour verbindet freie Zeiteinteilung mit einer klaren Route. Du kannst eine Kaffeepause einlegen, länger im Museum bleiben oder später fortsetzen. GPS hilft dir, am aktuellen Standort weiterzugehen."],
        },
      },
      {
        heading: lt("Tours op marktdagen", "Tours on market days", "Touren an Markttagen"),
        paragraphs: {
          nl: ["Op woensdag en zaterdag verandert de Markt & Ambacht-route automatisch mee. Je krijgt dan de marktkraam van Schaapsvishandel als aanbevolen stop. Buiten marktdagen leidt de route naar de viswinkel, zodat de lokale familiezaak onderdeel blijft van de ervaring."],
          en: ["On Wednesday and Saturday, the Market & Craft route adapts automatically and recommends the Schaapsvishandel market stall. On other days it points to the fish shop, keeping the local family business part of the experience."],
          de: ["Mittwochs und samstags passt sich die Route Markt & Handwerk automatisch an und empfiehlt den Marktstand von Schaapsvishandel. An anderen Tagen führt sie zum Fischgeschäft, sodass der lokale Familienbetrieb Teil des Erlebnisses bleibt."],
        },
      },
    ],
    faq: [
      { question: lt("Moet ik vooraf reserveren?", "Do I need to book in advance?", "Muss ich vorher reservieren?"), answer: lt("Voor de digitale routes is geen vast startmoment nodig. Voor musea en betaalde attracties kan vooraf boeken wel verstandig zijn.", "The digital routes have no fixed starting time. Booking ahead can still be useful for museums and paid attractions.", "Für die digitalen Routen gibt es keine feste Startzeit. Für Museen und kostenpflichtige Attraktionen kann eine Vorabbuchung sinnvoll sein.") },
      { question: lt("Kan ik halverwege stoppen?", "Can I stop halfway?", "Kann ich unterwegs aufhören?"), answer: lt("Ja. Je voortgang wordt lokaal bewaard, zodat je de route later kunt hervatten.", "Yes. Your progress is saved locally so you can resume the route later.", "Ja. Dein Fortschritt wird lokal gespeichert, sodass du die Route später fortsetzen kannst.") },
      { question: lt("Werkt de tour ook zonder gids?", "Does the tour work without a guide?", "Funktioniert die Tour ohne Guide?"), answer: lt("Ja. Kaart, routevolgorde en verhalen zijn gemaakt om zelfstandig te gebruiken.", "Yes. The map, route order and stories are designed for independent use.", "Ja. Karte, Reihenfolge und Geschichten sind für die selbstständige Nutzung ausgelegt.") },
    ],
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "leiden-in-one-day",
    title: lt("Leiden in één dag: route, markt en musea", "One day in Leiden: route, market and museums", "Ein Tag in Leiden: Route, Markt und Museen"),
    description: lt("Plan één dag in Leiden met een logische wandelroute langs de Burcht, Vismarkt, Pieterskerk, Rapenburg en een museum.", "Plan one day in Leiden with a practical walking route past De Burcht, the fish market, Pieterskerk, Rapenburg and a museum.", "Plane einen Tag in Leiden mit einer praktischen Route über Burcht, Fischmarkt, Pieterskerk, Rapenburg und ein Museum."),
    excerpt: lt("Een haalbaar dagschema voor wie veel wil zien zonder voortdurend op de klok te kijken.", "A realistic itinerary for seeing plenty without constantly checking the time.", "Ein realistischer Tagesplan für viele Eindrücke ohne Zeitdruck."),
    category: lt("Dagplanning", "Trip planning", "Tagesplanung"),
    publishedAt: "2026-09-24",
    updatedAt: "2026-09-24",
    readingMinutes: 7,
    image: "/images/heroes/10008-leiden-canal-panorama.jpg",
    sections: [
      { heading: lt("Ochtend: begin met overzicht", "Morning: start with an overview", "Vormittag: mit Überblick beginnen"), paragraphs: { nl: ["Start bij de Burcht. Vanaf de heuvel zie je hoe compact het centrum is en liggen de Nieuwe Rijn en Hooglandse Kerk vlakbij. Loop daarna via de Koornbrug naar de Vismarkt. Op woensdag en zaterdag vult de markt de kades en bruggen; op andere dagen is de historische structuur van het plein beter zichtbaar.", "Volg vervolgens de route richting Pieterskerk. De omliggende straten, het Gravensteen en het Rapenburg laten in korte afstand verschillende lagen van de stad zien."], en: ["Start at De Burcht. From the hill you can see how compact the centre is, with Nieuwe Rijn and Hooglandse Kerk close by. Continue across Koornbrug to the fish market. On Wednesday and Saturday the market fills the quays and bridges; on other days the historic layout is easier to see.", "Continue towards Pieterskerk. The surrounding lanes, Gravensteen and Rapenburg reveal several layers of the city within a short distance."], de: ["Beginne an der Burcht. Vom Hügel erkennst du, wie kompakt das Zentrum ist; Nieuwe Rijn und Hooglandse Kerk liegen direkt daneben. Gehe über die Koornbrug zum Fischmarkt. Mittwochs und samstags füllt der Markt die Ufer und Brücken, an anderen Tagen ist die historische Platzstruktur besser sichtbar.", "Weiter geht es zur Pieterskerk. Die umliegenden Gassen, das Gravensteen und der Rapenburg zeigen auf kurzer Strecke verschiedene Epochen der Stadt."] } },
      { heading: lt("Lunch: plan rond de markt", "Lunch: plan around the market", "Mittagspause rund um den Markt"), paragraphs: { nl: ["De Nieuwe Rijn is een logische plek voor een pauze. Op marktdagen kun je de route langs Schaapsvishandel laten lopen. De familiezaak verkoopt sinds 1938 vis en staat op woensdag en zaterdag op de Leidse markt. Buiten marktdagen kun je voor de vaste winkel naar de Herenstraat."], en: ["Nieuwe Rijn is a practical place for a break. On market days, route planning can include Schaapsvishandel. The family business has sold fish since 1938 and trades at Leiden market on Wednesday and Saturday. On other days, visit the permanent shop on Herenstraat."], de: ["Die Nieuwe Rijn eignet sich gut für eine Pause. An Markttagen kann die Route Schaapsvishandel einbeziehen. Der Familienbetrieb verkauft seit 1938 Fisch und steht mittwochs und samstags auf dem Leidener Markt. An anderen Tagen findest du das feste Geschäft in der Herenstraat."] } },
      { heading: lt("Middag: kies één museum", "Afternoon: choose one museum", "Nachmittag: ein Museum auswählen"), paragraphs: { nl: ["Kies één museum dat echt bij je interesse past. Voor oudheid is er het Rijksmuseum van Oudheden, voor wetenschap Rijksmuseum Boerhaave en voor kunst en stadsgeschiedenis Museum De Lakenhal. Naturalis vraagt meer tijd en ligt buiten de meest compacte centrumlus.", "Sluit af bij de Hortus of wandel langs het Rapenburg terug richting station. Door niet meerdere grote musea op één dag te stapelen, blijft de dag ontspannen."], en: ["Choose one museum that genuinely matches your interests: the National Museum of Antiquities for archaeology, Rijksmuseum Boerhaave for science, or Museum De Lakenhal for art and city history. Naturalis takes more time and sits outside the tightest city-centre loop.", "Finish at the botanical garden or follow Rapenburg back towards the station. Limiting the day to one major museum keeps the itinerary relaxed."], de: ["Wähle ein Museum passend zu deinen Interessen: das Rijksmuseum van Oudheden für Archäologie, Rijksmuseum Boerhaave für Wissenschaft oder Museum De Lakenhal für Kunst und Stadtgeschichte. Naturalis benötigt mehr Zeit und liegt außerhalb der kompaktesten Zentrumsrunde.", "Beende den Tag im Botanischen Garten oder gehe am Rapenburg zurück zum Bahnhof. Mit nur einem großen Museum bleibt der Tagesplan entspannt."] }, bullets: { nl: ["Reken op 2 tot 3 uur wandelen, exclusief museum", "Controleer openingstijden op de officiële website", "Gebruik de interactieve kaart om vanaf je actuele locatie te starten"], en: ["Allow 2 to 3 hours of walking, excluding the museum", "Check opening hours on the official website", "Use the interactive map to start from your current location"], de: ["Plane 2 bis 3 Stunden Gehzeit ohne Museum ein", "Öffnungszeiten auf der offiziellen Website prüfen", "Mit der interaktiven Karte am aktuellen Standort starten"] } },
    ],
  },
  {
    slug: "self-guided-walking-tour-leiden",
    title: lt("Zelfgeleide stadswandeling Leiden: zo kies je een route", "Self-guided walking tour of Leiden: how to choose", "Selbstgeführter Stadtrundgang Leiden: die richtige Route"),
    description: lt("Alles over zelfgeleide stadswandelingen in Leiden: routekeuze, GPS, startpunten, pauzes en praktische voorbereiding.", "Everything you need for a self-guided Leiden walking tour: route choice, GPS, starting points, breaks and practical preparation.", "Alles für einen selbstgeführten Stadtrundgang durch Leiden: Route, GPS, Startpunkte, Pausen und Vorbereitung."),
    excerpt: lt("De vrijheid van zelfstandig wandelen, met de structuur en verhalen van een gids.", "The freedom to walk independently, with the structure and stories of a guide.", "Frei unterwegs mit der Struktur und den Geschichten eines Reiseführers."),
    category: lt("Wandelroutes", "Walking routes", "Stadtrundgänge"),
    publishedAt: "2026-09-24",
    updatedAt: "2026-09-24",
    readingMinutes: 6,
    image: "/images/routes/10003-leiden-narrow-street-centre.jpg",
    sections: [
      { heading: lt("Wat is een zelfgeleide stadswandeling?", "What is a self-guided walking tour?", "Was ist ein selbstgeführter Stadtrundgang?"), paragraphs: { nl: ["Bij een zelfgeleide stadswandeling volg je een digitale route zonder gids of vaste vertrektijd. Je telefoon toont de kaart, de volgorde van stops en achtergrondverhalen. Daardoor kun je een kerk binnengaan, op een terras blijven zitten of een museum toevoegen zonder dat een groep op je wacht."], en: ["A self-guided walking tour follows a digital route without a guide or fixed departure time. Your phone provides the map, stop order and background stories. You can enter a church, stay at a café or add a museum without keeping a group waiting."], de: ["Bei einem selbstgeführten Stadtrundgang folgst du einer digitalen Route ohne Guide oder feste Startzeit. Das Smartphone zeigt Karte, Stationen und Hintergrundgeschichten. So kannst du eine Kirche besuchen, länger im Café sitzen oder ein Museum ergänzen, ohne dass eine Gruppe wartet."] } },
      { heading: lt("De juiste route kiezen", "Choosing the right route", "Die passende Route wählen"), paragraphs: { nl: ["Voor een eerste bezoek is een centrumroute logisch: korte afstanden en veel herkenbare plekken. Wie lokale handel en eten belangrijk vindt, kiest een route rond Vismarkt, Koornbrug en Nieuwe Rijn. Voor groen en een grotere afstand past een route langs de singels beter."], en: ["For a first visit, a city-centre route makes sense: short distances and many recognisable sights. Travellers interested in local trade and food can choose a route around the fish market, Koornbrug and Nieuwe Rijn. For greenery and a longer distance, follow the outer canals."], de: ["Für den ersten Besuch eignet sich eine Zentrumsroute mit kurzen Wegen und bekannten Orten. Wer sich für lokalen Handel und Essen interessiert, wählt eine Route rund um Fischmarkt, Koornbrug und Nieuwe Rijn. Für mehr Grün und Strecke bietet sich der Singelpark an."] }, bullets: { nl: ["Korte kennismaking: Centrum Route", "Markt en lokale handel: Markt & Ambacht", "Langere fietsronde: Singels & Stad", "Volledig persoonlijk: eigen routebouwer"], en: ["Short introduction: City Centre Route", "Market and local trade: Market & Craft", "Longer cycle: Canals & City", "Fully personal: custom route builder"], de: ["Kurze Einführung: Zentrumsroute", "Markt und lokaler Handel: Markt & Handwerk", "Längere Fahrradrunde: Singel & Stadt", "Ganz persönlich: eigener Routenplaner"] } },
      { heading: lt("GPS gebruiken zonder je dag te laten bepalen", "Use GPS without letting it control your day", "GPS nutzen, ohne den Tag bestimmen zu lassen"), paragraphs: { nl: ["GPS is vooral nuttig voor het dichtstbijzijnde startpunt en om na een pauze verder te gaan. De app kan onbezochte stops opnieuw ordenen vanaf je actuele locatie. Je locatie wordt pas gevraagd wanneer jij daarvoor kiest en hoeft niet permanent te worden gevolgd."], en: ["GPS is most useful for choosing the nearest starting point and continuing after a break. The app can reorder unvisited stops from your current position. Location access is requested only when you choose it and does not need continuous tracking."], de: ["GPS hilft vor allem beim nächsten Startpunkt und beim Fortsetzen nach einer Pause. Die App kann unbesuchte Stationen ab deinem aktuellen Standort neu sortieren. Der Standort wird erst nach deiner Zustimmung abgefragt und muss nicht dauerhaft verfolgt werden."] } },
    ],
  },
  {
    slug: "leiden-market-days-schaapsvishandel",
    title: lt("Marktdagen in Leiden: woensdag, zaterdag en Schaapsvishandel", "Leiden market days: Wednesday, Saturday and Schaapsvishandel", "Markttage in Leiden: Mittwoch, Samstag und Schaapsvishandel"),
    description: lt("Praktische gids voor de Leidse markt op woensdag en zaterdag, met route langs Vismarkt, Nieuwe Rijn en Schaapsvishandel.", "A practical guide to Leiden's Wednesday and Saturday market, with a route past the fish market, Nieuwe Rijn and Schaapsvishandel.", "Praktischer Guide zum Leidener Markt am Mittwoch und Samstag mit Route über Fischmarkt, Nieuwe Rijn und Schaapsvishandel."),
    excerpt: lt("Plan de markt op het juiste moment en vind Schaapsvishandel ook buiten marktdagen.", "Time your market visit and find Schaapsvishandel even outside market days.", "Den Markt passend planen und Schaapsvishandel auch außerhalb der Markttage finden."),
    category: lt("Markt & lokaal", "Market & local", "Markt & lokal"),
    publishedAt: "2026-09-24",
    updatedAt: "2026-09-24",
    readingMinutes: 5,
    image: "/images/locations/10021-vismarkt-leiden.jpg",
    sections: [
      { heading: lt("Wanneer is er markt in Leiden?", "When is the market in Leiden?", "Wann ist Markt in Leiden?"), paragraphs: { nl: ["De bekende warenmarkt in het centrum wordt normaal op woensdag en zaterdag gehouden langs de Nieuwe Rijn, Botermarkt en omliggende kades. Zaterdag is doorgaans de uitgebreidste marktdag. Openingstijden en opstellingen kunnen rond feestdagen of evenementen wijzigen; controleer daarom kort voor vertrek de actuele gemeentelijke informatie."], en: ["The main city-centre market normally takes place on Wednesday and Saturday along Nieuwe Rijn, Botermarkt and the surrounding quays. Saturday is generally the larger market day. Hours and layouts can change around public holidays or events, so check current municipal information before travelling."], de: ["Der bekannte Innenstadtmarkt findet normalerweise mittwochs und samstags entlang der Nieuwe Rijn, Botermarkt und der umliegenden Ufer statt. Der Samstag ist in der Regel der größere Markttag. Zeiten und Aufstellung können sich an Feiertagen oder bei Veranstaltungen ändern; prüfe deshalb kurz vor dem Besuch die aktuellen Angaben der Stadt."] } },
      { heading: lt("Schaapsvishandel: familiebedrijf sinds 1938", "Schaapsvishandel: a family business since 1938", "Schaapsvishandel: Familienbetrieb seit 1938"), paragraphs: { nl: ["Schaapsvishandel is een Leidse familiezaak die sinds 1938 met vis werkt. Op woensdag en zaterdag vind je de viskar op de markt. Bezoek je Leiden op een andere dag, dan verwijst de route naar de vaste viswinkel aan de Herenstraat 48. Zo hoef je je bezoek niet uitsluitend rond de markt te plannen."], en: ["Schaapsvishandel is a Leiden family business that has worked with fish since 1938. Its fish stall is at the market on Wednesday and Saturday. If you visit on another day, the route points to the permanent shop at Herenstraat 48, so your visit does not depend entirely on market hours."], de: ["Schaapsvishandel ist ein Leidener Familienbetrieb, der seit 1938 mit Fisch arbeitet. Mittwochs und samstags findest du den Verkaufswagen auf dem Markt. An anderen Tagen verweist die Route auf das feste Geschäft in der Herenstraat 48, sodass dein Besuch nicht vollständig von den Marktzeiten abhängt."] } },
      { heading: lt("Een korte marktlooproute", "A short market walking route", "Eine kurze Markt-Wanderroute"), paragraphs: { nl: ["Start bij de Burcht voor uitzicht over het centrum en daal af richting Nieuwe Rijn. Loop langs de Koornbrug en Vismarkt en volg op marktdagen de kramen langs het water. Combineer dit met de Blauwe Steen en Pieterskerk voor een compacte wandeling door handel en stadsgeschiedenis."], en: ["Start at De Burcht for a view over the centre, then descend towards Nieuwe Rijn. Walk past Koornbrug and the historic fish market and, on market days, follow the stalls along the water. Add the Blue Stone and Pieterskerk for a compact walk through trade and city history."], de: ["Beginne an der Burcht mit Blick über das Zentrum und gehe hinunter zur Nieuwe Rijn. Die Route führt an Koornbrug und Fischmarkt vorbei und folgt an Markttagen den Ständen am Wasser. Mit Blauwe Steen und Pieterskerk entsteht ein kompakter Rundgang zu Handel und Stadtgeschichte."] }, bullets: { nl: ["Marktroute wordt automatisch aangepast aan de dag", "Woensdag en zaterdag: marktkraam", "Andere dagen: viswinkel aan Herenstraat 48"], en: ["The market route adapts automatically to the day", "Wednesday and Saturday: market stall", "Other days: shop at Herenstraat 48"], de: ["Die Marktroute passt sich automatisch dem Wochentag an", "Mittwoch und Samstag: Marktstand", "Andere Tage: Geschäft in der Herenstraat 48"] } },
    ],
  },
];

export function getLanding(slug: string): SeoLanding | undefined {
  return seoLandings.find((page) => page.slug === slug);
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
