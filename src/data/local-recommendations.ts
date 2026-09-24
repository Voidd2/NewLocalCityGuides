import { getActiveSchaapsvisSpot, getSchaapsvisRouteCopy, type SupportedLocale } from "@/data/schaapsvis";
import { haversineMeters } from "@/lib/route-engine";

export interface LocalRecommendation {
  id: string;
  name: string;
  type: "visboer" | "stroopwafel" | "restaurant" | "winkel";
  description: {
    nl: string;
    en: string;
    de: string;
  };
  dayLogic?: {
    wednesday: { location: string; description_nl: string };
    saturday: { location: string; description_nl: string };
    other: { location: string; description_nl: string };
  };
  coords?: { lat: number; lng: number };
  image: string | null;
  featured: boolean;
}

export function getSchaapsvisMessage(locale: SupportedLocale = "nl", now: Date = new Date()): { location: string; description: string; mapsQuery: string; coords: { lat: number; lng: number }; spotId: string } {
  const { spot, description } = getSchaapsvisRouteCopy(locale, now);
  if (!spot.coords) throw new Error(`Schaapsvishandel spot ${spot.id} has no coordinates`);
  return {
    location: spot.name,
    description,
    mapsQuery: spot.address,
    coords: spot.coords,
    spotId: spot.id,
  };
}

export function getSmartPauseIndex(
  stops: Array<{ coords: { lat: number; lng: number } | null }>,
  now: Date = new Date(),
): { index: number; distanceMeters: number } {
  const spot = getActiveSchaapsvisSpot(now);
  const fishCoords = spot.coords;
  if (!fishCoords) return { index: Math.floor(stops.length / 2), distanceMeters: -1 };

  let closestIndex = Math.floor(stops.length / 2);
  let closestDistance = Infinity;

  for (let i = 0; i < stops.length; i++) {
    const stop = stops[i];
    if (!stop.coords) continue;
    const dist = haversineMeters(stop.coords, fishCoords);
    if (dist < closestDistance) {
      closestDistance = dist;
      closestIndex = i;
    }
  }

  const insertIndex = closestIndex < stops.length - 1 ? closestIndex + 1 : closestIndex;

  return {
    index: insertIndex,
    distanceMeters: closestDistance === Infinity ? -1 : closestDistance,
  };
}

export function getSchaapsvisContextMessage(distanceMeters: number, locale: SupportedLocale = "nl", now: Date = new Date()): string {
  const day = now.getDay();
  const dist = distanceMeters > 0 ? distanceMeters : null;
  const nearby = dist !== null && dist <= 300;
  const distance = dist !== null ? `${dist}m` : null;

  if (day === 3) {
    if (locale === "en") return nearby ? "You are close to the Schaapsvis cart at Wednesday's market" : `The Schaapsvis cart is at Wednesday's market today${distance ? `, about ${distance} away` : ""}`;
    if (locale === "de") return nearby ? "Du bist in der Nähe des Schaapsvis-Wagens auf dem Mittwochsmarkt" : `Der Schaapsvis-Wagen steht heute auf dem Mittwochsmarkt${distance ? `, etwa ${distance} entfernt` : ""}`;
    return nearby ? "Je bent vlak bij de Schaapsvis-kar op de woensdagmarkt" : `De Schaapsvis-kar staat vandaag op de woensdagmarkt${distance ? `, ongeveer ${distance} verderop` : ""}`;
  }

  if (day === 6) {
    if (locale === "en") return nearby ? "You are close to the Schaapsvis cart at Saturday's market" : `The Schaapsvis cart is at Saturday's market today${distance ? `, about ${distance} away` : ""}`;
    if (locale === "de") return nearby ? "Du bist in der Nähe des Schaapsvis-Wagens auf dem Samstagsmarkt" : `Der Schaapsvis-Wagen steht heute auf dem Samstagsmarkt${distance ? `, etwa ${distance} entfernt` : ""}`;
    return nearby ? "Je bent vlak bij de Schaapsvis-kar op de zaterdagmarkt" : `De Schaapsvis-kar staat vandaag op de zaterdagmarkt${distance ? `, ongeveer ${distance} verderop` : ""}`;
  }

  if (locale === "en") return nearby ? "You are close to the Schaapsvis shop on Herenstraat" : `The Schaapsvis shop is on Herenstraat${distance ? `, about ${distance} away` : ""}`;
  if (locale === "de") return nearby ? "Du bist in der Nähe des Schaapsvis-Geschäfts in der Herenstraat" : `Das Schaapsvis-Geschäft liegt in der Herenstraat${distance ? `, etwa ${distance} entfernt` : ""}`;
  return nearby ? "Je bent vlak bij de Schaapsvis-winkel aan de Herenstraat" : `De Schaapsvis-winkel ligt aan de Herenstraat${distance ? `, ongeveer ${distance} verderop` : ""}`;
}

export const localRecommendations: LocalRecommendation[] = [
  {
    id: "schaapsvis",
    name: "Schaapsvishandel",
    type: "visboer",
    description: {
      nl: "Leids familiebedrijf sinds 1938, met verse kibbeling, lekkerbekken, haring en visbroodjes.",
      en: "A Leiden family business since 1938, serving fresh kibbeling, fried fish, herring and fish sandwiches.",
      de: "Ein Leidener Familienbetrieb seit 1938 mit frischem Kibbeling, gebratenem Fisch, Hering und Fischbrötchen.",
    },
    featured: true,
    image: null,
    coords: { lat: 52.1590, lng: 4.4893 },
  },
  {
    id: "tony-stroopwafel",
    name: "Tony Vergunst Stroopwafels",
    type: "stroopwafel",
    description: {
      nl: "Echte originele stroopwafels, vers gebakken op de markt. De geur alleen al is de moeite waard!",
      en: "Real original stroopwafels, freshly baked at the market. The smell alone is worth it!",
      de: "Echte originale Stroopwafeln, frisch gebacken auf dem Markt. Allein der Duft ist es wert!",
    },
    featured: false,
    image: null,
  },
];

export function getRecommendationsForRoute(locale: SupportedLocale = "nl"): { schaapsvis: ReturnType<typeof getSchaapsvisMessage>; others: LocalRecommendation[] } {
  return {
    schaapsvis: getSchaapsvisMessage(locale),
    others: localRecommendations.filter((r) => r.id !== "schaapsvis"),
  };
}
