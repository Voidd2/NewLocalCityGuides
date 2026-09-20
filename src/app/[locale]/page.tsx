import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesBar } from "@/components/home/FeaturesBar";
import { PriceComparison } from "@/components/home/PriceComparison";
import { PopularRoutes } from "@/components/home/PopularRoutes";
import { MoreCities } from "@/components/home/MoreCities";
import { HomeContent } from "@/components/home/HomeContent";
import { Footer } from "@/components/layout/Footer";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <HomeContent />
      <Footer />
    </>
  );
}
