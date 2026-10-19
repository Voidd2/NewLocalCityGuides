"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { affiliateOffers } from "@/data/affiliate-offers";
import { publicEntities, publicEntityPath, type PublicEntitySection } from "@/data/public-entities";
import type { Locale } from "@/i18n/config";

const copy = {
  nl: { title: "Activiteiten in Leiden", intro: "Ontdek bijzondere plekken op eigen tempo. Boekingen bij andere aanbieders staan los van de CityWalkStories-gids.", all: "Alle plekken", museums: "Musea", attractions: "Historische plekken", markets: "Markten", local: "Lokaal", read: "Ontdek deze plek", guide: "Bekijk onze stadsgids", partners: "Boekbare activiteiten van partners", disclosure: "Sommige links verwijzen naar partners. Als je via zo’n link boekt, kunnen wij een vergoeding ontvangen.", provider: "Bekijk bij de aanbieder" },
  en: { title: "Things to do in Leiden", intro: "Explore places at your own pace. Bookings with other providers are separate from the CityWalkStories guide.", all: "All places", museums: "Museums", attractions: "Historic places", markets: "Markets", local: "Local", read: "Discover this place", guide: "Explore our city guide", partners: "Bookable partner activities", disclosure: "Some links lead to partners. We may receive a commission when you book through them.", provider: "View with the provider" },
  de: { title: "Aktivitäten in Leiden", intro: "Entdecke besondere Orte in deinem Tempo. Buchungen bei anderen Anbietern sind vom CityWalkStories-Guide getrennt.", all: "Alle Orte", museums: "Museen", attractions: "Historische Orte", markets: "Märkte", local: "Lokal", read: "Ort entdecken", guide: "Unseren Stadtguide ansehen", partners: "Buchbare Partneraktivitäten", disclosure: "Einige Links führen zu Partnern. Bei einer Buchung können wir eine Vergütung erhalten.", provider: "Beim Anbieter ansehen" },
} satisfies Record<Locale, Record<string, string>>;

export function ActiviteitenPage() {
  const locale = useLocale() as Locale;
  const text = copy[locale];
  const [section, setSection] = useState<PublicEntitySection | "all">("all");
  const entities = useMemo(() => publicEntities.filter((entity) => section === "all" || entity.section === section), [section]);
  const filters: Array<{ key: PublicEntitySection | "all"; label: string }> = [
    { key: "all", label: text.all },
    { key: "attractions", label: text.attractions },
    { key: "museums", label: text.museums },
    { key: "markets", label: text.markets },
    { key: "local", label: text.local },
  ];

  return (
    <main className="pb-20">
      <header className="bg-navy-900 px-5 py-14 text-white md:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-widest text-orange-300">CityWalkStories · Leiden</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">{text.title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">{text.intro}</p>
          <Link href="/routes" className="cws-primary mt-7 inline-flex">{text.guide} <span aria-hidden="true">→</span></Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-10" aria-label={text.all}>
        <div className="mb-7 flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => <button key={filter.key} type="button" aria-pressed={section === filter.key} onClick={() => setSection(filter.key)} className={`min-h-11 shrink-0 rounded-full px-5 text-sm font-semibold ${section === filter.key ? "bg-navy-800 text-white" : "bg-warm-100 text-navy-800 hover:bg-warm-200"}`}>{filter.label}</button>)}
        </div>
        <p className="mb-5 text-sm text-gray-600" aria-live="polite">{entities.length} {text.all.toLowerCase()}</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {entities.map((entity) => <Link key={entity.key} href={publicEntityPath(entity)} className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg">
            <div className="relative aspect-[4/3] bg-warm-100">{entity.image && <Image src={entity.image} alt={entity.name} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />}</div>
            <div className="p-5"><p className="text-xs font-bold uppercase tracking-wide text-orange-700">{text[entity.section]}</p><h2 className="mt-2 text-xl font-bold text-navy-800">{entity.name}</h2><p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">{entity.intro[locale]}</p><span className="mt-5 inline-flex text-sm font-bold text-orange-700">{text.read} <span aria-hidden="true">→</span></span></div>
          </Link>)}
        </div>
      </section>

      {affiliateOffers.length > 0 && <section className="mx-auto max-w-7xl border-t border-gray-200 px-5 py-10">
        <h2 className="text-2xl font-bold text-navy-800">{text.partners}</h2>
        <p className="mt-2 max-w-2xl text-sm text-gray-600">{text.disclosure}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {affiliateOffers.map((offer) => <a key={offer.id} href={offer.destinationUrl} target="_blank" rel="sponsored noopener noreferrer" className="rounded-2xl border border-gray-200 bg-white p-5 hover:border-orange-300"><p className="text-xs font-semibold text-gray-500">{offer.provider}</p><h3 className="mt-2 font-bold text-navy-800">{offer.title[locale]}</h3><span className="mt-4 inline-flex text-sm font-bold text-orange-700">{text.provider} ↗</span></a>)}
        </div>
      </section>}
    </main>
  );
}
