import type { Locale } from "../i18n/config";
import { locations, type LocationData } from "./locations";
import { localSpots, type LocalSpot, type SpotCategory } from "./local-spots";
import { isLocationVideoPlanned } from "./media-manifest";

export type PublicEntitySection = "museums" | "attractions" | "markets" | "local";

type LocalizedCopy = Record<Locale, string>;

export type PublicEntity = {
  key: string;
  slug: string;
  section: PublicEntitySection;
  name: string;
  image: string | null;
  address?: string;
  coords: { lat: number; lng: number } | null;
  sourceKind: "location" | "spot";
  sourceId: string;
  premiumHref: string;
  videoPlanned: boolean;
  familyFriendly?: boolean | "partly";
  visitDuration?: string;
  tags: string[];
  intro: LocalizedCopy;
  whyVisit: LocalizedCopy;
  metaDescription: LocalizedCopy;
};

export function entitySlug(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " en ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function cleanText(value: string): string {
  return value.replace(/\*\*/g, "").replace(/\s+/g, " ").trim();
}

function firstParagraph(value: string): string {
  return cleanText(value.split(/\n\s*\n/)[0] ?? value);
}

function truncate(value: string, max = 155): string {
  if (value.length <= max) return value;
  const shortened = value.slice(0, max - 1).replace(/\s+\S*$/, "").trim();
  return `${shortened}.`;
}

function sectionForLocation(location: LocationData): PublicEntitySection {
  const haystack = `${location.name} ${location.slug} ${location.categories.join(" ")}`.toLowerCase();
  return /museum|naturalis|hortus/.test(haystack) ? "museums" : "attractions";
}

function sectionForSpot(category: SpotCategory): PublicEntitySection {
  if (category === "museum") return "museums";
  if (category === "markt") return "markets";
  return "local";
}

function locationCopy(location: LocationData): Pick<PublicEntity, "intro" | "whyVisit" | "metaDescription"> {
  const theme = cleanText(location.mainTheme);
  const intro = {
    nl: location.shortDescription,
    en: `Discover ${location.name}, a distinctive place in Leiden connected with ${theme.toLowerCase()}. This free introduction helps you decide whether to include it in your visit.`,
    de: `Entdecke ${location.name}, einen besonderen Ort in Leiden mit Bezug zu ${theme.toLowerCase()}. Diese kostenlose Einführung hilft bei der Planung deines Besuchs.`,
  };
  const whyVisit = {
    nl: `${location.name} laat een herkenbaar onderdeel van de geschiedenis en het karakter van Leiden zien. Bekijk de plek op je eigen tempo en gebruik de volledige memberervaring voor het uitgebreide verhaal, historische beelden en begeleiding onderweg.`,
    en: `${location.name} reveals a recognisable part of Leiden's history and character. Explore the place at your own pace, then use the complete member experience for the extended story, historical imagery and on-location guidance.`,
    de: `${location.name} zeigt einen charakteristischen Teil der Geschichte und des Stadtbilds von Leiden. Mit der vollständigen Member-Erfahrung erhältst du die ausführliche Geschichte, historische Bilder und Begleitung vor Ort.`,
  };
  return {
    intro,
    whyVisit,
    metaDescription: {
      nl: truncate(`${location.name} in Leiden bezoeken? Lees een korte introductie, bekijk praktische informatie en ontdek hoe je het volledige verhaal op locatie beleeft.`),
      en: truncate(`Visiting ${location.name} in Leiden? Read a concise introduction, plan your visit and discover the complete member story on location.`),
      de: truncate(`${location.name} in Leiden besuchen? Lies eine kurze Einführung, plane deinen Besuch und entdecke die vollständige Geschichte vor Ort.`),
    },
  };
}

function spotCopy(spot: LocalSpot): Pick<PublicEntity, "intro" | "whyVisit" | "metaDescription"> {
  const intro = {
    nl: firstParagraph(spot.description.nl),
    en: firstParagraph(spot.description.en),
    de: firstParagraph(spot.description.de),
  };
  const tagText = spot.tags.slice(0, 3).join(", ");
  const whyVisit = {
    nl: `${spot.name} is een goede keuze voor bezoekers die ${tagText || "lokaal Leiden"} willen ontdekken. Deze openbare pagina geeft alvast de belangrijkste context; members kunnen de plek toevoegen aan een route en alle beschikbare verhalen en media openen.`,
    en: `${spot.name} is a useful stop for visitors who want to experience local Leiden. This public page provides the essential context; members can add it to a route and unlock all available stories and media.`,
    de: `${spot.name} ist eine gute Station für Besucher, die das lokale Leiden erleben möchten. Diese öffentliche Seite bietet den wichtigsten Kontext; Members können den Ort zu einer Route hinzufügen und alle verfügbaren Geschichten und Medien öffnen.`,
  };
  return {
    intro,
    whyVisit,
    metaDescription: {
      nl: truncate(`${spot.name} in Leiden bezoeken? Bekijk de locatie, een korte introductie en praktische informatie voor je bezoek.`),
      en: truncate(`Planning to visit ${spot.name} in Leiden? Find the location, a concise introduction and practical information for your visit.`),
      de: truncate(`${spot.name} in Leiden besuchen? Hier findest du den Standort, eine kurze Einführung und praktische Informationen.`),
    },
  };
}

function sameEntity(location: LocationData, spot: LocalSpot): boolean {
  return entitySlug(location.name) === entitySlug(spot.name) || location.slug === entitySlug(spot.name);
}

const locationEntities: PublicEntity[] = locations.map((location) => {
  const matchingSpot = localSpots.find((spot) => sameEntity(location, spot));
  const copy = matchingSpot ? spotCopy(matchingSpot) : locationCopy(location);
  return {
    key: `location:${location.id}`,
    slug: location.slug,
    section: sectionForLocation(location),
    name: location.name,
    image: location.image ?? matchingSpot?.image ?? null,
    address: matchingSpot?.address,
    coords: location.coords ?? matchingSpot?.coords ?? null,
    sourceKind: "location",
    sourceId: location.id,
    premiumHref: `/locations/${location.slug}`,
    videoPlanned: isLocationVideoPlanned(location.id),
    familyFriendly: matchingSpot?.kidFriendly,
    visitDuration: matchingSpot?.visitDuration,
    tags: matchingSpot?.tags.slice(0, 5) ?? location.categories.slice(0, 5),
    ...copy,
  };
});

const standaloneSpotEntities: PublicEntity[] = localSpots
  .filter((spot) => spot.category !== "evenement")
  .filter((spot) => !spot.name.toLowerCase().includes("schaapsvishandel"))
  .filter((spot) => !locations.some((location) => sameEntity(location, spot)))
  .map((spot) => ({
    key: `spot:${spot.id}`,
    slug: entitySlug(spot.name),
    section: sectionForSpot(spot.category),
    name: spot.name,
    image: spot.image ?? null,
    address: spot.address,
    coords: spot.coords,
    sourceKind: "spot" as const,
    sourceId: spot.id,
    premiumHref: `/ontdek/${spot.id}`,
    videoPlanned: false,
    familyFriendly: spot.kidFriendly,
    visitDuration: spot.visitDuration,
    tags: spot.tags.slice(0, 5),
    ...spotCopy(spot),
  }));

export const publicEntities: PublicEntity[] = [...locationEntities, ...standaloneSpotEntities];

export function publicEntityPath(entity: Pick<PublicEntity, "section" | "slug">): string {
  return `/leiden/${entity.section}/${entity.slug}`;
}

export function getPublicEntity(section: string, slug: string): PublicEntity | undefined {
  return publicEntities.find((entity) => entity.section === section && entity.slug === slug);
}

export function getPublicEntityForLocation(location: LocationData): PublicEntity | undefined {
  return publicEntities.find((entity) => entity.sourceKind === "location" && entity.sourceId === location.id);
}

export function publicPathForSpot(spot: LocalSpot): string {
  if (spot.name.toLowerCase().includes("schaapsvishandel")) return "/leiden/schaapsvishandel";
  const matchingLocation = locations.find((location) => sameEntity(location, spot));
  if (matchingLocation) {
    const entity = getPublicEntityForLocation(matchingLocation);
    if (entity) return publicEntityPath(entity);
  }
  return `/leiden/${sectionForSpot(spot.category)}/${entitySlug(spot.name)}`;
}

export function nearbyPublicEntities(entity: PublicEntity, limit = 3): PublicEntity[] {
  if (!entity.coords) return publicEntities.filter((candidate) => candidate.key !== entity.key).slice(0, limit);
  return publicEntities
    .filter((candidate) => candidate.key !== entity.key && candidate.coords)
    .map((candidate) => ({
      candidate,
      distance: Math.hypot(candidate.coords!.lat - entity.coords!.lat, candidate.coords!.lng - entity.coords!.lng),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}
