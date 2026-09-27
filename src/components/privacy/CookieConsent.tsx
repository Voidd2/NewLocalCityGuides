"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const STORAGE_KEY = "ylcg_cookie_consent_v1";

export function CookieConsent() {
  const t = useTranslations("privacyConsent");
  const [acknowledged, setAcknowledged] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const saved = localStorage.getItem(STORAGE_KEY);
      setAcknowledged(saved === "essential");
      setReady(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const continueWithEssentials = () => {
    localStorage.setItem(STORAGE_KEY, "essential");
    setAcknowledged(true);
  };

  if (!ready || acknowledged) return null;

  return (
    <aside
      aria-label={t("title")}
      className="fixed inset-x-3 bottom-20 z-[2900] mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl md:bottom-5"
    >
      <h2 className="font-bold text-navy-800">{t("title")}</h2>
      <p className="mt-1 text-xs leading-5 text-gray-600">{t("description")}</p>
      <p className="mt-1 text-[11px] leading-4 text-gray-400">{t("optionalNote")}</p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button onClick={continueWithEssentials} className="min-h-11 rounded-full bg-orange-500 px-4 py-2.5 text-xs font-semibold text-white hover:bg-orange-600">
          {t("continueEssential")}
        </button>
        <Link href="/privacy" className="min-h-11 px-3 py-3 text-center text-xs font-semibold text-blue-700 hover:underline">
          {t("privacyPolicy")}
        </Link>
      </div>
    </aside>
  );
}
