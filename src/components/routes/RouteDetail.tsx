"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import type { RouteData } from "@/data/routes";
import { getLocationById } from "@/data/locations";
import { useAuth } from "@/lib/auth-context";
import { saveRoute, getSavedRoutes } from "@/lib/saved-routes";

const tabs = ["overview", "routeAndStops", "beginRoute", "reviews"] as const;

const tabLabels: Record<(typeof tabs)[number], string> = {
  overview: "Overzicht",
  routeAndStops: "Route & stops",
  beginRoute: "Begin route",
  reviews: "Reviews",
};

export function RouteDetail({ route }: { route: RouteData }) {
  const t = useTranslations("routes");
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("overview");
  const { hasPaid, isLoading } = useAuth();

  const routeLocations = route.locationIds
    .map(getLocationById)
    .filter(Boolean);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="animate-pulse text-gray-400">Laden...</div>
      </div>
    );
  }

  const content = (
    <div>
      <div className="max-w-7xl mx-auto px-4 pt-4 pb-2">
        <Link href="/routes" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-navy-800 mb-4">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
          </svg>
          Terug naar alle tours
        </Link>
      </div>

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
                    <span className="bg-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">Meest gekozen</span>
                  )}
                </div>
                <h1 className="text-2xl md:text-3xl font-bold">{route.title}</h1>
                <p className="text-white/70 text-sm mt-1">{route.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-3 text-sm text-white/80">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 ${star <= 4 ? "text-yellow-400" : "text-white/30"}`}>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1 text-xs">4,8 (120 reviews)</span>
              </div>
            </div>

            <div className="flex items-center gap-6 mt-5 text-center">
              <div>
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 mx-auto text-white/60" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                <p className="text-xs mt-1">{route.stops}</p>
                <p className="text-[10px] text-white/50">stops</p>
              </div>
              <div>
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 mx-auto text-white/60" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 3v18h18" />
                  <path d="M7 17l4-8 4 4 4-8" />
                </svg>
                <p className="text-xs mt-1">{route.distance}</p>
                <p className="text-[10px] text-white/50">afstand</p>
              </div>
              <div>
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 mx-auto text-white/60" stroke="currentColor" strokeWidth="1.5">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                <p className="text-xs mt-1">{route.type === "walking" ? "Wandelen" : "Fietsen"}</p>
              </div>
              {route.kidFriendly && (
                <div>
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 mx-auto text-white/60" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                  <p className="text-xs mt-1">Geschikt</p>
                  <p className="text-[10px] text-white/50">voor iedereen</p>
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
                  <p className="text-xs mt-1 text-orange-400 font-medium">Kindvriendelijk</p>
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
            </div>
          )}

          {activeTab === "routeAndStops" && (
            <div>
              <h3 className="text-sm font-bold text-navy-800 mb-4">Route op de kaart</h3>
              <div className="bg-gray-100 rounded-xl h-64 mb-6 flex flex-col items-center justify-center text-center px-4">
                <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-gray-300 mb-2" stroke="currentColor" strokeWidth="1.5">
                  <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                  <line x1="8" y1="2" x2="8" y2="18" />
                  <line x1="16" y1="6" x2="16" y2="22" />
                </svg>
                <p className="text-sm font-medium text-gray-500">Kaart wordt geladen...</p>
              </div>

              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-navy-800">Alle {route.stops} stops</h3>
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
              <p className="text-sm text-gray-600 mb-4">
                Start deze route en loop hem op je eigen tempo. Bij elke locatie druk je op &quot;Ik ben aangekomen!&quot; om de video en het volledige verhaal te ontgrendelen.
              </p>

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
                <h4 className="font-bold text-navy-800 text-sm mb-2">Hoe werkt het?</h4>
                <ol className="space-y-2 text-xs text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                    Klik op &quot;Start route&quot; om de route op te slaan in Mijn routes
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                    Loop naar de eerste locatie en druk op &quot;Ik ben aangekomen!&quot;
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                    Bekijk de video en lees het verhaal op elke locatie
                  </li>
                </ol>
              </div>

              <div className="space-y-2 mb-6">
                {routeLocations.map((loc, i) => (
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
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  const existing = getSavedRoutes().find(
                    (sr) => sr.name === route.title && sr.locationIds.join(",") === route.locationIds.join(",")
                  );
                  if (existing) {
                    router.push(`/my-routes/${existing.id}`);
                  } else {
                    const saved = saveRoute(route.title, route.locationIds);
                    router.push(`/my-routes/${saved.id}`);
                  }
                }}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 rounded-full text-sm transition-colors flex items-center justify-center gap-2"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                </svg>
                Start deze route
              </button>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-navy-800">4,8</span>
                <div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 ${star <= 4 ? "text-yellow-400" : "text-gray-200"}`}>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">120 reviews</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { name: "Familie de Jong", text: "Super leuke tour! De video's maken de geschiedenis levend. Onze kinderen vonden het geweldig!", rating: 5 },
                  { name: "Mark V.", text: "Fijn dat je op je eigen tempo kunt lopen. De verborgen hofjes waren een echte verrassing.", rating: 5 },
                  { name: "Sarah & Tom", text: "Veel beter dan een groepsrondleiding. Je ontdekt dingen die je anders nooit zou zien.", rating: 4 },
                ].map((review) => (
                  <div key={review.name} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-orange-200" />
                      <div>
                        <p className="text-sm font-medium text-navy-800">{review.name}</p>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg key={star} viewBox="0 0 20 20" fill="currentColor" className={`w-3 h-3 ${star <= review.rating ? "text-yellow-400" : "text-gray-200"}`}>
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {!hasPaid && (
        <section className="bg-orange-50 border-t border-orange-100">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h3 className="text-sm font-bold text-navy-800 mb-1">Inbegrepen in het Leiden pakket</h3>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-600 mt-3 mb-4">
              {[
                "Alle routes in Leiden",
                "Interactieve video's op locatie",
                "Maak je eigen route",
                "Verborgen parels en lokale tips",
                "Op eigen tempo",
                "Levenslange toegang",
                "Leuk met kinderen",
                "Regelmatig nieuwe routes",
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
              <span className="text-sm text-gray-500">per persoon</span>
              <Link
                href="/pricing"
                className="ml-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
              >
                Bekijk prijzen
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
