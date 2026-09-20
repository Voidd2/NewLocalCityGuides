import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routes } from "@/data/routes";
import { getLocationById } from "@/data/locations";
import { RouteDetail } from "@/components/routes/RouteDetail";
import { Footer } from "@/components/layout/Footer";
import { siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return routes.map((route) => ({ slug: route.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const route = routes.find((r) => r.slug === slug);
  if (!route) return {};

  const title = `${route.title} - ${route.subtitle}`;

  return {
    title,
    description: route.description,
    alternates: {
      canonical: `/${locale}/routes/${route.slug}`,
    },
    openGraph: {
      title,
      description: route.description,
      type: "website",
    },
  };
}

export default async function RouteDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const route = routes.find((r) => r.slug === slug);
  if (!route) notFound();

  const routeLocations = route.locationIds.map(getLocationById).filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: route.title,
    description: route.description,
    url: `${siteUrl}/${locale}/routes/${route.slug}`,
    touristType: route.kidFriendly ? ["Families", "General"] : ["General"],
    itinerary: {
      "@type": "ItemList",
      itemListElement: routeLocations.map((location, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "TouristAttraction",
          name: location!.name,
          description: location!.shortDescription,
          url: `${siteUrl}/${locale}/locations/${location!.slug}`,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RouteDetail route={route} />
      <Footer />
    </>
  );
}
