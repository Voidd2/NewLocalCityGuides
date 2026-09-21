import { setRequestLocale } from "next-intl/server";
import { HulpPage } from "@/components/activiteiten/HulpPage";

export default async function ActiviteitenHulp({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HulpPage />;
}
