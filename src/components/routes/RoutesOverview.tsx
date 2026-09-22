"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routes } from "@/data/routes";
import { useAuth } from "@/lib/auth-context";

export function RoutesOverview() {
  const t = useTranslations("routes");
  const tCommon = useTranslations("common");
  const { hasPaid, isLoading } = useAuth();

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
        <img
          src="/images/heroes/10008-leiden-canal-panorama.jpg"
          alt="Leiden grachten panorama"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative bg-gradient-to-b from-navy-800/80 to-navy-900/90 text-white px-4 py-8 pb-12">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{t("yourLeidenPackage")}</h1>
            <p className="text-white/70 text-sm mb-6">
              {t("packageTagline")}
            </p>

            {!hasPaid ? (
              <>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm">{t("packageFrom")}</p>
                    <p className="text-xs text-white/60 mt-0.5">Toegang tot alle routes in Leiden, inclusief maak-je-eigen-route, interactieve video&apos;s en meer.</p>
                  </div>
                  <Link
                    href="/pricing"
                    className="shrink-0 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
                  >
                    {t("viewPricing")}
                  </Link>
                </div>
                <p className="text-hand text-orange-300 text-lg mt-4 -rotate-1">
                  {t("allRoutesIncluded")}
                </p>
              </>
            ) : (
              <div className="bg-green-500/20 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-green-400 shrink-0">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-medium">{t("leidenPackageActive")}</p>
                  <p className="text-xs text-white/60 mt-0.5">Je hebt volledige toegang tot alle routes en locaties.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-lg font-bold text-navy-800 mb-1">{t("allToursIncluded")}</h2>
        <p className="text-sm text-gray-500 mb-6">{t("chooseRouteToDiscover")}</p>

        <div className="grid md:grid-cols-2 gap-4">
          {routes.map((route) => {
            const card = (
              <div className="group flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="relative h-40 bg-gray-200">
                  {route.image && (
                    <img src={route.image} alt={route.title} className="w-full h-full object-cover" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  {route.popular && (
                    <span className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                      {t("popular")}
                    </span>
                  )}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-bold text-navy-800 text-base mb-0.5">{route.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{route.subtitle}</p>

                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    {hasPaid && (
                      <span className="flex items-center gap-1">
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                          <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                        </svg>
                        {route.stops} stops
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                        <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                      </svg>
                      {route.distance}
                    </span>
                    <span className="flex items-center gap-1 capitalize">
                      {route.type === "walking" ? (
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                          <path d="M10 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM7.5 8a.5.5 0 01.5-.5h1.25l.75 2.5L8.5 12l-1.5 4.5a.75.75 0 001.42.49L10 13l1.58 3.99a.75.75 0 001.42-.49L11.5 12l-1.5-2 .75-2.5H12a.5.5 0 01.5.5" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                          <path d="M5 15a3 3 0 100-6 3 3 0 000 6zm0-1.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM15 15a3 3 0 100-6 3 3 0 000 6zm0-1.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM9 8l3.5-3L14 7h-2l-2 2.5L7.5 12H5l4-4z" />
                        </svg>
                      )}
                      {route.type === "walking" ? t("walking") : t("cycling")}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {route.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-orange-50 text-orange-600 border border-orange-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );

            if (hasPaid) {
              return (
                <Link key={route.id} href={`/routes/${route.slug}`}>
                  {card}
                </Link>
              );
            }

            return (
              <div key={route.id} className="relative">
                <div className="blur-[6px] pointer-events-none select-none">
                  {card}
                </div>
                <Link
                  href="/pricing"
                  className="absolute inset-0 flex flex-col items-center justify-center bg-navy-800/40 rounded-xl"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white mb-2" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                  <span className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors">
                    {t("viewPricing")}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {hasPaid && (
        <section className="max-w-7xl mx-auto px-4 py-6">
          <Link
            href="/routes/custom"
            className="block"
          >
            <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-navy-800">{t("customRoute")}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500 text-white uppercase">{t("included")}</span>
                </div>
                <p className="text-sm text-gray-600">{t("customRouteDesc")}</p>
              </div>
              <span className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-3 rounded-full transition-colors text-sm shrink-0">
                {t("startBuilding")}
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
          </Link>
        </section>
      )}

      <section className="bg-navy-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-hand text-orange-300 text-xl mb-2">{t("moreToDiscover")}</p>
          <h2 className="text-lg font-bold mb-2">{t("discoverMoreNL")}</h2>
          <p className="text-white/60 text-sm mb-6">
            {t("moreCitiesComingSoon")}
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            {["Amsterdam", "Delft", "Haarlem", "Utrecht"].map((city) => (
              <div
                key={city}
                className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 text-sm font-medium text-white/80"
              >
                {city}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
