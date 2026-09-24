import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { SeoLandingPage } from "@/components/seo/SeoLandingPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLanding } from "@/data/seo-content";
import { asLocale, createDynamicMetadata, localizedUrl, SITE_URL } from "@/lib/seo";

const page = getLanding("city-guide-leiden")!;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: value } = await params;
  const locale = asLocale(value);
  return createDynamicMetadata({ locale, title: page.title[locale], description: page.description[locale], path: "/city-guide-leiden", image: page.image, index: true });
}

export default async function CityGuideLeidenPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params;
  const locale = asLocale(value);
  setRequestLocale(locale);
  const structuredData = [
    { "@context": "https://schema.org", "@type": "TouristDestination", name: "Leiden", url: localizedUrl(locale, "/city-guide-leiden"), description: page.description[locale], image: `${SITE_URL}${page.image}` },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: page.faq.map((item) => ({ "@type": "Question", name: item.question[locale], acceptedAnswer: { "@type": "Answer", text: item.answer[locale] } })) },
  ];
  return <><JsonLd data={structuredData} /><SeoLandingPage page={page} locale={locale} /></>;
}
