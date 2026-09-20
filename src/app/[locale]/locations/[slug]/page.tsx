import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locations } from "@/data/locations";
import { LocationExperience } from "@/components/location/LocationExperience";
import { siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return locations.map((loc) => ({ slug: loc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const location = locations.find((l) => l.slug === slug);
  if (!location) return {};

  return {
    title: location.name,
    description: location.shortDescription,
    alternates: {
      canonical: `/${locale}/locations/${location.slug}`,
    },
    openGraph: {
      title: location.name,
      description: location.shortDescription,
      type: "website",
    },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const location = locations.find((l) => l.slug === slug);
  if (!location) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: location.name,
    description: location.shortDescription,
    url: `${siteUrl}/${locale}/locations/${location.slug}`,
    touristType: location.categories,
    containedInPlace: {
      "@type": "City",
      name: "Leiden",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Leiden",
        addressCountry: "NL",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LocationExperience location={location} />
    </>
  );
}
