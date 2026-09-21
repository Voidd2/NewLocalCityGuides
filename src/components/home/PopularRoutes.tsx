"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routes } from "@/data/routes";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export function PopularRoutes() {
  const t = useTranslations("home");

  return (
    <section className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        <AnimateOnScroll>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-navy-800">{t("popularRoutes")}</h2>
            <Link
              href="/routes"
              className="text-sm text-orange-500 font-semibold hover:text-orange-600 transition-colors"
            >
              {t("viewAllRoutes")}
            </Link>
          </div>
        </AnimateOnScroll>

        <div className="space-y-3">
          {routes.map((route, i) => (
            <AnimateOnScroll key={route.id} delay={i * 120}>
              <Link
                href="/pricing"
                className="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 p-3.5 hover-lift hover-zoom-img group shadow-sm"
              >
                <div className="w-16 h-16 rounded-xl bg-gray-200 shrink-0 overflow-hidden">
                  {route.image && (
                    <img src={route.image} alt={route.title} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-navy-800 text-sm">{route.title}</h3>
                    {route.popular && (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-orange-500 text-white uppercase shadow-sm">
                        Populair
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{route.subtitle}</p>
                  <p className="text-[11px] text-gray-400 mt-1">{route.distance} - {route.type === "walking" ? "Wandelen" : "Fietsen"}</p>
                </div>
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-300 shrink-0 group-hover:text-orange-500 group-hover:translate-x-1 transition-all">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
