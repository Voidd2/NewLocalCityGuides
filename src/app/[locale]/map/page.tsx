import { setRequestLocale } from "next-intl/server";
import { MapPage } from "@/components/map/MapPage";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return createPageMetadata(locale, "map", "/map");
}

export default async function Map({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <MapPage />
    </>
  );
}
