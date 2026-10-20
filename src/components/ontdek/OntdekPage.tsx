"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { locations } from "@/data/locations";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/lib/auth-context";
import { publicEntities, publicEntityPath, publicPathForSpot } from "@/data/public-entities";
import { publicRoutePreviews } from "@/data/public-route-seo";
import { affiliateOffers } from "@/data/affiliate-offers";
import { formatGuidePrice } from "@/lib/product";
import {
  getVisibleSpots,
  getFeaturedSpots,
  SPOT_CATEGORIES,
  type SpotCategory,
  type LocalSpot,
} from "@/data/local-spots";

const categoryIcons: Record<SpotCategory, (active: boolean) => React.ReactNode> = {
  museum: (a) => (
    <svg viewBox="0 0 24 24" fill={a ? "currentColor" : "none"} className="w-4 h-4" stroke="currentColor" strokeWidth={a ? 0 : 1.5}>
      <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
    </svg>
  ),
  visboer: (a) => (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={a ? 2.5 : 1.5}>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
      <path d="M22 12l-4 2-4-4-4 4-4-2" />
    </svg>
  ),
  bakker: (a) => (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={a ? 2.5 : 1.5}>
      <path d="M12 2a7 7 0 017 7c0 3-2 5-3 7H8c-1-2-3-4-3-7a7 7 0 017-7zM8 16h8M9 20h6" />
    </svg>
  ),
  winkel: (a) => (
    <svg viewBox="0 0 24 24" fill={a ? "currentColor" : "none"} className="w-4 h-4" stroke="currentColor" strokeWidth={a ? 0 : 1.5}>
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
    </svg>
  ),
  markt: (a) => (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={a ? 2.5 : 1.5}>
      <path d="M3 3h18v4H3zM4 7v13a1 1 0 001 1h14a1 1 0 001-1V7M10 11h4" />
    </svg>
  ),
  evenement: (a) => (
    <svg viewBox="0 0 24 24" fill={a ? "currentColor" : "none"} className="w-4 h-4" stroke="currentColor" strokeWidth={a ? 0 : 1.5}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  restaurant: (a) => (
    <svg viewBox="0 0 24 24" fill={a ? "currentColor" : "none"} className="w-4 h-4" stroke="currentColor" strokeWidth={a ? 0 : 1.5}>
      <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
    </svg>
  ),
  kroeg: (a) => (
    <svg viewBox="0 0 24 24" fill={a ? "currentColor" : "none"} className="w-4 h-4" stroke="currentColor" strokeWidth={a ? 0 : 1.5}>
      <path d="M8 2h8l-1 7H9L8 2zM12 9v8M8 21h8M12 17c-4 0-6-2-6-2M12 17c4 0 6-2 6-2" />
    </svg>
  ),
};

const fallbackImagesByCategory: Record<SpotCategory, readonly string[]> = {
  museum: [
    "/images/locations/10033-academiegebouw-leiden.jpg",
    "/images/locations/10025-pieterskerk-leiden.jpg",
    "/images/locations/10029-hortus-botanicus-leiden.jpg",
    "/images/locations/10024-gravensteen-leiden.jpg",
  ],
  visboer: ["/images/locations/10021-vismarkt-leiden.jpg", "/images/locations/10022-koornbrug-leiden.jpg"],
  bakker: ["/images/routes/10003-leiden-narrow-street-centre.jpg", "/images/heroes/10001-leiden-canal-historic-buildings.jpg"],
  winkel: ["/images/locations/10022-koornbrug-leiden.jpg", "/images/routes/10003-leiden-narrow-street-centre.jpg", "/images/locations/10027-jean-pesijnhofje.jpg"],
  markt: ["/images/locations/10021-vismarkt-leiden.jpg", "/images/locations/10022-koornbrug-leiden.jpg", "/images/heroes/10001-leiden-canal-historic-buildings.jpg"],
  evenement: ["/images/heroes/10001-leiden-canal-historic-buildings.jpg", "/images/heroes/10008-leiden-canal-panorama.jpg", "/images/routes/10004-leiden-singel-cyclist.jpg"],
  restaurant: ["/images/locations/10020-de-burcht-leiden.jpg", "/images/routes/10003-leiden-narrow-street-centre.jpg", "/images/locations/10022-koornbrug-leiden.jpg"],
  kroeg: ["/images/heroes/10008-leiden-canal-panorama.jpg", "/images/heroes/10001-leiden-canal-historic-buildings.jpg", "/images/routes/10002-leiden-canal-pieterskerk.jpg", "/images/locations/10024-gravensteen-leiden.jpg"],
};

function fallbackImage(spot: LocalSpot) {
  const choices = fallbackImagesByCategory[spot.category];
  const index = [...spot.id].reduce((sum, character) => sum + character.charCodeAt(0), 0) % choices.length;
  return choices[index];
}

function spotImage(spot: LocalSpot) {
  const entityImage = publicEntities.find(entity => publicEntityPath(entity) === publicPathForSpot(spot))?.image;
  const namedPlace = locations.find(place =>
    ["L001", "L003", "L006", "L010"].includes(place.id) &&
    spot.name.toLowerCase().includes(place.name.toLowerCase().replace(" van leiden", "").replace("de burcht", "burcht").replace("hortus botanicus", "hortus")),
  );
  return spot.image || entityImage || namedPlace?.image || fallbackImage(spot);
}

function SpotCard({ spot, locale, href }: { spot: LocalSpot; locale: string; href: string }) {
  const lang = locale as "nl" | "en" | "de";
  const desc = spot.description[lang] || spot.description.nl;
  const photo = spotImage(spot);
  const t = useTranslations("discover");

  return (
    <Link href={href} className="block bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="relative aspect-[16/10] overflow-hidden bg-warm-100"><Image src={photo} alt={spot.name} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-950/35 to-transparent" /></div>

      <div className="p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-orange-700">{SPOT_CATEGORIES.find(cat => cat.key === spot.category)?.label[lang]}</p>
        <h3 className="font-bold text-navy-800 text-base leading-tight mb-1">
          {spot.name}
        </h3>

        <p className="text-sm text-gray-500 line-clamp-2 mb-3">{desc}</p>

        <p className="mb-3 text-xs text-gray-500">{spot.address}</p>
        <span className="mb-3 inline-block text-sm font-bold text-orange-700">{t("moreInfo")} →</span>
      </div>
    </Link>
  );
}

function LockedSpotCard({ spot }: { spot: LocalSpot }) {
  return (
    <div aria-hidden="true" className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="relative aspect-[16/10] overflow-hidden bg-warm-100"><Image src={spotImage(spot)} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="scale-110 object-cover blur-md" /><div className="absolute inset-0 bg-navy-950/20" /></div>
      <div className="space-y-3 p-4"><div className="h-3 w-20 rounded bg-orange-100" /><div className="h-5 w-4/5 rounded bg-gray-200" /><div className="h-4 w-full rounded bg-gray-100" /><div className="h-4 w-2/3 rounded bg-gray-100" /></div>
    </div>
  );
}

function FeaturedCard({ spot, locale, t, href }: { spot: LocalSpot; locale: string; t: (key: string) => string; href: string }) {
  const lang = locale as "nl" | "en" | "de";
  const desc = spot.description[lang] || spot.description.nl;
  const catLabel = SPOT_CATEGORIES.find((c) => c.key === spot.category)?.label[lang] || spot.category;
  return (
    <Link href={href} className="shrink-0 w-[280px] bg-gradient-to-br from-navy-800 to-navy-900 rounded-xl overflow-hidden text-white snap-start block group">
      <div className="aspect-[16/9] overflow-hidden relative"><Image src={spotImage(spot)} alt={spot.name} fill sizes="280px" className="object-cover transition-transform duration-500 group-hover:scale-105" /></div>
      <span className="mx-4 mt-4 inline-block rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-navy-900">{catLabel}</span>
      <div className="p-3">
        <h3 className="font-bold text-sm leading-tight line-clamp-1">{spot.name}</h3>
        <p className="text-[11px] text-white/60 mt-1 line-clamp-2">{desc}</p>

        <span className="mt-2 inline-flex items-center gap-1 text-xs text-orange-400 font-semibold">
          {t("moreInfo")}
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export function OntdekPage() {
  const locale = useLocale() as "nl" | "en" | "de";
  const t = useTranslations("discover");
  const tAct = useTranslations("activities");
  const tHome = useTranslations("home");
  const { hasPaid, isLoading } = useAuth();
  const [activeCategory, setActiveCategory] = useState<SpotCategory | "alle">("alle");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"editorial" | "name">("editorial");
  const copy = locale === "nl" ? {
    heroTag: "Gratis stadsgids · 49 plekken", heroCta: "Bekijk de complete gids", heroNote: "Routes met GPS, audio en verborgen verhalen",
    guideTag: "Meer dan een lijst met plekken", guideTitle: "Wandel Leiden binnen met de complete gids", guideText: "Krijg drie samengestelde routes, navigatie van stop naar stop en de verhalen die je op straat niet ziet.", guideCta: "Bekijk gids en prijs", guideMeta: "Eenmalig · direct op je telefoon",
  } : locale === "de" ? {
    heroTag: "Kostenloser Stadtführer · 49 Orte", heroCta: "Kompletten Guide ansehen", heroNote: "Routen mit GPS, Audio und verborgenen Geschichten",
    guideTag: "Mehr als eine Ortsliste", guideTitle: "Entdecke Leiden mit dem kompletten Guide", guideText: "Drei kuratierte Routen, Navigation von Stopp zu Stopp und Geschichten, die du auf der Straße nicht siehst.", guideCta: "Guide und Preis ansehen", guideMeta: "Einmalig · direkt auf deinem Telefon",
  } : {
    heroTag: "Free city guide · 49 places", heroCta: "Explore the complete guide", heroNote: "Routes with GPS, audio and hidden stories",
    guideTag: "More than a list of places", guideTitle: "Step into Leiden with the complete guide", guideText: "Get three curated routes, turn-by-turn navigation and stories you will not see from the street.", guideCta: "View guide and price", guideMeta: "One-time purchase · on your phone instantly",
  };

  useEffect(() => {
    const syncFilters = () => {
      const params = new URLSearchParams(window.location.search);
      const category = params.get("category");
      setActiveCategory(category && SPOT_CATEGORIES.some((item) => item.key === category) ? category as SpotCategory | "alle" : "alle");
      setSearchQuery(params.get("q") ?? "");
      setSortOrder(params.get("sort") === "name" ? "name" : "editorial");
    };
    syncFilters();
    window.addEventListener("popstate", syncFilters);
    return () => window.removeEventListener("popstate", syncFilters);
  }, []);

  const updateQuery = (changes: { category?: string; q?: string; sort?: string }) => {
    const url = new URL(window.location.href);
    for (const [key, value] of Object.entries(changes)) {
      if (value && value !== "alle" && value !== "editorial") url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    }
    window.history.pushState(null, "", url);
  };

  const visibleSpots = useMemo(() => getVisibleSpots(), []);
  const featuredSpots = useMemo(() => {
    const candidates = getFeaturedSpots();
    const selected: LocalSpot[] = [];
    const categories = new Set<string>();
    let fishShopShown = false;
    for (const spot of candidates) {
      if (spot.category === "visboer" && fishShopShown) continue;
      if (categories.has(spot.category) && selected.length < 4) continue;
      selected.push(spot);
      categories.add(spot.category);
      if (spot.category === "visboer") fishShopShown = true;
      if (selected.length === 6) break;
    }
    return selected;
  }, []);

  const filtered = useMemo(() => {
    const query = searchQuery.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    const matches = visibleSpots.filter((spot) => {
      if (activeCategory !== "alle" && spot.category !== activeCategory) return false;
      if (!query) return true;
      const haystack = [spot.name, spot.address, spot.description[locale], ...spot.tags].join(" ").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      return haystack.includes(query);
    });
    return sortOrder === "name" ? matches.sort((a, b) => a.name.localeCompare(b.name, locale)) : matches;
  }, [activeCategory, visibleSpots, searchQuery, sortOrder, locale]);
  const publicPreviewCount = 6;
  const visibleCards = hasPaid ? filtered : filtered.slice(0, publicPreviewCount);
  const lockedCards = hasPaid ? [] : filtered.slice(publicPreviewCount, publicPreviewCount + 3);
  const spotHref = (spot: LocalSpot) => hasPaid ? publicPathForSpot(spot) : "/pricing";

  return (
    <div>
      <section className="relative min-h-[500px] overflow-hidden md:min-h-[580px]">
        <Image src="/images/heroes/10008-leiden-canal-panorama.jpg" alt={tHome("heroImageAlt")} fill priority sizes="100vw" className="object-cover" />
        <div className="relative flex min-h-[500px] items-center bg-gradient-to-r from-navy-950/95 via-navy-900/80 to-navy-900/45 text-white px-5 py-14 md:min-h-[580px] md:py-24">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">{copy.heroTag}</p>
            <h1 className="mt-3 max-w-3xl text-4xl md:text-6xl font-bold leading-tight">{t("title")}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/80 md:text-lg">{t("subtitle")}</p>
            {hasPaid && !isLoading ? <div className="mt-8 flex max-w-2xl items-center rounded-2xl border border-white/30 bg-white p-2 text-navy-800 shadow-xl">
              <label htmlFor="discover-search" className="sr-only">{locale === "nl" ? "Zoek een plek in Leiden" : locale === "de" ? "Ort in Leiden suchen" : "Search places in Leiden"}</label>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="ml-3 h-5 w-5 shrink-0 text-gray-500"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>
              <input id="discover-search" type="search" value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value); updateQuery({ q: event.target.value }); }} placeholder={locale === "nl" ? "Zoek plekken, buurten of interesses" : locale === "de" ? "Orte, Viertel oder Interessen suchen" : "Search places, neighbourhoods or interests"} className="min-h-11 min-w-0 flex-1 px-3 text-sm outline-none" />
              <Link href="/map" className="shrink-0 rounded-xl bg-navy-800 px-4 py-3 text-sm font-semibold text-white hover:bg-navy-900">{locale === "nl" ? "Kaart" : locale === "de" ? "Karte" : "Map"}</Link>
            </div> : <div className="mt-8 max-w-2xl rounded-2xl border border-white/20 bg-white/10 p-5 text-sm leading-6 text-white/85 backdrop-blur-sm">{locale === "nl" ? "Bekijk zes zorgvuldig gekozen voorproefjes. Met de gids ontgrendel je alle plekken, volledige verhalen, audio en navigatie." : locale === "de" ? "Entdecke sechs sorgfältig ausgewählte Vorschauen. Der Guide schaltet alle Orte, vollständige Geschichten, Audio und Navigation frei." : "Discover six carefully chosen previews. The guide unlocks every place, complete stories, audio and navigation."}</div>}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link href="/pricing" className="inline-flex min-h-12 items-center rounded-full bg-orange-500 px-6 text-sm font-bold text-white shadow-lg shadow-orange-950/30 transition hover:bg-orange-400">{copy.heroCta} <span className="ml-2" aria-hidden="true">→</span></Link>
              <p className="text-sm font-medium text-white/80">✓ {copy.heroNote}</p>
            </div>
          </div>
        </div>
      </section>

      {featuredSpots.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 mt-8 mb-8 relative z-10">
          <h2 className="text-xs font-semibold text-navy-800 uppercase tracking-wider mb-3">
            {t("featured")}
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
            {featuredSpots.map((spot) => (
              <FeaturedCard key={spot.id} spot={spot} locale={locale} t={t} href={spotHref(spot)} />
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 pb-10">
        <div className="overflow-hidden rounded-3xl bg-navy-900 text-white shadow-xl">
          <div className="grid md:grid-cols-[1.05fr_.95fr]">
            <div className="p-7 sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-300">{copy.guideTag}</p>
              <h2 className="mt-3 max-w-xl text-3xl font-bold leading-tight">{copy.guideTitle}</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/75">{copy.guideText}</p>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Link href="/pricing" className="inline-flex min-h-12 items-center rounded-full bg-orange-500 px-6 text-sm font-bold text-white transition hover:bg-orange-400">{copy.guideCta} <span className="ml-2" aria-hidden="true">→</span></Link>
                <span className="text-sm font-medium text-white/65">{copy.guideMeta}</span>
              </div>
            </div>
            <div className="relative min-h-64"><Image src="/images/routes/10002-leiden-canal-pieterskerk.jpg" alt="Historische wandeling door Leiden" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent" /><div className="absolute bottom-5 left-5 rounded-2xl bg-white/95 px-4 py-3 text-navy-800 shadow-lg"><p className="text-xs font-bold text-orange-700">CityWalkStories</p><p className="mt-1 text-sm font-bold">{formatGuidePrice(locale)}</p></div></div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 mb-6">
        {hasPaid && <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide">
          {SPOT_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.key;
            const icon = cat.key !== "alle" ? categoryIcons[cat.key as SpotCategory] : null;
            return (
              <button
                key={cat.key}
                onClick={() => { setActiveCategory(cat.key); updateQuery({ category: cat.key }); }}
                aria-pressed={isActive}
                className={`shrink-0 flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full transition-colors ${
                  isActive
                    ? "bg-navy-800 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {icon && icon(isActive)}
                {cat.label[locale]}
              </button>
            );
          })}
        </div>}

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600" aria-live="polite">
            {hasPaid ? filtered.length : `${Math.min(publicPreviewCount, filtered.length)} ${locale === "nl" ? "gratis voorproefjes" : locale === "de" ? "kostenlose Vorschauen" : "free previews"}`}
          </p>
          {hasPaid && <label className="text-sm text-gray-600">{locale === "nl" ? "Sorteer" : locale === "de" ? "Sortieren" : "Sort"} <select value={sortOrder} onChange={(event) => { const value = event.target.value as "editorial" | "name"; setSortOrder(value); updateQuery({ sort: value }); }} className="ml-2 rounded-lg border border-gray-300 bg-white px-2 py-2 text-navy-800"><option value="editorial">{locale === "nl" ? "Aanbevolen" : locale === "de" ? "Empfohlen" : "Recommended"}</option><option value="name">A–Z</option></select></label>}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-gray-400">{t("noResults")}</p>
            <button type="button" onClick={() => { setActiveCategory("alle"); setSearchQuery(""); setSortOrder("editorial"); updateQuery({ category: "", q: "", sort: "" }); }} className="mt-4 rounded-full border border-navy-800 px-5 py-2 text-sm font-semibold text-navy-800">{locale === "nl" ? "Wis filters" : locale === "de" ? "Filter zurücksetzen" : "Clear filters"}</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
            {visibleCards.map((spot) => (
              <SpotCard key={spot.id} spot={spot} locale={locale} href={spotHref(spot)} />
            ))}
          </div>
        )}
        {!hasPaid && lockedCards.length > 0 && <div className="relative mt-5"><div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">{lockedCards.map((spot) => <LockedSpotCard key={spot.id} spot={spot} />)}</div><div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/25 px-4 backdrop-blur-[1px]"><div className="max-w-sm rounded-2xl bg-navy-900 px-6 py-5 text-center text-white shadow-2xl"><p className="text-base font-extrabold">{locale === "nl" ? `Ontgrendel alle ${filtered.length} plekken` : locale === "de" ? `Alle ${filtered.length} Orte freischalten` : `Unlock all ${filtered.length} places`}</p><p className="mt-2 text-sm text-white/70">{locale === "nl" ? "Inclusief volledige verhalen, audio, GPS en samengestelde routes." : locale === "de" ? "Mit vollständigen Geschichten, Audio, GPS und kuratierten Routen." : "Including complete stories, audio, GPS and curated routes."}</p><Link href="/pricing" className="mt-4 inline-flex min-h-11 items-center rounded-full bg-orange-500 px-5 text-sm font-bold text-white hover:bg-orange-600">{copy.heroCta} →</Link></div></div></div>}
      </section>

      <section className="bg-navy-900 py-12 text-white md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">CityWalkStories-gids · Leiden</p>
          <h2 className="mt-3 text-3xl font-bold">{locale === "nl" ? "Wandel verder met een verhaal" : locale === "de" ? "Entdecke die Stadt mit einer Geschichte" : "Take the story with you"}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">{locale === "nl" ? "Bekijk de openbare routevoorbeelden. De volledige begeleide verhalen en routevolgorde zijn onderdeel van de stadsgids." : locale === "de" ? "Sieh dir die öffentlichen Routenvorschauen an. Die vollständigen Geschichten und die geführte Route gehören zum Stadtguide." : "Explore public route previews. Complete stories and guided route details are part of the city guide."}</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {publicRoutePreviews.map((route) => <Link key={route.slug} href={`/routes/${route.slug}`} className="group overflow-hidden rounded-2xl bg-white text-navy-800 shadow-lg"><div className="relative aspect-[3/2]"><Image src={route.image} alt={route.copy[locale].title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-300 group-hover:scale-105" /></div><div className="p-5"><p className="text-xs font-bold uppercase tracking-wide text-orange-700">{route.type === "walking" ? (locale === "nl" ? "Wandeling" : locale === "de" ? "Spaziergang" : "Walking route") : (locale === "nl" ? "Fietsroute" : locale === "de" ? "Radtour" : "Cycling route")}</p><h3 className="mt-2 text-xl font-bold">{route.copy[locale].title}</h3><p className="mt-2 line-clamp-2 text-sm text-gray-600">{route.copy[locale].subtitle}</p><p className="mt-4 text-xs font-medium text-gray-500">{route.distance} · {route.duration[locale]}</p><span className="mt-5 inline-flex text-sm font-bold text-orange-700">{locale === "nl" ? "Bekijk routevoorbeeld" : locale === "de" ? "Routenvorschau ansehen" : "View route preview"} →</span></div></Link>)}
          </div>
          <p className="mt-6 text-sm text-white/75">{locale === "nl" ? "Gidsprijs" : locale === "de" ? "Guide-Preis" : "Guide price"}: <strong className="text-orange-300">{formatGuidePrice(locale)}</strong></p>
        </div>
      </section>

      {affiliateOffers.length > 0 && <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-bold text-navy-800">{locale === "nl" ? "Boekbare activiteiten van partners" : locale === "de" ? "Buchbare Partneraktivitäten" : "Bookable partner activities"}</h2>
        <p className="mt-2 max-w-2xl text-sm text-gray-600">{locale === "nl" ? "Sommige links verwijzen naar partners. Bij een boeking kunnen wij een vergoeding ontvangen." : locale === "de" ? "Einige Links führen zu Partnern. Bei einer Buchung können wir eine Vergütung erhalten." : "Some links lead to partners. We may receive a commission when you book through them."}</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{affiliateOffers.map((offer) => <a key={offer.id} href={offer.destinationUrl} target="_blank" rel="sponsored noopener noreferrer" className="rounded-2xl border border-gray-200 bg-white p-5 hover:border-orange-300"><p className="text-xs text-gray-500">{offer.provider}</p><h3 className="mt-2 font-bold text-navy-800">{offer.title[locale]}</h3><span className="mt-4 inline-block text-sm font-bold text-orange-700">{locale === "nl" ? "Bekijk bij de aanbieder" : locale === "de" ? "Beim Anbieter ansehen" : "View with provider"} ↗</span></a>)}</div>
      </section>}

      <section className="max-w-7xl mx-auto px-4 mb-6">
        <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-2 border-orange-200 rounded-2xl p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-orange-500/20">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
          </div>
          <h3 className="font-bold text-navy-800 text-lg mb-1">{t("planDay")}</h3>
          <p className="text-sm text-gray-600 mb-4">{t("planDayDesc")}</p>
          <Link
            href="/routes/custom"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors shadow-lg shadow-orange-500/25"
          >
            {tHome("createRoute")}
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 mb-8">
        <Link
          href="/activiteiten/hulp"
          className="block bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl p-5 hover:border-orange-400 transition-colors"
        >
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-navy-800 text-sm mb-1">{tAct("dontKnowWhat")}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {tAct("wePlanYourDay")}
              </p>
              <span className="inline-flex items-center gap-1 mt-2 text-orange-600 text-xs font-semibold">
                {tAct("askPersonalHelp")}
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
          </div>
        </Link>
      </section>

      <div className="h-20" />
    </div>
  );
}
