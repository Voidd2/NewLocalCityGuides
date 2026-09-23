import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { StatusPage } from "@/components/ui/StatusPage";

export default async function NotFound() {
  const t = await getTranslations("errors");

  return (
    <StatusPage
      code="404"
      eyebrow={t("lostEyebrow")}
      title={t("notFoundTitle")}
      description={t("notFoundDescription")}
      actions={
        <>
          <Link href="/" className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600">
            {t("backHome")}
          </Link>
          <Link href="/routes" className="rounded-full border border-navy-800 px-6 py-3 text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-800 hover:text-white">
            {t("viewRoutes")}
          </Link>
        </>
      }
    />
  );
}
