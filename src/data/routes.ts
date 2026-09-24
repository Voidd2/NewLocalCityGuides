export interface RouteData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  duration?: string;
  stops: number;
  distance: string;
  type: "walking" | "cycling";
  tags: string[];
  popular: boolean;
  kidFriendly: boolean;
  image: string | null;
  locationIds: string[];
  isLoop?: boolean;
  featuredLocalStop?: "schaapsvis-daily";
  dateVariant?: "leidens-ontzet";
  conditionalStops?: Array<"nieuwe-rijn-market">;
  activeVariant?: "leidens-ontzet";
}

export const routes: RouteData[] = [
  {
    id: "centrum-route",
    slug: "centrum-route",
    title: "Centrum Route",
    subtitle: "Wandeling door het hart van Leiden",
    description:
      "Een compacte lus door het historische centrum, met handel, kerken, hofjes en Rembrandts geboorteplek. De route voegt automatisch Schaapsvishandel toe: op woensdag en zaterdag de viskar op de markt, op andere dagen de vaste viswinkel.",
    stops: 11,
    distance: "ca. 4 km",
    type: "walking",
    tags: ["Centrum", "Winkelen", "Markt"],
    popular: true,
    kidFriendly: true,
    image: "/images/routes/10002-leiden-canal-pieterskerk.jpg",
    locationIds: ["L001", "L012", "L002", "L003", "L004", "L006", "L005", "L007", "L008", "L011"],
    isLoop: true,
    featuredLocalStop: "schaapsvis-daily",
    conditionalStops: ["nieuwe-rijn-market"],
  },
  {
    id: "buiten-de-stad",
    slug: "buiten-de-stad",
    title: "Singels & Stad",
    subtitle: "Fietsroute tussen groen, wetenschap en stadsgeschiedenis",
    description:
      "Een fietsronde langs de westelijke singels, de Hortus, het Academiegebouw, het centrum en het Wevershuis. De volgorde beperkt heen-en-weer rijden en kan vanaf je huidige GPS-positie worden gedraaid.",
    stops: 8,
    distance: "ca. 7 km",
    type: "cycling",
    tags: ["Fietsen", "Natuur", "Buiten het centrum"],
    popular: false,
    kidFriendly: true,
    image: "/images/routes/10004-leiden-singel-cyclist.jpg",
    locationIds: ["L011", "L010", "L014", "L006", "L009", "L002", "L001", "L013"],
    isLoop: true,
    dateVariant: "leidens-ontzet",
  },
  {
    id: "markt-en-ambacht",
    slug: "markt-en-ambacht",
    title: "Markt & Ambacht",
    subtitle: "Wandeling langs handel, eten en Leidse familieverhalen",
    description:
      "Een wandelroute langs de Vismarkt, Koornbrug, historische handelsplekken en ambachtelijke verhalen. Schaapsvishandel is de aanbevolen eetstop: de viskar op woensdag en zaterdag, anders de vaste winkel aan de Herenstraat.",
    stops: 9,
    distance: "ca. 3 km",
    type: "walking",
    tags: ["Markt", "Ambacht", "Lokaal eten"],
    popular: true,
    kidFriendly: true,
    image: "/images/routes/10002-leiden-canal-pieterskerk.jpg",
    locationIds: ["L001", "L012", "L002", "L003", "L004", "L006", "L005", "L013"],
    isLoop: true,
    featuredLocalStop: "schaapsvis-daily",
    conditionalStops: ["nieuwe-rijn-market"],
  },
];

export function getRouteBySlug(slug: string): RouteData | undefined {
  return routes.find((r) => r.slug === slug);
}
