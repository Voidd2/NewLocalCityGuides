import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locations } from "@/data/locations";
import { LocationExperience } from "@/components/location/LocationExperience";
import { PaywallGuard } from "@/components/auth/PaywallGuard";
import { createDynamicMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return locations.map((loc) => ({ slug: loc.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const location = locations.find((item) => item.slug === slug);
  if (!location) return {};
  return createDynamicMetadata({
    locale,
    title: location.name,
    description: location.shortDescription,
    path: `/locations/${location.slug}`,
    image: location.image,
    index: false,
  });
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

  return (
    <>
      <PaywallGuard>
        <LocationExperience location={location} />
      </PaywallGuard>
    </>
  );
}
