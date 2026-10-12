import type { RouteData } from "./routes";

export type RouteSummary = Omit<RouteData, "locationIds" | "isLoop" | "featuredLocalStop" | "dateVariant" | "conditionalStops" | "activeVariant">;

export const routeSummaries: RouteSummary[] = [
  {
    id: "centrum-route", slug: "centrum-route", title: "Centrum Route",
    subtitle: "Wandeling door het hart van Leiden", description: "Historische plekken, handel, kerken en hofjes in het centrum.",
    stops: 11, distance: "ca. 4 km", type: "walking", tags: ["Centrum", "Winkelen", "Markt"],
    popular: true, kidFriendly: true, image: "/images/routes/10002-leiden-canal-pieterskerk.jpg",
  },
  {
    id: "buiten-de-stad", slug: "buiten-de-stad", title: "Singels & Stad",
    subtitle: "Fietsroute tussen groen, wetenschap en stadsgeschiedenis", description: "Een fietsronde langs de singels, de Hortus en historische plekken.",
    stops: 8, distance: "ca. 7 km", type: "cycling", tags: ["Fietsen", "Natuur", "Buiten het centrum"],
    popular: false, kidFriendly: true, image: "/images/routes/10004-leiden-singel-cyclist.jpg",
  },
  {
    id: "markt-en-ambacht", slug: "markt-en-ambacht", title: "Markt & Ambacht",
    subtitle: "Wandeling langs handel, eten en Leidse familieverhalen", description: "Een wandeling langs de Vismarkt, Koornbrug en historische handelsplekken.",
    stops: 9, distance: "ca. 3 km", type: "walking", tags: ["Markt", "Ambacht", "Lokaal eten"],
    popular: true, kidFriendly: true, image: "/images/routes/10002-leiden-canal-pieterskerk.jpg",
  },
];
