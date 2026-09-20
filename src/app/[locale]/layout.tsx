import type { ReactNode } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { locales } from "@/i18n/config";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "YourLocalCityGuide - Ontdek Leiden op jouw tempo",
    template: "%s | YourLocalCityGuide",
  },
  description:
    "Ontdek de verborgen verhalen van Leiden. Zelfgeleide stadstours met interactieve video's, verborgen parels en lokale geheimen. Vanaf 5,99 per persoon.",
  keywords: [
    "Leiden",
    "stadstour",
    "city guide",
    "zelfgeleide tour",
    "interactieve video",
    "verborgen parels",
    "hidden gems",
    "Leiden wandeling",
    "Leiden fietstour",
    "Pilgrim Fathers Leiden",
    "Pieterskerk",
    "De Burcht",
    "Leidens Ontzet",
    "Rembrandt Leiden",
    "Stadtfuhrer Leiden",
    "Leiden Sehenswurdigkeiten",
  ],
  openGraph: {
    title: "YourLocalCityGuide - Ontdek Leiden",
    description:
      "Zelfgeleide stadstours met interactieve video's en verborgen parels. Op jouw tempo, in je eigen taal.",
    type: "website",
    siteName: "YourLocalCityGuide",
    locale: "nl_NL",
    alternateLocale: ["en_US", "de_DE"],
  },
  twitter: {
    card: "summary_large_image",
    title: "YourLocalCityGuide - Ontdek Leiden",
    description:
      "Zelfgeleide stadstours met interactieve video's en verborgen parels. Vanaf 5,99 per persoon.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    languages: {
      nl: "/nl",
      en: "/en",
      de: "/de",
    },
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-warm-50 pb-16 md:pb-0">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <BottomNav />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
