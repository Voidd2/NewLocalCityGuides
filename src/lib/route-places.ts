import { getLocationById, type LocationData } from "@/data/locations";
import { localSpots } from "@/data/local-spots";
import type { SupportedLocale } from "@/data/schaapsvis";

export interface RoutePlace extends LocationData {
  kind: "location" | "spot";
  detailHref: string;
  hasStory: boolean;
}

export function getRoutePlaceById(id: string, locale: SupportedLocale = "nl"): RoutePlace | undefined {
  const location = getLocationById(id);
  if (location) {
    return {
      ...location,
      kind: "location",
      detailHref: `/locations/${location.slug}`,
      hasStory: true,
    };
  }

  const spot = localSpots.find((item) => item.id === id);
  if (!spot) return undefined;

  return {
    id: spot.id,
    slug: spot.id,
    name: spot.name,
    shortDescription: spot.description[locale].split("\n\n")[0],
    mainTheme: spot.category,
    categories: [spot.category],
    image: spot.image ?? null,
    coords: spot.coords,
    entryFee: spot.priceRange ?? null,
    ticketUrl: spot.ticketUrl ?? null,
    kind: "spot",
    detailHref: `/ontdek/${spot.id}`,
    hasStory: false,
  };
}
