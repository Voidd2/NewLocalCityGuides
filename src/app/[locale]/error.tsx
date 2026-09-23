"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { StatusPage } from "@/components/ui/StatusPage";

export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  const t = useTranslations("errors");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusPage
      code="500"
      eyebrow={t("errorEyebrow")}
      title={t("errorTitle")}
      description={t("errorDescription")}
      actions={
        <>
          <button onClick={retry} className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600">
            {t("tryAgain")}
          </button>
          <Link href="/" className="rounded-full border border-navy-800 px-6 py-3 text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-800 hover:text-white">
            {t("backHome")}
          </Link>
        </>
      }
    />
  );
}
