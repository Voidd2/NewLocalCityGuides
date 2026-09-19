import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("errors");

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center">
        <div className="w-16 h-16 rounded-full bg-navy-800 mx-auto flex items-center justify-center mb-6">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-8 h-8 text-white"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
        </div>
        <p className="text-hand text-3xl text-orange-500 mb-2">404</p>
        <h1 className="text-2xl font-bold text-navy-800 mb-2">
          {t("notFoundTitle")}
        </h1>
        <p className="text-sm text-gray-500 mb-8">{t("notFoundDescription")}</p>
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-full transition-colors text-sm"
          >
            {t("notFoundCta")}
          </Link>
          <Link
            href="/routes"
            className="block w-full text-center bg-white hover:bg-warm-100 text-navy-800 font-semibold py-3 rounded-full border border-gray-200 transition-colors text-sm"
          >
            {t("notFoundSecondaryCta")}
          </Link>
        </div>
      </div>
    </div>
  );
}
