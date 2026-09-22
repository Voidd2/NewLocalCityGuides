import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16 bg-warm-50">
      <div className="text-center max-w-md">
        <p className="font-hand text-5xl text-orange-500 mb-2">404</p>
        <h1 className="text-2xl font-bold text-navy-800 mb-3">{t("title")}</h1>
        <p className="text-gray-600 mb-8">{t("description")}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-navy-800 px-6 py-3 text-sm font-medium text-white hover:bg-navy-800/90 transition-colors"
          >
            {t("homeCta")}
          </Link>
          <Link
            href="/routes"
            className="inline-flex items-center justify-center rounded-full border border-navy-800/20 px-6 py-3 text-sm font-medium text-navy-800 hover:bg-navy-800/5 transition-colors"
          >
            {t("routesCta")}
          </Link>
        </div>
      </div>
    </div>
  );
}
