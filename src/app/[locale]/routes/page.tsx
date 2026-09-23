import { setRequestLocale } from "next-intl/server";
import { RoutesOverview } from "@/components/routes/RoutesOverview";
import { routes } from "@/data/routes";
import { JsonLd } from "@/components/seo/JsonLd";
import { asLocale, createPageMetadata, localizedUrl } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return createPageMetadata(locale, "routes", "/routes", { image: "/images/heroes/10008-leiden-canal-panorama.jpg" });
}

export default async function RoutesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const safeLocale = asLocale(locale);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Leiden routes",
    itemListElement: routes.map((route, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "TouristTrip",
        name: route.title,
        description: route.description,
        touristType: route.type === "walking" ? "Walking tour" : "Cycling tour",
        url: localizedUrl(safeLocale, "/routes"),
      },
    })),
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <RoutesOverview />
    </>
  );
}
