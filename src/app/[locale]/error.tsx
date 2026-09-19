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
  const t = useTranslations("errors");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center">
        <div className="w-16 h-16 rounded-full bg-red-500 mx-auto flex items-center justify-center mb-6">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-8 h-8 text-white"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v4m0 4h.01M10.29 3.86l-8.18 14.14A1.5 1.5 0 0 0 3.42 20.5h17.16a1.5 1.5 0 0 0 1.31-2.5L13.71 3.86a1.5 1.5 0 0 0-2.42 0z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-navy-800 mb-2">
          {t("errorTitle")}
        </h1>
        <p className="text-sm text-gray-500 mb-8">{t("errorDescription")}</p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => retry()}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-full transition-colors text-sm"
          >
            {t("errorRetry")}
          </button>
          <Link
            href="/"
            className="block w-full text-center bg-white hover:bg-warm-100 text-navy-800 font-semibold py-3 rounded-full border border-gray-200 transition-colors text-sm"
          >
            {t("errorHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
