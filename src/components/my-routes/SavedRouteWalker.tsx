"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { markArrived, useSavedRoutes } from "@/lib/saved-routes";
import { getLocationById, type LocationData } from "@/data/locations";

function StopCard({
  loc,
  index,
  isLast,
  hasArrived,
  onArrive,
}: {
  loc: LocationData;
  index: number;
  isLast: boolean;
  hasArrived: boolean;
  onArrive: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="flex gap-3">
      <div className="flex flex-col items-center">
        <div
          className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
            hasArrived ? "bg-green-500 text-white" : "bg-orange-500 text-white"
          }`}
        >
          {hasArrived ? (
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
            </svg>
          ) : (
            index + 1
          )}
        </div>
        {!isLast && (
          <div className={`w-0.5 flex-1 mt-1 ${hasArrived ? "bg-green-200" : "bg-orange-200"}`} />
        )}
      </div>

      <div className="pb-4 flex-1">
        <div
          className={`rounded-xl border overflow-hidden transition-all ${
            hasArrived ? "border-green-200 bg-green-50" : "border-gray-200 bg-white"
          }`}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full p-3 flex items-center gap-3 text-left"
          >
            <div className="w-14 h-14 rounded-lg bg-gray-200 shrink-0 overflow-hidden">
              {loc.image && (
                <img src={loc.image} alt={loc.name} className="w-full h-full object-cover" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-navy-800 text-sm truncate">{loc.name}</h3>
                {hasArrived && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500 text-white shrink-0">
                    Bezocht
                  </span>
                )}
              </div>
              <span className="text-[10px] text-orange-500 font-medium">{loc.mainTheme}</span>
              {!isOpen && (
                <p className="text-xs text-gray-500 truncate mt-0.5">{loc.shortDescription}</p>
              )}
            </div>
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
            >
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>

          {isOpen && (
            <div className="px-3 pb-3">
              {loc.image && (
                <div className="relative rounded-lg overflow-hidden mb-3 aspect-video bg-gray-200">
                  <img src={loc.image} alt={loc.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-2 left-2 flex items-center gap-2">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange-500 text-white uppercase tracking-wide">
                      {loc.mainTheme}
                    </span>
                  </div>
                </div>
              )}

              <p className="text-xs text-gray-600 leading-relaxed mb-3">{loc.shortDescription}</p>

              {hasArrived ? (
                <div>
                  <div className="bg-navy-800 rounded-xl aspect-video flex items-center justify-center mb-3">
                    <div className="text-center">
                      <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white ml-1">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </div>
                      <p className="text-white/70 text-xs">Video wordt geladen...</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
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
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-green-600 shrink-0">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    <p className="text-xs text-green-700 font-medium">Je hebt deze locatie bezocht</p>
                  </div>
                </div>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onArrive();
                  }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-full text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                  </svg>
                  Ik ben aangekomen!
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export function SavedRouteWalker() {
  const params = useParams();
  const routeId = params.id as string;
  const allRoutes = useSavedRoutes();
  const route = allRoutes.find((r) => r.id === routeId) ?? null;

  const handleArrive = (locationId: string) => {
    markArrived(routeId, locationId);
  };

  if (!route) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-gray-200 mx-auto mb-3" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
        <h2 className="font-bold text-navy-800 mb-2">Route niet gevonden</h2>
        <p className="text-sm text-gray-500 mb-4">Deze route bestaat niet meer.</p>
        <Link
          href="/my-routes"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
        >
          Terug naar mijn routes
        </Link>
      </div>
    );
  }

  const locs = route.locationIds
    .map(getLocationById)
    .filter(Boolean) as LocationData[];

  const progress = route.arrivedLocationIds.length;
  const total = locs.length;
  const pct = total > 0 ? Math.round((progress / total) * 100) : 0;
  const isComplete = progress === total && total > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <Link href="/my-routes" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-navy-800 mb-4">
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
        </svg>
        Mijn routes
      </Link>

      <div className="mb-6">
        <h1 className="text-xl font-bold text-navy-800 mb-1">{route.name}</h1>
        <div className="flex items-center gap-3">
          <p className="text-sm text-gray-500">
            {progress}/{total} stops bezocht
          </p>
          {isComplete && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500 text-white">
              Voltooid
            </span>
          )}
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 mt-3">
          <div
            className={`h-2 rounded-full transition-all ${isComplete ? "bg-green-500" : "bg-orange-500"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {isComplete && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-3">
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-green-800 mb-1">Route voltooid!</h2>
          <p className="text-sm text-green-600">
            Je hebt alle {total} locaties bezocht. Goed gedaan!
          </p>
        </div>
      )}

      <ol className="space-y-0">
        {locs.map((loc, i) => (
          <StopCard
            key={loc.id}
            loc={loc}
            index={i}
            isLast={i === locs.length - 1}
            hasArrived={route.arrivedLocationIds.includes(loc.id)}
            onArrive={() => handleArrive(loc.id)}
          />
        ))}
      </ol>
    </div>
  );
}
