import { setRequestLocale } from "next-intl/server";
import { PricingPage } from "@/components/pricing/PricingPage";

export default async function Pricing({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PricingPage />
    </>
  );
}
