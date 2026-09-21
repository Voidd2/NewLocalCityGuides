"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { Link } from "@/i18n/navigation";
import { locations } from "@/data/locations";
import { routes as standardRoutes } from "@/data/routes";
import { useAuth } from "@/lib/auth-context";
import { getSavedRoutes, saveRoute, addLocationToRoute, type SavedRoute } from "@/lib/saved-routes";

const LeafletMap = dynamic(() => import("./LeafletMap").then((m) => m.LeafletMap), {
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

const categories = [
  { key: "all", label: "Alles", icon: null },
  { key: "origins", label: "Geschiedenis", icon: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" },
  { key: "art", label: "Kunst", icon: "M12 14l9-5-9-5-9 5 9 5z" },
  { key: "science", label: "Wetenschap", icon: "M9.663 17h4.674M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
  { key: "religion", label: "Religie", icon: "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" },
  { key: "trade", label: "Handel", icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" },
];

const TEASER_COUNT = 3;

export function MapPage() {
  const { hasPaid, isLoading } = useAuth();
  const [activeCategory, setActiveCategory] = useState("all");
  const [view, setView] = useState<"map" | "list">("map");
  const [selectedPin, setSelectedPin] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [addToRouteFor, setAddToRouteFor] = useState<string | null>(null);
  const [savedRoutes, setSavedRoutes] = useState<SavedRoute[]>([]);
  const [toast, setToast] = useState<{ message: string; type: "success" | "warning" } | null>(null);

  useEffect(() => {
    setSavedRoutes(getSavedRoutes());
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const filtered = useMemo(() =>
    locations
      .filter((l) => activeCategory === "all" || l.categories.includes(activeCategory))
      .filter((l) => !searchQuery || l.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [activeCategory, searchQuery]
  );

  const pins = useMemo(() =>
    filtered
      .filter((l) => l.coords !== null)
      .map((l) => ({ location: l, lat: l.coords!.lat, lng: l.coords!.lng })),
    [filtered]
  );

  const handleSelectPin = useCallback((id: string) => {
    setSelectedPin((prev) => (prev === id ? null : id));
    setAddToRouteFor(null);
  }, []);

  const selectedLocation = selectedPin
    ? locations.find((l) => l.id === selectedPin)
    : null;

  const addToRouteLocation = addToRouteFor
    ? locations.find((l) => l.id === addToRouteFor)
    : null;

  const standardRoutesAsSaved: SavedRoute[] = standardRoutes.map((r) => ({
    id: r.id,
    name: r.title,
    locationIds: r.locationIds,
    createdAt: "",
    arrivedLocationIds: [],
  }));

  const allRoutesForPicker = [...standardRoutesAsSaved, ...savedRoutes];

  const handleAddToExistingRoute = (routeId: string, locationId: string) => {
    const isStandard = standardRoutes.find((r) => r.id === routeId);

    if (isStandard) {
      let existing = savedRoutes.find(
        (sr) => sr.name === isStandard.title && sr.locationIds.join(",") === isStandard.locationIds.join(",")
      );
      if (!existing) {
        existing = savedRoutes.find((sr) => sr.name === isStandard.title);
      }
      if (!existing) {
        const saved = saveRoute(isStandard.title, [...isStandard.locationIds]);
        const result = addLocationToRoute(saved.id, locationId);
        if (result === "duplicate") {
          setToast({ message: `${addToRouteLocation?.name} staat al in ${isStandard.title}`, type: "warning" });
        } else {
          setToast({ message: `Toegevoegd aan ${isStandard.title}`, type: "success" });
        }
      } else {
        const result = addLocationToRoute(existing.id, locationId);
        if (result === "duplicate") {
          setToast({ message: `${addToRouteLocation?.name} staat al in ${existing.name}`, type: "warning" });
        } else {
          setToast({ message: `Toegevoegd aan ${existing.name}`, type: "success" });
        }
      }
    } else {
      const result = addLocationToRoute(routeId, locationId);
      const route = savedRoutes.find((r) => r.id === routeId);
      if (result === "duplicate") {
        setToast({ message: `${addToRouteLocation?.name} staat al in ${route?.name || "deze route"}`, type: "warning" });
      } else {
        setToast({ message: `Toegevoegd aan ${route?.name || "je route"}`, type: "success" });
      }
    }

    setSavedRoutes(getSavedRoutes());
    setAddToRouteFor(null);
  };

  const handleCreateNewRoute = (locationId: string) => {
    const loc = locations.find((l) => l.id === locationId);
    const saved = saveRoute(`Route met ${loc?.name || "locatie"}`, [locationId]);
    setSavedRoutes(getSavedRoutes());
    setToast({ message: `Nieuwe route aangemaakt met ${loc?.name}`, type: "success" });
    setAddToRouteFor(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="animate-pulse text-gray-400">Laden...</div>
      </div>
    );
  }

  const teaserLocations = filtered.slice(0, TEASER_COUNT);
  const lockedLocations = filtered.slice(TEASER_COUNT);

  return (
    <div className="pb-20">
      {toast && (
        <div className={`fixed top-20 left-4 right-4 z-[2000] flex justify-center pointer-events-none`}>
          <div className={`pointer-events-auto px-4 py-3 rounded-xl shadow-xl text-sm font-medium flex items-center gap-2 max-w-sm ${
            toast.type === "success"
              ? "bg-green-600 text-white"
              : "bg-orange-500 text-white"
          }`}>
            {toast.type === "success" ? (
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 shrink-0">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 shrink-0">
                <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            )}
            {toast.message}
          </div>
        </div>
      )}

      <div className="bg-navy-800 text-white px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-full whitespace-nowrap transition-all ${
                activeCategory === cat.key
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              {cat.icon && (
                <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="2">
                  <path d={cat.icon} />
                </svg>
              )}
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {hasPaid && (
            <div className="relative">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
              </svg>
              <input
                type="text"
                placeholder="Zoek..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-1.5 rounded-lg border border-gray-200 text-sm w-40 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
              />
            </div>
          )}
          <span className="text-xs text-gray-400">
            {hasPaid ? filtered.length : teaserLocations.length} locatie{(hasPaid ? filtered.length : teaserLocations.length) !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
          <button
            onClick={() => setView("map")}
            className={`flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
              view === "map" ? "bg-white text-navy-800 shadow-sm" : "text-gray-500"
            }`}
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
              <path fillRule="evenodd" d="M8.157 2.175a1.5 1.5 0 00-1.147 0l-4.084 1.69A1.5 1.5 0 002 5.251v10.877a1.5 1.5 0 002.074 1.386l3.51-1.453 4.26 1.763a1.5 1.5 0 001.146 0l4.083-1.69A1.5 1.5 0 0018 14.748V3.873a1.5 1.5 0 00-2.073-1.386l-3.51 1.452-4.26-1.763z" clipRule="evenodd" />
            </svg>
            Kaart
          </button>
          <button
            onClick={() => setView("list")}
            className={`flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
              view === "list" ? "bg-white text-navy-800 shadow-sm" : "text-gray-500"
            }`}
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
              <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" clipRule="evenodd" />
            </svg>
            Lijst
          </button>
        </div>
      </div>

      {view === "map" ? (
        <div className="relative mx-4">
          {hasPaid ? (
            <>
              <div className="h-[65vh] rounded-xl overflow-hidden shadow-lg">
                <LeafletMap
                  pins={pins}
                  selectedId={selectedPin}
                  onSelectPin={handleSelectPin}
                />
              </div>

              {selectedLocation && !addToRouteFor && (
                <div className="absolute bottom-4 left-4 right-4 z-[1000]">
                  <div className="bg-white rounded-2xl shadow-xl p-4 max-w-sm mx-auto border border-gray-100">
                    <button
                      onClick={() => setSelectedPin(null)}
                      className="absolute top-3 right-3 w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                      </svg>
                    </button>
                    <div className="flex items-start gap-3">
                      <div className="w-20 h-20 rounded-xl bg-gray-200 shrink-0 overflow-hidden">
                        {selectedLocation.image ? (
                          <img src={selectedLocation.image} alt={selectedLocation.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center">
                            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white/20" stroke="currentColor" strokeWidth="1.5">
                              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                              <circle cx="12" cy="9" r="2.5" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0 pr-6">
                        <h3 className="font-bold text-navy-800 text-sm leading-tight">{selectedLocation.name}</h3>
                        <span className="text-[10px] text-orange-500 font-medium">{selectedLocation.mainTheme}</span>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{selectedLocation.shortDescription}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => setAddToRouteFor(selectedLocation.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-full text-xs transition-colors"
                      >
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                        </svg>
                        Voeg toe aan route
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {addToRouteFor && addToRouteLocation && (
                <div className="absolute bottom-4 left-2 right-2 z-[1000]">
                  <div className="bg-white rounded-2xl shadow-xl max-w-md mx-auto border border-gray-100 overflow-hidden">
                    <div className="bg-navy-800 px-4 py-3 flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-medium truncate">
                          Voeg toe aan route:
                        </p>
                        <p className="text-orange-400 text-sm font-bold truncate">
                          {addToRouteLocation.name}
                        </p>
                      </div>
                      <button
                        onClick={() => setAddToRouteFor(null)}
                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors shrink-0 ml-2"
                      >
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                        </svg>
                      </button>
                    </div>

                    <div className="max-h-[45vh] overflow-y-auto">
                      {allRoutesForPicker.length > 0 && (
                        <div className="px-4 pt-3 pb-1">
                          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Kies een route</p>
                        </div>
                      )}

                      <div className="px-3 pb-2 space-y-1">
                        {standardRoutes.map((route) => {
                          const alreadyIn = route.locationIds.includes(addToRouteFor!);
                          const savedVersion = savedRoutes.find(
                            (sr) => sr.name === route.title || sr.locationIds.join(",") === route.locationIds.join(",")
                          );
                          const inSaved = savedVersion?.locationIds.includes(addToRouteFor!);

                          return (
                            <button
                              key={route.id}
                              onClick={() => handleAddToExistingRoute(route.id, addToRouteFor!)}
                              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors text-left group"
                            >
                              <div className="w-10 h-10 rounded-lg bg-gray-200 shrink-0 overflow-hidden">
                                {route.image && (
                                  <img src={route.image} alt={route.title} className="w-full h-full object-cover" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <h4 className="font-semibold text-navy-800 text-sm truncate">{route.title}</h4>
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-navy-800 text-white uppercase shrink-0">Standaard</span>
                                </div>
                                <p className="text-[11px] text-gray-400">{route.stops} stops</p>
                              </div>
                              {(alreadyIn || inSaved) ? (
                                <span className="text-[10px] font-medium text-orange-500 bg-orange-50 px-2 py-1 rounded-full shrink-0">
                                  Al toegevoegd
                                </span>
                              ) : (
                                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-300 group-hover:text-orange-500 shrink-0 transition-colors">
                                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                </svg>
                              )}
                            </button>
                          );
                        })}

                        {savedRoutes.length > 0 && (
                          <>
                            <div className="px-1 pt-2 pb-1">
                              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Mijn routes</p>
                            </div>
                            {savedRoutes.map((route) => {
                              const alreadyIn = route.locationIds.includes(addToRouteFor!);
                              return (
                                <button
                                  key={route.id}
                                  onClick={() => handleAddToExistingRoute(route.id, addToRouteFor!)}
                                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors text-left group"
                                >
                                  <div className="w-10 h-10 rounded-lg bg-orange-100 shrink-0 flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-orange-500" stroke="currentColor" strokeWidth="2">
                                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                                      <circle cx="12" cy="9" r="2.5" />
                                    </svg>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-navy-800 text-sm truncate">{route.name}</h4>
                                    <p className="text-[11px] text-gray-400">{route.locationIds.length} stops</p>
                                  </div>
                                  {alreadyIn ? (
                                    <span className="text-[10px] font-medium text-orange-500 bg-orange-50 px-2 py-1 rounded-full shrink-0">
                                      Al toegevoegd
                                    </span>
                                  ) : (
                                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-300 group-hover:text-orange-500 shrink-0 transition-colors">
                                      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                    </svg>
                                  )}
                                </button>
                              );
                            })}
                          </>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-gray-100 px-4 py-3">
                      <button
                        onClick={() => handleCreateNewRoute(addToRouteFor!)}
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
            </>
          ) : (
            <div className="h-[60vh] rounded-xl bg-gray-100 flex items-center justify-center">
              <div className="text-center px-6">
                <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-gray-300 mx-auto mb-3" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <h3 className="font-bold text-navy-800 text-base mb-1">Kaart beschikbaar na aankoop</h3>
                <p className="text-xs text-gray-500 mb-4">Bekijk alle {locations.length} locaties op de interactieve kaart met het Leiden pakket.</p>
                <Link
                  href="/pricing"
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
                >
                  Bekijk prijzen
                </Link>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4">
          {hasPaid && (
            <p className="text-xs text-gray-400 mb-2">
              {filtered.length} locatie{filtered.length !== 1 ? "s" : ""} gevonden
            </p>
          )}

          {!hasPaid && (
            <p className="text-xs text-gray-400 mb-2">
              {TEASER_COUNT} van {locations.length} locaties (preview)
            </p>
          )}

          <div className="space-y-2 pb-4">
            {(hasPaid ? filtered : teaserLocations).map((loc) => (
              <button
                key={loc.id}
                onClick={() => {
                  if (hasPaid) {
                    setSelectedPin(loc.id);
                    setView("map");
                  }
                }}
                className="w-full flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-3 hover:shadow-md transition-shadow text-left"
              >
                <div className="w-16 h-16 rounded-xl bg-gray-200 shrink-0 overflow-hidden">
                  {loc.image ? (
                    <img src={loc.image} alt={loc.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white/20" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                        <circle cx="12" cy="9" r="2.5" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-navy-800 text-sm">{loc.name}</h3>
                  <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{loc.shortDescription}</p>
                  <span className="text-[10px] text-orange-500 font-medium mt-0.5 inline-block">{loc.mainTheme}</span>
                </div>
                {hasPaid ? (
                  <div className="flex items-center gap-1 text-orange-500 shrink-0">
                    <span className="text-[10px] font-medium">Op kaart</span>
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </div>
                ) : (
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-300 shrink-0">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}

            {!hasPaid && lockedLocations.length > 0 && (
              <div className="relative">
                <div className="space-y-2 blur-[6px] pointer-events-none select-none">
                  {lockedLocations.slice(0, 3).map((loc) => (
                    <div
                      key={loc.id}
                      className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-3"
                    >
                      <div className="w-16 h-16 rounded-xl bg-gray-200 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="h-3 bg-gray-200 rounded w-32 mb-1.5" />
                        <div className="h-2 bg-gray-100 rounded w-48" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg max-w-xs">
                    <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-navy-800 mx-auto mb-2" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                    <h3 className="font-bold text-navy-800 mb-1">Nog {lockedLocations.length} locaties</h3>
                    <p className="text-xs text-gray-500 mb-3">
                      Ontgrendel alle {locations.length} locaties met het Leiden pakket.
                    </p>
                    <Link
                      href="/pricing"
                      className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
                    >
                      Bekijk prijzen
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {hasPaid && filtered.length === 0 && (
              <div className="text-center py-12">
                <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-gray-300 mx-auto mb-3" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                <p className="text-sm text-gray-500">Geen locaties gevonden</p>
                <button
                  onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                  className="text-sm text-orange-500 font-medium mt-2 hover:text-orange-600"
                >
                  Filters wissen
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
