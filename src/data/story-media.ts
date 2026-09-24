export interface StoryMediaSide {
  src: string | null;
  alt: string;
  placeholder: string;
}

export interface StoryMedia {
  current: StoryMediaSide;
  historical: StoryMediaSide;
  historicalIsAiAllowed: boolean;
}

const historicalBriefs: Record<string, { brief: string; aiAllowed?: boolean }> = {
  L001: { brief: "historisch onderbouwde impressie van de Burchtheuvel als middeleeuwse motte" },
  L002: { brief: "historisch onderbouwde impressie van de vismarkt aan het water, zonder moderne elementen" },
  L003: { brief: "historisch onderbouwde impressie van de graanhandel op de Koornbrug rond 1824" },
  L004: { brief: "historisch onderbouwde, niet-grafische impressie van de Blauwe Steen als plek van rechtspraak" },
  L005: { brief: "historisch onderbouwde, niet-grafische impressie van het middeleeuwse Gravensteen" },
  L006: { brief: "historisch onderbouwde impressie van de Pieterskerk en het plein in de late middeleeuwen" },
  L007: { brief: "historisch onderbouwde impressie van het dagelijks leven in de Pilgrimswijk rond 1610" },
  L008: { brief: "historisch onderbouwde impressie van het Jean Pesijnhofje in de zeventiende eeuw" },
  L009: { brief: "rechtenvrije archiefprent of kaart van de Buskruitramp van 1807; geen verzonnen historische foto", aiAllowed: false },
  L010: { brief: "historisch onderbouwde impressie van Clusius' tuin in de Hortus rond 1595" },
  L011: { brief: "historisch onderbouwde impressie van de Weddesteeg in de tijd van de jonge Rembrandt" },
  L012: { brief: "rechtenvrije historische kaart of prent van het beleg en ontzet van Leiden in 1574", aiAllowed: false },
  L013: { brief: "historisch onderbouwde impressie van een Leids weversgezin aan het werk bij het getouw" },
  L014: { brief: "rechtenvrije archieffoto of document bij de Cleveringa-toespraak en Jodenvervolging; GEEN AI-RECONSTRUCTIE", aiAllowed: false },
};

export function getStoryMedia(locationId: string, locationName: string): StoryMedia {
  const historical = historicalBriefs[locationId];
  const aiAllowed = historical?.aiAllowed ?? true;

  return {
    current: {
      src: null,
      alt: `${locationName} in het huidige Leiden`,
      placeholder: `{ IMAGE: actuele liggende foto van ${locationName}, zonder zwaar filter, bij voorkeur vanaf dezelfde kijkhoek als het historische beeld }`,
    },
    historical: {
      src: null,
      alt: `${locationName} in een historische periode`,
      placeholder: `{ IMAGE: ${historical?.brief ?? `historisch onderbouwd beeld of gelabelde AI-impressie van ${locationName} in de relevante periode`} }`,
    },
    historicalIsAiAllowed: aiAllowed,
  };
}
