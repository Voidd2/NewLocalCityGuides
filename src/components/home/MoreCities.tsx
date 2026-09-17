"use client";

import { useTranslations } from "next-intl";

const upcomingCities = [
  { name: "Delft", image: "10010 - foto van Delft centrum met Nieuwe Kerk" },
  { name: "Utrecht", image: "10011 - foto van Oudegracht Utrecht" },
  { name: "Amsterdam", image: "10012 - foto van Amsterdam grachten" },
  { name: "Den Haag", image: "10013 - foto van Binnenhof Den Haag" },
];

export function MoreCities() {
  const t = useTranslations("home");

  return (
    <section className="py-8 bg-warm-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-br from-navy-800 to-navy-900 rounded-2xl p-6 md:p-8 text-white overflow-hidden relative">
          <div className="relative z-10">
            <p className="text-hand text-orange-300 text-lg md:text-xl mb-2 -rotate-1">
              Samen de stad ontdekken is nog leuker!
            </p>
            <h2 className="text-xl md:text-2xl font-bold mb-2">{t("moreCities")}</h2>
            <p className="text-white/70 text-sm mb-6 max-w-md">{t("moreCitiesDesc")}</p>

            <div className="flex gap-3 overflow-x-auto pb-2">
              {upcomingCities.map((city) => (
                <div key={city.name} className="shrink-0">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-white/10 overflow-hidden">
                    {/* {city.image} */}
                    <div className="w-full h-full bg-white/5" />
                  </div>
                  <p className="text-xs text-center mt-1.5 text-white/80">{city.name}</p>
                </div>
              ))}
              <div className="shrink-0 flex items-center justify-center">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-white/10 flex items-center justify-center">
                  <span className="text-2xl text-white/40">?</span>
                </div>
                <p className="text-xs text-center mt-1.5 text-white/60 absolute bottom-6">Meer steden binnenkort</p>
              </div>
            </div>

            <p className="text-xs text-white/50 mt-4 italic">
              Nieuwe steden. Nieuwe verhalen. Stay tuned!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
