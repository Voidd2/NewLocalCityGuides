"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { getLocationById, locations } from "@/data/locations";
import { getVisibleSpots } from "@/data/local-spots";
import { routes } from "@/data/routes";
import { useAuth } from "@/lib/auth-context";
import {
  getSavedRoutes,
  getVisitedCount,
  ROUTES_CHANGED_EVENT,
  type SavedRoute,
} from "@/lib/saved-routes";

const MapLibreMap = dynamic(
  () => import("@/components/map/MapLibreMap").then((module) => module.MapLibreMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-blue-50">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
      </div>
    ),
  },
);

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
    </svg>
  );
}

function PinPlaceholder({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400">
      <svg viewBox="0 0 24 24" fill="none" className={compact ? "h-5 w-5" : "h-8 w-8"} stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    </div>
  );
}

export function Dashboard() {
  const t = useTranslations("dashboard");
  const tCommon = useTranslations("common");
  const router = useRouter();
  const { user, isLoggedIn, isLoading, hasPaid, logout } = useAuth();
  const [savedRoutes, setSavedRoutes] = useState<SavedRoute[]>([]);

  const mapPins = useMemo(() => {
    const storyPins = locations
      .filter((location) => location.coords)
      .map((location) => ({
        id: location.id,
        name: location.name,
        category: location.mainTheme,
        kind: "location" as const,
        lat: location.coords!.lat,
        lng: location.coords!.lng,
        icon: "\u{1F4D6}",
      }));
    const localPins = getVisibleSpots()
      .filter((spot) => spot.coords)
      .map((spot) => ({
        id: spot.id,
        name: spot.name,
        category: spot.category,
        kind: "spot" as const,
        lat: spot.coords!.lat,
        lng: spot.coords!.lng,
        icon: spot.category === "museum" ? "\u{1F3DB}\uFE0F" : spot.category === "visboer" ? "\u{1F41F}" : "\u{1F4CD}",
      }));
    return [...storyPins, ...localPins];
  }, []);

  const discoverLocations = ["L001", "L002", "L006", "L010"].flatMap((id) => {
    const location = getLocationById(id);
    return location ? [location] : [];
  });

  useEffect(() => {
    if (!isLoading && !isLoggedIn) router.push("/login");
  }, [isLoading, isLoggedIn, router]);

  useEffect(() => {
    if (!hasPaid) return;
    const refresh = () => setSavedRoutes(getSavedRoutes());
    const frame = requestAnimationFrame(refresh);
    window.addEventListener(ROUTES_CHANGED_EVENT, refresh);
    window.addEventListener("focus", refresh);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener(ROUTES_CHANGED_EVENT, refresh);
      window.removeEventListener("focus", refresh);
    };
  }, [hasPaid]);

  function handleLogout() {
    logout();
    router.push("/");
  }

  if (isLoading || !user) {
    return <div className="flex min-h-[60vh] items-center justify-center text-gray-400">{tCommon("loading")}</div>;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 md:py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-navy-800 md:text-3xl">{t("welcome", { name: user.name })}</h1>
          <p className="mt-1 text-sm text-gray-500">{user.email}</p>
        </div>
        <div className="flex items-center gap-3">
          {hasPaid && (
            <div className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 text-sm font-semibold text-green-700">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-white" aria-hidden="true">✓</span>
              {t("packageActive")}
            </div>
          )}
          <button onClick={handleLogout} className="min-h-11 rounded-xl px-3 text-sm font-medium text-gray-500 transition hover:bg-white hover:text-navy-800">
            {tCommon("logout")}
          </button>
        </div>
      </div>

      {hasPaid ? (
        <div className="space-y-10">
          {savedRoutes.some((route) => getVisitedCount(route) > 0 && getVisitedCount(route) < route.locationIds.length) && (() => {
            const active = savedRoutes.find((route) => getVisitedCount(route) > 0 && getVisitedCount(route) < route.locationIds.length)!;
            const progress = getVisitedCount(active);
            const total = active.locationIds.length;
            const percentage = Math.round((progress / total) * 100);
            return (
              <Link href={`/my-routes/${active.id}`} className="group block rounded-2xl border border-orange-200 bg-gradient-to-r from-orange-50 to-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg shadow-orange-500/20">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true"><path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" /></svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-orange-600">{t("activeRoute")}</p>
                    <p className="truncate font-bold text-navy-800">{active.name}</p>
                  </div>
                  <span className="text-xs font-semibold text-orange-600">{progress}/{total} {t("stopsVisited")}</span>
                  <Chevron className="h-5 w-5 shrink-0 text-orange-500 transition group-hover:translate-x-1" />
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-orange-100"><div className="h-full rounded-full bg-orange-500" style={{ width: `${percentage}%` }} /></div>
              </Link>
            );
          })()}

          <section>
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-orange-600">{t("includedInPackage")}</p>
                <h2 className="text-xl font-extrabold text-navy-800 md:text-2xl">{t("yourRoutes")}</h2>
              </div>
              <Link href="/routes" className="inline-flex min-h-11 items-center gap-1 px-2 text-sm font-semibold text-orange-600 hover:text-orange-700">{t("viewAll")} <span aria-hidden="true">→</span></Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {routes.slice(0, 2).map((route) => (
                <Link key={route.id} href={`/routes/${route.slug}`} className="group flex min-h-28 items-center gap-4 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-lg">
                  <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                    {route.image ? <Image src={route.image} alt={route.title} fill sizes="112px" className="object-cover transition duration-500 group-hover:scale-105" /> : <PinPlaceholder />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-navy-800">{route.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm leading-snug text-gray-500">{route.subtitle}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-gray-500">
                      <span>{route.type === "walking" ? t("walking") : t("cycling")} · {route.stops} {t("stops")}</span>
                      <span>⌖ {route.distance}</span>
                    </div>
                  </div>
                  <Chevron className="h-6 w-6 shrink-0 text-orange-500 transition group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-navy-800 md:text-2xl">{t("myRoutes")}</h2>
                <p className="mt-1 text-sm text-gray-500">{t("myRoutesIntro")}</p>
              </div>
              {savedRoutes.length > 0 && <Link href="/my-routes" className="inline-flex min-h-11 items-center px-2 text-sm font-semibold text-orange-600 hover:text-orange-700">{t("viewAll")} →</Link>}
            </div>

            {savedRoutes.length > 0 && (
              <div className="mb-4 space-y-3">
                {savedRoutes.slice(0, 2).map((savedRoute) => {
                  const routeLocations = savedRoute.locationIds.map(getLocationById).filter(Boolean);
                  const progress = getVisitedCount(savedRoute);
                  const total = savedRoute.locationIds.length;
                  const percentage = total > 0 ? Math.round((progress / total) * 100) : 0;
                  return (
                    <Link key={savedRoute.id} href={`/my-routes/${savedRoute.id}`} className="group block rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-orange-200 hover:shadow-md">
                      <div className="mb-2 flex items-center justify-between gap-4"><h3 className="truncate font-bold text-navy-800">{savedRoute.name}</h3><span className="shrink-0 text-xs text-gray-500">{progress}/{total} {t("visited")}</span></div>
                      <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full bg-orange-500" style={{ width: `${percentage}%` }} /></div>
                      <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {routeLocations.slice(0, 5).map((location) => (
                            <div key={location!.id} className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-white bg-gray-100">
                              {location!.image ? <Image src={location!.image} alt="" fill sizes="36px" className="object-cover" /> : <PinPlaceholder compact />}
                            </div>
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-orange-600 transition group-hover:translate-x-1" aria-hidden="true">→</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            <div className="grid gap-3 md:grid-cols-2">
              <Link href="/routes/custom" className="group flex min-h-24 items-center gap-4 rounded-2xl border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-white p-4 transition hover:border-orange-400 hover:shadow-md">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-500 text-3xl font-light text-white shadow-lg shadow-orange-500/20" aria-hidden="true">+</span>
                <div className="min-w-0 flex-1"><h3 className="font-bold text-orange-600">{t("createOwnRoute")}</h3><p className="mt-0.5 text-sm text-gray-500">{t("smartRoutePlanning")}</p></div>
                <span className="text-2xl text-orange-500 transition group-hover:translate-x-1" aria-hidden="true">›</span>
              </Link>
              <Link href="/activiteiten" className="group flex min-h-24 items-center gap-4 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-white p-4 transition hover:border-navy-400 hover:shadow-md">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-800 text-white" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8"><path d="M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 011 1v14H4V6a1 1 0 011-1z" /></svg></span>
                <div className="min-w-0 flex-1"><h3 className="font-bold text-navy-800">{t("bookActivities")}</h3><p className="mt-0.5 text-sm text-gray-500">{t("activitiesDesc")}</p></div>
                <span className="text-2xl text-navy-800 transition group-hover:translate-x-1" aria-hidden="true">›</span>
              </Link>
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-end justify-between gap-4">
              <div><h2 className="text-xl font-extrabold text-navy-800 md:text-2xl">{t("discoverLeiden")}</h2><p className="mt-1 text-sm text-gray-500">{t("discoverIntro")}</p></div>
              <Link href="/ontdek" className="inline-flex min-h-11 items-center gap-1 px-2 text-sm font-semibold text-orange-600 hover:text-orange-700">{t("viewAll")} <span aria-hidden="true">→</span></Link>
            </div>
            <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0">
              {discoverLocations.map((location) => (
                <Link key={location.id} href={`/locations/${location.slug}`} className="group min-w-[168px] snap-start overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg sm:min-w-0">
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">{location.image ? <Image src={location.image} alt={location.name} fill sizes="(min-width: 640px) 220px, 168px" className="object-cover transition duration-500 group-hover:scale-105" /> : <PinPlaceholder />}</div>
                  <div className="p-3"><h3 className="min-h-10 text-sm font-bold leading-tight text-navy-800">{location.name}</h3><p className="mt-2 flex items-center gap-1.5 text-xs text-gray-500"><span className="text-orange-500" aria-hidden="true">⌖</span>{location.id === "L002" ? t("localPlace") : location.id === "L010" ? t("naturePlace") : t("storyPlace")}</p></div>
                </Link>
              ))}
            </div>
          </section>

          {mapPins.length > 0 && (
            <section>
              <div className="mb-4"><h2 className="text-xl font-extrabold text-navy-800 md:text-2xl">{t("mapOfLeiden")}</h2><p className="mt-1 text-sm text-gray-500">{t("mapIntro")}</p></div>
              <Link href="/map" className="group grid overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:border-orange-200 hover:shadow-lg md:grid-cols-[1.05fr_0.95fr]">
                <div className="pointer-events-none relative h-48 overflow-hidden md:h-56" aria-hidden="true"><MapLibreMap pins={mapPins} selectedId={null} onSelectPin={() => undefined} /><div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/20" /></div>
                <div className="flex items-center p-5 md:p-7"><div><p className="text-2xl font-extrabold text-navy-800">{t("locationsCount", { count: mapPins.length })}</p><p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-500">{t("mapSummary")}</p><span className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-orange-500 px-5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition group-hover:bg-orange-600">{t("viewFullMap")} <span aria-hidden="true">→</span></span></div></div>
              </Link>
            </section>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          <div className="rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-6 text-center shadow-sm">
            <h2 className="text-xl font-bold text-navy-800">{t("noPackage")}</h2>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-gray-600">{t("noPackageDesc")}</p>
            <Link href="/pricing" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-orange-500 px-6 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600">{t("viewPackage")} <span aria-hidden="true">→</span></Link>
          </div>
          <section>
            <h2 className="mb-4 text-xl font-extrabold text-navy-800">{t("routesPreview")}</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {routes.slice(0, 2).map((route) => (
                <div key={route.id} className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 opacity-70"><div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100"><PinPlaceholder /></div><div className="min-w-0 flex-1"><h3 className="font-bold text-navy-800">{route.title}</h3><p className="line-clamp-2 text-sm text-gray-500">{route.subtitle}</p></div><span className="text-gray-300" aria-hidden="true">🔒</span></div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
