import type { BlogPost, LocalizedText } from "./seo-content";

const lt = (nl: string, en: string, de: string): LocalizedText => ({ nl, en, de });

const visitLeidenSource = {
  label: lt("Officiële bezoekersinformatie van Visit Leiden", "Official visitor information from Visit Leiden", "Offizielle Besucherinformationen von Visit Leiden"),
  url: "https://www.visitleiden.nl/nl/doen",
};

export const seoExpansionBlogPosts: BlogPost[] = [
  {
    slug: "leiden-with-children",
    title: lt("Leiden met kinderen: musea, routes en pauzes", "Leiden with children: museums, walks and breaks", "Leiden mit Kindern: Museen, Wege und Pausen"),
    description: lt("Praktische gids voor Leiden met kinderen, met kindvriendelijke musea, korte wandelingen, parken en een haalbare dagindeling.", "A practical guide to Leiden with children, including family-friendly museums, short walks, parks and a realistic itinerary.", "Praktischer Guide für Leiden mit Kindern: familienfreundliche Museen, kurze Wege, Parks und ein entspannter Tagesplan."),
    excerpt: lt("Combineer één echte publiekstrekker met een korte stadsroute en genoeg ruimte om te spelen.", "Combine one major attraction with a short city walk and enough time to play.", "Eine große Attraktion, ein kurzer Stadtrundgang und genügend Zeit zum Spielen."),
    category: lt("Met kinderen", "Family travel", "Mit Kindern"),
    publishedAt: "2026-09-27",
    updatedAt: "2026-09-27",
    readingMinutes: 7,
    image: "/images/locations/10020-de-burcht-leiden.jpg",
    sections: [
      {
        heading: lt("Wat kun je in Leiden met kinderen doen?", "What can you do in Leiden with children?", "Was kann man in Leiden mit Kindern machen?"),
        paragraphs: {
          nl: ["Leiden werkt goed voor gezinnen omdat het centrum compact is en musea, grachten en pleinen dicht bij elkaar liggen. Kies voor één groot museum en maak de rest van de dag licht: een korte route door het centrum, uitzicht vanaf de Burcht en een pauze aan het water.", "Naturalis is een logische keuze voor natuur en dinosaurussen. Rijksmuseum Boerhaave draait om wetenschap en experimenten, terwijl het Rijksmuseum van Oudheden kinderen meeneemt naar Egyptenaren, Romeinen en andere oude culturen. Controleer leeftijdsadvies, familieworkshops en tickets altijd bij het museum zelf."],
          en: ["Leiden suits families because the compact centre puts museums, canals and squares close together. Pick one major museum and keep the rest of the day flexible: follow a short city walk, climb De Burcht for a view and leave time for a break by the water.", "Naturalis is an obvious choice for nature and dinosaurs. Rijksmuseum Boerhaave focuses on science and experiments, while the National Museum of Antiquities introduces children to Egyptians, Romans and other ancient cultures. Always check age guidance, family activities and tickets with the museum itself."],
          de: ["Leiden eignet sich gut für Familien, weil Museen, Grachten und Plätze im kompakten Zentrum nah beieinander liegen. Wähle ein großes Museum und plane den Rest locker: einen kurzen Rundgang, den Ausblick von der Burcht und eine Pause am Wasser.", "Naturalis ist eine gute Wahl für Natur und Dinosaurier. Im Rijksmuseum Boerhaave geht es um Wissenschaft und Experimente, während das Rijksmuseum van Oudheden Kinder zu Ägyptern, Römern und anderen alten Kulturen mitnimmt. Altersangaben, Familienprogramme und Tickets solltest du immer direkt beim Museum prüfen."],
        },
      },
      {
        heading: lt("Een haalbare familieroute", "A realistic family route", "Eine entspannte Familienroute"),
        paragraphs: {
          nl: ["Start bij Leiden Centraal en kies óf Naturalis óf het centrum. In het centrum vormen de Burcht, Nieuwe Rijn, Koornbrug en Pieterskerk een korte lus zonder lange afstanden. Op woensdag en zaterdag kun je de markt toevoegen, maar reken dan op meer drukte.", "Plan geen volledige volwassen wandelroute tussen twee musea. Laat kinderen onderweg een brug, gevelsteen of hofjespoort zoeken. De digitale route kan na een pauze opnieuw vanaf de huidige locatie worden gestart."],
          en: ["Start at Leiden Centraal and choose either Naturalis or the historic centre. In the centre, De Burcht, Nieuwe Rijn, Koornbrug and Pieterskerk form a compact loop. Add the market on Wednesday or Saturday, but expect larger crowds.", "Avoid squeezing a full adult walking tour between two museums. Instead, ask children to spot a bridge, wall plaque or courtyard gate. The digital route can be resumed from your current position after a break."],
          de: ["Beginne am Bahnhof Leiden Centraal und entscheide dich entweder für Naturalis oder für die Altstadt. Im Zentrum bilden Burcht, Nieuwe Rijn, Koornbrug und Pieterskerk eine kurze Runde. Mittwochs und samstags kannst du den Markt ergänzen, musst aber mit mehr Betrieb rechnen.", "Plane nicht zwei Museen und zusätzlich einen langen Erwachsenen-Rundgang. Kinder können unterwegs Brücken, Hauszeichen oder Hofeingänge suchen. Nach einer Pause lässt sich die digitale Route am aktuellen Standort fortsetzen."],
        },
        bullets: {
          nl: ["Kies één groot museum", "Houd de stadswandeling kort en speels", "Controleer actuele kinderactiviteiten vooraf"],
          en: ["Choose one major museum", "Keep the city walk short and playful", "Check current family activities in advance"],
          de: ["Nur ein großes Museum einplanen", "Den Stadtrundgang kurz und spielerisch halten", "Aktuelle Familienangebote vorher prüfen"],
        },
      },
    ],
    faq: [
      { question: lt("Welk museum in Leiden is leuk voor kinderen?", "Which Leiden museum is good for children?", "Welches Museum in Leiden eignet sich für Kinder?"), answer: lt("Naturalis past bij natuur- en dinofans, Boerhaave bij nieuwsgierige kinderen die van wetenschap houden en het Rijksmuseum van Oudheden bij liefhebbers van Egyptenaren en Romeinen.", "Naturalis suits nature and dinosaur fans, Boerhaave curious children interested in science, and the National Museum of Antiquities young visitors fascinated by Egyptians and Romans.", "Naturalis passt zu Natur- und Dinosaurierfans, Boerhaave zu neugierigen Kindern mit Interesse an Wissenschaft und das Rijksmuseum van Oudheden zu Fans von Ägyptern und Römern.") },
      { question: lt("Kun je Leiden met een kinderwagen bezoeken?", "Can you visit Leiden with a pushchair?", "Kann man Leiden mit Kinderwagen besuchen?"), answer: lt("Veel centrumstraten zijn beloopbaar, maar bruggen, klinkers en historische gebouwen kunnen minder praktisch zijn. Controleer toegankelijkheid per museum en kies op de kaart een korte route.", "Much of the centre is walkable, although bridges, cobbles and historic buildings can be less convenient. Check accessibility with each museum and choose a short route on the map.", "Viele Wege im Zentrum sind gut begehbar, doch Brücken, Pflaster und historische Gebäude können umständlicher sein. Prüfe die Barrierefreiheit beim jeweiligen Museum und wähle eine kurze Route.") },
    ],
    sources: [visitLeidenSource, { label: lt("Visit Leiden: informatie voor gezinnen", "Visit Leiden: family information", "Visit Leiden: Informationen für Familien"), url: "https://www.visitleiden.nl/en/what-to-do/With-children" }],
  },
  {
    slug: "leiden-rainy-day",
    title: lt("Wat te doen in Leiden bij regen?", "What to do in Leiden on a rainy day", "Was kann man bei Regen in Leiden machen?"),
    description: lt("Regen in Leiden? Combineer een museum, overdekte historische plek en korte wandelstukken met deze praktische slechtweerplanning.", "Rain in Leiden? Combine a museum, covered historic stop and short walks with this practical wet-weather plan.", "Regen in Leiden? Dieser Plan kombiniert Museum, historische Innenräume und kurze Wege."),
    excerpt: lt("Een regendag hoeft geen verloren dag te zijn: Leiden heeft genoeg musea en compacte binnenroutes.", "A rainy day need not be lost: Leiden has plenty of museums and compact indoor-friendly routes.", "Ein Regentag ist nicht verloren: Leiden bietet viele Museen und kurze Wege."),
    category: lt("Slecht weer", "Rainy day", "Bei Regen"),
    publishedAt: "2026-09-27",
    updatedAt: "2026-09-27",
    readingMinutes: 6,
    image: "/images/locations/10025-pieterskerk-leiden.jpg",
    sections: [
      {
        heading: lt("Wat doe je in Leiden als het regent?", "What should you do in Leiden when it rains?", "Was unternimmt man in Leiden bei Regen?"),
        paragraphs: {
          nl: ["Kies eerst één museum dat minimaal twee uur van je dag kan dragen. Museum De Lakenhal combineert kunst en stadsgeschiedenis, Rijksmuseum Boerhaave wetenschap, het Rijksmuseum van Oudheden archeologie en Naturalis natuur. Zo hoef je bij een stevige bui niet voortdurend van gebouw naar gebouw.", "Maak vóór of na het museum alleen een compacte centrumlus. Pieterskerk, Rapenburg en Academiegebouw liggen dicht bij elkaar. Rond Nieuwe Rijn, Koornbrug en Burcht zijn de afstanden eveneens kort, al blijft een paraplu nodig."],
          en: ["First choose one museum that can comfortably fill at least two hours. Museum De Lakenhal combines art and city history, Rijksmuseum Boerhaave science, the National Museum of Antiquities archaeology and Naturalis natural history. This avoids repeatedly crossing the city during heavy rain.", "Before or after the museum, follow only a compact centre loop. Pieterskerk, Rapenburg and the Academy Building are close together. Nieuwe Rijn, Koornbrug and De Burcht also sit within a short distance, although you will still need an umbrella."],
          de: ["Wähle zuerst ein Museum, in dem du mindestens zwei Stunden verbringen kannst. Museum De Lakenhal verbindet Kunst und Stadtgeschichte, Rijksmuseum Boerhaave Wissenschaft, das Rijksmuseum van Oudheden Archäologie und Naturalis Naturkunde. So musst du bei starkem Regen nicht ständig das Gebäude wechseln.", "Vor oder nach dem Museum genügt eine kurze Runde. Pieterskerk, Rapenburg und Akademiegebäude liegen nah beieinander. Auch Nieuwe Rijn, Koornbrug und Burcht lassen sich mit kurzen Wegen verbinden – einen Schirm brauchst du trotzdem."],
        },
      },
      {
        heading: lt("Slim plannen zonder verouderde openingstijden", "Plan without relying on outdated hours", "Planen ohne veraltete Öffnungszeiten"),
        paragraphs: {
          nl: ["Openingstijden, tijdelijke tentoonstellingen en beschikbare tijdsloten veranderen. Gebruik deze gids daarom om te kiezen, maar controleer op de bezoekdag de officiële museumsite. Reserveer bij populaire weekenden vooraf als het museum met tijdsloten werkt.", "Bewaar hofjes, parken en langere singelwandelingen voor een droge periode. De routekaart helpt om het programma onderweg in te korten en alleen de dichtstbijzijnde onbezochte plekken te behouden."],
          en: ["Opening hours, temporary exhibitions and available time slots change. Use this guide to choose, then check the museum's official website on the day of your visit. Book ahead on busy weekends when timed entry applies.", "Save courtyards, parks and the longer canal walk for a dry spell. The route map lets you shorten the plan and continue with only the nearest unvisited places."],
          de: ["Öffnungszeiten, Sonderausstellungen und verfügbare Zeitfenster ändern sich. Nutze diesen Guide zur Auswahl und prüfe am Besuchstag die offizielle Museumsseite. An beliebten Wochenenden solltest du bei Zeitfenstern vorab buchen.", "Höfe, Parks und die längere Singel-Runde hebst du am besten für eine trockene Phase auf. Auf der Routenkarte kannst du den Plan unterwegs verkürzen und nur die nächsten unbesuchten Orte behalten."],
        },
      },
    ],
    faq: [
      { question: lt("Is Leiden leuk bij slecht weer?", "Is Leiden worth visiting in bad weather?", "Lohnt sich Leiden bei schlechtem Wetter?"), answer: lt("Ja. Door de compacte binnenstad kun je een groot museum combineren met korte stukken door het historische centrum.", "Yes. The compact city centre makes it easy to combine a major museum with short sections through the historic centre.", "Ja. Im kompakten Zentrum lässt sich ein großes Museum mit kurzen Wegen durch die Altstadt verbinden.") },
      { question: lt("Moet je Leidse musea reserveren?", "Should you book Leiden museums in advance?", "Sollte man Museen in Leiden vorab buchen?"), answer: lt("Dat verschilt per museum en datum. Controleer altijd de officiële website, vooral in weekenden, vakanties en bij tijdelijke tentoonstellingen.", "It depends on the museum and date. Always check the official website, especially for weekends, holidays and temporary exhibitions.", "Das hängt vom Museum und Datum ab. Prüfe besonders an Wochenenden, in Ferien und bei Sonderausstellungen die offizielle Website.") },
    ],
    sources: [visitLeidenSource, { label: lt("Overzicht van de Leidse musea", "Overview of Leiden museums", "Übersicht der Leidener Museen"), url: "https://www.visitleiden.nl/nl/cultuur/musea" }],
  },
  {
    slug: "free-things-to-do-leiden",
    title: lt("Gratis doen in Leiden: wandeling, hofjes en uitzicht", "Free things to do in Leiden: walks, courtyards and views", "Leiden kostenlos entdecken: Wege, Höfe und Ausblicke"),
    description: lt("Ontdek gratis activiteiten in Leiden, van Burcht en grachten tot hofjes, markt en Singelpark, met een praktische wandelindeling.", "Discover free things to do in Leiden, from De Burcht and canals to courtyards, the market and Singelpark.", "Kostenlose Aktivitäten in Leiden: Burcht, Grachten, Höfe, Markt und Singelpark als praktische Route."),
    excerpt: lt("De historische binnenstad is zelf al de belangrijkste gratis bezienswaardigheid.", "The historic city centre is the city's most important free attraction in its own right.", "Die historische Innenstadt ist selbst Leidens wichtigste kostenlose Sehenswürdigkeit."),
    category: lt("Budgettips", "Budget travel", "Kostenlos"),
    publishedAt: "2026-09-27",
    updatedAt: "2026-09-27",
    readingMinutes: 6,
    image: "/images/heroes/10001-leiden-canal-historic-buildings.jpg",
    sections: [
      {
        heading: lt("Wat kun je gratis doen in Leiden?", "What can you do in Leiden for free?", "Was kann man in Leiden kostenlos machen?"),
        paragraphs: {
          nl: ["Wandel vanaf Leiden Centraal via het Rapenburg naar de Pieterskerk en steek daarna door naar de Burcht. De straten, grachten en gevels vormen samen een gratis openluchtintroductie tot de stad. Vanaf de Burcht krijg je overzicht over het compacte centrum.", "Vervolg langs Nieuwe Rijn, Koornbrug en Vismarkt. Op woensdag en zaterdag geeft de markt extra sfeer zonder dat je iets hoeft te kopen. Een rondje door het Singelpark is eveneens gratis en past goed bij droog weer."],
          en: ["Walk from Leiden Centraal via Rapenburg to Pieterskerk, then continue to De Burcht. Streets, canals and façades form a free open-air introduction to the city, while De Burcht gives you an overview of the compact centre.", "Continue along Nieuwe Rijn, Koornbrug and the historic fish market. On Wednesday and Saturday the market adds atmosphere without requiring a purchase. A Singelpark walk is also free and works especially well in dry weather."],
          de: ["Gehe vom Bahnhof Leiden Centraal über den Rapenburg zur Pieterskerk und weiter zur Burcht. Straßen, Grachten und Fassaden bilden eine kostenlose Einführung unter freiem Himmel. Von der Burcht bekommst du einen guten Überblick über das kompakte Zentrum.", "Weiter geht es über Nieuwe Rijn, Koornbrug und Fischmarkt. Mittwochs und samstags sorgt der Markt für zusätzliche Atmosphäre, ohne dass du etwas kaufen musst. Bei trockenem Wetter ist auch eine Runde durch den Singelpark kostenlos."],
        },
      },
      {
        heading: lt("Hofjes bezoeken met respect voor bewoners", "Visit courtyards respectfully", "Höfe respektvoll besuchen"),
        paragraphs: {
          nl: ["Sommige Leidse hofjes zijn overdag toegankelijk, maar het blijven woonplekken. Ga alleen naar binnen wanneer de poort duidelijk open is, praat zacht, blijf op de paden en fotografeer geen bewoners. Een gesloten poort is geen uitnodiging om aan te bellen.", "Kerken, ateliers en evenementen kunnen soms gratis toegankelijk zijn, maar dit wisselt per dag. Zie zulke extra's als bonus en baseer je route op openbare straten, de Burcht en het park."],
          en: ["Some Leiden courtyards are accessible during the day, but they remain residential spaces. Enter only when a gate is clearly open, keep your voice down, stay on paths and do not photograph residents. A closed gate is not an invitation to ring the bell.", "Churches, studios and events may occasionally offer free entry, but this varies. Treat them as a bonus and base your route on public streets, De Burcht and the park."],
          de: ["Einige Leidener Höfe sind tagsüber zugänglich, bleiben aber Wohnorte. Betritt sie nur bei eindeutig geöffnetem Tor, sprich leise, bleibe auf den Wegen und fotografiere keine Bewohner. An einem geschlossenen Tor solltest du nicht klingeln.", "Kirchen, Ateliers und Veranstaltungen sind gelegentlich kostenlos zugänglich, doch das ändert sich. Plane deine Route deshalb mit öffentlichen Straßen, Burcht und Park; alles Weitere ist ein Bonus."],
        },
        bullets: {
          nl: ["Burcht en uitzicht over het centrum", "Rapenburg, Nieuwe Rijn en historische bruggen", "Singelpark en respectvol bezochte hofjes"],
          en: ["De Burcht and its city-centre view", "Rapenburg, Nieuwe Rijn and historic bridges", "Singelpark and respectfully visited courtyards"],
          de: ["Burcht mit Blick über das Zentrum", "Rapenburg, Nieuwe Rijn und historische Brücken", "Singelpark und respektvoll besuchte Höfe"],
        },
      },
    ],
    faq: [
      { question: lt("Kun je de Burcht van Leiden gratis bezoeken?", "Can you visit De Burcht in Leiden for free?", "Kann man die Burcht in Leiden kostenlos besuchen?"), answer: lt("De Burcht is normaal vrij toegankelijk. Controleer ter plaatse of er door werkzaamheden of evenementen tijdelijke beperkingen zijn.", "De Burcht is normally free to enter. Check locally for temporary restrictions caused by works or events.", "Die Burcht ist normalerweise frei zugänglich. Prüfe vor Ort, ob Arbeiten oder Veranstaltungen den Zugang vorübergehend einschränken.") },
      { question: lt("Zijn alle hofjes in Leiden openbaar?", "Are all Leiden courtyards public?", "Sind alle Höfe in Leiden öffentlich?"), answer: lt("Nee. Toegang en tijden verschillen en bewoners moeten rust houden. Ga alleen naar binnen wanneer een hofje duidelijk geopend is voor bezoekers.", "No. Access and hours vary and residents need privacy. Enter only when a courtyard is clearly open to visitors.", "Nein. Zugang und Zeiten unterscheiden sich, und Bewohner brauchen Ruhe. Betritt einen Hof nur, wenn er eindeutig für Besucher geöffnet ist.") },
    ],
    sources: [visitLeidenSource],
  },
  {
    slug: "weekend-in-leiden",
    title: lt("Weekend Leiden: een rustige planning voor twee dagen", "A weekend in Leiden: a relaxed two-day itinerary", "Wochenende in Leiden: entspannter Plan für zwei Tage"),
    description: lt("Plan een weekend Leiden met historische binnenstad, markt, een passend museum en ruimte voor Singelpark, lokale winkels en pauzes.", "Plan a weekend in Leiden with the historic centre, market, one well-chosen museum, Singelpark and local stops.", "Plane ein Wochenende in Leiden mit Altstadt, Markt, passendem Museum, Singelpark und lokalen Pausen."),
    excerpt: lt("Verdeel centrum en singels over twee dagen; zo voelt Leiden niet als een afvinklijst.", "Split the centre and outer canals across two days so Leiden never feels like a checklist.", "Verteile Altstadt und Singelpark auf zwei Tage, damit Leiden nicht zur Checkliste wird."),
    category: lt("Weekend", "Weekend trip", "Wochenende"),
    publishedAt: "2026-09-27",
    updatedAt: "2026-09-27",
    readingMinutes: 8,
    image: "/images/heroes/10008-leiden-canal-panorama.jpg",
    sections: [
      {
        heading: lt("Dag één: historische binnenstad en markt", "Day one: historic centre and market", "Tag eins: Altstadt und Markt"),
        paragraphs: {
          nl: ["Begin bij de Burcht en loop via Nieuwe Rijn, Koornbrug en Vismarkt naar de Pieterskerk. Daarna passen Rapenburg, Academiegebouw en eventueel de Hortus in dezelfde centrumdag. Kies maximaal één groot museum, anders blijft er weinig tijd over om de stad zelf te ervaren.", "Valt de eerste dag op woensdag of zaterdag, plan dan de markt voor de lunch. De Markt & Ambacht-route kan langs de juiste kraam van een echte lokale visboer, versgebakken stroopwafels en kaasverkopers lopen. Op andere dagen leidt de visstop naar de vaste winkel."],
          en: ["Start at De Burcht and walk via Nieuwe Rijn, Koornbrug and the fish market to Pieterskerk. Rapenburg, the Academy Building and possibly the botanical garden fit into the same city-centre day. Choose no more than one major museum or you will leave too little time for the city itself.", "If day one falls on Wednesday or Saturday, plan the market around lunch. The Market & Craft route can include the correct stall of a true local fishmonger, freshly made stroopwafels and cheese vendors. On other days, the fish stop leads to the permanent shop."],
          de: ["Beginne an der Burcht und gehe über Nieuwe Rijn, Koornbrug und Fischmarkt zur Pieterskerk. Rapenburg, Akademiegebäude und eventuell der Botanische Garten passen in denselben Altstadttag. Wähle höchstens ein großes Museum, damit genug Zeit für die Stadt selbst bleibt.", "Fällt der erste Tag auf Mittwoch oder Samstag, plane den Markt zur Mittagszeit. Die Route Markt & Handwerk kann zum richtigen Stand eines echten lokalen Fischhändlers, zu frisch gebackenen Stroopwafeln und zu Käsehändlern führen. An anderen Tagen führt der Fisch-Stopp zum festen Geschäft."],
        },
      },
      {
        heading: lt("Dag twee: museum, Singelpark en eigen keuzes", "Day two: museum, Singelpark and personal choices", "Tag zwei: Museum, Singelpark und eigene Auswahl"),
        paragraphs: {
          nl: ["Gebruik de tweede ochtend voor een museum buiten je eerste route. Kies op interesse: kunst en stadsgeschiedenis, oudheid, wetenschap of natuur. Loop daarna een deel van het Singelpark of bouw een eigen route met alleen de plekken die je nog wilt zien.", "Laat ruimte voor slecht weer en openingstijden. Wissel de dagen om wanneer dat praktischer is en controleer de actuele agenda voor tentoonstellingen en evenementen. De digitale routes hebben geen vaste vertrektijd."],
          en: ["Use the second morning for a museum outside your first route. Choose by interest: art and city history, antiquity, science or nature. Afterwards, walk part of Singelpark or build a custom route containing only the places you still want to see.", "Keep the plan flexible for weather and opening hours. Swap the days when practical and check current exhibitions and events. The digital routes have no fixed departure time."],
          de: ["Nutze den zweiten Vormittag für ein Museum außerhalb der ersten Route. Entscheide nach Interesse: Kunst und Stadtgeschichte, Antike, Wissenschaft oder Natur. Danach kannst du einen Teil des Singelparks gehen oder eine eigene Route nur mit den noch gewünschten Orten erstellen.", "Bleibe wegen Wetter und Öffnungszeiten flexibel. Tausche die Tage bei Bedarf und prüfe aktuelle Ausstellungen und Veranstaltungen. Die digitalen Routen haben keine feste Startzeit."],
        },
        bullets: {
          nl: ["Dag 1: centrum, markt en één museum", "Dag 2: tweede museum of Singelpark", "Plan pauzes en wissel de dagen indien nodig"],
          en: ["Day 1: centre, market and one museum", "Day 2: second museum or Singelpark", "Plan breaks and swap days when needed"],
          de: ["Tag 1: Zentrum, Markt und ein Museum", "Tag 2: zweites Museum oder Singelpark", "Pausen einplanen und Tage bei Bedarf tauschen"],
        },
      },
    ],
    faq: [
      { question: lt("Is twee dagen genoeg voor Leiden?", "Are two days enough for Leiden?", "Reichen zwei Tage für Leiden?"), answer: lt("Ja. In twee dagen kun je het historische centrum, één of twee musea en een deel van de singels combineren zonder voortdurend te haasten.", "Yes. Two days allow you to combine the historic centre, one or two museums and part of the outer canals without constantly rushing.", "Ja. In zwei Tagen lassen sich Altstadt, ein oder zwei Museen und ein Teil des Singelparks ohne ständige Eile verbinden.") },
      { question: lt("Welke dagen is de markt in Leiden?", "Which days is Leiden market held?", "An welchen Tagen ist Markt in Leiden?"), answer: lt("De centrum­markt vindt normaal plaats op woensdag en zaterdag. Controleer rond feestdagen en evenementen altijd de actuele informatie.", "The city-centre market normally takes place on Wednesday and Saturday. Always check current information around public holidays and events.", "Der Innenstadtmarkt findet normalerweise mittwochs und samstags statt. Prüfe rund um Feiertage und Veranstaltungen immer die aktuellen Angaben.") },
    ],
    sources: [visitLeidenSource],
  },
  {
    slug: "best-museums-leiden",
    title: lt("Welke musea in Leiden passen bij jou?", "Which Leiden museums suit you?", "Welche Museen in Leiden passen zu dir?"),
    description: lt("Vergelijk Leidse musea op thema: kunst, geschiedenis, wetenschap, natuur, Japan en wereldculturen, inclusief praktische keuzehulp.", "Compare Leiden museums by theme: art, history, science, nature, Japan and world cultures, with practical planning advice.", "Leidener Museen nach Thema vergleichen: Kunst, Geschichte, Wissenschaft, Natur, Japan und Weltkulturen."),
    excerpt: lt("Kies niet het bekendste museum, maar het museum dat bij je interesse en beschikbare tijd past.", "Choose the museum that fits your interests and available time, not simply the most famous one.", "Wähle nicht nur das bekannteste Museum, sondern das passende für Interesse und Zeit."),
    category: lt("Musea", "Museums", "Museen"),
    publishedAt: "2026-09-27",
    updatedAt: "2026-09-27",
    readingMinutes: 8,
    image: "/images/locations/10033-academiegebouw-leiden.jpg",
    sections: [
      {
        heading: lt("Welk museum moet je kiezen in Leiden?", "Which museum should you choose in Leiden?", "Welches Museum sollte man in Leiden besuchen?"),
        paragraphs: {
          nl: ["Voor kunst en Leidse stadsgeschiedenis is Museum De Lakenhal de logische keuze. Het Rijksmuseum van Oudheden past bij archeologie en oude beschavingen. Rijksmuseum Boerhaave vertelt over wetenschap en geneeskunde, terwijl Naturalis natuur en biodiversiteit centraal stelt.", "Japanmuseum SieboldHuis richt zich op Japan in een historisch pand aan het Rapenburg. Wereldmuseum Leiden draait om culturen en collecties uit verschillende delen van de wereld. De Hortus botanicus combineert levende plantencollecties met universiteitsgeschiedenis."],
          en: ["Choose Museum De Lakenhal for art and Leiden's city history, the National Museum of Antiquities for archaeology and ancient civilisations, Rijksmuseum Boerhaave for science and medicine, or Naturalis for nature and biodiversity.", "Japan Museum SieboldHuis focuses on Japan in a historic Rapenburg house. Wereldmuseum Leiden explores cultures and collections from different parts of the world. The botanical garden combines living plant collections with university history."],
          de: ["Für Kunst und Leidener Stadtgeschichte ist Museum De Lakenhal die passende Wahl. Das Rijksmuseum van Oudheden widmet sich Archäologie und alten Kulturen, Rijksmuseum Boerhaave Wissenschaft und Medizin, Naturalis der Natur und Biodiversität.", "Japanmuseum SieboldHuis zeigt Japan in einem historischen Haus am Rapenburg. Wereldmuseum Leiden beschäftigt sich mit Kulturen und Sammlungen aus verschiedenen Weltregionen. Der Botanische Garten verbindet lebende Pflanzensammlungen mit Universitätsgeschichte."],
        },
      },
      {
        heading: lt("Hoeveel musea passen in één dag?", "How many museums fit into one day?", "Wie viele Museen schafft man an einem Tag?"),
        paragraphs: {
          nl: ["Voor de meeste bezoekers is één groot museum plus een stadswandeling prettiger dan twee uitgebreide musea. Twee kleinere bezoeken kunnen wel werken wanneer ze dicht bij elkaar liggen en je vooraf weet welke zalen je wilt zien.", "Prijzen, openingstijden, tentoonstellingen en reserveringsregels kunnen wijzigen. Vergelijk de officiële websites op de datum van je bezoek. De CityGuide helpt daarna om het museum te combineren met de dichtstbijzijnde historische plekken."],
          en: ["Most visitors will enjoy one major museum plus a city walk more than two extensive museum visits. Two shorter visits can work when the museums are close together and you already know which galleries matter to you.", "Prices, opening hours, exhibitions and booking rules may change. Compare official websites for your visit date. The CityGuide can then connect your museum choice with nearby historic places."],
          de: ["Für die meisten Besucher ist ein großes Museum plus Stadtrundgang angenehmer als zwei umfangreiche Museumsbesuche. Zwei kürzere Besuche funktionieren, wenn die Häuser nah beieinanderliegen und du vorher weißt, welche Bereiche wichtig sind.", "Preise, Öffnungszeiten, Ausstellungen und Reservierungsregeln können sich ändern. Vergleiche für deinen Besuchstag die offiziellen Websites. Anschließend verbindet der CityGuide das Museum mit nahegelegenen historischen Orten."],
        },
        bullets: {
          nl: ["Kunst: Museum De Lakenhal", "Oudheid: Rijksmuseum van Oudheden", "Wetenschap: Rijksmuseum Boerhaave", "Natuur: Naturalis", "Planten: Hortus botanicus"],
          en: ["Art: Museum De Lakenhal", "Antiquity: National Museum of Antiquities", "Science: Rijksmuseum Boerhaave", "Nature: Naturalis", "Plants: the botanical garden"],
          de: ["Kunst: Museum De Lakenhal", "Antike: Rijksmuseum van Oudheden", "Wissenschaft: Rijksmuseum Boerhaave", "Natur: Naturalis", "Pflanzen: Hortus botanicus"],
        },
      },
    ],
    faq: [
      { question: lt("Hoeveel musea heeft Leiden?", "How many museums does Leiden have?", "Wie viele Museen hat Leiden?"), answer: lt("Visit Leiden presenteert dertien Leidse musea. Het aanbod loopt van kunst en archeologie tot wetenschap, natuur en wereldculturen.", "Visit Leiden presents thirteen museums in and around the city, covering art, archaeology, science, nature and world cultures.", "Visit Leiden präsentiert dreizehn Museen in und um die Stadt – von Kunst und Archäologie bis Wissenschaft, Natur und Weltkulturen.") },
      { question: lt("Welk museum ligt bij het centrum van Leiden?", "Which museums are near Leiden city centre?", "Welche Museen liegen im Zentrum von Leiden?"), answer: lt("Onder andere De Lakenhal, Boerhaave, het Rijksmuseum van Oudheden, SieboldHuis, Wereldmuseum en de Hortus liggen in of direct rond het centrum. Naturalis ligt dichter bij het station maar buiten de compacte centrumlus.", "De Lakenhal, Boerhaave, the National Museum of Antiquities, SieboldHuis, Wereldmuseum and the botanical garden are in or close to the centre. Naturalis is nearer the station but outside the tightest centre loop.", "De Lakenhal, Boerhaave, Rijksmuseum van Oudheden, SieboldHuis, Wereldmuseum und Hortus liegen im oder direkt am Zentrum. Naturalis liegt näher am Bahnhof, aber außerhalb der kompaktesten Altstadtrunde.") },
    ],
    sources: [{ label: lt("Officieel overzicht van de dertien Leidse musea", "Official overview of Leiden's thirteen museums", "Offizielle Übersicht der dreizehn Leidener Museen"), url: "https://www.visitleiden.nl/nl/cultuur/musea/alle-13-leidse-musea" }],
  },
];
