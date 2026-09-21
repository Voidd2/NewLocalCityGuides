import { setRequestLocale } from "next-intl/server";
import { RoutesOverview } from "@/components/routes/RoutesOverview";

export default async function RoutesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <RoutesOverview />
    </>
  );
}
