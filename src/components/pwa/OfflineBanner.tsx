"use client";

import { useOffline } from "next/offline";
import { useTranslations } from "next-intl";

export function OfflineBanner() {
  const isOffline = useOffline();
  const t = useTranslations("offline");

  if (!isOffline) return null;

  return (
    <div role="status" className="fixed inset-x-0 top-0 z-[3000] bg-navy-800 px-4 py-2 text-center text-xs font-semibold text-white shadow-lg">
      {t("message")}
    </div>
  );
}
