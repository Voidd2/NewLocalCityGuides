"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/lib/auth-context";
import { routes } from "@/data/routes";
import { getSavedRoutes } from "@/lib/saved-routes";
import { getLocationById } from "@/data/locations";
import { PriceComparison } from "./PriceComparison";
import { PopularRoutes } from "./PopularRoutes";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { useEffect, useState } from "react";
import type { SavedRoute } from "@/lib/saved-routes";

export function HomeContent() {
  const t = useTranslations("home");
  const tRoutes = useTranslations("routes");
  const { hasPaid, isLoading } = useAuth();
  const [savedRoutes, setSavedRoutes] = useState<SavedRoute[]>([]);

  useEffect(() => {
    if (hasPaid) {
      setSavedRoutes(getSavedRoutes());
    }
  }, [hasPaid]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[20vh]">
        <div className="animate-pulse text-gray-400">{t("loading")}</div>
      </div>
    );
  }

  if (hasPaid) {
    return (
      <section className="bg-warm-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <AnimateOnScroll>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3 mb-8 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-green-600">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-green-800">{t("packageActive")}</p>
                <p className="text-xs text-green-600">{t("packageActiveDesc")}</p>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={100}>
            <h2 className="text-lg font-bold text-navy-800 mb-4">{t("availableRoutes")}</h2>
          </AnimateOnScroll>

          <div className="space-y-3 mb-8">
            {routes.map((route, i) => (
              <AnimateOnScroll key={route.id} delay={i * 100 + 150}>
                <Link
                  href={`/routes/${route.slug}`}
                  className="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 p-3.5 hover-lift hover-zoom-img group shadow-sm"
                >
                  <div className="w-18 h-18 rounded-xl bg-gray-200 shrink-0 overflow-hidden">
                    {route.image && (
                      <img src={route.image} alt={route.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-navy-800 text-sm">{route.title}</h3>
                      {route.popular && (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-orange-500 text-white uppercase shadow-sm">
                          {tRoutes("popular")}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{route.subtitle}</p>
                    <p className="text-[11px] text-gray-400 mt-1">{route.stops} stops - {route.distance}</p>
                  </div>
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-orange-500 shrink-0 group-hover:translate-x-1 transition-transform">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>

          {savedRoutes.length > 0 && (
            <>
              <AnimateOnScroll>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-navy-800">{t("myRoutesLabel")}</h2>
                  <Link href="/my-routes" className="text-sm text-orange-500 font-medium hover:text-orange-600 transition-colors">
                    {t("viewAll")}
                  </Link>
                </div>
              </AnimateOnScroll>
              <div className="space-y-3 mb-8">
                {savedRoutes.slice(0, 3).map((sr, i) => {
                  const locs = sr.locationIds.map(getLocationById).filter(Boolean);
                  const progress = sr.arrivedLocationIds.length;
                  const total = sr.locationIds.length;
                  const pct = total > 0 ? Math.round((progress / total) * 100) : 0;
                  return (
                    <AnimateOnScroll key={sr.id} delay={i * 100}>
                      <Link
                        href={`/my-routes/${sr.id}`}
                        className="block bg-white rounded-2xl border border-gray-200 p-4 hover-lift shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-navy-800 text-sm">{sr.name}</h3>
                          <span className="text-xs text-gray-400">{progress}/{total} {t("visited")}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2 overflow-hidden">
                          <div className="bg-gradient-to-r from-orange-500 to-orange-400 h-1.5 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                        </div>
                        <div className="flex gap-1.5">
                          {locs.slice(0, 5).map((loc) => (
                            <div key={loc!.id} className="w-8 h-8 rounded-lg bg-gray-200 shrink-0 overflow-hidden">
                              {loc!.image && <img src={loc!.image} alt={loc!.name} className="w-full h-full object-cover" />}
                            </div>
                          ))}
                        </div>
                      </Link>
                    </AnimateOnScroll>
                  );
                })}
              </div>
            </>
          )}

          <AnimateOnScroll animation="scale-in">
            <Link
              href="/routes/custom"
              className="block bg-gradient-to-br from-orange-50 to-orange-100/50 border-2 border-orange-200 rounded-2xl p-5 mb-6 hover:from-orange-100 hover:to-orange-100 hover:border-orange-300 hover-lift transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20 shrink-0 group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-white">
                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-orange-600 mb-0.5">{t("createRoute")}</h3>
                  <p className="text-sm text-gray-600">{t("createRouteDesc")}</p>
                </div>
              </div>
            </Link>
          </AnimateOnScroll>
        </div>
      </section>
    );
  }

  return (
    <>
      <PriceComparison />
      <PopularRoutes />
    </>
  );
}
