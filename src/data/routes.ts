export interface RouteData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
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
    id: "historisch-leiden",
    slug: "historisch-leiden",
    title: "Historisch Leiden",
    subtitle: "Van Pilgrims tot Professoren",
    description:
      "Ontdek het fascinerende verhaal van Leiden. Van de komst van de Pilgrims, de Leidse Universiteit tot verborgen hofjes en bijzondere verhalen die je nergens anders hoort. Met interactieve video's op locatie.",
    duration: "2-3",
    stops: 10,
    distance: "3.5 km",
    type: "walking",
    tags: ["Geschiedenis", "Iconische plekken"],
    popular: true,
    kidFriendly: true,
    image: "10002 - foto van historische gracht Leiden met Pieterskerk op achtergrond",
    locationIds: ["L001", "L003", "L004", "L005", "L006", "L007", "L008", "L011", "L012", "L014"],
  },
  {
    id: "centrumwandeling",
    slug: "centrumwandeling",
    title: "Centrumwandeling",
    subtitle: "Sfeervolle straten en grachten",
    description:
      "Een ontspannen wandeling door het hart van Leiden. Langs schilderachtige grachten, over historische bruggen en door smalle steegjes waar de stad tot leven komt.",
    duration: "2",
    stops: 12,
    distance: "2.8 km",
    type: "walking",
    tags: ["Stadse sfeer", "Verborgen parels"],
    popular: false,
    kidFriendly: true,
    image: "10003 - foto van sfeervolle smalle straat in Leiden centrum",
    locationIds: ["L001", "L002", "L003", "L004", "L005", "L006", "L009", "L011", "L012", "L013", "L008", "L014"],
  },
  {
    id: "fietstour-leiden",
    slug: "fietstour-leiden",
    title: "Fietstour Leiden",
    subtitle: "Stad en natuur",
    description:
      "Fiets langs de mooiste plekken van Leiden en omgeving. Van de Hortus Botanicus tot de singels, ontdek de groene kant van deze historische stad.",
    duration: "2-3",
    stops: 15,
    distance: "12 km",
    type: "cycling",
    tags: ["Natuur", "Lokale tips"],
    popular: false,
    kidFriendly: true,
    image: "10004 - foto van fietser langs Leidse singel met bomen",
    locationIds: ["L001", "L010", "L009", "L011", "L002", "L003", "L006", "L007", "L013"],
  },
  {
    id: "hidden-gems-leiden",
    slug: "hidden-gems-leiden",
    title: "Hidden Gems Leiden",
    subtitle: "De bijzondere plekken",
    description:
      "De plekken die de meeste bezoekers missen. Verstopte hofjes, lokale ambachtslieden en verhalen die alleen bewoners kennen.",
    duration: "2",
    stops: 10,
    distance: "2.5 km",
    type: "walking",
    tags: ["Verborgen parels", "Kleine verhalen"],
    popular: false,
    kidFriendly: false,
    image: "10005 - foto van verborgen hofje in Leiden met bloemen",
    locationIds: ["L004", "L008", "L013", "L002", "L009"],
  },
  {
    id: "hofjesroute",
    slug: "hofjesroute",
    title: "Hofjesroute",
    subtitle: "Stilte, schoonheid en historie",
    description:
      "Leiden heeft 35 hofjes, meer dan welke andere Nederlandse stad. Deze route voert je langs de mooiste, elk met een eigen verhaal van liefdadigheid en gemeenschap.",
    duration: "1.5-2",
    stops: 8,
    distance: "2 km",
    type: "walking",
    tags: ["Cultureel erfgoed", "Rust en groen"],
    popular: false,
    kidFriendly: false,
    image: "10006 - foto van binnenplaats Jean Pesijnhofje",
    locationIds: ["L008", "L007", "L006", "L013"],
  },
  {
    id: "familieroute",
    slug: "familieroute",
    title: "Familie route",
    subtitle: "Een avontuur voor jong en oud",
    description:
      "Speciaal samengesteld voor gezinnen. Korte stops, leuke weetjes en interactieve video's die kinderen laten zien hoe Leiden er vroeger uitzag.",
    duration: "2",
    stops: 12,
    distance: "3 km",
    type: "walking",
    tags: ["Kindvriendelijk", "Speurtocht"],
    popular: false,
    kidFriendly: true,
    image: "10007 - foto van gezin dat wandelt langs Leidse gracht",
    locationIds: ["L001", "L002", "L003", "L006", "L010", "L011", "L012"],
  },
];

export function getRouteBySlug(slug: string): RouteData | undefined {
  return routes.find((r) => r.slug === slug);
}
