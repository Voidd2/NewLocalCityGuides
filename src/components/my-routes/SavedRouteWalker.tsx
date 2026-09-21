"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { getSavedRouteById, markArrived, type SavedRoute } from "@/lib/saved-routes";
import { getLocationById, type LocationData } from "@/data/locations";

function VideoModal({ loc, onClose }: { loc: LocationData; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      <div className="flex items-center justify-between p-4">
        <h3 className="text-white font-semibold text-sm truncate flex-1 mr-4">{loc.name}</h3>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors shrink-0"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-white">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-2xl aspect-video bg-navy-900 rounded-2xl flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-4">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-white ml-1">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
          <p className="text-white/50 text-sm">Video wordt geladen...</p>
          <p className="text-white/30 text-xs mt-2">Video-content wordt aangevuld na R02 verificatie</p>
        </div>
      </div>
    </div>
  );
}

function StopCard({
  loc,
  index,
  isLast,
  hasArrived,
  onArrive,
  routeId,
  onOpenVideo,
}: {
  loc: LocationData;
  index: number;
  isLast: boolean;
  hasArrived: boolean;
  onArrive: () => void;
  routeId: string;
  onOpenVideo: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const mapsUrl = loc.coords
    ? `https://www.google.com/maps/dir/?api=1&destination=${loc.coords.lat},${loc.coords.lng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.name + ", Leiden")}`;

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

      <div className="pb-4 flex-1 min-w-0">
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
                <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{loc.shortDescription}</p>
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

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl p-3 mb-3 hover:bg-blue-100 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-white">
                    <path fillRule="evenodd" d="M8.157 2.175a1.5 1.5 0 00-1.147 0l-4.084 1.69A1.5 1.5 0 002 5.251v10.877a1.5 1.5 0 002.074 1.386l3.51-1.453 4.26 1.763a1.5 1.5 0 001.146 0l4.083-1.69A1.5 1.5 0 0018 14.748V3.873a1.5 1.5 0 00-2.073-1.386l-3.51 1.452-4.26-1.763z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-blue-800">Navigeer hierheen</p>
                  <p className="text-[10px] text-blue-600">Open in Google Maps</p>
                </div>
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-400 shrink-0">
                  <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5zm7.25-.75a.75.75 0 01.75-.75h3.5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0V6.31l-5.47 5.47a.75.75 0 01-1.06-1.06l5.47-5.47H12.25a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                  </svg>
              </a>

              {hasArrived ? (
                <div className="space-y-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenVideo();
                    }}
                    className="w-full flex items-center gap-3 bg-navy-800 hover:bg-navy-900 text-white rounded-xl p-3 transition-colors text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white ml-0.5">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold">Bekijk de video</p>
                      <p className="text-[10px] text-white/50">Bekijk hoe het er vroeger uitzag</p>
                    </div>
                  </button>

                  <Link
                    href={`/locations/${loc.slug}?back=/my-routes/${routeId}`}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full flex items-center gap-3 bg-white border border-gray-200 hover:border-orange-300 hover:bg-orange-50 rounded-xl p-3 transition-colors text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-orange-500" stroke="currentColor" strokeWidth="2">
                        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-navy-800">Lees het verhaal</p>
                      <p className="text-[10px] text-gray-500">Ontdek de geschiedenis van deze plek</p>
                    </div>
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-400 shrink-0">
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </Link>

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
  const [route, setRoute] = useState<SavedRoute | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [videoLoc, setVideoLoc] = useState<LocationData | null>(null);

  useEffect(() => {
    const saved = getSavedRouteById(routeId);
    setRoute(saved ?? null);
    setIsLoading(false);
  }, [routeId]);

  const handleArrive = (locationId: string) => {
    markArrived(routeId, locationId);
    setRoute(getSavedRouteById(routeId) ?? null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="animate-pulse text-gray-400">Laden...</div>
      </div>
    );
  }

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
    <>
      {videoLoc && <VideoModal loc={videoLoc} onClose={() => setVideoLoc(null)} />}

      <div className="max-w-7xl mx-auto px-4 py-4 overflow-hidden">
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
              routeId={routeId}
              onOpenVideo={() => setVideoLoc(loc)}
            />
          ))}
        </ol>
      </div>
    </>
  );
}
