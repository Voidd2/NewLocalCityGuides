export type MediaAsset = {
  src: string | null;
  alt: string;
  brief: string;
  rights: "own" | "licensed" | "public-domain" | "ai-impression" | "pending";
  sourceNote?: string;
};

export type LocationMediaManifest = {
  locationId: string;
  slug: string;
  current: MediaAsset;
  historical: MediaAsset;
  historicalAiAllowed: boolean;
  video: {
    status: "not-planned" | "planned" | "filmed" | "published";
    briefPath?: string;
    previewReady: boolean;
  };
};

type Seed = {
  id: string;
  slug: string;
  name: string;
  historicalBrief: string;
  aiAllowed?: boolean;
  videoPlanned?: boolean;
};

const seeds: Seed[] = [
  { id: "L001", slug: "de-burcht", name: "De Burcht van Leiden", historicalBrief: "historisch onderbouwde impressie van de Burchtheuvel als middeleeuwse motte", videoPlanned: true },
  { id: "L002", slug: "vismarkt", name: "Vismarkt", historicalBrief: "historisch onderbouwde impressie van de vismarkt aan het water, zonder moderne elementen" },
  { id: "L003", slug: "koornbrug", name: "Koornbrug", historicalBrief: "historisch onderbouwde impressie van de graanhandel op de Koornbrug rond 1824", videoPlanned: true },
  { id: "L004", slug: "blauwe-steen", name: "De Blauwe Steen", historicalBrief: "historisch onderbouwde, niet-grafische impressie van de Blauwe Steen als plek van rechtspraak" },
  { id: "L005", slug: "gravensteen", name: "Gravensteen", historicalBrief: "historisch onderbouwde, niet-grafische impressie van het middeleeuwse Gravensteen" },
  { id: "L006", slug: "pieterskerk", name: "Pieterskerk", historicalBrief: "historisch onderbouwde impressie van de Pieterskerk en het plein in de late middeleeuwen", videoPlanned: true },
  { id: "L007", slug: "pilgrims-quarter", name: "Pilgrimswijk & Engelse Poort", historicalBrief: "historisch onderbouwde impressie van het dagelijks leven in de Pilgrimswijk rond 1610" },
  { id: "L008", slug: "jean-pesijnhofje", name: "Jean Pesijnhofje", historicalBrief: "historisch onderbouwde impressie van het Jean Pesijnhofje in de zeventiende eeuw" },
  { id: "L009", slug: "buskruitramp-1807", name: "Buskruitramp 1807", historicalBrief: "rechtenvrije archiefprent of kaart van de Buskruitramp van 1807; geen verzonnen historische foto", aiAllowed: false, videoPlanned: true },
  { id: "L010", slug: "hortus-botanicus", name: "Hortus botanicus", historicalBrief: "historisch onderbouwde impressie van Clusius' tuin in de Hortus rond 1595", videoPlanned: true },
  { id: "L011", slug: "weddesteeg", name: "Weddesteeg", historicalBrief: "historisch onderbouwde impressie van de Weddesteeg in de tijd van de jonge Rembrandt" },
  { id: "L012", slug: "leidens-ontzet", name: "Leidens Ontzet", historicalBrief: "rechtenvrije historische kaart of prent van het beleg en ontzet van Leiden in 1574", aiAllowed: false },
  { id: "L013", slug: "wevershuis", name: "Wevershuis", historicalBrief: "historisch onderbouwde impressie van een Leids weversgezin aan het werk bij het getouw" },
  { id: "L014", slug: "cleveringa-1940", name: "Cleveringa 1940", historicalBrief: "rechtenvrije archieffoto of document bij de Cleveringa-toespraak en Jodenvervolging; geen AI-reconstructie", aiAllowed: false },
];

export const locationMediaManifest: LocationMediaManifest[] = seeds.map((seed) => ({
  locationId: seed.id,
  slug: seed.slug,
  current: {
    src: null,
    alt: `${seed.name} in het huidige Leiden`,
    brief: `actuele liggende foto van ${seed.name}, zonder zwaar filter, bij voorkeur vanaf dezelfde kijkhoek als het historische beeld`,
    rights: "pending",
  },
  historical: {
    src: null,
    alt: `${seed.name} in een historische periode`,
    brief: seed.historicalBrief,
    rights: "pending",
  },
  historicalAiAllowed: seed.aiAllowed ?? true,
  video: {
    status: seed.videoPlanned ? "planned" : "not-planned",
    briefPath: seed.videoPlanned ? "content/video-briefs/README.md" : undefined,
    previewReady: false,
  },
}));

export function getLocationMediaManifest(locationId: string): LocationMediaManifest | undefined {
  return locationMediaManifest.find((entry) => entry.locationId === locationId);
}

export function isLocationVideoPlanned(locationId: string): boolean {
  const status = getLocationMediaManifest(locationId)?.video.status;
  return status === "planned" || status === "filmed" || status === "published";
}
