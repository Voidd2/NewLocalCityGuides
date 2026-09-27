import { getTranslations, setRequestLocale } from "next-intl/server";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return createPageMetadata(locale, "terms", "/terms", { index: false });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("termsPage");

  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-navy-800 mb-6">{t("title")}</h1>

        <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
          <p>{t("intro")}</p>

          <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4 text-sm text-navy-800">
            {t("launchNotice")}
          </div>

          <h2 className="text-lg font-bold text-navy-800 mt-6">{t("accessTitle")}</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>{t("accessPersonal")}</li>
            <li>{t("accessAvailability")}</li>
            <li>{t("accessRequirements")}</li>
          </ul>

          <h2 className="text-lg font-bold text-navy-800 mt-6">{t("contentTitle")}</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>{t("contentLicence")}</li>
            <li>{t("contentNoCopy")}</li>
            <li>{t("contentAi")}</li>
          </ul>

          <h2 className="text-lg font-bold text-navy-800 mt-6">{t("purchaseTitle")}</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>{t("purchasePrice")}</li>
            <li>{t("purchaseDigital")}</li>
            <li>{t("purchaseWithdrawal")}</li>
          </ul>

          <h2 className="text-lg font-bold text-navy-800 mt-6">{t("safetyTitle")}</h2>
          <p>{t("safetyText")}</p>

          <h2 className="text-lg font-bold text-navy-800 mt-6">{t("complaintsTitle")}</h2>
          <p>{t("complaintsText")}</p>

          <h2 className="text-lg font-bold text-navy-800 mt-6">{t("contactTitle")}</h2>
          <p>
            {t("contactText")}{" "}
            <a href="mailto:info@yourlocalcityguide.com" className="text-orange-600 underline underline-offset-4 hover:text-orange-700">
              info@yourlocalcityguide.com
            </a>
          </p>

          <p className="text-xs text-gray-500 mt-8">{t("updated")}</p>
        </div>
      </div>
    </>
  );
}
