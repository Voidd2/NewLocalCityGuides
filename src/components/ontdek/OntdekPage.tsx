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

interface Activity {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  rating: number;
  reviewCount: number;
  image: string | null;
  affiliateUrl: string;
  category: "rondvaart" | "wandeltour" | "fietstour" | "museum" | "overig";
}

const activities: Activity[] = [
  {
    id: "stadsrondvaart",
    title: "Leiden: Stadsrondvaart met gids",
    description: "Ontdek Leiden vanaf het water met een begeleide grachtenrondvaart. Zie het historische stadscentrum en dwaal langs eeuwenoude grachten.",
    duration: "1 uur",
    price: "12,50",
    rating: 4.5,
    reviewCount: 989,
    image: null,
    affiliateUrl: "https://www.getyourguide.com/leiden-l1076/",
    category: "rondvaart",
  },
  {
    id: "historische-rondvaart",
    title: "Leiden: Rondvaart door de historische binnenstad met gids",
    description: "Verken de mooiste bezienswaardigheden van Leiden tijdens een rondleiding. Ervaar het stadscentrum met zijn schilderachtige grachten.",
    duration: "50 minuten",
    price: "13,50",
    rating: 4.5,
    reviewCount: 738,
    image: null,
    affiliateUrl: "https://www.getyourguide.com/leiden-l1076/",
    category: "rondvaart",
  },
  {
    id: "elektrische-boot",
    title: "Leiden: Elektrische Bootverhuur",
    description: "Wees je eigen kapitein en ontdek Leiden vanaf het water met 8 personen op een elektrische sloep. Geen vaarbewijs nodig.",
    duration: "2 uur",
    price: "120,00",
    rating: 5,
    reviewCount: 218,
    image: null,
    affiliateUrl: "https://www.getyourguide.com/leiden-l1076/",
    category: "rondvaart",
  },
  {
    id: "stadswandeling",
    title: "De mooiste stadswandeling met gids in Leiden",
    description: "Ontdek plaatsen die je niet in een reisgids vindt. Wandel door het historische centrum met een lokale gids.",
    duration: "2 uur",
    price: "24,00",
    rating: 4.5,
    reviewCount: 25,
    image: null,
    affiliateUrl: "https://www.getyourguide.com/leiden-l1076/",
    category: "wandeltour",
  },
  {
    id: "molen-rondvaart",
    title: "Leiden: Molen- en Plattelandsrondvaart bij Keukenhof",
    description: "Maak een schilderachtige molenrondvaart door het platteland van Leiden, op slechts 10 minuten van de Keukenhof.",
    duration: "1 uur",
    price: "19,50",
    rating: 4.5,
    reviewCount: 240,
    image: null,
    affiliateUrl: "https://www.getyourguide.com/leiden-l1076/",
    category: "rondvaart",
  },
  {
    id: "hortus-botanicus",
    title: "Leiden: toegangsbewijs voor de Hortus Botanicus Leiden",
    description: "Ontdek de oudste botanische tuin van Nederland met dit toegangsbewijs. Wandel door de Hortus Botanicus.",
    duration: "-",
    price: "14,00",
    rating: 4,
    reviewCount: 114,
    image: null,
    affiliateUrl: "https://www.getyourguide.com/leiden-l1076/",
    category: "museum",
  },
  {
    id: "rembrandt-wandeltour",
    title: "Leiden: wandeltour met gids en toegang tot Rembrandt Studio",
    description: "Dit is de enige stadswandeling in Leiden met een gids in Nederland die je kunt combineren met een bezoek aan het Rembrandt atelier.",
    duration: "1 uur 30 minuten",
    price: "74,00",
    rating: 5,
    reviewCount: 1,
    image: null,
    affiliateUrl: "https://www.getyourguide.com/leiden-l1076/",
    category: "wandeltour",
  },
  {
    id: "space-expo",
    title: "Noordwijk: toegangsbewijs voor de Space Expo",
    description: "Bij Space Expo ontdek je de wereld van de ruimtevaart in al zijn facetten. Perfect voor gezinnen.",
    duration: "-",
    price: "18,50",
    rating: 4.5,
    reviewCount: 90,
    image: null,
    affiliateUrl: "https://www.getyourguide.com/leiden-l1076/",
    category: "museum",
  },
];

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

function StarRating({ rating, count }: { rating: number; count?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            viewBox="0 0 20 20"
            fill={star <= rating ? "#F59E0B" : star - 0.5 <= rating ? "url(#half)" : "#E5E7EB"}
            className="w-4 h-4"
          >
            <defs>
              <linearGradient id="half">
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="50%" stopColor="#E5E7EB" />
              </linearGradient>
            </defs>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      {count != null && count > 0 && <span className="text-xs text-gray-500">({count})</span>}
      <span className="text-xs font-medium text-gray-500">{rating}</span>
    </div>
  );
}

function ActivityCard({ activity, t }: { activity: Activity; t: (key: string) => string }) {
  return (
    <a
      href={activity.affiliateUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group"
    >
      <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
        {activity.image ? (
          <img src={activity.image} alt={activity.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-navy-800 to-navy-900 flex flex-col items-center justify-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-white/15" stroke="currentColor" strokeWidth="1">
              <rect x="2" y="2" width="20" height="20" rx="3" />
              <circle cx="8" cy="8" r="2" />
              <path d="M2 16l5-5 3 3 4-4 8 8" />
            </svg>
            <p className="text-[10px] text-white/20 font-medium px-4 text-center">--HIER IMAGE VAN {activity.title}--</p>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-bold text-navy-800 text-base leading-tight mb-2">
          {activity.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">{activity.description}</p>

        <StarRating rating={activity.rating} count={activity.reviewCount} />

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-3">
            {activity.duration !== "-" && (
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                </svg>
                {activity.duration}
              </span>
            )}
          </div>
          <span className="text-sm font-bold text-navy-800">{t("from")} &euro;{activity.price}</span>
        </div>
      </div>
    </a>
  );
}

function SpotCard({ spot, locale }: { spot: LocalSpot; locale: string }) {
  const lang = locale as "nl" | "en" | "de";
  const desc = spot.description[lang] || spot.description.nl;

  return (
    <Link href={`/ontdek/${spot.id}`} className="block bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
        {spot.image ? (
          <img src={spot.image} alt={spot.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-navy-800 to-navy-900 flex flex-col items-center justify-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-white/15" stroke="currentColor" strokeWidth="1">
              <rect x="2" y="2" width="20" height="20" rx="3" />
              <circle cx="8" cy="8" r="2" />
              <path d="M2 16l5-5 3 3 4-4 8 8" />
            </svg>
            <p className="text-[10px] text-white/20 font-medium px-4 text-center">--HIER IMAGE VAN {spot.name}--</p>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-bold text-navy-800 text-base leading-tight mb-1">
          {spot.name}
        </h3>

        <p className="text-sm text-gray-500 line-clamp-2 mb-3">{desc}</p>

        {spot.priceRange && (
          <p className="text-sm font-bold text-navy-800 mb-3">
            &euro;{spot.priceRange}
          </p>
        )}

        {spot.rating && (
          <StarRating rating={spot.rating} count={0} />
        )}
      </div>
    </Link>
  );
}

function getTodayHours(hours?: string[]): string | null {
  if (!hours || hours.length !== 7) return null;
  const day = new Date().getDay();
  const idx = day === 0 ? 6 : day - 1;
  return hours[idx] || null;
}

function FeaturedCard({ spot, locale, t }: { spot: LocalSpot; locale: string; t: (key: string) => string }) {
  const lang = locale as "nl" | "en" | "de";
  const desc = spot.description[lang] || spot.description.nl;
  const catLabel = SPOT_CATEGORIES.find((c) => c.key === spot.category)?.label[lang] || spot.category;
  const todayHours = getTodayHours(spot.hours);
  const isOpen = todayHours != null && todayHours !== "Gesloten";
  const openLabel = lang === "de" ? "Heute" : lang === "en" ? "Today" : "Vandaag";
  const closedLabel = lang === "de" ? "Heute geschlossen" : lang === "en" ? "Closed today" : "Vandaag gesloten";

  return (
    <Link href={`/ontdek/${spot.id}`} className="shrink-0 w-[280px] bg-gradient-to-br from-navy-800 to-navy-900 rounded-xl overflow-hidden text-white snap-start block group">
      <div className="aspect-[16/9] bg-gray-800 overflow-hidden relative">
        {spot.image ? (
          <img src={spot.image} alt={spot.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-navy-700 to-navy-900 flex flex-col items-center justify-center gap-1">
            <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-white/10" stroke="currentColor" strokeWidth="1">
              <rect x="2" y="2" width="20" height="20" rx="3" />
              <circle cx="8" cy="8" r="2" />
              <path d="M2 16l5-5 3 3 4-4 8 8" />
            </svg>
            <p className="text-[9px] text-white/15 font-medium px-3 text-center">--HIER IMAGE VAN {spot.name}--</p>
          </div>
        )}
        <span className="absolute top-2 left-2 text-[10px] font-semibold bg-orange-500 text-white px-2 py-0.5 rounded-full">
          {catLabel}
        </span>
      </div>
      <div className="p-3">
        <h3 className="font-bold text-sm leading-tight line-clamp-1">{spot.name}</h3>
        <p className="text-[11px] text-white/60 mt-1 line-clamp-2">{desc}</p>

        {todayHours != null && (
          <div className="flex items-center gap-1.5 mt-2">
            <div className={`w-1.5 h-1.5 rounded-full ${isOpen ? "bg-green-400" : "bg-red-400"}`} />
            <span className={`text-[10px] font-medium ${isOpen ? "text-green-400" : "text-red-400"}`}>
              {isOpen ? `${openLabel}: ${todayHours}` : closedLabel}
            </span>
          </div>
        )}

        <div className="flex items-center gap-2 mt-2">
          {spot.rating && (
            <div className="flex items-center gap-1">
              <svg viewBox="0 0 20 20" fill="#F59E0B" className="w-3.5 h-3.5">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs font-semibold">{spot.rating}</span>
            </div>
          )}
          {spot.priceRange && (
            <span className="text-[11px] text-white/50">&euro;{spot.priceRange}</span>
          )}
        </div>
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
  const { hasPaid, isLoading } = useAuth();
  const locale = useLocale() as "nl" | "en" | "de";
  const t = useTranslations("discover");
  const tAct = useTranslations("activities");
  const tHome = useTranslations("home");
  const [activeCategory, setActiveCategory] = useState<SpotCategory | "alle">("alle");
  const [activeActivityCat, setActiveActivityCat] = useState<string>("all");

  const visibleSpots = useMemo(() => getVisibleSpots(), []);
  const featuredSpots = useMemo(() => getFeaturedSpots(), []);

  const filtered = useMemo(() => {
    if (activeCategory === "alle") return visibleSpots;
    return visibleSpots.filter((s) => s.category === activeCategory);
  }, [activeCategory, visibleSpots]);

  const filteredActivities = useMemo(() => {
    if (activeActivityCat === "all") return activities;
    return activities.filter((a) => a.category === activeActivityCat);
  }, [activeActivityCat]);

  const activityCategories = [
    { key: "all", label: tAct("all") },
    { key: "rondvaart", label: tAct("boatTours") },
    { key: "wandeltour", label: tAct("walkingTours") },
    { key: "museum", label: tAct("museums") },
    { key: "overig", label: tAct("other") },
  ];

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
              <SpotCard key={spot.id} spot={spot} locale={locale} />
            ))}
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 mb-6">
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-lg font-bold text-navy-800 mb-4">{tAct("topActivities")}</h2>

          <div className="flex gap-2 overflow-x-auto pb-3 mb-4 -mx-4 px-4 scrollbar-hide">
            {activityCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveActivityCat(cat.key)}
                className={`shrink-0 text-xs font-semibold px-4 py-2 rounded-full transition-colors ${
                  activeActivityCat === cat.key
                    ? "bg-navy-800 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} t={tAct} />
            ))}
          </div>
        </div>
      </section>

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
