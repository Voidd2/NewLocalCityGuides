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

export function CustomRouteBuilder() {
  const t = useTranslations("routes");
  const { hasPaid, isLoading } = useAuth();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = useCallback((id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
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
        <p className="text-sm text-gray-500 mb-6">{t("customRouteDesc")}</p>

        <div className="grid md:grid-cols-[1fr,360px] gap-8">
          <div>
            <h2 className="text-sm font-bold text-navy-800 mb-3">Kies je stops ({selected.length} gekozen)</h2>
            <div className="space-y-2">
              {locations.map((loc) => {
                const isSelected = selected.includes(loc.id);
                const order = isSelected ? orderedRoute.findIndex((l) => l.id === loc.id) + 1 : null;

                return (
                  <button
                    key={loc.id}
                    onClick={() => toggle(loc.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                      isSelected
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 bg-white hover:border-orange-200"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold ${
                      isSelected ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-400"
                    }`}>
                      {order ?? "+"}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-navy-800 text-sm truncate">{loc.name}</h3>
                      <p className="text-xs text-gray-500 truncate">{loc.shortDescription}</p>
                    </div>

                    <div className="w-12 h-12 rounded-lg bg-gray-200 shrink-0 overflow-hidden">
                      {/* {loc.image} */}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="md:sticky md:top-20 self-start">
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h3 className="font-bold text-navy-800 mb-3">Jouw route</h3>

              {orderedRoute.length === 0 ? (
                <p className="text-sm text-gray-400 py-8 text-center">
                  Kies minimaal 2 locaties om je route te zien
                </p>
              ) : (
                <>
                  <ol className="space-y-2 mb-4">
                    {orderedRoute.map((loc, i) => (
                      <li key={loc.id} className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-sm text-navy-800 truncate">{loc.name}</span>
                      </li>
                    ))}
                  </ol>

                  <p className="text-xs text-gray-400 mb-4">
                    We hebben de slimste volgorde berekend zodat je zo min mogelijk heen en weer loopt.
                  </p>

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
