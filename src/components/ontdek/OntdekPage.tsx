"use client";

import { useState, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/lib/auth-context";
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
};

function SpotCard({ spot, locale, t }: { spot: LocalSpot; locale: string; t: (key: string) => string }) {
  const lang = locale as "nl" | "en" | "de";
  const desc = spot.description[lang] || spot.description.nl;

  return (
    <Link href={`/ontdek/${spot.id}`} className="block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-navy-800 text-sm leading-tight line-clamp-1">
              {spot.name}
            </h3>
            <p className="text-[11px] text-gray-400 mt-0.5">
              {spot.address}
            </p>
          </div>
          {spot.rating && (
            <div className="flex items-center gap-1 shrink-0 bg-amber-50 px-2 py-0.5 rounded-full">
              <svg viewBox="0 0 20 20" fill="#F59E0B" className="w-3.5 h-3.5">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs font-semibold text-amber-700">{spot.rating}</span>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-500 line-clamp-2 mb-3">{desc}</p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {spot.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {spot.priceRange && (
              <span className="text-xs text-gray-400">{spot.priceRange}</span>
            )}
            {spot.visitDuration && (
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                </svg>
                {spot.visitDuration}
              </span>
            )}
          </div>
          {spot.kidFriendly === true && (
            <span className="text-[10px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded-full font-medium">
              {t("kidFriendly")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

function FeaturedCard({ spot, locale, t }: { spot: LocalSpot; locale: string; t: (key: string) => string }) {
  const lang = locale as "nl" | "en" | "de";
  const desc = spot.description[lang] || spot.description.nl;
  const catLabel = SPOT_CATEGORIES.find((c) => c.key === spot.category)?.label[lang] || spot.category;

  return (
    <Link href={`/ontdek/${spot.id}`} className="shrink-0 w-[260px] bg-gradient-to-br from-navy-800 to-navy-900 rounded-xl overflow-hidden text-white snap-start block">
      <div className="p-4">
        <span className="text-[10px] font-semibold bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded-full">
          {catLabel}
        </span>
        <h3 className="font-bold text-sm mt-2 leading-tight line-clamp-1">{spot.name}</h3>
        <p className="text-[11px] text-white/60 mt-1 line-clamp-2">{desc}</p>
        <div className="flex items-center gap-2 mt-3">
          {spot.rating && (
            <div className="flex items-center gap-1">
              <svg viewBox="0 0 20 20" fill="#F59E0B" className="w-3.5 h-3.5">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs font-semibold">{spot.rating}</span>
            </div>
          )}
          {spot.priceRange && (
            <span className="text-[11px] text-white/50">{spot.priceRange}</span>
          )}
        </div>
        <span className="mt-3 inline-flex items-center gap-1 text-xs text-orange-400 font-semibold">
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
  const { hasPaid, isLoading } = useAuth();
  const locale = useLocale() as "nl" | "en" | "de";
  const t = useTranslations("discover");
  const tHome = useTranslations("home");
  const [activeCategory, setActiveCategory] = useState<SpotCategory | "alle">("alle");

  const visibleSpots = useMemo(() => getVisibleSpots(), []);
  const featuredSpots = useMemo(() => getFeaturedSpots(), []);

  const filtered = useMemo(() => {
    if (activeCategory === "alle") return visibleSpots;
    return visibleSpots.filter((s) => s.category === activeCategory);
  }, [activeCategory, visibleSpots]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="animate-pulse text-gray-400">{tHome("loading")}</div>
      </div>
    );
  }

  if (!hasPaid) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
          <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-orange-500" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-navy-800 mb-2">{t("unlock")}</h2>
        <p className="text-sm text-gray-500 mb-4">{t("unlockDesc")}</p>
        <Link
          href="/pricing"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
        >
          {t("viewPackage")}
        </Link>
      </div>
    );
  }

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-b from-navy-800 to-navy-900 text-white px-4 py-8 pb-10">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{t("title")}</h1>
            <p className="text-white/70 text-sm">{t("subtitle")}</p>
          </div>
        </div>
      </section>

      {featuredSpots.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 -mt-5 mb-6 relative z-10">
          <h2 className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-3">
            {t("featured")}
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
            {featuredSpots.map((spot) => (
              <FeaturedCard key={spot.id} spot={spot} locale={locale} t={t} />
            ))}
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-4 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide">
          {SPOT_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.key;
            const icon = cat.key !== "alle" ? categoryIcons[cat.key as SpotCategory] : null;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
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
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-gray-400">
            {filtered.length} {t("results")}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-gray-400">{t("noResults")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((spot) => (
              <SpotCard key={spot.id} spot={spot} locale={locale} t={t} />
            ))}
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 mb-8">
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

      <div className="h-20" />
    </div>
  );
}
