import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Headphones, Route } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('home.hero');
  return { title: t('headline'), description: t('subline') };
}

export default function HomePage() {
  const t = useTranslations('home');
  const nav = useTranslations('nav');
  return (
    <main className="min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-semibold">YourLocalCityGuide</span>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/cities" className="hover:text-gray-900 transition-colors">{nav('cities')}</Link>
            <Link href="/about" className="hover:text-gray-900 transition-colors">{nav('about')}</Link>
          </div>
        </div>
      </nav>
      <section className="pt-32 pb-20 px-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-sm font-medium px-3 py-1 rounded-full mb-6">
          <MapPin className="w-3.5 h-3.5" /> Leiden · Nederland
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">{t('hero.headline')}</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">{t('hero.subline')}</p>
        <Link href="/cities/leiden" className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors">
          <Headphones className="w-4 h-4" /> {t('hero.cta')}
        </Link>
      </section>
      <section className="max-w-4xl mx-auto px-4 pb-20 grid md:grid-cols-3 gap-6">
        {([
          { Icon: MapPin,     title: 'GPS gestuurd',   desc: 'Audio start automatisch als je aankomt bij een locatie.' },
          { Icon: Headphones, title: 'Echte verhalen', desc: 'Geverifieerde historische feiten — geen Wikipedia copy.' },
          { Icon: Route,      title: 'Jouw tempo',     desc: 'Loop in je eigen tempo, sla stops over, ga terug.' },
        ] as const).map(({ Icon, title, desc }) => (
          <div key={title} className="bg-gray-50 rounded-2xl p-6">
            <Icon className="w-6 h-6 mb-3" />
            <h3 className="font-semibold mb-1">{title}</h3>
            <p className="text-sm text-gray-600">{desc}</p>
          </div>
        ))}
      </section>
      <section className="bg-gray-50 border-t py-16 px-4 text-center">
        <h2 className="font-semibold mb-2">{t('comingSoon.title')}</h2>
        <p className="text-sm text-gray-600 mb-6">{t('comingSoon.description')}</p>
        <form className="flex gap-2 max-w-sm mx-auto">
          <input type="email" placeholder="jouw@email.nl" className="flex-1 px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
          <button type="submit" className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors">Aanmelden</button>
        </form>
      </section>
    </main>
  );
}
