"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md text-center">
        <p className="text-hand text-6xl text-orange-500 mb-2">404</p>
        <h1 className="text-2xl font-bold text-navy-800 mb-3">{t("title")}</h1>
        <p className="text-gray-500 mb-8">{t("description")}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition-colors"
          >
            {t("backHome")}
          </Link>
          <Link
            href="/routes"
            className="w-full sm:w-auto border border-navy-800/20 text-navy-800 font-semibold px-6 py-3 rounded-full hover:bg-navy-800/5 transition-colors"
          >
            {t("viewRoutes")}
          </Link>
        </div>
      </div>
    </div>
  );
}
