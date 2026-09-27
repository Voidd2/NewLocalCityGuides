import { getLocationMediaManifest } from "./media-manifest";

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

export function getStoryMedia(locationId: string, locationName: string): StoryMedia {
  const manifest = getLocationMediaManifest(locationId);
  const aiAllowed = manifest?.historicalAiAllowed ?? true;

  return {
    current: {
      src: manifest?.current.src ?? null,
      alt: manifest?.current.alt ?? `${locationName} in het huidige Leiden`,
      placeholder: `{ IMAGE: ${manifest?.current.brief ?? `actuele liggende foto van ${locationName}, zonder zwaar filter`} }`,
    },
    historical: {
      src: manifest?.historical.src ?? null,
      alt: manifest?.historical.alt ?? `${locationName} in een historische periode`,
      placeholder: `{ IMAGE: ${manifest?.historical.brief ?? `historisch onderbouwd beeld of gelabelde AI-impressie van ${locationName} in de relevante periode`} }`,
    },
    historicalIsAiAllowed: aiAllowed,
  };
}
