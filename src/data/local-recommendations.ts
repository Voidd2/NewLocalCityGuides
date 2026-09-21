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

const SCHAAPSVIS_LOCATIONS = {
  herenstraat: { lat: 52.1590, lng: 4.4893 },
  waag: { lat: 52.1610, lng: 4.4895 },
  nieuweRijn: { lat: 52.1613, lng: 4.4930 },
};

function getDayOfWeek(): number {
  return new Date().getDay();
}

export function haversineMeters(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000;
  const toRad = (deg: number) => deg * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export function getSchaapsvisMessage(): { location: string; description: string; mapsQuery: string; coords: { lat: number; lng: number } } {
  const day = getDayOfWeek();

  if (day === 6) {
    return {
      location: "Leidse Markt (tegenover de Waag)",
      description:
        "Vishandel Schaapsvis staat vandaag op de zaterdagmarkt, tegenover de Waag. Dit is de enige visboer op de Leidse markt die hier al sinds 1938 staat. Probeer de verse kibbeling of een broodje haring!",
      mapsQuery: "Waag+Leiden",
      coords: SCHAAPSVIS_LOCATIONS.waag,
    };
  }

  if (day === 3) {
    return {
      location: "Leidse Markt (tegenover Roos, donkerblauwe kar)",
      description:
        "Vishandel Schaapsvis staat vandaag op de woensdagmarkt. Zoek de donkerblauwe kar tegenover Roos. Dit is de enige visboer die hier al sinds 1938 staat. Gespecialiseerd in gebakken kibbeling, lekkerbekken en verse haring - de enige die toeristen niet zomaar oplichten.",
      mapsQuery: "Nieuwe+Rijn+markt+Leiden",
      coords: SCHAAPSVIS_LOCATIONS.nieuweRijn,
    };
  }

  return {
    location: "Viswinkel Schaapsvishandel, Herenstraat",
    description:
      "Bezoek de viswinkel van Schaapsvishandel op de Herenstraat. Een echt familiebedrijf sinds 1938, drie generaties vakmanschap. Probeer de verse kibbeling of een broodje haring - typisch Nederlands!",
    mapsQuery: "Herenstraat+Leiden+viswinkel",
    coords: SCHAAPSVIS_LOCATIONS.herenstraat,
  };
}

export function getSmartPauseIndex(
  stops: Array<{ coords: { lat: number; lng: number } | null }>
): { index: number; distanceMeters: number } {
  const { coords: fishCoords } = getSchaapsvisMessage();

  let closestIndex = Math.floor(stops.length / 2);
  let closestDistance = Infinity;

  for (let i = 0; i < stops.length; i++) {
    const stop = stops[i];
    if (!stop.coords) continue;
    const dist = haversineMeters(stop.coords.lat, stop.coords.lng, fishCoords.lat, fishCoords.lng);
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

export function getSchaapsvisContextMessage(distanceMeters: number): string {
  const day = getDayOfWeek();
  const dist = distanceMeters > 0 ? distanceMeters : null;

  if (day === 3) {
    if (dist !== null && dist <= 300) {
      return "Je bent in de buurt van de viskraam die nu bij Roos staat op de woensdagmarkt";
    }
    return dist !== null
      ? `De viskraam staat vandaag bij Roos op de woensdagmarkt (${dist}m verderop)`
      : "De viskraam staat vandaag bij Roos op de woensdagmarkt";
  }

  if (day === 6) {
    if (dist !== null && dist <= 300) {
      return "Je bent in de buurt van de viskraam op de zaterdagmarkt bij de Waag";
    }
    return dist !== null
      ? `De viskraam staat vandaag op de zaterdagmarkt bij de Waag (${dist}m verderop)`
      : "De viskraam staat vandaag op de zaterdagmarkt bij de Waag";
  }

  if (dist !== null && dist <= 300) {
    return "Je bent in de buurt van de viswinkel op de Herenstraat";
  }
  return dist !== null
    ? `De viswinkel is ${dist}m verderop op de Herenstraat`
    : "Bezoek de viswinkel op de Herenstraat";
}

export const localRecommendations: LocalRecommendation[] = [
  {
    id: "schaapsvis",
    name: "Schaapsvishandel",
    type: "visboer",
    description: {
      nl: "Familiebedrijf sinds 1938. Drie generaties vakmanschap. De beste verse kibbeling, lekkerbekken en haring van Leiden.",
      en: "Family business since 1938. Three generations of craftsmanship. The best fresh kibbeling, fried fish and herring in Leiden.",
      de: "Familienbetrieb seit 1938. Drei Generationen Handwerkskunst. Die besten frischen Kibbeling, gebratenen Fisch und Hering in Leiden.",
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

export function getRecommendationsForRoute(): { schaapsvis: ReturnType<typeof getSchaapsvisMessage>; others: LocalRecommendation[] } {
  return {
    schaapsvis: getSchaapsvisMessage(),
    others: localRecommendations.filter((r) => r.id !== "schaapsvis"),
  };
}
