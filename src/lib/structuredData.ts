import type { RouteData } from "@/data/routes";
import type { LocationData } from "@/data/locations";
import { siteUrl, siteName } from "@/lib/site";

export function routeStructuredData(route: RouteData, locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: route.title,
    description: route.description,
    touristType: route.kidFriendly ? ["Families", "Sightseers"] : ["Sightseers"],
    url: `${siteUrl}/${locale}/routes/${route.slug}`,
    provider: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
    itinerary: {
      "@type": "ItemList",
      numberOfItems: route.stops,
      itemListElement: route.locationIds.map((locationId, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: locationId,
      })),
    },
  };
}

export function locationStructuredData(location: LocationData, locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: location.name,
    description: location.shortDescription,
    url: `${siteUrl}/${locale}/locations/${location.slug}`,
    isAccessibleForFree: true,
  };
}
