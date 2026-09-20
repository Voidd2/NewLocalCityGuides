import { setRequestLocale } from "next-intl/server";
import { MapPage } from "@/components/map/MapPage";
import { Footer } from "@/components/layout/Footer";

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
      <Footer />
    </>
  );
}
