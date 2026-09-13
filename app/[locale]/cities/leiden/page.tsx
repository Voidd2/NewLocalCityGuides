import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Clock, Navigation, Route, ChevronRight } from 'lucide-react';
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

const FILTERS = [
  { key: 'all', label: 'Alle' },
  { key: 'HISTORY', label: 'Geschiedenis' },
  { key: 'CULTURE', label: 'Cultuur' },
  { key: 'FOOD', label: 'Eten' },
  { key: 'HIDDEN_GEM', label: 'Verborgen' },
];

const FAKE_DISTANCES = ['350 m', '450 m', '600 m', '800 m', '1.1 km'];

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
    <main className="min-h-screen bg-[#0F0E0D] pt-14">

      {/* ── Hero ── */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Leiden_Rapenburg.jpg/1280px-Leiden_Rapenburg.jpg"
          alt="Leiden"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E0D] via-black/40 to-black/20" />

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-[#C9A46B] text-xs font-semibold tracking-widest mb-2">
              <MapPin className="w-3.5 h-3.5" />
              Nederland
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-widest text-[#F5F0E8] uppercase mb-2">
              LEIDEN
            </h1>
            <p className="text-[#8B7D6B] text-sm max-w-md mb-5">{city.description.nl}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${locale}/tour?citySlug=leiden&routeId=historisch-leiden`}
                className="inline-flex items-center gap-2 bg-[#C9A46B] text-[#0F0E0D] px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-[#D4B47E] transition-colors"
              >
                <Navigation className="w-4 h-4" /> Start wandeltour
              </Link>
              <Link
                href={`/${locale}/cities/leiden/routes`}
                className="inline-flex items-center gap-2 border border-[rgba(255,255,255,0.25)] text-[#F5F0E8] px-5 py-2.5 rounded-full font-semibold text-sm hover:border-[rgba(255,255,255,0.5)] transition-colors"
              >
                <Route className="w-4 h-4" /> Bekijk routes
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick stats ── */}
      <div className="border-b border-[rgba(255,255,255,0.06)]">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-6 text-xs text-[#8B7D6B]">
          <span>{locations.length} locaties</span>
          <span className="text-[rgba(255,255,255,0.1)]">|</span>
          <span>2 routes</span>
          <span className="text-[rgba(255,255,255,0.1)]">|</span>
          <span className="text-[#4A7C59] font-medium">Gratis te starten</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">

        {/* ── Category filter tabs ── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {FILTERS.map((f, i) => (
            <button
              key={f.key}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                i === 0
                  ? 'bg-[#C9A46B] text-[#0F0E0D]'
                  : 'bg-[#1C1916] border border-[rgba(255,255,255,0.08)] text-[#8B7D6B] hover:text-[#F5F0E8] hover:border-[rgba(255,255,255,0.15)]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* ── Map ── */}
        {locations.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold tracking-widest uppercase text-[#8B7D6B] mb-4">Kaart</h2>
            <div className="rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)] shadow-sm">
              <CityMapClient config={mapConfig} className="h-72 md:h-96" />
            </div>
          </section>
        )}

        {/* ── Location list ── */}
        <section>
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#8B7D6B] mb-4">Locaties</h2>

          {locations.length === 0 ? (
            <div className="bg-[#1C1916] border border-[rgba(255,255,255,0.08)] rounded-2xl p-8 text-center">
              <p className="text-[#8B7D6B] text-sm">Locaties worden geverifieerd — kom snel terug.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {locations.map((loc, idx) => (
                <Link
                  key={loc.id}
                  href={`/${locale}/cities/leiden/locations/${loc.id}`}
                  className="flex items-center gap-4 bg-[#1C1916] border border-[rgba(255,255,255,0.06)] rounded-2xl p-4 hover:border-[#C9A46B]/30 hover:bg-[#252118] transition-all group"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[#252118]">
                    {loc.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={loc.imageUrl}
                        alt={loc.content.title.nl}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-[#5A4E42]" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[#F5F0E8] text-sm truncate">{loc.content.title.nl}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[#C9A46B] text-xs font-medium">{FAKE_DISTANCES[idx] ?? '1 km'}</span>
                      <span className="text-[rgba(255,255,255,0.1)]">&middot;</span>
                      <span className="text-xs text-[#8B7D6B]">{THEME_LABELS[loc.themes[0]] ?? loc.themes[0]}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-xs text-[#5A4E42]">
                      <Clock className="w-3 h-3" />
                      {loc.visitMinutes} min
                    </div>
                  </div>

                  {/* Chevron */}
                  <ChevronRight className="w-4 h-4 text-[#5A4E42] group-hover:text-[#C9A46B] transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* ── Newsletter CTA ── */}
        <section className="bg-[#1C1916] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8 text-center">
          <h2 className="font-bold text-[#F5F0E8] mb-2">Meer routes komen eraan</h2>
          <p className="text-sm text-[#8B7D6B] mb-6 max-w-xs mx-auto">
            We voegen audio toe en bouwen volledige wandelroutes.
          </p>
          <form className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="jouw@email.nl"
              className="flex-1 px-4 py-2.5 bg-[#0F0E0D] border border-[rgba(255,255,255,0.08)] rounded-xl text-sm text-[#F5F0E8] placeholder-[#5A4E42] focus:outline-none focus:border-[#C9A46B]/50"
            />
            <button
              type="submit"
              className="bg-[#C9A46B] text-[#0F0E0D] px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#D4B47E] transition-colors"
            >
              OK
            </button>
          </form>
        </section>

      </div>
    </main>
  );
}
