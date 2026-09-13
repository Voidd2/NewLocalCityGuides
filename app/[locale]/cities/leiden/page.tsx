import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Clock, Ticket, ExternalLink, Route, Navigation } from 'lucide-react';
import { loadCity, loadLocations } from '@/content/loader';
import type { MapConfig } from '@/features/map/types';
import CityMapClient from '@/features/map/CityMapClient';

interface Props { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug !== 'leiden') return {};
  return {
    title: 'Leiden — YourLocalCityGuide',
    description: 'Ontdek Leiden via audio walking tours. Gratis routes langs historische locaties.',
  };
}

const THEME_LABELS: Record<string, string> = {
  HISTORY: 'Geschiedenis',
  HIDDEN_GEM: 'Verborgen plek',
  FOOD: 'Eten & drinken',
  SCENIC: 'Uitzicht',
  CULTURE: 'Cultuur',
};

const ACCESS_LABELS: Record<string, string> = {
  free: 'Gratis',
  paid: 'Betaald',
  free_with_paid_interior: 'Buiten gratis',
};

const ACCESS_COLORS: Record<string, string> = {
  free: 'bg-green-100 text-green-800',
  paid: 'bg-amber-100 text-amber-800',
  free_with_paid_interior: 'bg-blue-100 text-blue-800',
};

export default async function LeidenPage({ params }: Props) {
  const { locale, slug } = await params;
  if (slug !== 'leiden') notFound();

  const city = loadCity('leiden');
  const locations = loadLocations('leiden');

  const mapConfig: MapConfig = {
    center: [city.coordinates.lng, city.coordinates.lat],
    zoom: 14,
    markers: locations.map((loc) => ({
      id: loc.id,
      lng: loc.coordinates.lng,
      lat: loc.coordinates.lat,
      label: loc.content.title.nl,
      theme: loc.themes[0],
    })),
  };

  return (
    <main className="min-h-screen pt-14">
      {/* Hero */}
      <div className="bg-amber-50 border-b border-amber-100 py-16 px-4 text-center">
        <div className="inline-flex items-center gap-2 text-amber-700 text-sm font-medium mb-4">
          <MapPin className="w-4 h-4" /> Nederland
        </div>
        <h1 className="text-3xl font-bold mb-2">{city.name.nl}</h1>
        <p className="text-gray-600 max-w-md mx-auto text-sm mb-4">{city.description.nl}</p>
        <div className="inline-flex items-center gap-2 text-xs font-medium bg-amber-100 text-amber-800 px-3 py-1 rounded-full mb-6">
          {locations.length} locaties beschikbaar
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href={`/${locale}/tour?citySlug=leiden&routeId=historisch-leiden`}
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-sm"
          >
            <Navigation className="w-4 h-4" /> Start tour
          </Link>
          <Link
            href={`/${locale}/cities/leiden/routes`}
            className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-900 transition-colors text-sm"
          >
            <Route className="w-4 h-4" /> Bekijk routes
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">
        {/* Map */}
        {locations.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" /> Kaart
            </h2>
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <CityMapClient config={mapConfig} className="h-96" />
            </div>
          </section>
        )}

        {/* Locations grid */}
        <section>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Route className="w-5 h-5" /> Locaties
          </h2>
          {locations.length === 0 ? (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
              <p className="text-blue-700 text-sm">Locaties worden geverifieerd — kom snel terug.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {locations.map((loc) => (
                <article
                  key={loc.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Image */}
                  {loc.imageUrl ? (
                    <div className="h-40 bg-gray-100 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={loc.imageUrl}
                        alt={loc.content.title.nl}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="h-40 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-amber-400" />
                    </div>
                  )}

                  <div className="p-5">
                    {/* Theme tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {loc.themes.map((t) => (
                        <span key={t} className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                          {THEME_LABELS[t] ?? t}
                        </span>
                      ))}
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${ACCESS_COLORS[loc.accessType]}`}>
                        <Ticket className="w-3 h-3 inline mr-1" />
                        {ACCESS_LABELS[loc.accessType]}
                      </span>
                    </div>

                    <h3 className="font-bold text-gray-900 mb-1">{loc.content.title.nl}</h3>
                    <p className="text-sm text-gray-500 mb-3">{loc.content.subtitle.nl}</p>
                    <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">
                      {loc.content.story.nl}
                    </p>

                    {/* Meta */}
                    <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {loc.visitMinutes} min
                      </span>
                      {loc.address && (
                        <span className="flex items-center gap-1 truncate">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{loc.address.split(',')[0]}</span>
                        </span>
                      )}
                    </div>

                    {/* Detail link */}
                    <Link
                      href={`/${locale}/cities/leiden/locations/${loc.id}`}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-amber-700 hover:text-amber-900 transition-colors"
                    >
                      Lees meer <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Coming soon / email */}
        <section className="bg-gray-50 rounded-2xl border p-8 text-center">
          <h2 className="font-semibold mb-1">Meer routes komen eraan</h2>
          <p className="text-sm text-gray-600 mb-6">
            We voegen audio toe en bouwen volledige wandelroutes. Meld je aan voor vroege toegang.
          </p>
          <form className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="jouw@email.nl"
              className="flex-1 px-3 py-2 border border-gray-200 rounded-full text-sm focus:outline-none bg-white"
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
    </main>
  );
}
