"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const t = useTranslations("errorPage");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md text-center">
        <span className="text-hand text-6xl text-orange-500 block mb-2">:(</span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-navy-900 mb-3">
          {t("title")}
        </h1>
        <p className="text-slate-600 mb-8 leading-relaxed">{t("description")}</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={retry}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition-colors"
          >
            {t("retry")}
          </button>
          <Link
            href="/"
            className="bg-navy-800 hover:bg-navy-700 text-white font-semibold px-6 py-3 rounded-full transition-colors"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
