import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { OntdekPage } from "@/components/ontdek/OntdekPage";
import { publicEntities, publicEntityPath } from "@/data/public-entities";
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
    itemListElement: publicEntities.slice(0, 30).map((entity, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": entity.section === "museums" ? "Museum" : entity.section === "attractions" ? "TouristAttraction" : entity.section === "markets" ? "Place" : "LocalBusiness",
        name: entity.name,
        description: entity.intro[safeLocale],
        address: entity.address,
        url: localizedUrl(safeLocale, publicEntityPath(entity)),
      },
    })),
  };

  const directoryCopy = safeLocale === "nl"
    ? { title: "Bekijk alle plekken in Leiden", text: "Open het volledige overzicht met historische plekken, musea, markten en lokale favorieten.", cta: "Naar alle plekken" }
    : safeLocale === "de"
      ? { title: "Alle Orte in Leiden ansehen", text: "Öffne die vollständige Übersicht mit historischen Orten, Museen, Märkten und lokalen Favoriten.", cta: "Zu allen Orten" }
      : { title: "View every place in Leiden", text: "Open the complete directory of historic places, museums, markets and local favourites.", cta: "View all places" };

  return <><JsonLd data={structuredData} /><OntdekPage /><section className="mx-auto max-w-7xl px-4 pb-14"><div className="rounded-3xl bg-navy-900 p-6 text-white md:flex md:items-center md:justify-between md:p-9"><div><h2 className="text-2xl font-extrabold">{directoryCopy.title}</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-white/65">{directoryCopy.text}</p></div><Link href="/leiden/places" className="mt-5 inline-flex min-h-11 items-center rounded-full bg-orange-500 px-6 text-sm font-bold text-white hover:bg-orange-600 md:mt-0">{directoryCopy.cta}</Link></div></section></>;
}
