import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/lib/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import '../globals.css';

export const metadata: Metadata = {
  title: { template: '%s — YourLocalCityGuide', default: 'YourLocalCityGuide' },
  description: 'Sta waar geschiedenis gebeurde.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as 'nl' | 'en')) notFound();
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className="min-h-screen bg-[#0F0E0D] text-[#F5F0E8] antialiased pb-20 md:pb-0">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <div className="hidden md:block">
            <Footer />
          </div>
          <BottomNav />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
