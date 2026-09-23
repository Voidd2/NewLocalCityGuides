import { getTranslations, setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/home/HeroSection";
import { HomeContent } from "@/components/home/HomeContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { localizedUrl, SITE_URL } from "@/lib/seo";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "YourLocalCityGuide",
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.ico`,
      email: "info@yourlocalcityguide.com",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "YourLocalCityGuide",
      url: localizedUrl(locale === "en" || locale === "de" ? locale : "nl"),
      inLanguage: locale,
    },
    {
      "@context": "https://schema.org",
      "@type": "City",
      name: "Leiden",
      url: localizedUrl(locale === "en" || locale === "de" ? locale : "nl"),
      image: `${SITE_URL}/images/heroes/10001-leiden-canal-historic-buildings.jpg`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [1, 2, 3, 4].map((number) => ({
        "@type": "Question",
        name: t(`faq${number}Q`),
        acceptedAnswer: { "@type": "Answer", text: t(`faq${number}A`) },
      })),
    },
  ];

  return (
    <>
      <JsonLd data={structuredData} />
      <HeroSection />
      <HomeContent />
    </>
  );
}
