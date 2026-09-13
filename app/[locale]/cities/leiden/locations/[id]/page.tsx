import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Clock, Ticket, ExternalLink, ArrowLeft, Lightbulb, History } from 'lucide-react';
import { loadLocations, loadSources } from '@/content/loader';

interface Props {
  params: Promise<{ locale: string; id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const locations = loadLocations('leiden');
  const loc = locations.find((l) => l.id === id);
  if (!loc) return {};
  return {
    title: loc.content.title.nl,
    description: loc.content.subtitle.nl,
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

export default async function LocationDetailPage({ params }: Props) {
  const { locale, id } = await params;
  const locations = loadLocations('leiden');
  const loc = locations.find((l) => l.id === id);
  if (!loc) notFound();

  const sources = loadSources('leiden');
  const locSources = sources.filter((s) => loc.sourceIds.includes(s.id));

  const lang = (locale === 'en' ? 'en' : 'nl') as 'nl' | 'en';

  return (
    <div className="min-h-screen pt-14">
      {/* Hero */}
      <div className="relative">
        {loc.imageUrl ? (
          <div className="h-64 md:h-80 overflow-hidden relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={loc.imageUrl}
              alt={loc.content.title[lang]}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 className="text-3xl font-bold mb-1">{loc.content.title[lang]}</h1>
              <p className="text-white/80">{loc.content.subtitle[lang]}</p>
            </div>
          </div>
        ) : (
          <div className="h-48 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-10 h-10 text-amber-400 mx-auto mb-2" />
              <h1 className="text-2xl font-bold">{loc.content.title[lang]}</h1>
              <p className="text-gray-600 text-sm mt-1">{loc.content.subtitle[lang]}</p>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        {/* Back button */}
        <Link
          href={`/${locale}/cities/leiden`}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Terug naar Leiden
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {loc.themes.map((t) => (
            <span key={t} className="text-xs font-medium bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">
              {THEME_LABELS[t] ?? t}
            </span>
          ))}
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${ACCESS_COLORS[loc.accessType]}`}>
            <Ticket className="w-3 h-3 inline mr-1" />
            {ACCESS_LABELS[loc.accessType]}
          </span>
        </div>

        {/* Story */}
        <section>
          <h2 className="text-xl font-bold mb-3">Het verhaal</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{loc.content.story[lang]}</p>
        </section>

        {/* Look around */}
        {loc.content.lookAround && (
          <section className="bg-blue-50 border border-blue-100 rounded-xl p-5">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" /> Kijk om je heen
            </h3>
            <p className="text-blue-800 text-sm leading-relaxed">{loc.content.lookAround[lang]}</p>
          </section>
        )}

        {/* Then vs Now */}
        {loc.content.thenVsNow && (
          <section className="bg-amber-50 border border-amber-100 rounded-xl p-5">
            <h3 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
              <History className="w-4 h-4" /> Toen vs Nu
            </h3>
            <p className="text-amber-800 text-sm leading-relaxed">{loc.content.thenVsNow[lang]}</p>
          </section>
        )}

        {/* Fun facts */}
        {loc.content.funFacts && loc.content.funFacts.length > 0 && (
          <section>
            <h3 className="text-lg font-bold mb-3">Weetjes</h3>
            <ul className="space-y-2">
              {loc.content.funFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="text-amber-500 font-bold shrink-0">✦</span>
                  {fact[lang]}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Meta info */}
        <section className="border border-gray-100 rounded-xl p-5 space-y-3">
          <h3 className="font-semibold mb-2">Praktische info</h3>
          {loc.address && (
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-gray-500 text-xs mb-0.5">Adres</p>
                <p className="text-gray-900">{loc.address}</p>
              </div>
            </div>
          )}
          {loc.openingHours && (
            <div className="flex items-start gap-3 text-sm">
              <Clock className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-gray-500 text-xs mb-0.5">Openingstijden</p>
                <p className="text-gray-900">{loc.openingHours}</p>
              </div>
            </div>
          )}
          <div className="flex items-start gap-3 text-sm">
            <Clock className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-gray-500 text-xs mb-0.5">Bezoektijd</p>
              <p className="text-gray-900">± {loc.visitMinutes} minuten</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <Ticket className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-gray-500 text-xs mb-0.5">Toegang</p>
              <p className="text-gray-900">{ACCESS_LABELS[loc.accessType]}</p>
            </div>
          </div>
        </section>

        {/* Sources */}
        {locSources.length > 0 && (
          <section>
            <h3 className="text-lg font-bold mb-3">Bronnen</h3>
            <ul className="space-y-2">
              {locSources.map((src) => (
                <li key={src.id} className="flex items-start gap-2 text-sm">
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
                  {src.url ? (
                    <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {src.title}{src.author ? ` — ${src.author}` : ''}{src.year ? ` (${src.year})` : ''}
                    </a>
                  ) : (
                    <span className="text-gray-600">
                      {src.title}{src.author ? ` — ${src.author}` : ''}{src.year ? ` (${src.year})` : ''}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Back button bottom */}
        <div className="pt-4">
          <Link
            href={`/${locale}/cities/leiden`}
            className="inline-flex items-center gap-2 text-sm border border-gray-200 rounded-full px-4 py-2 hover:border-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Terug naar Leiden
          </Link>
        </div>
      </div>
    </div>
  );
}
