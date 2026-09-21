"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { routes } from "@/data/routes";
import { locations, getLocationById, type LocationData } from "@/data/locations";
import { useAuth } from "@/lib/auth-context";
import { getSavedRoutes, deleteSavedRoute, saveRoute, addLocationToRoute, type SavedRoute } from "@/lib/saved-routes";

const LeafletMap = dynamic(() => import("@/components/map/LeafletMap").then((m) => m.LeafletMap), {
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

export function Dashboard() {
  const router = useRouter();
  const { user, isLoggedIn, isLoading, hasPaid, logout } = useAuth();
  const [savedRoutes, setSavedRoutes] = useState<SavedRoute[]>([]);
  const [addToRouteFor, setAddToRouteFor] = useState<string | null>(null);
  const [previewLoc, setPreviewLoc] = useState<LocationData | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [selectedMapPin, setSelectedMapPin] = useState<string | null>(null);

  const mapPins = useMemo(() =>
    locations
      .filter((l) => l.coords !== null)
      .map((l) => ({ location: l, lat: l.coords!.lat, lng: l.coords!.lng })),
    []
  );

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleAddToRoute = useCallback((routeId: string, locationId: string) => {
    const loc = locations.find((l) => l.id === locationId);
    const isStandard = routes.find((r) => r.id === routeId);

    if (isStandard) {
      let existing = getSavedRoutes().find(
        (sr) => sr.name === isStandard.title && sr.locationIds.join(",") === isStandard.locationIds.join(",")
      );
      if (!existing) {
        existing = getSavedRoutes().find((sr) => sr.name === isStandard.title);
      }
      if (!existing) {
        const saved = saveRoute(isStandard.title, [...isStandard.locationIds]);
        const result = addLocationToRoute(saved.id, locationId);
        setToast(result === "duplicate" ? `${loc?.name} staat al in ${isStandard.title}` : `Toegevoegd aan ${isStandard.title}`);
      } else {
        const result = addLocationToRoute(existing.id, locationId);
        setToast(result === "duplicate" ? `${loc?.name} staat al in ${existing.name}` : `Toegevoegd aan ${existing.name}`);
      }
    } else {
      const result = addLocationToRoute(routeId, locationId);
      const route = getSavedRoutes().find((r) => r.id === routeId);
      setToast(result === "duplicate" ? `${loc?.name} staat al in ${route?.name || "deze route"}` : `Toegevoegd aan ${route?.name || "je route"}`);
    }

    setSavedRoutes(getSavedRoutes());
    setAddToRouteFor(null);
  }, []);

  const handleCreateNewRoute = useCallback((locationId: string) => {
    const loc = locations.find((l) => l.id === locationId);
    saveRoute(`Route met ${loc?.name || "locatie"}`, [locationId]);
    setSavedRoutes(getSavedRoutes());
    setToast(`Nieuwe route aangemaakt met ${loc?.name}`);
    setAddToRouteFor(null);
  }, []);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoading, isLoggedIn, router]);

  useEffect(() => {
    if (hasPaid) {
      setSavedRoutes(getSavedRoutes());
    }
  }, [hasPaid]);

  function handleLogout() {
    logout();
    router.push("/");
  }

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-gray-400">Laden...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {toast && (
        <div className="fixed top-20 left-4 right-4 z-[2000] flex justify-center pointer-events-none">
          <div className="pointer-events-auto px-4 py-3 rounded-xl shadow-xl text-sm font-medium flex items-center gap-2 max-w-sm bg-green-600 text-white">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 shrink-0">
              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
            </svg>
            {toast}
          </div>
        </div>
      )}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-navy-800">Welkom, {user.name}</h1>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Uitloggen
        </button>
      </div>

      {hasPaid ? (
        <>
          {savedRoutes.some((sr) => sr.arrivedLocationIds.length > 0 && sr.arrivedLocationIds.length < sr.locationIds.length) && (() => {
            const active = savedRoutes.find((sr) => sr.arrivedLocationIds.length > 0 && sr.arrivedLocationIds.length < sr.locationIds.length)!;
            const progress = active.arrivedLocationIds.length;
            const total = active.locationIds.length;
            const pct = Math.round((progress / total) * 100);
            return (
              <Link
                href={`/my-routes/${active.id}`}
                className="block bg-orange-50 border-2 border-orange-300 rounded-xl p-4 mb-4 hover:bg-orange-100 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-white">
                      <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-orange-800">Je bent bezig met een route</p>
                    <p className="text-xs text-orange-600">{active.name} - {progress}/{total} stops bezocht</p>
                  </div>
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-orange-500 shrink-0">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="w-full bg-orange-200 rounded-full h-1.5">
                  <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                </div>
              </Link>
            );
          })()}

          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-green-600 shrink-0">
              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm font-medium text-green-800">Leiden pakket actief</p>
              <p className="text-xs text-green-600">Volledige toegang tot alle routes, video&apos;s en locaties</p>
            </div>
          </div>

          <h2 className="text-lg font-bold text-navy-800 mb-4">Jouw routes</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {routes.slice(0, 2).map((route) => (
              <Link
                key={route.id}
                href={`/routes/${route.slug}`}
                className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow flex items-center gap-4"
              >
                <div className="w-16 h-16 rounded-lg bg-gray-200 shrink-0 overflow-hidden">
                  {route.image && (
                    <img src={route.image} alt={route.title} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-navy-800 text-sm">{route.title}</h3>
                  <p className="text-xs text-gray-500">{route.subtitle}</p>
                  <p className="text-xs text-gray-400 mt-1">{route.stops} stops - {route.distance}</p>
                </div>
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-orange-500 shrink-0">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-navy-800">Mijn routes</h2>
            <Link href="/my-routes" className="text-sm text-orange-500 font-medium hover:text-orange-600">
              Bekijk alle
            </Link>
          </div>
          {savedRoutes.length > 0 ? (
            <div className="space-y-3 mb-8">
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
          ) : (
            <p className="text-sm text-gray-400 mb-8">Nog geen eigen routes. Stel je eerste samen!</p>
          )}

          <Link
            href="/routes/custom"
            className="block bg-orange-50 border-2 border-orange-200 rounded-xl p-4 mb-8 hover:bg-orange-100 transition-colors"
          >
            <h3 className="font-bold text-orange-600 mb-1">Maak je eigen route</h3>
            <p className="text-sm text-gray-600">Kies je eigen stops en wij plannen de slimste volgorde</p>
          </Link>

          {mapPins.length > 0 && (
            <>
              <h2 className="text-lg font-bold text-navy-800 mb-4">Kaart van Leiden</h2>
              <div className="h-56 rounded-xl overflow-hidden shadow-md mb-8">
                <LeafletMap
                  pins={mapPins}
                  selectedId={selectedMapPin}
                  onSelectPin={(id) => setSelectedMapPin(id === selectedMapPin ? null : id)}
                />
              </div>
            </>
          )}

          <h2 className="text-lg font-bold text-navy-800 mb-2">Alle locaties</h2>
          <p className="text-xs text-gray-400 mb-4">Voeg locaties toe aan een route of bekijk alvast het verhaal</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {locations.map((loc) => (
              <div
                key={loc.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-24 bg-gray-200 overflow-hidden">
                  {loc.image && (
                    <img src={loc.image} alt={loc.name} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-navy-800 text-xs leading-tight">{loc.name}</h4>
                  <p className="text-[10px] text-gray-500 mt-1 line-clamp-2">{loc.shortDescription}</p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <button
                      onClick={() => setAddToRouteFor(loc.id)}
                      className="inline-flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white text-[9px] font-bold px-2 py-1 rounded-full transition-colors"
                    >
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                      </svg>
                      Route
                    </button>
                    <button
                      onClick={() => setPreviewLoc(loc)}
                      className="inline-flex items-center gap-1 bg-navy-800 hover:bg-navy-900 text-white text-[9px] font-bold px-2 py-1 rounded-full transition-colors"
                    >
                      Verhaal
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {addToRouteFor && (
            <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={() => setAddToRouteFor(null)}>
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
              <div className="relative bg-white rounded-t-2xl shadow-xl w-full max-w-md max-h-[70vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <div className="bg-navy-800 px-4 py-3 flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-medium">Voeg toe aan route:</p>
                    <p className="text-orange-400 text-sm font-bold truncate">
                      {locations.find((l) => l.id === addToRouteFor)?.name}
                    </p>
                  </div>
                  <button onClick={() => setAddToRouteFor(null)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors shrink-0 ml-2">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                  </button>
                </div>
                <div className="overflow-y-auto max-h-[50vh] px-3 py-3 space-y-1">
                  {routes.map((route) => (
                    <button
                      key={route.id}
                      onClick={() => handleAddToRoute(route.id, addToRouteFor)}
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gray-200 shrink-0 overflow-hidden">
                        {route.image && <img src={route.image} alt={route.title} className="w-full h-full object-cover" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-navy-800 text-sm truncate">{route.title}</h4>
                        <p className="text-[11px] text-gray-400">{route.stops} stops</p>
                      </div>
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-300 shrink-0">
                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                      </svg>
                    </button>
                  ))}
                  {savedRoutes.length > 0 && (
                    <>
                      <div className="px-1 pt-2 pb-1">
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Mijn routes</p>
                      </div>
                      {savedRoutes.map((sr) => (
                        <button
                          key={sr.id}
                          onClick={() => handleAddToRoute(sr.id, addToRouteFor)}
                          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors text-left"
                        >
                          <div className="w-10 h-10 rounded-lg bg-orange-100 shrink-0 flex items-center justify-center">
                            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-orange-500" stroke="currentColor" strokeWidth="2">
                              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                              <circle cx="12" cy="9" r="2.5" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-navy-800 text-sm truncate">{sr.name}</h4>
                            <p className="text-[11px] text-gray-400">{sr.locationIds.length} stops</p>
                          </div>
                          <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-300 shrink-0">
                            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                          </svg>
                        </button>
                      ))}
                    </>
                  )}
                </div>
                <div className="border-t border-gray-100 px-4 py-3">
                  <button
                    onClick={() => handleCreateNewRoute(addToRouteFor)}
                    className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-orange-300 text-orange-500 hover:bg-orange-50 font-semibold py-2.5 rounded-xl text-sm transition-colors"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>
                    Nieuwe route maken
                  </button>
                </div>
              </div>
            </div>
          )}

          {previewLoc && (
            <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setPreviewLoc(null)}>
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
              <div className="relative bg-white rounded-2xl shadow-xl w-[90%] max-w-md max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
                {previewLoc.image && (
                  <div className="h-40 bg-gray-200 overflow-hidden">
                    <img src={previewLoc.image} alt={previewLoc.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange-500 text-white uppercase tracking-wide">
                      {previewLoc.mainTheme}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-navy-800 mb-2">{previewLoc.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{previewLoc.shortDescription}</p>
                  <p className="text-xs text-gray-400 italic mb-4">
                    Volledig verhaal beschikbaar tijdens de route.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setPreviewLoc(null); setAddToRouteFor(previewLoc.id); }}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-full text-sm transition-colors flex items-center justify-center gap-1.5"
                    >
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                      </svg>
                      Voeg toe aan route
                    </button>
                    <button
                      onClick={() => setPreviewLoc(null)}
                      className="flex-1 border border-gray-300 text-gray-700 font-semibold py-2.5 rounded-full text-sm hover:bg-gray-50 transition-colors"
                    >
                      Sluiten
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-6 text-center">
            <h2 className="text-lg font-bold text-navy-800 mb-2">Je hebt nog geen pakket</h2>
            <p className="text-sm text-gray-600 mb-4">
              Koop het Leiden pakket om toegang te krijgen tot alle routes, video&apos;s en verborgen parels.
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm"
            >
              Bekijk het Leiden pakket
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

          <h2 className="text-lg font-bold text-navy-800 mb-4">Routes (preview)</h2>
          <div className="space-y-3 mb-8">
            {routes.slice(0, 2).map((route) => (
              <div key={route.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4 opacity-60">
                <div className="w-16 h-16 rounded-lg bg-gray-200 shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-navy-800 text-sm">{route.title}</h3>
                  <p className="text-xs text-gray-500">{route.subtitle}</p>
                </div>
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-300 shrink-0">
                  <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                </svg>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
