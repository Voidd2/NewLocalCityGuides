import { setRequestLocale } from "next-intl/server";
import { CustomRouteBuilder } from "@/components/custom-route/CustomRouteBuilder";
import { Footer } from "@/components/layout/Footer";

export default async function CustomRoutePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <CustomRouteBuilder />
      <Footer />
    </>
  );
}
