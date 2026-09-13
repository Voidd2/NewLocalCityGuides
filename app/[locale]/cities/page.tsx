import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Steden',
  description: 'Ontdek beschikbare steden voor audio wandeltours.',
};

const CITIES = [
  {
    slug: 'leiden',
    name: 'Leiden',
    country: 'Nederland',
    description: 'Geboortestad van Rembrandt. Thuis van de Pilgrimvaders. Oudste universiteit van Nederland.',
    locations: 5,
    status: 'coming_soon' as const,
    badge: 'Early access',
    badgeColor: 'bg-green-100 text-green-800',
  },
  {
    slug: 'amsterdam',
    name: 'Amsterdam',
    country: 'Nederland',
    description: 'De grachtenstad. Rijksmuseum, Anne Frank Huis, Van Gogh Museum.',
    locations: 0,
    status: 'announced' as const,
    badge: 'Binnenkort',
    badgeColor: 'bg-gray-100 text-gray-500',
  },
  {
    slug: 'rotterdam',
    name: 'Rotterdam',
    country: 'Nederland',
    description: 'Moderne architectuur, Markthal, Erasmusbrug en de grootste haven van Europa.',
    locations: 0,
    status: 'announced' as const,
    badge: 'Binnenkort',
    badgeColor: 'bg-gray-100 text-gray-500',
  },
  {
    slug: 'utrecht',
    name: 'Utrecht',
    country: 'Nederland',
    description: 'De Dom, historische werfkelders en een levendige binnenstad.',
    locations: 0,
    status: 'announced' as const,
    badge: 'Binnenkort',
    badgeColor: 'bg-gray-100 text-gray-500',
  },
];

export default function CitiesPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="bg-gray-50 border-b py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-3">Beschikbare steden</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Kies een stad en start een GPS-geleide audio wandeltour langs historische locaties.
        </p>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 gap-6">
          {CITIES.map((city) => (
            <article
              key={city.slug}
              className={`rounded-2xl border overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow ${
                city.status === 'announced' ? 'opacity-60' : ''
              }`}
            >
              {/* Placeholder image */}
              <div className="h-40 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center relative">
                <MapPin className="w-10 h-10 text-amber-400" />
                <span className={`absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded-full ${city.badgeColor}`}>
                  {city.badge}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between mb-1">
                  <h2 className="font-bold text-xl text-gray-900">{city.name}</h2>
                </div>
                <p className="text-sm text-gray-400 mb-2">{city.country}</p>
                <p className="text-sm text-gray-600 mb-4">{city.description}</p>

                {city.locations > 0 && (
                  <p className="text-xs text-gray-400 flex items-center gap-1 mb-4">
                    <Clock className="w-3.5 h-3.5" /> {city.locations} locaties beschikbaar
                  </p>
                )}

                {city.status === 'coming_soon' ? (
                  <Link
                    href={`/nl/cities/${city.slug}`}
                    className="block text-center text-sm bg-gray-900 text-white px-4 py-2.5 rounded-full font-medium hover:bg-gray-700 transition-colors"
                  >
                    Bekijk {city.name} →
                  </Link>
                ) : (
                  <span className="block text-center text-sm bg-gray-100 text-gray-400 px-4 py-2.5 rounded-full cursor-not-allowed font-medium">
                    Coming soon
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
