import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Clock, ArrowLeft, Heart, Play, ExternalLink } from 'lucide-react';
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

export default async function LocationDetailPage({ params }: Props) {
  const { locale, id } = await params;
  const locations = loadLocations('leiden');
  const loc = locations.find((l) => l.id === id);
  if (!loc) notFound();

  const sources = loadSources('leiden');
  const locSources = sources.filter((s) => loc.sourceIds.includes(s.id));

  const lang = (locale === 'en' ? 'en' : 'nl') as 'nl' | 'en';

  return (
    <div className="min-h-screen bg-[#0F0E0D]">

      {/* ── Hero image (4.1 style) ── */}
      <div className="relative h-80 md:h-96 overflow-hidden">
        {loc.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={loc.imageUrl}
            alt={loc.content.title[lang]}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1C1916] to-[#252118] flex items-center justify-center">
            <MapPin className="w-16 h-16 text-[#5A4E42]" />
          </div>
        )}
        {/* Gradient from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E0D] via-black/30 to-transparent" />

        {/* Back arrow top-left */}
        <Link
          href={`/${locale}/cities/leiden`}
          className="absolute top-16 left-4 flex items-center justify-center w-9 h-9 rounded-full bg-black/50 backdrop-blur text-white hover:bg-black/70 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>

        {/* Heart icon top-right */}
        <button className="absolute top-16 right-4 flex items-center justify-center w-9 h-9 rounded-full bg-black/50 backdrop-blur text-white hover:bg-black/70 transition-colors">
          <Heart className="w-4 h-4" />
        </button>

        {/* Over image: title + badges */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="inline-flex items-center gap-1 bg-black/60 backdrop-blur border border-[rgba(255,255,255,0.12)] text-[#F5F0E8] text-xs font-medium px-3 py-1 rounded-full">
              <MapPin className="w-3 h-3 text-[#C9A46B]" /> 450 m
            </span>
            {loc.themes.slice(0, 1).map((t) => (
              <span key={t} className="bg-black/60 backdrop-blur border border-[rgba(255,255,255,0.12)] text-[#C9A46B] text-xs font-medium px-3 py-1 rounded-full">
                {THEME_LABELS[t] ?? t}
              </span>
            ))}
            <span className="inline-flex items-center gap-1 bg-black/60 backdrop-blur border border-[rgba(255,255,255,0.12)] text-[#F5F0E8] text-xs font-medium px-3 py-1 rounded-full">
              <Clock className="w-3 h-3" /> {loc.visitMinutes}-{loc.visitMinutes + 20} min
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-[#F5F0E8] leading-tight">
            {loc.content.title[lang]}
          </h1>
          <p className="text-[#8B7D6B] text-sm mt-1">{loc.content.subtitle[lang]}</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">

        {/* ── Start de ervaring CTA (4.1) ── */}
        <Link
          href={`/${locale}/tour?citySlug=leiden&locationId=${loc.id}`}
          className="flex items-center justify-center gap-2 w-full bg-[#C9A46B] text-[#0F0E0D] py-4 rounded-2xl font-bold text-base hover:bg-[#D4B47E] transition-colors"
        >
          Start de ervaring →
        </Link>

        {/* ── Video section (4.2 style) ── */}
        <div className="relative bg-[#1C1916] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden">
          {loc.imageUrl ? (
            <div className="relative h-48">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={loc.imageUrl}
                alt="Video placeholder"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center">
                  <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                </div>
                <div className="text-center">
                  <p className="text-white font-semibold text-sm">Leiden, 1650</p>
                  <p className="text-white/60 text-xs">Video beschikbaar</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-48 flex flex-col items-center justify-center gap-3">
              <div className="w-14 h-14 rounded-full bg-[#252118] border border-[rgba(255,255,255,0.08)] flex items-center justify-center">
                <Play className="w-6 h-6 text-[#5A4E42] ml-0.5" />
              </div>
              <p className="text-[#C9A46B] text-sm font-medium">Video beschikbaar bij launch</p>
            </div>
          )}
        </div>

        {/* ── Story tabs (4.3 style) ── */}
        <div>
          {/* Tab header */}
          <div className="flex items-center gap-1 bg-[#1C1916] border border-[rgba(255,255,255,0.08)] rounded-xl p-1 mb-4">
            {['Verhaal', 'Dan & Nu', 'In de buurt'].map((tab, i) => (
              <button
                key={tab}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  i === 0
                    ? 'bg-[#C9A46B] text-[#0F0E0D]'
                    : 'text-[#8B7D6B] hover:text-[#F5F0E8]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Story content */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#F5F0E8]">
              {loc.content.title[lang]} &mdash; {loc.content.subtitle[lang]}
            </h2>
            <p className="text-[#8B7D6B] leading-relaxed text-sm whitespace-pre-line">
              {loc.content.story[lang]}
            </p>
          </div>

          {/* Then vs Now */}
          {loc.content.thenVsNow && (
            <div className="mt-5 bg-[#1C1916] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-[#C9A46B] mb-2">Toen vs Nu</h3>
              <p className="text-[#8B7D6B] text-sm leading-relaxed">{loc.content.thenVsNow[lang]}</p>
            </div>
          )}

          {/* Fun facts */}
          {loc.content.funFacts && loc.content.funFacts.length > 0 && (
            <div className="mt-4 space-y-2">
              {loc.content.funFacts.map((fact, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-[#8B7D6B]">
                  <span className="text-[#C9A46B] font-bold shrink-0 mt-0.5">✦</span>
                  {fact[lang]}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Practical info (4.5 style) ── */}
        <div className="bg-[#1C1916] border border-[rgba(255,255,255,0.08)] rounded-2xl p-5 space-y-4">
          <h3 className="font-bold text-[#F5F0E8] mb-1">Praktische info</h3>

          {loc.address && (
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="w-4 h-4 text-[#C9A46B] mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-[#5A4E42] mb-0.5">Adres</p>
                <p className="text-[#F5F0E8]">{loc.address}</p>
              </div>
            </div>
          )}

          {loc.openingHours && (
            <div className="flex items-start gap-3 text-sm">
              <Clock className="w-4 h-4 text-[#C9A46B] mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-[#5A4E42] mb-0.5">Openingstijden</p>
                <p className="text-[#F5F0E8]">{loc.openingHours}</p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3 text-sm">
            <Clock className="w-4 h-4 text-[#C9A46B] mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-[#5A4E42] mb-0.5">Duur</p>
              <p className="text-[#F5F0E8]">{loc.visitMinutes}-{loc.visitMinutes + 20} minuten</p>
            </div>
          </div>

          <div className="flex items-start gap-3 text-sm">
            <span className="text-[#C9A46B] mt-0.5 shrink-0">♿</span>
            <div>
              <p className="text-xs text-[#5A4E42] mb-0.5">Toegankelijkheid</p>
              <p className="text-[#F5F0E8]">Grotendeels toegankelijk</p>
            </div>
          </div>

          <div className="flex items-start gap-3 text-sm">
            <span className="text-[#C9A46B] mt-0.5 shrink-0">🎟</span>
            <div>
              <p className="text-xs text-[#5A4E42] mb-0.5">Toegang</p>
              <p className="text-[#F5F0E8]">{ACCESS_LABELS[loc.accessType]}</p>
            </div>
          </div>

          <button className="w-full mt-2 bg-[#C9A46B] text-[#0F0E0D] py-3 rounded-xl font-semibold text-sm hover:bg-[#D4B47E] transition-colors">
            Toon op kaart
          </button>
        </div>

        {/* ── Sources ── */}
        {locSources.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-[#5A4E42] mb-3">Bronnen</h3>
            <ul className="space-y-2">
              {locSources.map((src) => (
                <li key={src.id} className="flex items-start gap-2 text-xs text-[#5A4E42]">
                  <ExternalLink className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  {src.url ? (
                    <a href={src.url} target="_blank" rel="noopener noreferrer" className="hover:text-[#8B7D6B] transition-colors">
                      {src.title}{src.author ? ` — ${src.author}` : ''}{src.year ? ` (${src.year})` : ''}
                    </a>
                  ) : (
                    <span>
                      {src.title}{src.author ? ` — ${src.author}` : ''}{src.year ? ` (${src.year})` : ''}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Back link */}
        <Link
          href={`/${locale}/cities/leiden`}
          className="inline-flex items-center gap-2 text-sm text-[#8B7D6B] hover:text-[#F5F0E8] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Terug naar Leiden
        </Link>

      </div>
    </div>
  );
}
