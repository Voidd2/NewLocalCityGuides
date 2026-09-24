"use client";

import { useState, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { Link, useRouter } from "@/i18n/navigation";
import type { RouteData } from "@/data/routes";
import { getLocationById } from "@/data/locations";
import { useAuth } from "@/lib/auth-context";
import { saveRoute, getSavedRoutes } from "@/lib/saved-routes";
import { getSchaapsvisRouteCopy, type SupportedLocale } from "@/data/schaapsvis";
import type { MapPin } from "@/components/map/MapLibreMap";
import { insertAtSmallestDetour } from "@/lib/route-engine";
import { ShareButton } from "@/components/sharing/ShareButton";
import { applyDateAwareRoute, getConditionalRouteStops } from "@/data/route-conditions";

const MapLibreMap = dynamic(() => import("@/components/map/MapLibreMap").then((m) => m.MapLibreMap), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-xl bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        <p className="text-sm text-gray-400">Kaart laden...</p>
      </div>
    </div>
  ),
});

const tabs = ["overview", "routeAndStops", "beginRoute", "reviews"] as const;

export function RouteDetail({ route: baseRoute }: { route: RouteData }) {
  const t = useTranslations("routes");
  const tCommon = useTranslations("common");
  const tReview = useTranslations("reviewPreview");
  const locale = useLocale() as SupportedLocale;

  const tabLabels: Record<(typeof tabs)[number], string> = {
    overview: t("overview"),
    routeAndStops: t("routeAndStops"),
    beginRoute: t("startRoute"),
    reviews: t("reviews"),
  };
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("overview");
  const { hasPaid, isLoading } = useAuth();
  const route = useMemo(() => applyDateAwareRoute(baseRoute), [baseRoute]);

  const routeLocations = useMemo(
    () => route.locationIds.map(getLocationById).filter(Boolean),
    [route.locationIds],
  );

  const dailySchaapsvis = useMemo(
    () => route.featuredLocalStop ? getSchaapsvisRouteCopy(locale) : null,
    [locale, route.featuredLocalStop],
  );
  const conditionalStops = useMemo(
    () => getConditionalRouteStops(route, locale),
    [locale, route],
  );
  const routePins = useMemo(() => {
    const pins: MapPin[] = routeLocations
      .filter((loc) => loc && loc.coords !== null)
      .map((loc) => ({ id: loc!.id, name: loc!.name, category: loc!.mainTheme, kind: "location" as const, lat: loc!.coords!.lat, lng: loc!.coords!.lng }));
    if (dailySchaapsvis?.spot.coords) {
      pins.push({ id: dailySchaapsvis.spot.id, name: dailySchaapsvis.spot.name, category: "Schaapsvishandel", kind: "spot", lat: dailySchaapsvis.spot.coords.lat, lng: dailySchaapsvis.spot.coords.lng });
    }
    conditionalStops.forEach((stop) => pins.push({ id: stop.id, name: stop.name, category: stop.category, kind: "spot", lat: stop.coords.lat, lng: stop.coords.lng }));
    return pins;
  }, [conditionalStops, dailySchaapsvis, routeLocations]);
  const routeCoordinates = useMemo(() => {
    const base = routeLocations
      .filter((loc) => loc?.coords)
      .map((loc) => ({ id: loc!.id, coords: loc!.coords }));
    let ordered = base;
    if (dailySchaapsvis?.spot.coords) ordered = insertAtSmallestDetour(ordered, { id: dailySchaapsvis.spot.id, coords: dailySchaapsvis.spot.coords });
    conditionalStops.forEach((stop) => { ordered = insertAtSmallestDetour(ordered, { id: stop.id, coords: stop.coords }); });
    return ordered.flatMap((item) => item.coords ? [item.coords] : []);
  }, [conditionalStops, dailySchaapsvis, routeLocations]);

  const [selectedPin, setSelectedPin] = useState<string | null>(null);

  const startRoute = () => {
    const existing = getSavedRoutes().find(
      (savedRoute) => (savedRoute.sourceRouteId === route.id && savedRoute.locationIds.join(",") === route.locationIds.join(",")) ||
        (savedRoute.name === route.title && savedRoute.locationIds.join(",") === route.locationIds.join(",")),
    );
    if (existing) {
      router.push(`/my-routes/${existing.id}`);
      return;
    }
    const saved = saveRoute(route.title, route.locationIds, {
      sourceRouteId: route.id,
      isLoop: route.isLoop,
      featuredLocalStop: route.featuredLocalStop,
    });
    router.push(`/my-routes/${saved.id}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="animate-pulse text-gray-400">{tCommon("loading")}</div>
      </div>
    );
  }

  return (
    <div>
      <section className="relative overflow-hidden">
        {route.image && (
          <img src={route.image} alt={route.title} className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="relative bg-gradient-to-b from-navy-800/90 to-navy-900/95 text-white px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {route.popular && (
                    <span className="bg-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">{t("mostChosen")}</span>
                  )}
                  {route.activeVariant === "leidens-ontzet" && (
                    <span className="bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">3 Oktober</span>
                  )}
                </div>
                <h1 className="text-2xl md:text-3xl font-bold">{route.title}</h1>
                <p className="text-white/70 text-sm mt-1">{route.subtitle}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/80">
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs">{tReview("title")}</span>
              <ShareButton title={route.title} text={route.subtitle} className="border-white/30 text-white hover:bg-white/10" />
            </div>

            <div className="flex items-center gap-6 mt-5 text-center">
              <div>
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 mx-auto text-white/60" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                <p className="text-xs mt-1">{route.stops}</p>
                <p className="text-[10px] text-white/50">{t("stops")}</p>
              </div>
              <div>
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 mx-auto text-white/60" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 3v18h18" />
                  <path d="M7 17l4-8 4 4 4-8" />
                </svg>
                <p className="text-xs mt-1">{route.distance}</p>
                <p className="text-[10px] text-white/50">{t("distance")}</p>
              </div>
              <div>
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 mx-auto text-white/60" stroke="currentColor" strokeWidth="1.5">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                <p className="text-xs mt-1">{route.type === "walking" ? t("walking") : t("cycling")}</p>
              </div>
              {route.kidFriendly && (
                <div>
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 mx-auto text-white/60" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                  <p className="text-xs mt-1">{t("suitable")}</p>
                  <p className="text-[10px] text-white/50">{t("suitableForEveryone")}</p>
                </div>
              )}
              {route.kidFriendly && (
                <div>
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 mx-auto text-orange-400" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" strokeLinecap="round" />
                    <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  <p className="text-xs mt-1 text-orange-400 font-medium">{t("kidFriendly")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto">
        <div className="border-b border-gray-200 px-4">
          <nav className="flex gap-0 -mb-px overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? "border-orange-500 text-orange-500"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tabLabels[tab]}
              </button>
            ))}
          </nav>
        </div>

        <div className="px-4 py-6">
          {activeTab === "overview" && (
            <div>
              <p className="text-sm text-gray-700 leading-relaxed mb-6">{route.description}</p>

              {hasPaid ? (
                <div className="mb-8">
                  <div className="relative rounded-2xl overflow-hidden bg-navy-900 mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-navy-900/80" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,107,0,0.15),transparent_50%)]" />

                    <div className="relative px-5 pt-8 pb-6 text-center">
                      <div className="inline-flex items-center gap-1.5 bg-orange-500/20 border border-orange-500/30 rounded-full px-3 py-1 mb-4">
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-orange-400">
                          <polygon points="10 1 12.5 7.5 19 7.5 14 12 16 19 10 15 4 19 6 12 1 7.5 7.5 7.5" />
                        </svg>
                        <span className="text-[10px] font-semibold text-orange-300 uppercase tracking-wider">{t("routePreview")}</span>
                      </div>
                      <h3 className="text-xl font-extrabold text-white mb-2 leading-tight">
                        Ontdek Leiden zoals je het<br />
                        <span className="text-orange-400">nog nooit hebt gezien</span>
                      </h3>
                      <p className="text-white/50 text-xs max-w-[280px] mx-auto">
                        {route.stops} locaties vol verhalen, verborgen plekken en eeuwen geschiedenis
                      </p>
                    </div>

                    <div className="relative px-4 pb-6">
                      <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory">
                        {routeLocations.map((loc, i) => (
                          <div
                            key={loc!.id}
                            className="relative w-[200px] shrink-0 rounded-xl overflow-hidden snap-start group"
                          >
                            <div className="aspect-[3/4] bg-gray-800">
                              {loc!.image ? (
                                <img
                                  src={loc!.image}
                                  alt={loc!.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-white/20" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                                    <circle cx="12" cy="9" r="2.5" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute top-3 left-3">
                              <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center shadow-lg">
                                {i + 1}
                              </span>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-3">
                              <h4 className="text-white font-bold text-sm leading-tight mb-0.5 drop-shadow-md">{loc!.name}</h4>
                              <p className="text-white/80 text-[10px] leading-snug line-clamp-2 drop-shadow-sm">{loc!.shortDescription}</p>
                              {loc!.mainTheme && (
                                <span className="inline-block mt-1.5 text-[9px] font-semibold text-white bg-orange-500 px-2 py-0.5 rounded-full">
                                  {loc!.mainTheme}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="relative px-5 pb-8">
                      <button
                        onClick={startRoute}
                        className="w-full flex items-center gap-3 bg-orange-500/20 hover:bg-orange-500/30 backdrop-blur-sm border border-orange-500/30 rounded-xl p-4 transition-colors cursor-pointer text-left"
                      >
                        <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-semibold">{t("readyToStart")}</p>
                          <p className="text-white/50 text-[11px]">Ervaar elk verhaal op locatie met video en audio</p>
                        </div>
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-orange-400 shrink-0">
                          <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-orange-50 rounded-xl p-3 text-center">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-1.5">
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-orange-500">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-xs font-bold text-navy-800">{route.duration || "60-90 min"}</p>
                      <p className="text-[10px] text-gray-400">{t("walkTime")}</p>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-3 text-center">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-1.5">
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-orange-500">
                          <path d="M3.505 2.365A41.369 41.369 0 019 2c1.863 0 3.697.124 5.495.365 1.247.167 2.18 1.108 2.435 2.268a4.45 4.45 0 00-.577-.069 43.141 43.141 0 00-4.706 0C9.229 4.696 7.5 6.727 7.5 8.998v2.24c0 1.413.67 2.735 1.76 3.562l-2.98 2.98A.75.75 0 015 17.25v-3.443c-.501-.048-1-.106-1.495-.172C2.033 13.438 1 12.162 1 10.72V5.28c0-1.441 1.033-2.717 2.505-2.914z" />
                          <path d="M14 6c.762 0 1.52.02 2.272.062 1.014.056 1.728.914 1.728 1.936v2.722c0 1.022-.714 1.88-1.728 1.936a25.86 25.86 0 01-.272.014v2.58a.75.75 0 01-1.28.53l-2.72-2.72V8c0-1.104.896-2 2-2z" />
                        </svg>
                      </div>
                      <p className="text-xs font-bold text-navy-800">{route.stops} video&apos;s</p>
                      <p className="text-[10px] text-gray-400">{t("onLocation")}</p>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-3 text-center">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-1.5">
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-orange-500">
                          <path d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003z" />
                        </svg>
                      </div>
                      <p className="text-xs font-bold text-navy-800">{t("atYourPace")}</p>
                      <p className="text-[10px] text-gray-400">{t("noRush")}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-navy-800 mb-3">Video preview - Stop 3: Pieterskerk</h3>
                  <div className="relative bg-gray-200 rounded-xl overflow-hidden aspect-video">
                    <img
                      src="/images/video-posters/10034-pieterskerk-interactive-video-poster.jpg"
                      alt="Pieterskerk interactieve video preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-navy-800/30">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-navy-800 ml-1">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
                      2:38
                    </div>
                    <div className="absolute bottom-3 right-3 bg-orange-500 text-white text-xs px-3 py-1.5 rounded-lg">
                      <p className="font-semibold text-[11px]">&quot;Meer dan een stad.</p>
                      <p className="text-[10px]">Een verhaal!&quot;</p>
                    </div>
                  </div>

                  <div className="mt-3 bg-orange-50 border border-orange-100 rounded-xl p-4 flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-200 shrink-0 overflow-hidden">
                      {/* 10035 - review avatar foto */}
                    </div>
                    <div>
                      <p className="text-sm text-gray-700 italic">&quot;Super leuke tour! De video&apos;s maken de geschiedenis levend. Onze kinderen vonden het geweldig!&quot;</p>
                      <p className="text-xs text-gray-500 mt-1">- Familie de Jong</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "routeAndStops" && (
            <div>
              <h3 className="text-sm font-bold text-navy-800 mb-4">{t("routeOnMap")}</h3>
              {routePins.length > 0 ? (
                <div className="h-64 rounded-xl overflow-hidden shadow-md mb-6">
                  <MapLibreMap
                    pins={routePins}
                    selectedId={selectedPin}
                    onSelectPin={(id) => setSelectedPin(id === selectedPin ? null : id)}
                    routeCoordinates={routeCoordinates}
                  />
                </div>
              ) : (
                <div className="bg-gray-100 rounded-xl h-64 mb-6 flex flex-col items-center justify-center text-center px-4">
                  <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-gray-300 mb-2" stroke="currentColor" strokeWidth="1.5">
                    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                    <line x1="8" y1="2" x2="8" y2="18" />
                    <line x1="16" y1="6" x2="16" y2="22" />
                  </svg>
                  <p className="text-sm font-medium text-gray-500">{t("mapDataPending")}</p>
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-navy-800">{t("allXStops", { count: route.stops })}</h3>
              </div>

              <ol className="space-y-3">
                {routeLocations.map((loc, i) => (
                  <li key={loc!.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </div>
                      {i < routeLocations.length - 1 && (
                        <div className="w-0.5 flex-1 bg-orange-200 mt-1" />
                      )}
                    </div>
                    <div className="pb-4 flex-1">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-navy-800 text-sm">{loc!.name}</h4>
                          <p className="text-xs text-gray-500 mt-0.5">{loc!.shortDescription}</p>
                          {loc!.entryFee && loc!.ticketUrl && (
                            <div className="mt-2 bg-orange-50 border border-orange-200 rounded-lg p-2.5">
                              <div className="flex items-center justify-between gap-2">
                                <div>
                                  <p className="text-xs font-bold text-navy-800">{t("entryFrom")} &euro;{loc!.entryFee}</p>
                                </div>
                                <a
                                  href={loc!.ticketUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="shrink-0 bg-orange-500 hover:bg-orange-600 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full transition-colors"
                                >
                                  {t("orderTickets")}
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="w-16 h-16 rounded-lg bg-gray-200 shrink-0 overflow-hidden">
                          {loc!.image && (
                            <img src={loc!.image} alt={loc!.name} className="w-full h-full object-cover" />
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {activeTab === "beginRoute" && (
            <div>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
                <h4 className="font-bold text-navy-800 text-sm mb-2">{t("howDoesItWork")}</h4>
                <ol className="space-y-2 text-xs text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                    {t("step1Desc")}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                    {t("step2Desc")}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                    {t("step3Desc")}
                  </li>
                </ol>
              </div>

              <div className="space-y-2 mb-6">
                {routeLocations.map((loc, i) => {
                  const mapsUrl = loc!.coords
                    ? `https://www.google.com/maps/dir/?api=1&destination=${loc!.coords.lat},${loc!.coords.lng}`
                    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc!.name + ", Leiden")}`;
                  return (
                    <div key={loc!.id} className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 p-3">
                      <span className="w-7 h-7 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <div className="w-10 h-10 rounded-lg bg-gray-200 shrink-0 overflow-hidden">
                        {loc!.image && (
                          <img src={loc!.image} alt={loc!.name} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-navy-800 text-sm truncate">{loc!.name}</h4>
                        <span className="text-[10px] text-orange-500 font-medium">{loc!.mainTheme}</span>
                      </div>
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 hover:bg-blue-100 transition-colors"
                        title="Open in Google Maps"
                      >
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-500">
                          <path fillRule="evenodd" d="M8.157 2.175a1.5 1.5 0 00-1.147 0l-4.084 1.69A1.5 1.5 0 002 5.251v10.877a1.5 1.5 0 002.074 1.386l3.51-1.453 4.26 1.763a1.5 1.5 0 001.146 0l4.083-1.69A1.5 1.5 0 0018 14.748V3.873a1.5 1.5 0 00-2.073-1.386l-3.51 1.452-4.26-1.763z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  );
                })}
              </div>

              {dailySchaapsvis && (
                <Link href={`/ontdek/${dailySchaapsvis.spot.id}`} className="mb-5 block rounded-2xl border-2 border-orange-200 bg-orange-50 p-4 hover:border-orange-400">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">{t("localStop")}</span>
                    <span className="text-xs font-semibold text-orange-700">{t("familyBusinessSince")}</span>
                  </div>
                  <h3 className="font-bold text-navy-800">{dailySchaapsvis.spot.name}</h3>
                  <p className="mt-1 text-sm leading-6 text-gray-600">{dailySchaapsvis.description}</p>
                </Link>
              )}

              {conditionalStops.map((stop) => (
                <div key={stop.id} className="mb-5 rounded-2xl border-2 border-blue-200 bg-blue-50 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">{locale === "nl" ? "Nu geopend" : locale === "de" ? "Jetzt geöffnet" : "Open now"}</span>
                    <span className="text-xs font-semibold text-blue-700">08:00–17:00</span>
                  </div>
                  <h3 className="font-bold text-navy-800">{stop.name}</h3>
                  <p className="mt-1 text-sm leading-6 text-gray-600">{stop.description}</p>
                </div>
              ))}

              <button
                onClick={startRoute}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 rounded-full text-sm transition-colors flex items-center justify-center gap-2"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                </svg>
                {t("startRoute")}
              </button>
            </div>
          )}

          {activeTab === "reviews" && (
            <ReviewsTab />
          )}
        </div>
      </section>

      {!hasPaid && (
        <section className="bg-orange-50 border-t border-orange-100">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h3 className="text-sm font-bold text-navy-800 mb-1">{t("includedInPackage")}</h3>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-600 mt-3 mb-4">
              {[
                t("allRoutesInLeiden"),
                t("interactiveVids"),
                t("createOwnRouteIncluded"),
                t("hiddenGemsAndTips"),
                t("atYourPace"),
                t("lifetimeAccess"),
                t("kidFriendlyRoutes"),
                t("regularNewRoutes"),
              ].map((item) => (
                <span key={item} className="flex items-center gap-1">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-green-600">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-extrabold text-orange-500">&euro;5,99</span>
              <span className="text-sm text-gray-500">{t("perPerson")}</span>
              <Link
                href="/pricing"
                className="ml-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
              >
                {t("viewPricing")}
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

/* Legacy placeholder review dataset retained only in history; excluded from the compiled application.
const reviewsWithText: { name: string; text: string; rating: number }[] = [
  { name: "Familie de Jong", text: "Super leuke tour! De video's maken de geschiedenis levend. Onze kinderen vonden het geweldig!", rating: 5 },
  { name: "Mark V.", text: "Fijn dat je op je eigen tempo kunt lopen. De verborgen hofjes waren een echte verrassing.", rating: 5 },
  { name: "Sarah & Tom", text: "Veel beter dan een groepsrondleiding. Je ontdekt dingen die je anders nooit zou zien.", rating: 4 },
  { name: "Lisa M.", text: "Wat een prachtige route! De verhalen achter elke locatie zijn zo interessant. Echt een aanrader.", rating: 5 },
  { name: "Pieter & Anne", text: "We hebben genoten van elk moment. De combinatie van wandelen en leren is perfect.", rating: 5 },
  { name: "Familie Bakker", text: "Ideaal voor een dagje uit met de kinderen. Ze vonden de verhalen super spannend!", rating: 5 },
  { name: "Jan K.", text: "Na 20 jaar in Leiden te wonen heb ik toch nog nieuwe dingen ontdekt. Top ervaring.", rating: 5 },
  { name: "Emma & Daan", text: "Romantische wandeling door de stad. De verstopte plekjes zijn echt de moeite waard.", rating: 5 },
  { name: "Rob W.", text: "Uitstekende kwaliteit voor de prijs. Beter dan elke stadsgids die ik ooit heb gehad.", rating: 5 },
  { name: "Marieke L.", text: "De video's op locatie geven echt een extra dimensie. Je waant je in een andere tijd.", rating: 5 },
  { name: "Thomas B.", text: "Heerlijk op eigen tempo door de stad. Geen haast, geen groep, gewoon genieten.", rating: 4 },
  { name: "Sanne & Joris", text: "We hebben de route met vrienden gelopen, iedereen was enthousiast. Zeker voor herhaling vatbaar!", rating: 5 },
  { name: "Familie van Dijk", text: "Onze tieners vonden het zelfs leuk! Dat zegt genoeg. De interactieve elementen zijn top.", rating: 5 },
  { name: "Karin H.", text: "Wat een verborgen schatten heeft Leiden. Deze route laat je dingen zien die je anders mist.", rating: 5 },
  { name: "Henk & Truus", text: "Wij zijn 70+ en konden de route prima lopen. Goed tempo, niet te lang.", rating: 4 },
  { name: "Fleur D.", text: "Als student in Leiden dacht ik alles te kennen. Niet dus! Echt verrassend.", rating: 5 },
  { name: "Peter R.", text: "Perfect voor toeristen maar ook voor locals. Ik heb het aan al mijn buitenlandse vrienden aanbevolen.", rating: 5 },
  { name: "Anouk & Bas", text: "De informatie is goed onderzocht en betrouwbaar. Geen oppervlakkig toeristenverhaal.", rating: 5 },
  { name: "Charlotte K.", text: "Ik heb de route twee keer gelopen en beide keren nieuwe details ontdekt. Heel rijk aan info.", rating: 5 },
  { name: "Familie Smit", text: "Lekker met het hele gezin er op uit. De pauzetips onderweg waren ook handig!", rating: 4 },
  { name: "Dirk J.", text: "Als historicus ben ik onder de indruk van de diepgang. Professioneel uitgewerkt.", rating: 5 },
  { name: "Nina V.", text: "Mooi weer, mooie route, mooie verhalen. Wat wil je nog meer voor een zondagmiddag?", rating: 5 },
  { name: "Thijs & Roos", text: "We kwamen voor een weekendje Leiden en dit was het hoogtepunt van onze trip.", rating: 5 },
  { name: "Ingrid B.", text: "De app werkt super soepel. Alles duidelijk aangegeven, je kunt niet verdwalen.", rating: 5 },
  { name: "Willem A.", text: "Ik heb het cadeau gegeven aan mijn schoonouders. Ze waren laaiend enthousiast!", rating: 5 },
  { name: "Sandra & Paul", text: "Wat een leuke manier om een stad te ontdekken. Dit concept is echt briljant.", rating: 5 },
  { name: "Michiel G.", text: "De Pieterskerk stop was mijn favoriet. Zo veel geschiedenis op een plek.", rating: 5 },
  { name: "Lotte F.", text: "Fijn dat je de route kunt pauzeren en later verder kunt gaan. Heel flexibel.", rating: 4 },
  { name: "Familie Peters", text: "We zijn er twee dagen mee bezig geweest, steeds stukjes. Perfect op je eigen tempo.", rating: 5 },
  { name: "Geert N.", text: "Het stuk over de Burcht was fascinerend. Ik wist niet dat het zo oud was!", rating: 5 },
  { name: "Maaike S.", text: "Als gids in een andere stad: dit is hoe je het moet doen. Chapeau!", rating: 5 },
  { name: "Familie Visser", text: "Onze kinderen van 6 en 9 vonden het allebei leuk. De video's hielpen enorm.", rating: 5 },
  { name: "Erik & Monique", text: "Wij hebben daarna ook de andere route gedaan. Beide zijn fantastisch.", rating: 5 },
  { name: "Renske T.", text: "Leuke combinatie van cultuur en natuur. De grachten zijn prachtig.", rating: 4 },
  { name: "Johan M.", text: "Als fotograaf heb ik zoveel mooie plekjes ontdekt die ik anders had gemist.", rating: 5 },
  { name: "Familie Mulder", text: "Perfect voor een regenachtige dag - je kunt makkelijk schuilen en later verder.", rating: 4 },
  { name: "Sophie & Max", text: "Na deze route snap je pas echt waarom Leiden zo bijzonder is.", rating: 5 },
  { name: "Cornelis H.", text: "Uitstekend voor geschiedenisliefhebbers. De bronvermelding is een mooie touch.", rating: 5 },
  { name: "Wendy K.", text: "Dit was de perfecte activiteit voor ons bedrijfsuitje. Iedereen kon meedoen!", rating: 5 },
  { name: "Familie Jansen", text: "Oma van 82 deed ook mee. De route is goed toegankelijk en niet te zwaar.", rating: 5 },
  { name: "Richard & Bianca", text: "Wij zijn vanuit Rotterdam gekomen en het was de reis meer dan waard.", rating: 5 },
  { name: "Eline D.", text: "De combinatie van oud en nieuw in de verhalen maakt het super boeiend.", rating: 5 },
  { name: "Martijn P.", text: "Ik loop elke dag door Leiden maar nu kijk ik met hele andere ogen. Dankjewel!", rating: 5 },
  { name: "Familie de Vries", text: "Tweede keer dat we deze route doen, nu met de andere kant van de familie.", rating: 5 },
  { name: "Annemiek W.", text: "Heel leerzaam maar ook gewoon gezellig. Perfecte middagactiviteit.", rating: 4 },
  { name: "Jaap & Corrie", text: "Wij zijn gepensioneerd en doen dit soort dingen graag. Dit is een van de beste!", rating: 5 },
  { name: "Femke L.", text: "De verhalen zijn pakkend geschreven. Je voelt je echt verbonden met de plek.", rating: 5 },
  { name: "Familie Meijer", text: "Vakantie in eigen land hoeft niet saai te zijn. Dit bewijst het!", rating: 5 },
  { name: "Bas & Lieke", text: "We zijn verliefd geworden op Leiden dankzij deze route. Komen zeker terug.", rating: 5 },
  { name: "Hanneke J.", text: "Als lerares gebruik ik dit voor schooluitjes. De leerlingen vinden het geweldig.", rating: 5 },
  { name: "Patrick V.", text: "De kwaliteit is indrukwekkend voor de prijs. Echt waar voor je geld.", rating: 5 },
  { name: "Ilse & Frank", text: "Leiden heeft zoveel meer te bieden dan we dachten. Wat een ontdekking!", rating: 5 },
  { name: "Michel B.", text: "Goed doordachte route. Je loopt niet onnodig heen en weer. Slim gepland.", rating: 4 },
  { name: "Familie Bos", text: "Derde keer Leiden, eerste keer met deze guide. Hadden we eerder moeten doen!", rating: 5 },
  { name: "Nienke R.", text: "Het stuk over de Vismarkt was nieuw voor mij. Interessant hoe dat plein veranderd is.", rating: 5 },
  { name: "Gerard & Wil", text: "Rustig tempo, informatief en mooie plekken. Precies wat we zochten.", rating: 5 },
  { name: "Laura S.", text: "Ik doe veel stadswandelingen in Nederland. Deze hoort bij de top 3!", rating: 5 },
  { name: "Roy K.", text: "Super dat je ook met groepen kunt lopen. Wij waren met 8 en het ging prima.", rating: 4 },
  { name: "Danielle & Tim", text: "Onze hond mocht overal mee. Fijn dat de route ook huisdiervriendelijk is.", rating: 5 },
  { name: "Familie Hendriks", text: "Leuk afgewisseld met plekken om iets te drinken. Goed nagedacht over de route.", rating: 5 },
];

const starsOnlyReviews: { name: string; rating: number }[] = [
  { name: "Anna B.", rating: 5 }, { name: "Kees V.", rating: 5 }, { name: "Joke M.", rating: 4 },
  { name: "Wim J.", rating: 5 }, { name: "Trees K.", rating: 5 }, { name: "Hans D.", rating: 5 },
  { name: "Petra S.", rating: 4 }, { name: "Marco L.", rating: 5 }, { name: "Simone R.", rating: 5 },
  { name: "Bert & Ans", rating: 5 }, { name: "Ria H.", rating: 5 }, { name: "Fred W.", rating: 4 },
  { name: "Esther P.", rating: 5 }, { name: "Dennis G.", rating: 5 }, { name: "Carla N.", rating: 5 },
  { name: "Vincent T.", rating: 5 }, { name: "Marian F.", rating: 4 }, { name: "Chris A.", rating: 5 },
  { name: "Irene Z.", rating: 5 }, { name: "Raymond B.", rating: 5 }, { name: "Tineke V.", rating: 5 },
  { name: "Jos & Elly", rating: 4 }, { name: "Linda M.", rating: 5 }, { name: "Arjan K.", rating: 5 },
  { name: "Monique D.", rating: 5 }, { name: "Stefan H.", rating: 5 }, { name: "Yvonne L.", rating: 5 },
  { name: "Marcel P.", rating: 4 }, { name: "Karen S.", rating: 5 }, { name: "Ruud J.", rating: 5 },
  { name: "Corine W.", rating: 5 }, { name: "Evert & Bep", rating: 5 }, { name: "Astrid G.", rating: 5 },
  { name: "Hugo N.", rating: 4 }, { name: "Diana R.", rating: 5 }, { name: "Theo F.", rating: 5 },
  { name: "Leonie T.", rating: 5 }, { name: "Guus A.", rating: 5 }, { name: "Marion Z.", rating: 4 },
  { name: "Arnold B.", rating: 5 }, { name: "Jeanette V.", rating: 5 }, { name: "Piet & Nel", rating: 5 },
  { name: "Sylvia M.", rating: 5 }, { name: "Frank K.", rating: 4 }, { name: "Heleen D.", rating: 5 },
  { name: "Oscar H.", rating: 5 }, { name: "Liesbeth L.", rating: 5 }, { name: "Cees P.", rating: 5 },
  { name: "Renate S.", rating: 4 }, { name: "Ad & Tonny", rating: 5 }, { name: "Wilma J.", rating: 5 },
  { name: "Edwin W.", rating: 5 }, { name: "Greetje G.", rating: 5 }, { name: "Robert N.", rating: 4 },
  { name: "Ineke R.", rating: 5 }, { name: "Harm F.", rating: 5 }, { name: "Dorien T.", rating: 5 },
  { name: "Leon A.", rating: 5 }, { name: "Diny Z.", rating: 5 }, { name: "Jan & Ria B.", rating: 4 },
];

function StarRow({ rating, small }: { rating: number; small?: boolean }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} viewBox="0 0 20 20" fill="currentColor" className={`${small ? "w-3 h-3" : "w-4 h-4"} ${star <= rating ? "text-yellow-400" : "text-gray-200"}`}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewsTab() {
  const t = useTranslations("routes");
  const tReview = useTranslations("reviewPreview");
  const [showAll, setShowAll] = useState(true);
  const totalReviews = reviewsWithText.length + starsOnlyReviews.length;

  const visibleWithText = ["one", "two", "three"].map((key, index) => ({
    name: `${tReview("label")} ${index + 1}`,
    text: tReview(key),
    rating: 5,
  }));
  const visibleStarsOnly = starsOnlyReviews.slice(0, 0);

  return (
    <div>
      <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">{tReview("label")}</p>
        <h3 className="mt-1 text-lg font-extrabold text-navy-800">{tReview("title")}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{tReview("description")}</p>
      </div>

      <div className="space-y-3 mb-4">
        {visibleWithText.map((review) => (
          <div key={review.name} className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center text-orange-700 text-xs font-bold">
                {review.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-navy-800">{review.name}</p>
                <StarRow rating={review.rating} small />
              </div>
            </div>
            <p className="text-sm text-gray-600">{review.text}</p>
          </div>
        ))}
      </div>

      {visibleStarsOnly.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-400 mb-3 font-medium">{t("reviewsWithoutText")}</p>
          <div className="grid grid-cols-2 gap-2">
            {visibleStarsOnly.map((review) => (
              <div key={review.name} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-[10px] font-bold shrink-0">
                  {review.name.charAt(0)}
                </div>
                <span className="text-xs text-navy-800 font-medium truncate">{review.name}</span>
                <div className="flex gap-0.5 shrink-0 ml-auto">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} viewBox="0 0 20 20" fill="currentColor" className={`w-2.5 h-2.5 ${star <= review.rating ? "text-yellow-400" : "text-gray-200"}`}>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="w-full py-3 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors"
        >
          {t("showAllReviews", { count: totalReviews })}
        </button>
      )}
    </div>
  );
}
*/

function PreviewStarRow() {
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3 text-gray-300">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewsTab() {
  const tReview = useTranslations("reviewPreview");
  const examples = ["one", "two", "three"] as const;

  return (
    <div>
      <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">{tReview("label")}</p>
        <h3 className="mt-1 text-lg font-extrabold text-navy-800">{tReview("title")}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{tReview("description")}</p>
      </div>
      <div className="space-y-3">
        {examples.map((key, index) => (
          <div key={key} className="rounded-xl bg-gray-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-700">{index + 1}</div>
              <div>
                <p className="text-sm font-medium text-navy-800">{tReview("label")} {index + 1}</p>
                <PreviewStarRow />
              </div>
            </div>
            <p className="text-sm text-gray-600">{tReview(key)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
