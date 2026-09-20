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
  image: string;
  locationIds: string[];
}

export const routes: RouteData[] = [
  {
    id: "centrum-route",
    slug: "centrum-route",
    title: "Centrum Route",
    subtitle: "Wandeling door het hart van Leiden",
    description:
      "Een wandelroute door het historische centrum van Leiden. Langs de winkelstraten, over schilderachtige grachten en door smalle steegjes vol verhalen. Op woensdag en zaterdag is er markt in het centrum - de perfecte combinatie met deze route.",
    stops: 10,
    distance: "3.5 km",
    type: "walking",
    tags: ["Centrum", "Winkelen", "Markt"],
    popular: true,
    kidFriendly: true,
    image: "10002 - foto van historische gracht Leiden met Pieterskerk op achtergrond",
    locationIds: ["L001", "L002", "L003", "L004", "L005", "L006", "L007", "L008", "L011", "L012"],
  },
  {
    id: "buiten-de-stad",
    slug: "buiten-de-stad",
    title: "Buiten de Stad",
    subtitle: "Fietsroute langs de mooiste plekken buiten het centrum",
    description:
      "De mooiste plekken van Leiden en omgeving die je niet lopend bereikt. Van de Hortus Botanicus tot de singels en verder. Pak de fiets en ontdek de groene kant van deze historische stad. Aangeraden per fiets.",
    stops: 8,
    distance: "12 km",
    type: "cycling",
    tags: ["Fietsen", "Natuur", "Buiten het centrum"],
    popular: false,
    kidFriendly: true,
    image: "10004 - foto van fietser langs Leidse singel met bomen",
    locationIds: ["L010", "L009", "L011", "L013", "L014", "L001", "L002", "L006"],
  },
];

export function getRouteBySlug(slug: string): RouteData | undefined {
  return routes.find((r) => r.slug === slug);
}
