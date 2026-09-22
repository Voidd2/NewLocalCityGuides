"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/lib/auth-context";

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

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1">
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
      <span className="text-xs text-gray-500">({count})</span>
    </div>
  );
}

export function ActiviteitenPage() {
  const { hasPaid, isLoading } = useAuth();
  const t = useTranslations("activities");
  const tCommon = useTranslations("common");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="animate-pulse text-gray-400">{tCommon("loading")}</div>
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
        <h2 className="text-lg font-bold text-navy-800 mb-2">{t("unlockTitle")}</h2>
        <p className="text-sm text-gray-500 mb-4">
          Koop het Leiden pakket voor toegang tot de beste activiteiten en persoonlijke hulp bij het boeken.
        </p>
        <Link
          href="/pricing"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
        >
          {t("viewPackage")}
        </Link>
      </div>
    );
  }

  const categories = [
    { key: "all", label: t("all") },
    { key: "rondvaart", label: t("boatTours") },
    { key: "wandeltour", label: t("walkingTours") },
    { key: "museum", label: t("museums") },
    { key: "overig", label: t("other") },
  ];

  const filtered = activeCategory === "all"
    ? activities
    : activities.filter((a) => a.category === activeCategory);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-b from-navy-800 to-navy-900 text-white px-4 py-8 pb-10">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{t("title")}</h1>
            <p className="text-white/70 text-sm">
              De leukste tours, rondvaarten en bezienswaardigheden op een rij.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 -mt-5 mb-6">
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
              <h3 className="font-bold text-navy-800 text-sm mb-1">{t("dontKnowWhat")}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Laat ons je helpen! Van een dagje Leiden tot een trip naar Amsterdam - wij regelen alles persoonlijk voor je.
              </p>
              <span className="inline-flex items-center gap-1 mt-2 text-orange-600 text-xs font-semibold">
                {t("askPersonalHelp")}
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
          </div>
        </Link>
      </section>

      <section className="max-w-7xl mx-auto px-4 mb-6">
        <h2 className="text-lg font-bold text-navy-800 mb-4">{t("topActivities")}</h2>

        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 -mx-4 px-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`shrink-0 text-xs font-semibold px-4 py-2 rounded-full transition-colors ${
                activeCategory === cat.key
                  ? "bg-navy-800 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((activity) => (
            <a
              key={activity.id}
              href={activity.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex">
                <div className="w-32 md:w-44 bg-gray-200 shrink-0 aspect-[4/3] flex items-center justify-center">
                  {activity.image ? (
                    <img src={activity.image} alt={activity.title} className="w-full h-full object-cover" />
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-gray-300" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="2" width="20" height="20" rx="3" />
                      <circle cx="8" cy="8" r="2" />
                      <path d="M2 16l5-5 3 3 4-4 8 8" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                  <div>
                    <h3 className="font-bold text-navy-800 text-sm leading-tight mb-1 line-clamp-2">
                      {activity.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-2">{activity.description}</p>
                    {activity.duration !== "-" && (
                      <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                        </svg>
                        {t("duration")} {activity.duration}
                      </div>
                    )}
                  </div>
                  <div className="flex items-end justify-between">
                    <StarRating rating={activity.rating} count={activity.reviewCount} />
                    <div className="text-right">
                      <p className="text-sm font-bold text-navy-800">{t("from")} &euro;{activity.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-navy-800 text-white py-8 mb-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-hand text-orange-300 text-xl mb-2">{t("preferPersonalHelp")}</p>
          <h2 className="text-lg font-bold mb-2">{t("wePlanYourDay")}</h2>
          <p className="text-white/60 text-sm mb-6">
            Van vervoer tot verblijf, van Leiden tot Amsterdam - wij regelen het allemaal.
          </p>
          <Link
            href="/activiteiten/hulp"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
          >
            {t("askForHelp")}
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
