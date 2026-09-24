import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { schaapsvisPage } from "@/data/city-pages";
import { asLocale, createDynamicMetadata, localizedUrl, SITE_URL } from "@/lib/seo";

const image = "/images/locations/10021-vismarkt-leiden.jpg";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: value } = await params;
  const locale = asLocale(value);
  return createDynamicMetadata({ locale, title: schaapsvisPage.title[locale], description: schaapsvisPage.description[locale], path: "/leiden/schaapsvishandel", image, index: true });
}

export default async function SchaapsvishandelPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params;
  const locale = asLocale(value);
  setRequestLocale(locale);
  const url = localizedUrl(locale, "/leiden/schaapsvishandel");

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "LocalBusiness", name: "Schaapsvishandel", description: schaapsvisPage.description[locale], url, image: `${SITE_URL}${image}`, foundingDate: "1938", address: { "@type": "PostalAddress", streetAddress: "Herenstraat 48", addressLocality: "Leiden", addressCountry: "NL" }, geo: { "@type": "GeoCoordinates", latitude: 52.159, longitude: 4.4893 }, knowsAbout: ["Fish", "Kibbeling", "Herring", "Leiden market"] }} />
      <header className="relative overflow-hidden bg-navy-900 text-white">
        <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/90 to-navy-900/40" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-400">{locale === "nl" ? "Familiebedrijf sinds 1938" : locale === "de" ? "Familienbetrieb seit 1938" : "Family business since 1938"}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">{schaapsvisPage.title[locale]}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">{schaapsvisPage.intro[locale]}</p>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <Breadcrumbs locale={locale} items={[{ label: "Leiden", href: "/leiden" }, { label: "Schaapsvishandel" }]} />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <section className="rounded-3xl bg-orange-50 p-6 md:col-span-3"><h2 className="text-2xl font-extrabold text-navy-800">{locale === "nl" ? "De viswinkel" : locale === "de" ? "Das Fischgeschäft" : "The fish shop"}</h2><p className="mt-4 leading-7 text-slate-600">{schaapsvisPage.shop[locale]}</p><p className="mt-4 font-bold text-navy-800">Herenstraat 48, Leiden</p></section>
          <section className="rounded-3xl border border-warm-200 p-6"><p className="text-xs font-bold uppercase tracking-widest text-orange-500">{locale === "nl" ? "Woensdag" : locale === "de" ? "Mittwoch" : "Wednesday"}</p><h2 className="mt-2 text-xl font-extrabold text-navy-800">Nieuwe Rijn</h2><p className="mt-3 leading-7 text-slate-600">{schaapsvisPage.wednesday[locale]}</p></section>
          <section className="rounded-3xl border border-warm-200 p-6"><p className="text-xs font-bold uppercase tracking-widest text-orange-500">{locale === "nl" ? "Zaterdag" : locale === "de" ? "Samstag" : "Saturday"}</p><h2 className="mt-2 text-xl font-extrabold text-navy-800">Vismarkt</h2><p className="mt-3 leading-7 text-slate-600">{schaapsvisPage.saturday[locale]}</p></section>
          <section className="rounded-3xl bg-navy-900 p-6 text-white"><h2 className="text-xl font-extrabold">{locale === "nl" ? "Loop de marktroute" : locale === "de" ? "Marktroute entdecken" : "Walk the market route"}</h2><p className="mt-3 text-sm leading-7 text-white/70">{locale === "nl" ? "De route kiest op woensdag en zaterdag de juiste marktkraam. Op andere dagen wordt de winkel aanbevolen." : locale === "de" ? "Mittwochs und samstags wählt die Route den passenden Marktstand. An anderen Tagen wird das Geschäft empfohlen." : "On Wednesday and Saturday the route selects the appropriate market stall. On other days it recommends the shop."}</p><Link href="/routes/markt-en-ambacht" className="mt-5 inline-flex rounded-full bg-orange-500 px-5 py-3 text-sm font-bold hover:bg-orange-600">{locale === "nl" ? "Bekijk Markt & Ambacht" : locale === "de" ? "Markt & Handwerk ansehen" : "View Market & Craft"}</Link></section>
        </div>
        <p className="mt-10 text-sm leading-6 text-slate-500">{locale === "nl" ? "Marktdagen, standplaatsen en openingstijden kunnen rond feestdagen of evenementen wijzigen. Controleer actuele informatie voordat je vertrekt." : locale === "de" ? "Markttage, Standorte und Öffnungszeiten können sich rund um Feiertage oder Veranstaltungen ändern. Prüfe vor der Abfahrt die aktuellen Informationen." : "Market days, stall locations and opening hours may change around public holidays or events. Check current information before travelling."}</p>
      </main>
    </>
  );
}
