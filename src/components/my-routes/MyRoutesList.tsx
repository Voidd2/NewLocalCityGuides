"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getSavedRoutes, deleteSavedRoute, type SavedRoute } from "@/lib/saved-routes";
import { getLocationById } from "@/data/locations";
import { routes as standardRoutes } from "@/data/routes";

export function MyRoutesList() {
  const [routes, setRoutes] = useState<SavedRoute[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations("myRoutes");
  const tCommon = useTranslations("common");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setRoutes(getSavedRoutes());
      setIsLoading(false);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleDelete = (id: string) => {
    deleteSavedRoute(id);
    setRoutes(getSavedRoutes());
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="animate-pulse text-gray-400">{tCommon("loading")}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-navy-800">{t("title")}</h1>
          <p className="text-sm text-gray-500">{t("subtitle")}</p>
        </div>
        <Link
          href="/routes/custom"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-full text-sm transition-colors"
        >
          {t("newRoute")}
        </Link>
      </div>

      {routes.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
          <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-gray-200 mx-auto mb-3" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          <h2 className="font-bold text-navy-800 mb-2">{t("noRoutes")}</h2>
          <p className="text-sm text-gray-500 mb-4">{t("noRoutesDesc")}</p>
          <Link
            href="/routes/custom"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
          >
            {t("buildRoute")}
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {routes.map((route) => {
            const locs = route.locationIds.map(getLocationById).filter(Boolean);
            const progress = route.arrivedLocationIds.length;
            const total = route.locationIds.length;
            const pct = total > 0 ? Math.round((progress / total) * 100) : 0;

            const matchedRoute = standardRoutes.find(
              (sr) => sr.title === route.name || sr.locationIds.join(",") === route.locationIds.join(",")
            );

            return (
              <div key={route.id} className="bg-white rounded-2xl border border-gray-200 p-4 hover-lift shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-navy-800 text-sm">{route.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {total} {tCommon("stops")} &middot; {progress}/{total} {t("visited")}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(route.id)}
                    className="text-gray-300 hover:text-red-400 p-1"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>

                <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-orange-400 h-1.5 rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="flex gap-1.5 mb-3 overflow-x-auto scrollbar-hide">
                  {locs.slice(0, 6).map((loc) => (
                    <div key={loc!.id} className="w-10 h-10 rounded-lg bg-gray-200 shrink-0 overflow-hidden">
                      {loc!.image && (
                        <img src={loc!.image} alt={loc!.name} className="w-full h-full object-cover" />
                      )}
                    </div>
                  ))}
                  {locs.length > 6 && (
                    <div className="w-10 h-10 rounded-lg bg-gray-100 shrink-0 flex items-center justify-center text-xs text-gray-400 font-medium">
                      +{locs.length - 6}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  {matchedRoute && (
                    <Link
                      href={`/routes/${matchedRoute.slug}`}
                      className="flex-1 border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold py-2.5 rounded-full text-center text-sm transition-colors"
                    >
                      {t("routeInfo")}
                    </Link>
                  )}
                  <Link
                    href={`/my-routes/${route.id}`}
                    className={`${matchedRoute ? "flex-1" : "w-full"} bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-full text-center text-sm transition-colors`}
                  >
                    {progress > 0 && progress < total ? t("continue") : progress === total && total > 0 ? t("viewRoute") : t("startRoute")}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
