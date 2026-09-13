import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, MapPin, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Routes Leiden',
  description: 'Audio wandelroutes door historisch Leiden.',
};

interface Props {
  params: Promise<{ locale: string }>;
}

const THEME_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  HISTORY: { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' },
  HIDDEN_GEM: { bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-200' },
};

const ROUTES = [
  {
    id: 'historisch-leiden',
    title: 'Historisch Leiden',
    description: 'Loop langs de plek van het Leidse Ontzet, de middeleeuwse Burcht en de oudste universiteit van Nederland. Een reis door 1000 jaar geschiedenis in het hart van de stad.',
    theme: 'HISTORY',
    themeLabel: 'Geschiedenis',
    distanceKm: 2.1,
    durationMin: 90,
    stops: 5,
    price: 'Gratis',
    priceNote: null,
  },
  {
    id: 'verborgen-plekken',
    title: 'Verborgen plekken',
    description: 'Ontdek de hofjes, steegjes en geheime tuinen die Leiden verbergt voor de gewone toerist. Deze route laat je het Leiden zien dat alleen locals kennen.',
    theme: 'HIDDEN_GEM',
    themeLabel: 'Verborgen plek',
    distanceKm: 1.8,
    durationMin: 75,
    stops: 4,
    price: 'Premium',
    priceNote: 'Beschikbaar met City Pass',
  },
];

export default async function LeidenRoutesPage({ params }: Props) {
  const { locale } = await params;

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Back */}
        <Link
          href={`/${locale}/cities/leiden`}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Terug naar Leiden
        </Link>

        <h1 className="text-3xl font-bold mb-2">Routes in Leiden</h1>
        <p className="text-gray-600 mb-8">Kies een route en begin je GPS-geleide wandeltour.</p>

        <div className="space-y-6">
          {ROUTES.map((route) => {
            const style = THEME_STYLES[route.theme] ?? THEME_STYLES.HISTORY;
            return (
              <article
                key={route.id}
                className={`rounded-2xl border ${style.border} ${style.bg} p-6 shadow-sm`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${style.bg} ${style.text} border ${style.border} mb-2 inline-block`}>
                      {route.themeLabel}
                    </span>
                    <h2 className="text-xl font-bold text-gray-900">{route.title}</h2>
                  </div>
                  <div className="text-right ml-4 shrink-0">
                    <p className={`font-bold text-lg ${style.text}`}>{route.price}</p>
                    {route.priceNote && (
                      <p className="text-xs text-gray-500 mt-0.5">{route.priceNote}</p>
                    )}
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-4 leading-relaxed">{route.description}</p>

                {/* Badges */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs text-gray-600 bg-white/70 border border-gray-200 px-2.5 py-1 rounded-full">
                    <MapPin className="w-3 h-3" /> {route.distanceKm} km
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-gray-600 bg-white/70 border border-gray-200 px-2.5 py-1 rounded-full">
                    <Clock className="w-3 h-3" /> {route.durationMin} min
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-gray-600 bg-white/70 border border-gray-200 px-2.5 py-1 rounded-full">
                    {route.stops} stops
                  </span>
                </div>

                <Link
                  href={`/${locale}/tour?citySlug=leiden&routeId=${route.id}`}
                  className="inline-flex items-center gap-1 text-sm font-medium bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
                >
                  Start route →
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
