import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PremiumRouteBoundary } from "./PremiumRouteBoundary";
import { localizedUrl, SITE_URL } from "@/lib/seo";
import type { Locale } from "@/i18n/config";
import type { PublicRoutePreviewData } from "@/data/public-route-seo";

export function PublicRoutePreview({ route, locale }: { route: PublicRoutePreviewData; locale: Locale }) {
  const t = useTranslations("routePreview");
  const copy = route.copy[locale];

  return (
    <div className="pb-16">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        name: copy.title,
        description: copy.metaDescription,
        url: localizedUrl(locale, `/routes/${route.slug}`),
        image: `${SITE_URL}${route.image}`,
        touristType: route.type === "walking" ? "Walking tour" : "Cycling tour",
        provider: { "@type": "Organization", name: "YourLocalCityGuide" },
        inLanguage: locale,
      }} />

      <section className="relative overflow-hidden bg-navy-900 text-white">
        <Image src={route.image} alt={copy.title} fill priority sizes="100vw" className="object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900/90 to-navy-900/45" />
        <div className="relative mx-auto max-w-6xl px-4 py-12 md:py-20">
          <Breadcrumbs items={[{ label: t("routes"), href: "/routes" }, { label: copy.title }]} locale={locale} className="!text-white/75" />
          <div className="mt-10 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">{t("publicPreview")}</p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">{copy.title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">{copy.subtitle}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {[route.type === "walking" ? t("walking") : t("cycling"), route.distance, route.duration[locale], ...(route.familyFriendly ? [t("familyFriendly")] : [])].map((fact) => (
                <span key={fact} className="rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-white ring-1 ring-white/15 backdrop-blur">{fact}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl space-y-14 px-4 py-12 md:py-16">
        <section className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">{t("routeOverview")}</p>
            <h2 className="mt-2 text-2xl font-extrabold text-navy-800">{t("whatToExpect")}</h2>
            <p className="mt-4 leading-7 text-gray-600">{copy.intro}</p>
            <p className="mt-4 leading-7 text-gray-600">{copy.whyChoose}</p>
          </div>
          <aside className="rounded-2xl border border-orange-100 bg-orange-50 p-5">
            <h2 className="font-bold text-navy-800">{t("includedAfterUnlock")}</h2>
            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              {[t("fullStories"), t("gpsGuidance"), t("media"), t("progress")].map((item) => <li key={item} className="flex gap-2"><span className="font-bold text-orange-500" aria-hidden="true">✓</span>{item}</li>)}
            </ul>
          </aside>
        </section>

        <section>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">{t("selectedPreview")}</p>
          <h2 className="mt-2 text-2xl font-extrabold text-navy-800">{t("highlights")}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {copy.highlights.map((highlight, index) => (
              <article key={highlight.name} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-sm font-extrabold text-orange-600">{index + 1}</span>
                <h3 className="mt-4 font-bold text-navy-800">{highlight.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{highlight.summary}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 text-xs text-gray-500">{t("highlightsNote")}</p>
        </section>

        <section className="rounded-[2rem] bg-warm-100 p-6 md:p-9">
          <h2 className="text-2xl font-extrabold text-navy-800">{t("howItWorks")}</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {[t("stepChoose"), t("stepWalk"), t("stepExperience")].map((step, index) => (
              <div key={step} className="flex gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">{index + 1}</span><p className="pt-1 text-sm leading-relaxed text-gray-600">{step}</p></div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-navy-800">{t("planMore")}</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Link href="/leiden-tours" className="rounded-2xl border border-gray-200 bg-white p-4 font-semibold text-navy-800 transition hover:border-orange-300">{t("allTours")} →</Link>
            <Link href="/leiden/things-to-do" className="rounded-2xl border border-gray-200 bg-white p-4 font-semibold text-navy-800 transition hover:border-orange-300">{t("thingsToDo")} →</Link>
            <Link href="/city-guide-leiden" className="rounded-2xl border border-gray-200 bg-white p-4 font-semibold text-navy-800 transition hover:border-orange-300">{t("cityGuide")} →</Link>
          </div>
        </section>

        <PremiumRouteBoundary slug={route.slug} />
      </main>
    </div>
  );
}
