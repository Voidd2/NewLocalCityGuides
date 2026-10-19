import { locations } from "./locations";
import { getPublicEntityForLocation, publicEntityPath } from "./public-entities";

// Use existing location records: no duplicate coordinates, routes or invented photography.
export const blogPlaceIds: Record<string, string[]> = {
  "leiden-in-one-day": ["L001", "L006"],
  "self-guided-walking-tour-leiden": ["L003", "L008"],
  "leiden-market-days-schaapsvishandel": ["L002", "L003"],
  "leiden-with-children": ["L001", "L010"],
  "leiden-rainy-day": ["L006", "L014"],
  "free-things-to-do-leiden": ["L001", "L008"],
  "weekend-in-leiden": ["L003", "L010"],
  "best-museums-leiden": ["L010", "L014"],
};

export function getBlogPlaces(slug: string) {
  return (blogPlaceIds[slug] ?? []).flatMap(id => {
    const place = locations.find(item => item.id === id);
    const entity = place && getPublicEntityForLocation(place);
    return place?.image && place.coords && entity ? [{ ...place, image: place.image, coords: place.coords, href: publicEntityPath(entity) }] : [];
  });
}
