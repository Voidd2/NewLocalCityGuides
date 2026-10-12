"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { formatGuidePrice } from "@/lib/product";
import type { Locale } from "@/i18n/config";

const copy = {
  nl: { eyebrow: "Twee manieren om Leiden te ontdekken", free: "Ontdek de stad gratis", freeDesc: "Bekijk historische plekken, musea en lokale adressen. Lees korte introducties en plan je bezoek.", guide: "De complete stadsgids", guideDesc: "Voor de samengestelde routes en volledige verhalen op locatie.", price: "Gidsprijs", caveat: "Online aankoop wordt nog ingericht.", freeCta: "Bekijk alle plekken", guideCta: "Bekijk gids en prijs" },
  en: { eyebrow: "Two ways to explore Leiden", free: "Discover the city for free", freeDesc: "Browse historic places, museums and local addresses. Read short introductions and plan your visit.", guide: "The complete city guide", guideDesc: "For curated routes and full stories on location.", price: "Guide price", caveat: "Online checkout is being prepared.", freeCta: "Explore all places", guideCta: "Explore guide and price" },
  de: { eyebrow: "Zwei Wege, Leiden zu entdecken", free: "Die Stadt kostenlos entdecken", freeDesc: "Entdecke historische Orte, Museen und lokale Adressen. Lies kurze Einführungen und plane deinen Besuch.", guide: "Der vollständige Stadtguide", guideDesc: "Für kuratierte Routen und vollständige Geschichten vor Ort.", price: "Guide-Preis", caveat: "Die Online-Bezahlung wird vorbereitet.", freeCta: "Alle Orte ansehen", guideCta: "Guide und Preis ansehen" },
} satisfies Record<Locale, Record<string, string>>;

export function PriceComparison() {
  const locale = useLocale() as Locale;
  const t = copy[locale];
  return <section className="mx-auto max-w-7xl px-4 py-14">
    <p className="mb-6 text-center text-xs font-bold uppercase tracking-[0.2em] text-orange-700">{t.eyebrow}</p>
    <div className="grid gap-5 md:grid-cols-2">
      <div className="rounded-3xl border border-gray-200 bg-white p-7 md:p-9"><p className="text-sm font-semibold text-teal-700">CityWalkStories · Leiden</p><h2 className="mt-3 text-2xl font-bold text-navy-800">{t.free}</h2><p className="mt-4 max-w-lg text-sm leading-7 text-gray-600">{t.freeDesc}</p><Link href="/ontdek" className="mt-7 inline-flex min-h-11 items-center rounded-full border border-navy-800 px-6 text-sm font-bold text-navy-800 hover:bg-navy-800 hover:text-white">{t.freeCta} <span aria-hidden="true" className="ml-2">→</span></Link></div>
      <div className="rounded-3xl bg-navy-900 p-7 text-white md:p-9"><p className="text-sm font-semibold text-orange-300">{t.price}</p><h2 className="mt-3 text-2xl font-bold">{t.guide}</h2><p className="mt-3 text-4xl font-extrabold text-orange-300">{formatGuidePrice(locale)}</p><p className="mt-4 max-w-lg text-sm leading-7 text-white/75">{t.guideDesc}</p><p className="mt-3 text-xs text-white/65">{t.caveat}</p><Link href="/pricing" className="cws-primary mt-7 inline-flex">{t.guideCta} <span aria-hidden="true" className="ml-2">→</span></Link></div>
    </div>
  </section>;
}
