import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Headphones, Route, Clock } from 'lucide-react';

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.hero' });
  return { title: t('headline'), description: t('subline') };
}

export default function HomePage() {
  const t = useTranslations('home');

  const cities = [
    {
      slug: 'leiden',
      name: 'Leiden',
      country: 'Nederland',
      description: 'Geboortestad van Rembrandt, thuis van de Pilgrimvaders.',
      locations: 5,
      status: 'early_access',
    },
    {
      slug: 'amsterdam',
      name: 'Amsterdam',
      country: 'Nederland',
      description: 'De grachtenstad. Rijksmuseum, Anne Frank, meer.',
      locations: 0,
      status: 'announced',
    },
    {
      slug: 'rotterdam',
      name: 'Rotterdam',
      country: 'Nederland',
      description: 'Moderne architectuur, Markthal, Erasmusbrug.',
      locations: 0,
      status: 'announced',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-20 pb-20 px-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-sm font-medium px-3 py-1 rounded-full mb-6">
          <MapPin className="w-3.5 h-3.5" /> Leiden · Nederland
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">{t('hero.headline')}</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">{t('hero.subline')}</p>
        <Link
          href="/nl/cities/leiden"
          className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors"
        >
          <Headphones className="w-4 h-4" /> {t('hero.cta')}
        </Link>
      </section>

      {/* Feature cards */}
      <section className="max-w-4xl mx-auto px-4 pb-20 grid md:grid-cols-3 gap-6">
        {([
          { Icon: MapPin, title: 'GPS gestuurd', desc: 'Audio start automatisch als je aankomt bij een locatie.' },
          { Icon: Headphones, title: 'Echte verhalen', desc: 'Geverifieerde historische feiten — geen Wikipedia copy.' },
          { Icon: Route, title: 'Jouw tempo', desc: 'Loop in je eigen tempo, sla stops over, ga terug.' },
        ] as const).map(({ Icon, title, desc }) => (
          <div key={title} className="bg-gray-50 rounded-2xl p-6">
            <Icon className="w-6 h-6 mb-3" />
            <h3 className="font-semibold mb-1">{title}</h3>
            <p className="text-sm text-gray-600">{desc}</p>
          </div>
        ))}
      </section>

      {/* Available cities */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold mb-6">Beschikbare steden</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {cities.map((city) => (
            <div
              key={city.slug}
              className={`rounded-2xl border overflow-hidden ${
                city.status === 'announced' ? 'opacity-60' : ''
              }`}
            >
              {/* Placeholder image */}
              <div className="h-32 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-amber-400" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-gray-900">{city.name}</h3>
                  {city.status === 'early_access' ? (
                    <span className="text-xs bg-green-100 text-green-800 font-medium px-2 py-0.5 rounded-full">Early access</span>
                  ) : (
                    <span className="text-xs bg-gray-100 text-gray-500 font-medium px-2 py-0.5 rounded-full">Binnenkort</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mb-2">{city.country}</p>
                <p className="text-sm text-gray-600 mb-3">{city.description}</p>
                {city.locations > 0 && (
                  <p className="text-xs text-gray-400 flex items-center gap-1 mb-3">
                    <Clock className="w-3 h-3" /> {city.locations} locaties
                  </p>
                )}
                {city.status === 'early_access' ? (
                  <Link
                    href={`/nl/cities/${city.slug}`}
                    className="block text-center text-sm bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
                  >
                    Bekijk Leiden →
                  </Link>
                ) : (
                  <span className="block text-center text-sm bg-gray-100 text-gray-400 px-4 py-2 rounded-full cursor-not-allowed">
                    Binnenkort beschikbaar
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Coming soon / email */}
      <section className="bg-gray-50 border-t py-16 px-4 text-center">
        <h2 className="font-semibold mb-2">{t('comingSoon.title')}</h2>
        <p className="text-sm text-gray-600 mb-6">{t('comingSoon.description')}</p>
        <form className="flex gap-2 max-w-sm mx-auto">
          <input
            type="email"
            placeholder="jouw@email.nl"
            className="flex-1 px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
          <button
            type="submit"
            className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            Aanmelden
          </button>
        </form>
      </section>
    </div>
  );
}
