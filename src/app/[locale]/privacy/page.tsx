import { getTranslations, setRequestLocale } from "next-intl/server";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return createPageMetadata(locale, "privacy", "/privacy", { index: false });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacyPage");

  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-navy-800 mb-6">{t("title")}</h1>

        <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
          <p>{t("intro")}</p>

          <h2 className="text-lg font-bold text-navy-800 mt-6">{t("storedTitle")}</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>{t("storedAccount")}</li>
            <li>{t("storedRoutes")}</li>
            <li>{t("storedConsent")}</li>
          </ul>

          <h2 className="text-lg font-bold text-navy-800 mt-6">{t("locationTitle")}</h2>
          <p>{t("locationText")}</p>

          <h2 className="text-lg font-bold text-navy-800 mt-6">{t("offlineTitle")}</h2>
          <p>{t("offlineText")}</p>

          <h2 className="text-lg font-bold text-navy-800 mt-6">{t("servicesTitle")}</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>{t("servicesMap")}</li>
            <li>{t("servicesGoogle")}</li>
          </ul>

          <h2 className="text-lg font-bold text-navy-800 mt-6">{t("cookiesTitle")}</h2>
          <p>{t("cookiesText")}</p>

          <h2 className="text-lg font-bold text-navy-800 mt-6">{t("contactTitle")}</h2>
          <p>
            {t("contactText")}{" "}
            <a href="mailto:info@yourlocalcityguide.com" className="text-orange-500 hover:text-orange-600">
              info@yourlocalcityguide.com
            </a>
          </p>

          <p className="text-xs text-gray-400 mt-8">{t("updated")}</p>
        </div>
      </div>
    </>
  );
}
