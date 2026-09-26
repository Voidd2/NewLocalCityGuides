import type { Locale } from "@/i18n/config";

type PublicRouteCopy = {
  title: string;
  subtitle: string;
  metaDescription: string;
  intro: string;
  whyChoose: string;
  highlights: Array<{ name: string; summary: string }>;
};

export type PublicRoutePreviewData = {
  slug: string;
  image: string;
  type: "walking" | "cycling";
  approximateStops: number;
  popular: boolean;
  distance: string;
  duration: Record<Locale, string>;
  familyFriendly: boolean;
  tags: Record<Locale, string[]>;
  copy: Record<Locale, PublicRouteCopy>;
};

export const publicRoutePreviews: PublicRoutePreviewData[] = [
  {
    slug: "centrum-route",
    image: "/images/routes/10002-leiden-canal-pieterskerk.jpg",
    type: "walking",
    approximateStops: 11,
    popular: true,
    distance: "ca. 4 km",
    duration: { nl: "circa 2-3 uur", en: "about 2-3 hours", de: "etwa 2-3 Stunden" },
    familyFriendly: true,
    tags: {
      nl: ["Historisch centrum", "Rembrandt", "Lokale markt"],
      en: ["Historic centre", "Rembrandt", "Local market"],
      de: ["Altstadt", "Rembrandt", "Lokaler Markt"],
    },
    copy: {
      nl: {
        title: "Historische centrumwandeling door Leiden",
        subtitle: "Grachten, hofjes, kerken en lokale verhalen in één ontspannen wandeling",
        metaDescription: "Bekijk de openbare preview van de Centrum Route door Leiden: circa 4 km langs De Burcht, Pieterskerk, Rembrandts buurt en lokale marktplekken.",
        intro: "Deze zelfgeleide wandeling brengt je door het compacte historische centrum van Leiden. Je loopt langs grachten, monumenten en plekken die je gemakkelijk voorbij zou wandelen zonder het verhaal erachter te kennen. Onderweg bepaal je zelf het tempo en kies je per stop of je wilt lezen of een beschikbare video wilt bekijken.",
        whyChoose: "De route is bedoeld voor bezoekers die in enkele uren een goede eerste indruk van Leiden willen krijgen zonder vast te zitten aan een groep of vertrektijd. De wandeling combineert bekende plekken met kleinere details uit het dagelijks leven van de stad. Op marktdagen sluit de route aan bij de Leidse markt en Schaapsvishandel; op andere dagen verwijst de app naar de vaste winkel. De volledige ervaring bevat de complete verhalen, routebegeleiding en voortgang.",
        highlights: [
          { name: "De Burcht van Leiden", summary: "Een verhoogde plek midden in de stad met uitzicht over de historische daken." },
          { name: "Pieterskerk en omgeving", summary: "Een buurt vol universiteitsgeschiedenis, hofjes en verhalen over Leidse inwoners." },
          { name: "Rembrandts geboorteomgeving", summary: "Ontdek waar Rembrandt opgroeide en hoe Leiden zijn jonge jaren vormde." },
        ],
      },
      en: {
        title: "Historic Leiden city-centre walking tour",
        subtitle: "Canals, courtyards, churches and local stories in one relaxed walk",
        metaDescription: "Preview the Leiden Centre Route: an approximately 4 km self-guided walk past De Burcht, Pieterskerk, Rembrandt's neighbourhood and local market spots.",
        intro: "This self-guided walk takes you through Leiden's compact historic centre. You pass canals, monuments and small details that are easy to miss when you do not know the stories behind them. Set your own pace and choose at each stop whether to read or watch an available short video.",
        whyChoose: "The route is ideal for visitors who want a strong first impression of Leiden in a few hours without joining a group or following a fixed departure time. It combines well-known landmarks with quieter details from everyday city life. On market days the route connects with Leiden's market and Schaapsvishandel; on other days the app directs visitors to the permanent shop. The complete experience unlocks every story, guidance and saved progress.",
        highlights: [
          { name: "De Burcht of Leiden", summary: "A raised historic stronghold with views across the old city roofs." },
          { name: "Pieterskerk quarter", summary: "University history, hidden courtyards and stories about Leiden's residents." },
          { name: "Rembrandt's early neighbourhood", summary: "See where Rembrandt grew up and how Leiden shaped his early years." },
        ],
      },
      de: {
        title: "Historischer Stadtrundgang durch Leiden",
        subtitle: "Grachten, Hofjes, Kirchen und lokale Geschichten auf einem entspannten Rundgang",
        metaDescription: "Vorschau der Leiden-Zentrumroute: etwa 4 km vorbei an De Burcht, Pieterskerk, Rembrandts Viertel und lokalen Marktplätzen.",
        intro: "Dieser selbstgeführte Rundgang führt durch das kompakte historische Zentrum von Leiden. Entlang der Grachten entdeckst du Monumente und kleine Details, die ohne ihre Geschichte leicht unbemerkt bleiben. Du bestimmst das Tempo und entscheidest an jedem Stopp, ob du lesen oder ein verfügbares kurzes Video ansehen möchtest.",
        whyChoose: "Die Route eignet sich für Besucher, die Leiden in wenigen Stunden kennenlernen möchten, ohne an eine Gruppe oder feste Startzeit gebunden zu sein. Bekannte Sehenswürdigkeiten werden mit ruhigeren Geschichten aus dem Alltag der Stadt verbunden. An Markttagen führt die Route zum Leidener Markt und zu Schaapsvishandel; an anderen Tagen verweist die App auf das feste Geschäft. Die vollständige Erfahrung enthält alle Geschichten, Navigation und gespeicherten Fortschritt.",
        highlights: [
          { name: "De Burcht van Leiden", summary: "Eine historische Anhöhe mit Blick über die Dächer der Altstadt." },
          { name: "Pieterskerk-Viertel", summary: "Universitätsgeschichte, Hofjes und Geschichten über Leidener Bewohner." },
          { name: "Rembrandts frühes Viertel", summary: "Entdecke, wo Rembrandt aufwuchs und wie Leiden seine Jugend prägte." },
        ],
      },
    },
  },
  {
    slug: "buiten-de-stad",
    image: "/images/routes/10004-leiden-singel-cyclist.jpg",
    type: "cycling",
    approximateStops: 8,
    popular: false,
    distance: "ca. 7 km",
    duration: { nl: "circa 2-3 uur", en: "about 2-3 hours", de: "etwa 2-3 Stunden" },
    familyFriendly: true,
    tags: {
      nl: ["Fietsroute", "Groen", "Wetenschap"],
      en: ["Cycling route", "Green spaces", "Science"],
      de: ["Fahrradroute", "Grün", "Wissenschaft"],
    },
    copy: {
      nl: {
        title: "Fietsroute langs de Leidse singels en stad",
        subtitle: "Groen, wetenschap en stadsgeschiedenis buiten de drukste straten",
        metaDescription: "Bekijk de preview van Singels & Stad: een circa 7 km lange fietsroute langs de Leidse singels, Hortus, wetenschap en historische buurten.",
        intro: "Singels & Stad laat een ruimere kant van Leiden zien. Deze zelfgeleide fietsroute verbindt groene singels, wetenschap en historische buurten met het centrum. De afstand blijft overzichtelijk, terwijl je meer van de stad ziet dan tijdens een korte centrumwandeling.",
        whyChoose: "Kies deze route wanneer je Leiden actief wilt ontdekken en graag afwisselt tussen water, groen en stedelijke verhalen. De route is geschikt voor een ontspannen halve dag en kan vanaf je huidige positie worden hervat. Rond 3 oktober past de app een deel van de ervaring aan rond Leidens Ontzet. De exacte routevolgorde, GPS-begeleiding en complete verhalen blijven onderdeel van het Leiden-pakket.",
        highlights: [
          { name: "Leidse singels", summary: "Fiets langs het water en bekijk de historische binnenstad vanuit een rustiger perspectief." },
          { name: "Hortus en universiteitsbuurt", summary: "Een gebied waar botaniek, onderwijs en eeuwenoude gebouwen samenkomen." },
          { name: "Wetenschap en stad", summary: "Ontdek waarom kennis en onderzoek zo sterk met Leiden verbonden zijn." },
        ],
      },
      en: {
        title: "Leiden canals and city cycling route",
        subtitle: "Green spaces, science and city history beyond the busiest streets",
        metaDescription: "Preview Canals & City, an approximately 7 km cycling route along Leiden's canals, botanical garden, science heritage and historic neighbourhoods.",
        intro: "Canals & City reveals a broader side of Leiden. This self-guided cycling route links the green canal ring, science heritage and historic neighbourhoods with the city centre. The distance is manageable while showing considerably more than a short central walk.",
        whyChoose: "Choose this route if you want an active day with a varied mix of water, greenery and urban stories. It works well as a relaxed half-day experience and can be resumed from your current position. Around 3 October the app adapts part of the experience to Leiden's Relief celebrations. Exact routing, GPS guidance and complete stories remain part of the Leiden package.",
        highlights: [
          { name: "Leiden's canal ring", summary: "Cycle beside the water and view the old centre from a calmer perspective." },
          { name: "Hortus and university quarter", summary: "A district where botany, education and centuries-old buildings meet." },
          { name: "Science and the city", summary: "Discover why knowledge and research are so closely connected to Leiden." },
        ],
      },
      de: {
        title: "Fahrradroute entlang Leidens Singeln und Altstadt",
        subtitle: "Grün, Wissenschaft und Stadtgeschichte abseits der belebtesten Straßen",
        metaDescription: "Vorschau von Singels & Stadt: etwa 7 km mit dem Fahrrad entlang Leidens Singeln, Hortus, Wissenschaft und historischen Vierteln.",
        intro: "Singels & Stadt zeigt eine weitere Seite von Leiden. Diese selbstgeführte Fahrradroute verbindet grüne Singeln, Wissenschaftsgeschichte und historische Viertel mit dem Zentrum. Die Strecke bleibt überschaubar und zeigt mehr von der Stadt als ein kurzer Rundgang.",
        whyChoose: "Wähle diese Route für einen aktiven Tag mit Wasser, Grün und Stadtgeschichten. Sie eignet sich für einen entspannten halben Tag und kann von der aktuellen Position fortgesetzt werden. Rund um den 3. Oktober passt die App einen Teil der Erfahrung an Leidens Ontzet an. Die genaue Reihenfolge, GPS-Navigation und vollständigen Geschichten bleiben Teil des Leiden-Pakets.",
        highlights: [
          { name: "Leidener Singeln", summary: "Fahre am Wasser entlang und erlebe die Altstadt aus einer ruhigeren Perspektive." },
          { name: "Hortus und Universitätsviertel", summary: "Ein Gebiet, in dem Botanik, Bildung und alte Gebäude zusammentreffen." },
          { name: "Wissenschaft und Stadt", summary: "Entdecke, warum Forschung und Wissen so eng mit Leiden verbunden sind." },
        ],
      },
    },
  },
  {
    slug: "markt-en-ambacht",
    image: "/images/routes/10002-leiden-canal-pieterskerk.jpg",
    type: "walking",
    approximateStops: 9,
    popular: false,
    distance: "ca. 3 km",
    duration: { nl: "circa 1,5-2,5 uur", en: "about 1.5-2.5 hours", de: "etwa 1,5-2,5 Stunden" },
    familyFriendly: true,
    tags: {
      nl: ["Markt", "Ambacht", "Lokaal eten"],
      en: ["Market", "Craft", "Local food"],
      de: ["Markt", "Handwerk", "Lokales Essen"],
    },
    copy: {
      nl: {
        title: "Markt- en ambachtswandeling door Leiden",
        subtitle: "Handel, eten en Leidse familieverhalen langs de historische markt",
        metaDescription: "Bekijk de preview van Markt & Ambacht: circa 3 km langs de Vismarkt, Koornbrug, Leidse handel en Schaapsvishandel sinds 1938.",
        intro: "Markt & Ambacht volgt de plekken waar Leidenaren al eeuwen handelen, eten en werken. De wandeling is compact en combineert historische marktpleinen met lokale familiebedrijven. Daardoor zie je niet alleen monumenten, maar ook hoe het dagelijks leven in de stad zich bleef ontwikkelen.",
        whyChoose: "Deze route past bij bezoekers die lokale verhalen belangrijker vinden dan een algemene lijst met hoogtepunten. Schaapsvishandel, een Leidse familiezaak sinds 1938, vormt een belangrijk onderdeel: op woensdag en zaterdag verwijst de route naar de marktkraam en op andere dagen naar de winkel aan de Herenstraat. De app bepaalt dit automatisch. Volledige verhalen, GPS-aanwijzingen en de precieze routebeleving worden na aankoop beschikbaar.",
        highlights: [
          { name: "Vismarkt", summary: "Een centraal plein waar handel en dagelijks stadsleven al lang samenkomen." },
          { name: "Koornbrug", summary: "Een herkenbare plek die herinnert aan de eeuwenlange graanhandel in Leiden." },
          { name: "Schaapsvishandel sinds 1938", summary: "Een Leidse familiezaak die de route koppelt aan de levende markttraditie." },
        ],
      },
      en: {
        title: "Leiden market and craft walking tour",
        subtitle: "Trade, food and family stories around Leiden's historic market",
        metaDescription: "Preview Market & Craft: an approximately 3 km Leiden walk past the fish market, Koornbrug, historic trade and Schaapsvishandel since 1938.",
        intro: "Market & Craft follows the places where Leiden residents have traded, eaten and worked for centuries. The compact walk combines historic market squares with local family businesses, showing not only monuments but also how everyday city life continues to evolve.",
        whyChoose: "This route is for visitors who value local stories over a generic highlights list. Schaapsvishandel, a Leiden family business since 1938, has an important role: on Wednesdays and Saturdays the route directs visitors to the market stall, while on other days it points to the Herenstraat shop. The app handles this automatically. Complete stories, GPS directions and exact route execution unlock after purchase.",
        highlights: [
          { name: "Vismarkt", summary: "A central square where trade and everyday city life have long come together." },
          { name: "Koornbrug", summary: "A distinctive reminder of Leiden's centuries of grain trading." },
          { name: "Schaapsvishandel since 1938", summary: "A Leiden family business connecting the route to a living market tradition." },
        ],
      },
      de: {
        title: "Markt- und Handwerksrundgang durch Leiden",
        subtitle: "Handel, Essen und Familiengeschichten rund um den historischen Markt",
        metaDescription: "Vorschau von Markt & Handwerk: etwa 3 km entlang Vismarkt, Koornbrug, Leidener Handel und Schaapsvishandel seit 1938.",
        intro: "Markt & Handwerk folgt den Orten, an denen Leidener seit Jahrhunderten handeln, essen und arbeiten. Der kompakte Rundgang verbindet historische Marktplätze mit lokalen Familienbetrieben. So erlebst du nicht nur Monumente, sondern auch das fortlaufende Alltagsleben der Stadt.",
        whyChoose: "Diese Route richtet sich an Besucher, die lokale Geschichten einer allgemeinen Sehenswürdigkeitenliste vorziehen. Schaapsvishandel, ein Leidener Familienbetrieb seit 1938, spielt eine wichtige Rolle: mittwochs und samstags führt die Route zum Marktstand, an anderen Tagen zum Geschäft in der Herenstraat. Die App wählt dies automatisch. Vollständige Geschichten, GPS-Hinweise und die genaue Routenführung werden nach dem Kauf freigeschaltet.",
        highlights: [
          { name: "Vismarkt", summary: "Ein zentraler Platz, an dem Handel und städtischer Alltag zusammenkommen." },
          { name: "Koornbrug", summary: "Ein markanter Ort, der an Leidens jahrhundertelangen Getreidehandel erinnert." },
          { name: "Schaapsvishandel seit 1938", summary: "Ein Leidener Familienbetrieb als Verbindung zur lebendigen Markttradition." },
        ],
      },
    },
  },
];

export function getPublicRoutePreview(slug: string): PublicRoutePreviewData | undefined {
  return publicRoutePreviews.find((route) => route.slug === slug);
}
