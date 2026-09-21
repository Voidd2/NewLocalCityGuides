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

function getDayOfWeek(): number {
  return new Date().getDay();
}

export function getSchaapsvisMessage(): { location: string; description: string; mapsQuery: string } {
  const day = getDayOfWeek();

  if (day === 6) {
    return {
      location: "Leidse Markt (tegenover de Waag)",
      description:
        "Vishandel Schaapsvis staat vandaag op de zaterdagmarkt, tegenover de Waag. Dit is de enige visboer op de Leidse markt die hier al sinds 1938 staat. Probeer de verse kibbeling of een broodje haring!",
      mapsQuery: "Waag+Leiden",
    };
  }

  if (day === 3) {
    return {
      location: "Leidse Markt (tegenover Roos, donkerblauwe kar)",
      description:
        "Vishandel Schaapsvis staat vandaag op de woensdagmarkt. Zoek de donkerblauwe kar tegenover Roos. Dit is de enige visboer die hier al sinds 1938 staat. Gespecialiseerd in gebakken kibbeling, lekkerbekken en verse haring - de enige die toeristen niet zomaar oplichten.",
      mapsQuery: "Nieuwe+Rijn+markt+Leiden",
    };
  }

  return {
    location: "Viswinkel Schaapsvishandel, Herenstraat",
    description:
      "Bezoek de viswinkel van Schaapsvishandel op de Herenstraat. Een echt familiebedrijf sinds 1938, drie generaties vakmanschap. Probeer de verse kibbeling of een broodje haring - typisch Nederlands!",
    mapsQuery: "Herenstraat+Leiden+viswinkel",
  };
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
