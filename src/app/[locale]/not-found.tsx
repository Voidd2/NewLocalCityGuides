"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md text-center">
        <span className="text-hand text-6xl text-orange-500 block mb-2">404</span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-navy-900 mb-3">
          {t("title")}
        </h1>
        <p className="text-slate-600 mb-8 leading-relaxed">{t("description")}</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition-colors"
          >
            {t("cta")}
          </Link>
          <Link
            href="/routes"
            className="bg-navy-800 hover:bg-navy-700 text-white font-semibold px-6 py-3 rounded-full transition-colors"
          >
            {t("routesCta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
