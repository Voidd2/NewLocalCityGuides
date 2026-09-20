"use client";

import { useTranslations } from "next-intl";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const upcomingCities = [
  { name: "Delft", image: null },
  { name: "Utrecht", image: "/images/future-cities/10011-utrecht-oudegracht.jpg" },
  { name: "Amsterdam", image: "/images/future-cities/10012-amsterdam-canals.jpg" },
  { name: "Den Haag", image: null },
];

export function MoreCities() {
  const t = useTranslations("home");

  return (
    <section className="py-10 bg-warm-50">
      <div className="max-w-7xl mx-auto px-4">
        <AnimateOnScroll animation="scale-in">
          <div className="bg-gradient-to-br from-navy-800 via-navy-800 to-navy-900 rounded-3xl p-6 md:p-10 text-white overflow-hidden relative shadow-2xl shadow-navy-900/30">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/5 rounded-full translate-y-1/3 -translate-x-1/3 blur-2xl" />

            <div className="relative z-10">
              <p className="text-hand text-orange-300 text-xl md:text-2xl mb-2 -rotate-1">
                Er valt zoveel te ontdekken!
              </p>
              <h2 className="text-xl md:text-2xl font-bold mb-2">{t("moreCities")}</h2>
              <p className="text-white/60 text-sm mb-8 max-w-md leading-relaxed">{t("moreCitiesDesc")}</p>

              <div className="flex gap-4 overflow-x-auto pb-2">
                {upcomingCities.map((city, i) => (
                  <div key={city.name} className="shrink-0 group">
                    <div className="w-22 h-22 md:w-28 md:h-28 rounded-2xl bg-white/10 overflow-hidden ring-1 ring-white/10 group-hover:ring-white/30 group-hover:scale-105 transition-all duration-300">
                      {city.image ? (
                        <img src={city.image} alt={city.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full bg-white/5 flex items-center justify-center">
                          <span className="text-white/20 text-2xl font-bold">{city.name[0]}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-center mt-2 text-white/70 font-medium">{city.name}</p>
                  </div>
                ))}
                <div className="shrink-0 flex items-center justify-center group">
                  <div>
                    <div className="w-22 h-22 md:w-28 md:h-28 rounded-2xl bg-white/5 flex items-center justify-center ring-1 ring-white/10 group-hover:bg-white/10 transition-colors">
                      <span className="text-3xl text-white/30">?</span>
                    </div>
                    <p className="text-xs text-center mt-2 text-white/40">Meer...</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-white/40 mt-6 italic">
                Binnenkort beschikbaar
              </p>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
