import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { SeoLandingPage } from "@/components/seo/SeoLandingPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLanding } from "@/data/seo-content";
import { asLocale, createDynamicMetadata, localizedUrl, SITE_URL } from "@/lib/seo";

const page = getLanding("leiden-tours")!;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: value } = await params;
  const locale = asLocale(value);
  return createDynamicMetadata({ locale, title: page.title[locale], description: page.description[locale], path: "/leiden-tours", image: page.image, index: true });
}

export default async function LeidenToursPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params;
  const locale = asLocale(value);
  setRequestLocale(locale);
  const structuredData = [
    { "@context": "https://schema.org", "@type": "ItemList", name: page.title[locale], url: localizedUrl(locale, "/leiden-tours"), itemListElement: [
      { "@type": "ListItem", position: 1, name: "Centrum Route", url: localizedUrl(locale, "/routes/centrum-route") },
      { "@type": "ListItem", position: 2, name: "Markt & Ambacht", url: localizedUrl(locale, "/routes/markt-en-ambacht") },
      { "@type": "ListItem", position: 3, name: "Singels & Stad", url: localizedUrl(locale, "/routes/buiten-de-stad") },
    ], image: `${SITE_URL}${page.image}` },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: page.faq.map((item) => ({ "@type": "Question", name: item.question[locale], acceptedAnswer: { "@type": "Answer", text: item.answer[locale] } })) },
  ];
  return <><JsonLd data={structuredData} /><SeoLandingPage page={page} locale={locale} /></>;
}
