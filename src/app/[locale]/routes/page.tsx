import { setRequestLocale } from "next-intl/server";
import { RoutesOverview } from "@/components/routes/RoutesOverview";
import { Footer } from "@/components/layout/Footer";

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
      <Footer />
    </>
  );
}
