"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routes } from "@/data/routes";
import { useAuth } from "@/lib/auth-context";

export function PopularRoutes() {
  const t = useTranslations("home");
  const { hasPaid } = useAuth();

  return (
    <section className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-navy-800">{t("popularRoutes")}</h2>
          <Link
            href="/routes"
            className="text-sm text-orange-500 font-semibold hover:text-orange-600"
          >
            {t("viewAllRoutes")}
          </Link>
        </div>

        <div className="space-y-3">
          {routes.map((route) => (
            <Link
              key={route.id}
              href={hasPaid ? `/routes/${route.slug}` : "/pricing"}
              className="flex items-center gap-4 bg-white rounded-xl border border-gray-100 p-3 hover:shadow-md transition-shadow"
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
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-orange-500 text-white uppercase">
                      Populair
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{route.subtitle}</p>
                <p className="text-[11px] text-gray-400 mt-1">{route.stops} stops - {route.distance}</p>
              </div>
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-300 shrink-0">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
