"use client";

import { Link } from "@/i18n/navigation";
import { useAuth } from "@/lib/auth-context";
import { routes } from "@/data/routes";
import { getSavedRoutes } from "@/lib/saved-routes";
import { getLocationById } from "@/data/locations";
import { FeaturesBar } from "./FeaturesBar";
import { PriceComparison } from "./PriceComparison";
import { PopularRoutes } from "./PopularRoutes";
import { MoreCities } from "./MoreCities";
import { useEffect, useState } from "react";
import type { SavedRoute } from "@/lib/saved-routes";

export function HomeContent() {
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
        <div className="animate-pulse text-gray-400">Laden...</div>
      </div>
    );
  }

  if (hasPaid) {
    return (
      <>
        <section className="bg-white py-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 mb-6">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-green-600 shrink-0">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-green-800">Leiden pakket actief</p>
                <p className="text-xs text-green-600">Volledige toegang tot alle routes, locaties en meer</p>
              </div>
            </div>

            <h2 className="text-lg font-bold text-navy-800 mb-4">Beschikbare routes</h2>
            <div className="space-y-3 mb-6">
              {routes.map((route) => (
                <Link
                  key={route.id}
                  href={`/routes/${route.slug}`}
                  className="flex items-center gap-4 bg-white rounded-xl border border-gray-100 p-3 hover:shadow-md transition-shadow"
                >
                  <div className="w-16 h-16 rounded-xl bg-gray-200 shrink-0 overflow-hidden">
                    {route.image && (
                      <img src={route.image} alt={route.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-navy-800 text-sm">{route.title}</h3>
                      {route.popular && (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-orange-500 text-white uppercase">
                          Populair
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{route.subtitle}</p>
                    <p className="text-[11px] text-gray-400 mt-1">{route.stops} stops - {route.distance}</p>
                  </div>
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-orange-500 shrink-0">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </Link>
              ))}
            </div>

            {savedRoutes.length > 0 && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-navy-800">Mijn routes</h2>
                  <Link href="/my-routes" className="text-sm text-orange-500 font-medium hover:text-orange-600">
                    Bekijk alle
                  </Link>
                </div>
                <div className="space-y-3 mb-6">
                  {savedRoutes.slice(0, 3).map((sr) => {
                    const locs = sr.locationIds.map(getLocationById).filter(Boolean);
                    const progress = sr.arrivedLocationIds.length;
                    const total = sr.locationIds.length;
                    const pct = total > 0 ? Math.round((progress / total) * 100) : 0;
                    return (
                      <Link
                        key={sr.id}
                        href={`/my-routes/${sr.id}`}
                        className="block bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-navy-800 text-sm">{sr.name}</h3>
                          <span className="text-xs text-gray-400">{progress}/{total} bezocht</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2">
                          <div className="bg-orange-500 h-1.5 rounded-full transition-all" style={{ width: `${pct}%` }} />
                        </div>
                        <div className="flex gap-1.5">
                          {locs.slice(0, 5).map((loc) => (
                            <div key={loc!.id} className="w-8 h-8 rounded-md bg-gray-200 shrink-0 overflow-hidden">
                              {loc!.image && <img src={loc!.image} alt={loc!.name} className="w-full h-full object-cover" />}
                            </div>
                          ))}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </>
            )}

            <Link
              href="/routes/custom"
              className="block bg-orange-50 border-2 border-orange-200 rounded-xl p-4 mb-6 hover:bg-orange-100 transition-colors"
            >
              <h3 className="font-bold text-orange-600 mb-1">Maak je eigen route</h3>
              <p className="text-sm text-gray-600">Kies je eigen stops en wij plannen de slimste volgorde</p>
            </Link>
          </div>
        </section>

        <MoreCities />
      </>
    );
  }

  return (
    <>
      <FeaturesBar />
      <PriceComparison />
      <PopularRoutes />
      <MoreCities />
    </>
  );
}
