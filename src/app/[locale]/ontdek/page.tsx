import { setRequestLocale } from "next-intl/server";
import { OntdekPage } from "@/components/ontdek/OntdekPage";
import { localSpots } from "@/data/local-spots";
import { JsonLd } from "@/components/seo/JsonLd";
import { asLocale, createPageMetadata, localizedUrl } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return createPageMetadata(locale, "discover", "/ontdek");
}

export default async function Ontdek({
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
    name: "Places to visit in Leiden",
    itemListElement: localSpots.slice(0, 20).map((spot, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": spot.category === "museum" ? "TouristAttraction" : "LocalBusiness",
        name: spot.name,
        description: spot.description[safeLocale].replace(/\*\*/g, "").split("\n")[0],
        address: spot.address,
        url: localizedUrl(safeLocale, "/ontdek"),
      },
    })),
  };

  return <><JsonLd data={structuredData} /><OntdekPage /></>;
}
