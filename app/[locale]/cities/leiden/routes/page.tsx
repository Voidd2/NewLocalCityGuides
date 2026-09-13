import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, MapPin, ArrowLeft, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Routes Leiden',
  description: 'Audio wandelroutes door historisch Leiden.',
};

interface Props {
  params: Promise<{ locale: string }>;
}

const ROUTES = [
  {
    id: 'leiden-essentials',
    title: 'Leiden Essentials',
    description: 'De beste plekken van Leiden in één ronde. Ideaal voor eerste bezoekers.',
    durationLabel: '1.5 uur',
    stops: 8,
    popular: true,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Leiden_Rapenburg.jpg/640px-Leiden_Rapenburg.jpg',
  },
  {
    id: 'rembrandts-leiden',
    title: "Rembrandt's Leiden",
    description: 'Volg de voetsporen van Leiden beroemdste inwoner door zijn geboortestad.',
    durationLabel: '1 uur',
    stops: 5,
    popular: false,
    image: null,
  },
  {
    id: 'leidens-ontzet',
    title: "Leidens Ontzet",
    description: "Het verhaal van de Spaanse belegering en de bevrijding van Leiden in 1574.",
    durationLabel: '2 uur',
    stops: 7,
    popular: false,
    image: null,
  },
  {
    id: 'historisch-leiden',
    title: 'Historisch Leiden',
    description: 'Loop langs de plek van het Leidse Ontzet, de middeleeuwse Burcht en de oudste universiteit van Nederland.',
    durationLabel: '1.5 uur',
    stops: 5,
    popular: false,
    image: null,
  },
];

export default async function LeidenRoutesPage({ params }: Props) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-[#0F0E0D] pt-14">
      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Back */}
        <Link
          href={`/${locale}/cities/leiden`}
          className="inline-flex items-center gap-2 text-sm text-[#8B7D6B] hover:text-[#F5F0E8] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Terug naar Leiden
        </Link>

        <p className="text-xs tracking-[0.25em] uppercase text-[#8B7D6B] mb-2">Leiden</p>
        <h1 className="text-3xl font-black text-[#F5F0E8] mb-2">Routes</h1>
        <p className="text-[#8B7D6B] mb-10 text-sm">Kies een route en begin je GPS-geleide wandeltour.</p>

        <div className="space-y-3">
          {ROUTES.map((route) => (
            <Link
              key={route.id}
              href={`/${locale}/tour?citySlug=leiden&routeId=${route.id}`}
              className="flex items-center gap-4 bg-[#1C1916] border border-[rgba(255,255,255,0.06)] rounded-2xl p-4 hover:border-[#C9A46B]/30 hover:bg-[#252118] transition-all group"
            >
              {/* Image thumbnail */}
              <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#252118]">
                {route.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={route.image}
                    alt={route.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#5A4E42]" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 mb-1">
                  <h2 className="font-bold text-[#F5F0E8] text-sm leading-tight">{route.title}</h2>
                  {route.popular && (
                    <span className="shrink-0 bg-[#C9A46B] text-[#0F0E0D] text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Populair
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-[#8B7D6B] mb-1.5">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {route.durationLabel}
                  </span>
                  <span className="text-[rgba(255,255,255,0.1)]">&middot;</span>
                  <span>{route.stops} locaties</span>
                </div>
                <p className="text-xs text-[#5A4E42] leading-snug line-clamp-2">{route.description}</p>
              </div>

              {/* Chevron */}
              <ChevronRight className="w-4 h-4 text-[#5A4E42] group-hover:text-[#C9A46B] transition-colors shrink-0" />
            </Link>
          ))}
        </div>

        {/* Route detail example – wireframe 6.1 style note card */}
        <div className="mt-10 bg-[#1C1916] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
          <h3 className="font-bold text-[#F5F0E8] mb-4">Leiden Essentials — Stops</h3>
          <ol className="space-y-3">
            {[
              'Burcht van Leiden',
              'Pieterskerk',
              'Rapenburg',
              'Hortus Botanicus',
              'Rijksmuseum van Oudheden',
              'Molen de Valk',
              'Hooglandse Kerk',
              'Stadhuis',
            ].map((stop, i) => (
              <li key={stop} className="flex items-center gap-4 text-sm">
                <span className="w-7 h-7 rounded-full bg-[#252118] border border-[rgba(255,255,255,0.08)] text-[#C9A46B] text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <span className="text-[#F5F0E8]">{stop}</span>
              </li>
            ))}
          </ol>
          <Link
            href={`/${locale}/tour?citySlug=leiden&routeId=leiden-essentials`}
            className="mt-6 flex items-center justify-center gap-2 w-full bg-[#C9A46B] text-[#0F0E0D] py-3.5 rounded-xl font-bold text-sm hover:bg-[#D4B47E] transition-colors"
          >
            Start route →
          </Link>
        </div>

      </div>
    </div>
  );
}
