"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { locations, type LocationData } from "@/data/locations";
import { saveRoute } from "@/lib/saved-routes";

const MUST_SEE_IDS = ["L001", "L006", "L003", "L010"];

function optimizeOrder(selected: LocationData[]): LocationData[] {
  if (selected.length <= 2) return selected;

  const cityCenter = ["L001", "L002", "L003", "L004", "L005"];
  const pieterskerkArea = ["L006", "L007", "L008"];
  const outer = ["L009", "L010", "L011", "L012", "L013", "L014"];

  const zones = [cityCenter, pieterskerkArea, outer];
  const ordered: LocationData[] = [];

  for (const zone of zones) {
    const inZone = selected.filter((l) => zone.includes(l.id));
    ordered.push(...inZone);
  }

  const remaining = selected.filter((l) => !ordered.find((o) => o.id === l.id));
  ordered.push(...remaining);

  return ordered;
}

function LocationCard({
  loc,
  isSelected,
  order,
  isExpanded,
  isMustSee,
  onToggleSelect,
  onToggleExpand,
}: {
  loc: LocationData;
  isSelected: boolean;
  order: number | null;
  isExpanded: boolean;
  isMustSee: boolean;
  onToggleSelect: () => void;
  onToggleExpand: () => void;
}) {
  const tCustom = useTranslations("customRoute");

  return (
    <div
      className={`rounded-2xl border-2 transition-all overflow-hidden hover-lift ${
        isSelected
          ? "border-orange-500 bg-orange-50/50 shadow-md shadow-orange-500/10"
          : "border-gray-100 bg-white shadow-sm"
      }`}
    >
      <div className="relative aspect-[16/10] bg-gray-200 overflow-hidden group">
        {loc.image ? (
          <img
            src={loc.image}
            alt={loc.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-white/15" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          {isMustSee && (
            <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-orange-500 text-white uppercase tracking-wide shadow-lg">
              Must see
            </span>
          )}
          {isSelected && order !== null && (
            <span className="w-7 h-7 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center shadow-lg ring-2 ring-white/50">
              {order}
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSelect();
            }}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-lg ${
              isSelected
                ? "bg-orange-500 text-white scale-110"
                : "bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-orange-500 hover:scale-110"
            }`}
          >
            {isSelected ? (
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
            )}
          </button>
        </div>

        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-bold text-white text-base leading-tight drop-shadow-lg">{loc.name}</h3>
          <span className="text-[11px] text-orange-300 font-medium">{loc.mainTheme}</span>
        </div>
      </div>

      <div className="px-4 pt-3 pb-3">
        <p className={`text-sm text-gray-600 leading-relaxed ${isExpanded ? "" : "line-clamp-2"}`}>
          {loc.shortDescription}
        </p>

        <button
          onClick={onToggleExpand}
          className="flex items-center gap-1 text-xs font-medium text-orange-500 hover:text-orange-600 mt-1.5 transition-colors"
        >
          {isExpanded ? tCustom("readLess") : tCustom("moreAboutSpot")}
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`w-3.5 h-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
          >
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </button>

        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg px-2.5 py-1.5">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-orange-500">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span className="text-[11px] font-medium text-gray-600">{tCustom("video")}</span>
              </div>
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg px-2.5 py-1.5">
                <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-navy-800" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                </svg>
                <span className="text-[11px] font-medium text-gray-600">{tCustom("story")}</span>
              </div>
              {loc.categories.map((cat) => (
                <span key={cat} className="text-[11px] font-medium px-2.5 py-1.5 rounded-lg bg-orange-50 text-orange-600 border border-orange-100 capitalize">
                  {cat}
                </span>
              ))}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSelect();
              }}
              className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                isSelected
                  ? "bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-50"
                  : "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20"
              }`}
            >
              {isSelected ? (
                <span className="flex items-center justify-center gap-1.5">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  {tCustom("addedToRoute", { order: order ?? 0 })}
                </span>
              ) : (
                <span className="flex items-center justify-center gap-1.5">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                  </svg>
                  {tCustom("addToMyRoute")}
                </span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function CustomRouteBuilder() {
  const tRoutes = useTranslations("routes");
  const tCustom = useTranslations("customRoute");
  const tCommon = useTranslations("common");
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [routeName, setRouteName] = useState("");

  const toggle = useCallback((id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }, []);

  const toggleExpand = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const selectedLocations = selected
    .map((id) => locations.find((l) => l.id === id))
    .filter(Boolean) as LocationData[];

  const orderedRoute = optimizeOrder(selectedLocations);

  const handleSave = () => {
    if (orderedRoute.length < 2) return;
    const name = routeName.trim() || `${tCustom("defaultRouteName")} (${orderedRoute.length} stops)`;
    const saved = saveRoute(name, orderedRoute.map((l) => l.id));
    router.push(`/my-routes/${saved.id}`);
  };

  const handleStartNow = () => {
    if (orderedRoute.length < 2) return;
    const name = routeName.trim() || `${tCustom("defaultRouteName")} (${orderedRoute.length} stops)`;
    const saved = saveRoute(name, orderedRoute.map((l) => l.id));
    router.push(`/my-routes/${saved.id}`);
  };

  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 py-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-navy-800 mb-1">{tRoutes("customRoute")}</h1>
          <p className="text-sm text-gray-500">{tRoutes("customRouteDesc")}</p>
        </div>

        <div className="grid md:grid-cols-[1fr,340px] gap-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-navy-800">
                {tCustom("allLocations")}
                <span className="text-sm font-normal text-gray-400 ml-2">
                  {selected.length > 0 && tCustom("nChosen", { count: selected.length })}
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {locations.map((loc) => {
                const isSelected = selected.includes(loc.id);
                const order = isSelected ? orderedRoute.findIndex((l) => l.id === loc.id) + 1 : null;

                return (
                  <LocationCard
                    key={loc.id}
                    loc={loc}
                    isSelected={isSelected}
                    order={order}
                    isExpanded={expandedId === loc.id}
                    isMustSee={MUST_SEE_IDS.includes(loc.id)}
                    onToggleSelect={() => toggle(loc.id)}
                    onToggleExpand={() => toggleExpand(loc.id)}
                  />
                );
              })}
            </div>
          </div>

          <div className="md:sticky md:top-20 self-start">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-bold text-navy-800 text-lg mb-1">{tCustom("yourRoute")}</h3>
              <p className="text-xs text-gray-400 mb-4">
                {orderedRoute.length === 0
                  ? tCustom("chooseLocations")
                  : `${orderedRoute.length} ${tCustom("stopsSmartOrder")}`
                }
              </p>

              {orderedRoute.length === 0 ? (
                <div className="py-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-3">
                    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-orange-300" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-400 mb-1">{tCustom("noLocationsChosen")}</p>
                  <p className="text-xs text-gray-300">{tCustom("chooseMinTwo")}</p>
                </div>
              ) : (
                <>
                  <ol className="space-y-1.5 mb-4">
                    {orderedRoute.map((loc, i) => (
                      <li key={loc.id} className="flex items-center gap-2.5 group">
                        <div className="flex flex-col items-center">
                          <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                            {i + 1}
                          </span>
                          {i < orderedRoute.length - 1 && (
                            <div className="w-0.5 h-2.5 bg-orange-200 mt-0.5" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-gray-200 shrink-0 overflow-hidden">
                            {loc.image ? (
                              <img src={loc.image} alt={loc.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-navy-800 flex items-center justify-center">
                                <span className="text-[9px] text-white/40 font-bold">{i + 1}</span>
                              </div>
                            )}
                          </div>
                          <span className="text-sm text-navy-800 truncate">{loc.name}</span>
                        </div>
                        <button
                          onClick={() => toggle(loc.id)}
                          className="text-gray-200 hover:text-red-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ol>

                  <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-4 bg-gray-50 rounded-lg p-2.5">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-blue-400 shrink-0">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                    </svg>
                    {tCustom("smartOrderCalculated")}
                  </div>

                  <input
                    type="text"
                    placeholder={tCustom("giveRouteName")}
                    value={routeName}
                    onChange={(e) => setRouteName(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm mb-3 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />

                  {orderedRoute.length >= 2 ? (
                    <div className="space-y-2">
                      <button
                        onClick={handleStartNow}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-full text-center transition-all text-sm shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 flex items-center justify-center gap-2"
                      >
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                          <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                        </svg>
                        {tCustom("startRouteNow")}
                      </button>
                      <button
                        onClick={handleSave}
                        className="w-full border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold py-3 rounded-full text-center transition-colors text-sm flex items-center justify-center gap-2"
                      >
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                          <path d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" />
                        </svg>
                        {tCustom("saveForLater")}
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs text-orange-500 text-center font-medium py-2">
                      {tCustom("chooseMoreLocations", { count: 2 - orderedRoute.length })}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {selected.length > 0 && (
        <div className="md:hidden fixed bottom-16 left-0 right-0 z-30 px-4 pb-3 pt-2 bg-gradient-to-t from-warm-50 via-warm-50 to-transparent">
          {orderedRoute.length >= 2 ? (
            <button
              onClick={handleStartNow}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 rounded-full text-center transition-all text-sm shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
              </svg>
              {tCustom("startRouteNowCount", { count: orderedRoute.length })}
            </button>
          ) : (
            <div className="bg-white/90 backdrop-blur-sm rounded-full py-3 text-center text-sm font-medium text-orange-500 border border-orange-200 shadow-lg">
              {tCustom("nChosen", { count: selected.length })} - {tCustom("chooseMoreLocations", { count: 2 - orderedRoute.length })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
