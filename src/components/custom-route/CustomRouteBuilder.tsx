"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { locations, type LocationData } from "@/data/locations";
import { useAuth } from "@/lib/auth-context";

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
  onToggleSelect,
  onToggleExpand,
}: {
  loc: LocationData;
  isSelected: boolean;
  order: number | null;
  isExpanded: boolean;
  onToggleSelect: () => void;
  onToggleExpand: () => void;
}) {
  return (
    <div
      className={`rounded-xl border transition-all overflow-hidden ${
        isSelected ? "border-orange-500 bg-orange-50" : "border-gray-200 bg-white"
      }`}
    >
      <button
        onClick={onToggleExpand}
        className="w-full flex items-center gap-3 p-3 text-left"
      >
        <div className="w-14 h-14 rounded-lg bg-gray-200 shrink-0 overflow-hidden">
          {loc.image && (
            <img src={loc.image} alt={loc.name} className="w-full h-full object-cover" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-navy-800 text-sm truncate">{loc.name}</h3>
          <span className="text-[10px] text-orange-500 font-medium">{loc.mainTheme}</span>
        </div>

        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`}
        >
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      {isExpanded && (
        <div className="px-3 pb-3">
          {loc.image && (
            <div className="relative rounded-lg overflow-hidden mb-3 aspect-video bg-gray-200">
              <img src={loc.image} alt={loc.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange-500 text-white uppercase tracking-wide">
                  {loc.mainTheme}
                </span>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-sm">
                  30-60 min
                </span>
              </div>
            </div>
          )}

          <p className="text-xs text-gray-600 mb-3 leading-relaxed">{loc.shortDescription}</p>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg px-2 py-1">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-orange-500">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span className="text-[10px] font-medium text-gray-600">Video</span>
            </div>
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg px-2 py-1">
              <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-navy-800" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
              </svg>
              <span className="text-[10px] font-medium text-gray-600">Verhaal</span>
            </div>
            {loc.categories.map((cat) => (
              <span key={cat} className="text-[10px] font-medium px-2 py-1 rounded-lg bg-orange-50 text-orange-600 border border-orange-100">
                {cat}
              </span>
            ))}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSelect();
            }}
            className={`w-full py-2.5 rounded-full text-sm font-semibold transition-colors ${
              isSelected
                ? "bg-white border border-orange-500 text-orange-500 hover:bg-orange-50"
                : "bg-orange-500 hover:bg-orange-600 text-white"
            }`}
          >
            {isSelected ? (
              <span className="flex items-center justify-center gap-1.5">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                Toegevoegd (stop {order})
              </span>
            ) : (
              <span className="flex items-center justify-center gap-1.5">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
                Toevoegen aan route
              </span>
            )}
          </button>
        </div>
      )}

      {!isExpanded && (
        <div className="px-3 pb-3 flex items-center justify-between">
          <p className="text-xs text-gray-500 truncate flex-1 mr-2">{loc.shortDescription}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSelect();
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold transition-colors ${
              isSelected ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            {order ?? "+"}
          </button>
        </div>
      )}
    </div>
  );
}

export function CustomRouteBuilder() {
  const t = useTranslations("routes");
  const { hasPaid, isLoading } = useAuth();
  const [selected, setSelected] = useState<string[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

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

  const mapsUrl = orderedRoute.length >= 2
    ? `https://www.google.com/maps/dir/${orderedRoute.map((l) => encodeURIComponent(l.name + ", Leiden")).join("/")}`
    : null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="animate-pulse text-gray-400">Laden...</div>
      </div>
    );
  }

  if (!hasPaid) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center max-w-md mx-auto">
          <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-navy-800 mx-auto mb-3" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
          <h2 className="text-lg font-bold text-navy-800 mb-2">Maak je eigen route</h2>
          <p className="text-sm text-gray-600 mb-4">
            Koop het Leiden pakket om je eigen route samen te stellen met al onze locaties.
          </p>
          <Link
            href="/pricing"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
          >
            Bekijk de prijzen
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 pt-4 pb-2">
        <Link href="/routes" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-navy-800 mb-4">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
          </svg>
          Terug naar alle tours
        </Link>
      </div>

      <section className="max-w-7xl mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold text-navy-800 mb-1">{t("customRoute")}</h1>
        <p className="text-sm text-gray-500 mb-2">{t("customRouteDesc")}</p>
        <p className="text-xs text-gray-400 mb-6">Tik op een locatie om meer te lezen. Voeg toe aan je route met de + knop.</p>

        <div className="grid md:grid-cols-[1fr,360px] gap-8">
          <div>
            <h2 className="text-sm font-bold text-navy-800 mb-3">
              Kies je stops ({selected.length} gekozen)
            </h2>
            <div className="space-y-2">
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
                    onToggleSelect={() => toggle(loc.id)}
                    onToggleExpand={() => toggleExpand(loc.id)}
                  />
                );
              })}
            </div>
          </div>

          <div className="md:sticky md:top-20 self-start">
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h3 className="font-bold text-navy-800 mb-3">Jouw route</h3>

              {orderedRoute.length === 0 ? (
                <div className="py-8 text-center">
                  <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-gray-200 mx-auto mb-2" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                  <p className="text-sm text-gray-400">
                    Kies minimaal 2 locaties om je route te zien
                  </p>
                </div>
              ) : (
                <>
                  <ol className="space-y-2 mb-4">
                    {orderedRoute.map((loc, i) => (
                      <li key={loc.id} className="flex items-center gap-2">
                        <div className="flex flex-col items-center">
                          <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                            {i + 1}
                          </span>
                          {i < orderedRoute.length - 1 && (
                            <div className="w-0.5 h-3 bg-orange-200 mt-0.5" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          {loc.image && (
                            <div className="w-8 h-8 rounded-md bg-gray-200 shrink-0 overflow-hidden">
                              <img src={loc.image} alt={loc.name} className="w-full h-full object-cover" />
                            </div>
                          )}
                          <span className="text-sm text-navy-800 truncate">{loc.name}</span>
                        </div>
                        <button
                          onClick={() => toggle(loc.id)}
                          className="text-gray-300 hover:text-red-400 shrink-0"
                        >
                          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ol>

                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-4 bg-gray-50 rounded-lg p-2.5">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-400 shrink-0">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                    </svg>
                    We hebben de slimste volgorde berekend zodat je zo min mogelijk heen en weer loopt.
                  </div>

                  {mapsUrl && (
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-full text-center transition-colors text-sm"
                    >
                      {t("showRoute")}
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 inline-block ml-1">
                        <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}

                  {orderedRoute.length === 1 && (
                    <p className="text-xs text-orange-500 text-center mt-2 font-medium">
                      Kies nog minimaal 1 locatie
                    </p>
                  )}

                  <p className="text-[10px] text-gray-400 text-center mt-2">
                    Opent in Google Maps of Apple Maps
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
