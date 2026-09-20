import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locations } from "@/data/locations";
import { LocationExperience } from "@/components/location/LocationExperience";
import { Footer } from "@/components/layout/Footer";

export function generateStaticParams() {
  return locations.map((loc) => ({ slug: loc.slug }));
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
      <LocationExperience location={location} />
      <Footer />
    </>
  );
}
