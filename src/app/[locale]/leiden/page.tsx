import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { leidenHub } from "@/data/city-pages";
import { asLocale, createDynamicMetadata, localizedUrl, SITE_URL } from "@/lib/seo";

const image = "/images/heroes/10001-leiden-canal-historic-buildings.jpg";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: value } = await params;
  const locale = asLocale(value);
  return createDynamicMetadata({ locale, title: leidenHub.title[locale], description: leidenHub.description[locale], path: "/leiden", image, index: true });
}

export default async function LeidenPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params;
  const locale = asLocale(value);
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "TouristDestination", name: "Leiden", description: leidenHub.description[locale], url: localizedUrl(locale, "/leiden"), image: `${SITE_URL}${image}`, touristType: ["City break", "Cultural tourism", "Walking tours"] }} />
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/85 to-navy-900/35" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-400">Leiden</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">{leidenHub.title[locale]}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">{leidenHub.intro[locale]}</p>
        </div>
      </section>
      <main className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <Breadcrumbs locale={locale} items={[{ label: "Leiden" }]} />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {leidenHub.cards.map((card) => (
            <Link key={card.href} href={card.href} className="group rounded-3xl border border-warm-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg md:p-8">
              <h2 className="text-2xl font-extrabold text-navy-800 group-hover:text-orange-600">{card.title[locale]}</h2>
              <p className="mt-3 leading-7 text-slate-600">{card.text[locale]}</p>
              <span className="mt-5 inline-block text-sm font-bold text-orange-600">{locale === "nl" ? "Lees verder" : locale === "de" ? "Mehr erfahren" : "Read more"} →</span>
            </Link>
          ))}
        </div>
        <section className="mt-12 rounded-3xl bg-orange-50 p-6 md:p-10">
          <h2 className="text-2xl font-extrabold text-navy-800">{locale === "nl" ? "Gratis oriënteren, daarna verder beleven" : locale === "de" ? "Kostenlos planen, dann mehr erleben" : "Plan for free, then unlock more"}</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">{locale === "nl" ? "De stadsgids, artikelen en route-overzichten zijn vrij te lezen. Het Leiden-pakket ontgrendelt de volledige verhalen, audio, video, GPS-routebegeleiding en opgeslagen voortgang." : locale === "de" ? "Reiseführer, Artikel und Routenübersichten sind frei lesbar. Das Leiden-Paket schaltet vollständige Geschichten, Audio, Video, GPS-Navigation und gespeicherten Fortschritt frei." : "The city guide, articles and route overviews are free to read. The Leiden package unlocks full stories, audio, video, GPS guidance and saved progress."}</p>
          <Link href="/pricing" className="mt-6 inline-flex rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white hover:bg-orange-600">{locale === "nl" ? "Bekijk het Leiden-pakket" : locale === "de" ? "Leiden-Paket ansehen" : "View the Leiden package"}</Link>
        </section>
      </main>
    </>
  );
}
