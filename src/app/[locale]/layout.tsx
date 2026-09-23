import { type ReactNode, Suspense } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { locales } from "@/i18n/config";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { AuthProvider } from "@/lib/auth-context";
import { Footer } from "@/components/layout/Footer";
import { createPageMetadata, SITE_URL } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const base = createPageMetadata(locale, "home");
  return {
    ...base,
    metadataBase: new URL(SITE_URL),
    title: {
      default: String(base.title),
      template: "%s | YourLocalCityGuide",
    },
    applicationName: "YourLocalCityGuide",
    creator: "YourLocalCityGuide",
    publisher: "YourLocalCityGuide",
    keywords: [
      "Leiden",
      "city guide Leiden",
      "self-guided tour Leiden",
      "stadstour Leiden",
      "Stadtführung Leiden",
      "walking route Leiden",
      "Leiden museums",
      "Leiden hidden gems",
    ],
  };
}

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
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="flex flex-col min-h-screen bg-navy-900 pb-16 md:pb-0">
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <Suspense><Header /></Suspense>
            <main className="pt-16 flex-1 bg-warm-50">{children}</main>
            <Footer />
            <BottomNav />
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
