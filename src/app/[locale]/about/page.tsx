import { setRequestLocale } from "next-intl/server";
import { AboutPage } from "@/components/about/AboutPage";

export default async function About({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutPage />
    </>
  );
}
