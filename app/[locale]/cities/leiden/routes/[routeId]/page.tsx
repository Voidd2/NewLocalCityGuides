/**
 * Route detail page
 *
 * URL:  /nl/cities/leiden/routes/historisch-leiden
 *       /en/cities/leiden/routes/historisch-leiden
 *
 * SEO strategy:
 *  - Slug contains city name ("leiden") for keyword relevance
 *  - generateMetadata produces locale-aware title/description
 *  - JSON-LD TouristAttraction + ItemList structured data
 *  - hreflang handled by next-intl middleware (alternate links)
 *  - OG image fallback to cover image or gradient placeholder
 */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { ArrowLeft, Clock, MapPin, Navigation, CheckCircle, Circle, ChevronRight } from 'lucide-react';
import { loadRoute, loadLocations } from '@/content/loader';
import type { RouteRecord, LocationRecord } from '@/content/schema';

interface Props { params: Promise<{ locale: string; routeId: string }> }

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://yourlocalcityguide.com';

const THEME_LABELS: Record<string, { nl: string; en: string }> = {
  HISTORY:    { nl: 'Geschiedenis', en: 'History' },
  HIDDEN_GEM: { nl: 'Verborgen plek', en: 'Hidden gem' },
  FOOD:       { nl: 'Eten & drinken', en: 'Food & drink' },
  SCENIC:     { nl: 'Uitzicht', en: 'Scenic' },
  CULTURE:    { nl: 'Cultuur', en: 'Culture' },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, routeId } = await params;
  const route = loadRoute('leiden', routeId);
  if (!route) return {};

  const loc = locale as 'nl' | 'en';
  const title = route.title[loc];
  const description = route.description[loc];
  const canonical = `${BASE_URL}/${locale}/cities/leiden/routes/${routeId}`;

  return {
    title: loc === 'nl'
      ? `${title} — Leiden Wandeltour`
      : `${title} — Leiden Walking Tour`,
    description: description.slice(0, 160),
    alternates: {
      canonical,
      languages: {
        'nl': `${BASE_URL}/nl/cities/leiden/routes/${routeId}`,
        'en': `${BASE_URL}/en/cities/leiden/routes/${routeId}`,
      },
    },
    openGraph: {
      title: loc === 'nl' ? `${title} — Leiden Wandeltour` : `${title} — Leiden Walking Tour`,
      description: description.slice(0, 160),
      url: canonical,
      siteName: 'YourLocalCityGuide',
      locale: loc === 'nl' ? 'nl_NL' : 'en_GB',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: loc === 'nl' ? `${title} — Leiden Wandeltour` : `${title} — Leiden Walking Tour`,
      description: description.slice(0, 160),
    },
  };
}

function buildJsonLd(
  route: RouteRecord,
  stops: LocationRecord[],
  locale: 'nl' | 'en',
  routeId: string,
) {
  const loc = locale;
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: route.title[loc],
    description: route.description[loc],
    url: `${BASE_URL}/${loc}/cities/leiden/routes/${routeId}`,
    touristType: 'Cultural tourists',
    itinerary: {
      '@type': 'ItemList',
      numberOfItems: stops.length,
      itemListElement: stops.map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'TouristAttraction',
          name: s.content.title[loc],
          description: s.content.subtitle[loc],
          geo: {
            '@type': 'GeoCoordinates',
            latitude: s.coordinates.lat,
            longitude: s.coordinates.lng,
          },
          address: s.address,
        },
      })),
    },
  };
}

const THEME_COLORS: Record<string, string> = {
  HISTORY:    'bg-amber-50 border-amber-200 text-amber-800',
  HIDDEN_GEM: 'bg-purple-50 border-purple-200 text-purple-800',
  FOOD:       'bg-green-50 border-green-200 text-green-800',
  SCENIC:     'bg-sky-50 border-sky-200 text-sky-800',
  CULTURE:    'bg-rose-50 border-rose-200 text-rose-800',
};

const ACCESS_LABEL: Record<string, { nl: string; en: string }> = {
  free:                    { nl: 'Gratis', en: 'Free' },
  paid:                    { nl: 'Betaald', en: 'Paid' },
  free_with_paid_interior: { nl: 'Buiten gratis', en: 'Outside free' },
};

export default async function RouteDetailPage({ params }: Props) {
  const { locale, routeId } = await params;
  const loc = locale as 'nl' | 'en';

  const route = loadRoute('leiden', routeId);
  if (!route) notFound();

  const allLocations = loadLocations('leiden');
  // Map stops to location records in stop order
  const stops: LocationRecord[] = route.stops
    .sort((a, b) => a.order - b.order)
    .map((s) => allLocations.find((l) => l.id === s.locationId))
    .filter((l): l is LocationRecord => !!l);

  const themeColor = THEME_COLORS[route.theme] ?? THEME_COLORS.HISTORY;
  const themeLabel = THEME_LABELS[route.theme]?.[loc] ?? route.theme;

  const jsonLd = buildJsonLd(route, stops, loc, routeId);

  return (
    <>
      <Script
        id="route-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen pt-14">
        {/* Hero */}
        <div className={`border-b py-14 px-4 ${themeColor.split(' ')[0]} ${themeColor.split(' ')[1]}`}>
          <div className="max-w-3xl mx-auto">
            <Link
              href={`/${locale}/cities/leiden/routes`}
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {loc === 'nl' ? 'Alle routes' : 'All routes'}
            </Link>

            <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border mb-3 ${themeColor}`}>
              {themeLabel}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{route.title[loc]}</h1>
            <p className="text-gray-600 leading-relaxed mb-6 max-w-xl">{route.description[loc]}</p>

            {/* Stats */}
            <div className="flex flex-wrap gap-3">
              {[
                { Icon: MapPin, label: `${(route.distanceMetres / 1000).toFixed(1)} km` },
                { Icon: Clock, label: `${route.walkMinutes} min` },
                { Icon: Circle, label: loc === 'nl' ? `${stops.length} stops` : `${stops.length} stops` },
              ].map(({ Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-1.5 text-sm bg-white/80 border border-gray-200 px-3 py-1.5 rounded-full text-gray-700">
                  <Icon className="w-3.5 h-3.5" /> {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-10 space-y-10">
          {/* Start CTA */}
          <div className="bg-gray-900 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-white font-semibold mb-1">
                {loc === 'nl' ? 'Klaar om te starten?' : 'Ready to start?'}
              </p>
              <p className="text-gray-400 text-sm">
                {loc === 'nl'
                  ? 'GPS start de video automatisch als je aankomt bij een stop.'
                  : 'GPS starts the video automatically when you arrive at a stop.'}
              </p>
            </div>
            <Link
              href={`/${locale}/tour?citySlug=leiden&routeId=${routeId}`}
              className="inline-flex items-center gap-2 bg-amber-400 text-gray-900 font-semibold px-5 py-3 rounded-full hover:bg-amber-300 transition-colors shrink-0 text-sm"
            >
              <Navigation className="w-4 h-4" />
              {loc === 'nl' ? 'Start wandeltour' : 'Start walking tour'}
            </Link>
          </div>

          {/* Stops */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-5">
              {loc === 'nl' ? 'Stops op deze route' : 'Stops on this route'}
            </h2>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[18px] top-6 bottom-6 w-0.5 bg-gray-200 hidden sm:block" />

              <div className="space-y-4">
                {stops.map((loc_stop, i) => {
                  const stopMeta = route.stops.find((s) => s.locationId === loc_stop.id);
                  return (
                    <div key={loc_stop.id} className="relative flex gap-4">
                      {/* Number bubble */}
                      <div className="shrink-0 w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm z-10">
                        {i + 1}
                      </div>

                      {/* Card */}
                      <div className="flex-1 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 mb-0.5">{loc_stop.content.title[loc]}</h3>
                            <p className="text-sm text-gray-500 mb-2">{loc_stop.content.subtitle[loc]}</p>
                            <p className="text-sm text-gray-700 line-clamp-2">{loc_stop.content.story[loc]}</p>
                          </div>
                          {loc_stop.imageUrl && (
                            <div className="shrink-0 w-20 h-16 rounded-xl overflow-hidden bg-gray-100">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={loc_stop.imageUrl}
                                alt={loc_stop.content.title[loc]}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>
                          )}
                        </div>

                        {/* Instruction */}
                        {stopMeta?.instruction && (
                          <p className="mt-3 text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2 leading-relaxed">
                            🧭 {stopMeta.instruction[loc]}
                          </p>
                        )}

                        {/* Meta row */}
                        <div className="mt-3 flex items-center gap-3 flex-wrap">
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {loc_stop.visitMinutes} min
                          </span>
                          <span className="text-xs text-gray-400">
                            {ACCESS_LABEL[loc_stop.accessType]?.[loc]}
                          </span>
                          <Link
                            href={`/${locale}/cities/leiden/locations/${loc_stop.id}`}
                            className="ml-auto text-xs text-amber-700 hover:text-amber-900 font-medium flex items-center gap-0.5 transition-colors"
                          >
                            {loc === 'nl' ? 'Volledig verhaal' : 'Full story'}
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Tips */}
          <section className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
            <h3 className="font-semibold text-amber-900 mb-3">
              {loc === 'nl' ? '💡 Tips voor deze route' : '💡 Tips for this route'}
            </h3>
            <ul className="space-y-2 text-sm text-amber-800">
              {loc === 'nl' ? (
                <>
                  <li>• Draag comfortabele schoenen — de route heeft klinkerbestrating.</li>
                  <li>• De Hortus heeft een entreeprijs (€10). Neem het bewaren voor het einde.</li>
                  <li>• Stop 2 (Pieterskerk) is 's maandags gesloten.</li>
                  <li>• Beste tijd: ochtend voor minder drukte bij de Burcht.</li>
                </>
              ) : (
                <>
                  <li>• Wear comfortable shoes — the route has cobblestone streets.</li>
                  <li>• The Hortus has an entry fee (€10). Save it for the end.</li>
                  <li>• Stop 2 (Pieterskerk) is closed on Mondays.</li>
                  <li>• Best time: morning for fewer crowds at the Burcht.</li>
                </>
              )}
            </ul>
          </section>

          {/* Bottom CTA */}
          <div className="text-center pb-6">
            <Link
              href={`/${locale}/tour?citySlug=leiden&routeId=${routeId}`}
              className="inline-flex items-center gap-2 bg-gray-900 text-white font-semibold px-7 py-3.5 rounded-full hover:bg-gray-700 transition-colors text-sm"
            >
              <Navigation className="w-4 h-4" />
              {loc === 'nl' ? 'Start GPS wandeltour' : 'Start GPS walking tour'}
            </Link>
            <p className="text-xs text-gray-400 mt-2">
              {loc === 'nl' ? 'Video start automatisch bij elke stop' : 'Video starts automatically at every stop'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
