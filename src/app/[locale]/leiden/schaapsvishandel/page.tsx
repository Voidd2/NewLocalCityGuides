import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { schaapsvisPage } from "@/data/city-pages";
import { externalSites, getSchaapsvishandelUrl } from "@/data/external-sites";
import { asLocale, createDynamicMetadata, localizedUrl, SITE_URL } from "@/lib/seo";

const image = "/images/locations/10021-vismarkt-leiden.jpg";

function PhotoPlaceholder({ label, brief }: { label: string; brief: string }) {
  return (
    <div className="flex min-h-44 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-orange-200 bg-warm-50 px-5 py-7 text-center">
      <span aria-hidden="true" className="text-3xl">📷</span>
      <p className="mt-3 text-sm font-extrabold text-navy-800">{label}</p>
      <p className="mt-2 max-w-md text-xs leading-5 text-slate-500">{brief}</p>
    </div>
  );
}

function MapButton({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy-900 px-5 py-3 text-sm font-bold text-white hover:bg-navy-800">
      <span aria-hidden="true">📍</span>
      {label}
      <span aria-hidden="true">↗</span>
    </a>
  );
}

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
  const officialWebsite = getSchaapsvishandelUrl(locale);

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "LocalBusiness", name: "Schaapsvishandel", description: schaapsvisPage.description[locale], url: externalSites.schaapsvishandel, mainEntityOfPage: url, sameAs: [externalSites.schaapsvishandel], image: `${SITE_URL}${image}`, foundingDate: "1938", address: { "@type": "PostalAddress", streetAddress: "Herenstraat 48", addressLocality: "Leiden", addressCountry: "NL" }, geo: { "@type": "GeoCoordinates", latitude: 52.159, longitude: 4.4893 }, knowsAbout: ["Fish", "Kibbeling", "Herring", "Leiden market"] }} />
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
        <aside className="mt-8 flex flex-col gap-5 rounded-3xl border border-orange-200 bg-orange-50 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-navy-800">{locale === "nl" ? "Meer over de familiezaak" : locale === "de" ? "Mehr über den Familienbetrieb" : "More about the family business"}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{locale === "nl" ? "Bekijk de officiële website voor het actuele aanbod, nieuws en contact met Schaapsvishandel." : locale === "de" ? "Auf der offiziellen Website findest du das aktuelle Angebot, Neuigkeiten und Kontaktdaten von Schaapsvishandel." : "Visit the official website for the current selection, news and contact details for Schaapsvishandel."}</p>
          </div>
          <a href={officialWebsite} target="_blank" rel="noopener" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white hover:bg-orange-600">
            {locale === "nl" ? "Bezoek Schaapsvishandel.nl" : locale === "de" ? "Schaapsvishandel.nl besuchen" : "Visit Schaapsvishandel.nl"}
            <span aria-hidden="true">↗</span>
          </a>
        </aside>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <section className="rounded-3xl bg-orange-50 p-6 md:col-span-3">
            <div className="grid items-center gap-6 md:grid-cols-[0.9fr_1.1fr]">
              <PhotoPlaceholder label={schaapsvisPage.photoPending[locale]} brief={schaapsvisPage.imageBriefs.shop[locale]} />
              <div>
                <h2 className="text-2xl font-extrabold text-navy-800">{locale === "nl" ? "De viswinkel" : locale === "de" ? "Das Fischgeschäft" : "The fish shop"}</h2>
                <p className="mt-4 leading-7 text-slate-600">{schaapsvisPage.shop[locale]}</p>
                <p className="mt-4 font-bold text-navy-800">Herenstraat 48, Leiden</p>
                <MapButton href={schaapsvisPage.mapUrls.shop} label={schaapsvisPage.mapCta[locale]} />
              </div>
            </div>
          </section>
          <section className="rounded-3xl border border-warm-200 p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-500">{locale === "nl" ? "Woensdag" : locale === "de" ? "Mittwoch" : "Wednesday"}</p>
            <h2 className="mt-2 text-xl font-extrabold text-navy-800">Nieuwe Rijn</h2>
            <div className="mt-5"><PhotoPlaceholder label={schaapsvisPage.photoPending[locale]} brief={schaapsvisPage.imageBriefs.wednesday[locale]} /></div>
            <p className="mt-5 leading-7 text-slate-600">{schaapsvisPage.wednesday[locale]}</p>
            <MapButton href={schaapsvisPage.mapUrls.wednesday} label={schaapsvisPage.mapCta[locale]} />
          </section>
          <section className="rounded-3xl border border-warm-200 p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-500">{locale === "nl" ? "Zaterdag" : locale === "de" ? "Samstag" : "Saturday"}</p>
            <h2 className="mt-2 text-xl font-extrabold text-navy-800">Vismarkt · tegenover De Waag</h2>
            <div className="mt-5"><PhotoPlaceholder label={schaapsvisPage.photoPending[locale]} brief={schaapsvisPage.imageBriefs.saturday[locale]} /></div>
            <p className="mt-5 leading-7 text-slate-600">{schaapsvisPage.saturday[locale]}</p>
            <MapButton href={schaapsvisPage.mapUrls.saturday} label={schaapsvisPage.mapCta[locale]} />
          </section>
          <section className="rounded-3xl bg-navy-900 p-6 text-white"><h2 className="text-xl font-extrabold">{locale === "nl" ? "Loop de marktroute" : locale === "de" ? "Marktroute entdecken" : "Walk the market route"}</h2><p className="mt-3 text-sm leading-7 text-white/70">{locale === "nl" ? "De route kiest op woensdag en zaterdag de juiste marktkraam. Op andere dagen wordt de winkel aanbevolen." : locale === "de" ? "Mittwochs und samstags wählt die Route den passenden Marktstand. An anderen Tagen wird das Geschäft empfohlen." : "On Wednesday and Saturday the route selects the appropriate market stall. On other days it recommends the shop."}</p><Link href="/routes/markt-en-ambacht" className="mt-5 inline-flex rounded-full bg-orange-500 px-5 py-3 text-sm font-bold hover:bg-orange-600">{locale === "nl" ? "Bekijk Markt & Ambacht" : locale === "de" ? "Markt & Handwerk ansehen" : "View Market & Craft"}</Link></section>
        </div>
        <p className="mt-10 text-sm leading-6 text-slate-500">{locale === "nl" ? "Marktdagen, standplaatsen en openingstijden kunnen rond feestdagen of evenementen wijzigen. Controleer actuele informatie voordat je vertrekt." : locale === "de" ? "Markttage, Standorte und Öffnungszeiten können sich rund um Feiertage oder Veranstaltungen ändern. Prüfe vor der Abfahrt die aktuellen Informationen." : "Market days, stall locations and opening hours may change around public holidays or events. Check current information before travelling."}</p>
      </main>
    </>
  );
}
