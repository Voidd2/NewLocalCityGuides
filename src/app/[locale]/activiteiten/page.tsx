import { setRequestLocale } from "next-intl/server";
import { ActiviteitenPage } from "@/components/activiteiten/ActiviteitenPage";

export default async function Activiteiten({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ActiviteitenPage />;
}
