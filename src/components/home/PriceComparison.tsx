"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { formatGuidePrice } from "@/lib/product";
import type { Locale } from "@/i18n/config";

const copy = {
  nl: { eyebrow: "Kies hoe je Leiden wilt ontdekken", free: "Zes gratis voorproefjes", freeDesc: "Bekijk een kleine selectie plekken. De volledige gids ontgrendelt alle verhalen, audio, navigatie en routes.", guide: "De complete stadsgids", guideDesc: "Voor alle plekken, samengestelde routes en volledige verhalen op locatie.", price: "Gidsprijs", caveat: "Online aankoop wordt nog ingericht.", freeCta: "Bekijk gratis voorproefjes", guideCta: "Bekijk gids en prijs" },
  en: { eyebrow: "Choose how you want to explore Leiden", free: "Six free previews", freeDesc: "See a small selection of places. The complete guide unlocks every story, audio, navigation and route.", guide: "The complete city guide", guideDesc: "For every place, curated routes and complete stories on location.", price: "Guide price", caveat: "Online checkout is being prepared.", freeCta: "View free previews", guideCta: "Explore guide and price" },
  de: { eyebrow: "Wähle, wie du Leiden entdecken möchtest", free: "Sechs kostenlose Vorschauen", freeDesc: "Entdecke eine kleine Auswahl an Orten. Der vollständige Guide schaltet alle Geschichten, Audio, Navigation und Routen frei.", guide: "Der vollständige Stadtguide", guideDesc: "Für alle Orte, kuratierte Routen und vollständige Geschichten vor Ort.", price: "Guide-Preis", caveat: "Die Online-Bezahlung wird vorbereitet.", freeCta: "Kostenlose Vorschauen ansehen", guideCta: "Guide und Preis ansehen" },
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
