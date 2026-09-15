import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Shield, Star, Heart, CheckCircle } from 'lucide-react';

interface Props {
  params: Promise<{ locale: string }>;
}

const COPY = {
  nl: {
    badge: 'YourLocalCityGuide',
    heroTitle: 'Over YourLocalCityGuide',
    heroSub: 'Authentieke lokale verhalen. Geverifieerde feiten. Geen toeristenkitsch.',
    missionTitle: 'Onze missie',
    mission1: 'YourLocalCityGuide is gebouwd voor mensen die écht willen begrijpen wat een stad bijzonder maakt. Geen generieke tours, geen toeristische clichés — maar de verhalen die locals kennen en toeristen missen.',
    mission2: 'We combineren GPS-technologie met zorgvuldig onderzochte, geverifieerde historische verhalen. Zodra je bij een locatie aankomt, start de audio automatisch. Zo beleef je de stad op jouw manier, in jouw tempo.',
    howTitle: 'Hoe het werkt',
    steps: [
      { step: '1', title: 'Open de app', desc: 'Kies een stad en een route. Geen account nodig voor de gratis routes.' },
      { step: '2', title: 'Kies een route', desc: 'Selecteer een thema: Geschiedenis, Verborgen plekken, Eten & drinken, of meer.' },
      { step: '3', title: 'Loop en luister', desc: 'GPS detecteert automatisch wanneer je bij een locatie bent en start de audio.' },
    ],
    whyTitle: 'Waarom Leiden als eerste?',
    whyIntro: 'Leiden is een van de rijkst historische steden van Nederland — maar wordt nog steeds onderschat.',
    whyFacts: [
      'Geboorteplaats van Rembrandt van Rijn (1606)',
      'Thuisbasis van de Pilgrimvaders voor hun reis naar Amerika (1620)',
      'Oudste universiteit van Nederland (1575) — opgericht door Willem van Oranje',
      'Ontzet van Leiden (1574) — het einde van de Spaanse belegering',
    ],
    valuesTitle: 'Onze waarden',
    values: [
      { title: 'Geverifieerde feiten', desc: 'Elk verhaal is onderbouwd met bronnen. Geen fabeltjes, geen Wikipedia-copy.' },
      { title: 'Gratis te starten', desc: 'Eén gratis route per stad. Altijd. Geen account nodig.' },
      { title: 'Privacy-first', desc: 'Je locatiedata wordt nooit opgeslagen of verkocht. Punt.' },
      { title: 'Lokaal perspectief', desc: 'Geschreven vanuit lokale kennis — niet vanuit een toeristische gids.' },
    ],
    ctaTitle: 'Klaar om te beginnen?',
    ctaSub: 'Start gratis met Leiden of bekijk onze plannen.',
    ctaExplore: 'Verken Leiden gratis',
    ctaPricing: 'Bekijk prijzen',
  },
  en: {
    badge: 'YourLocalCityGuide',
    heroTitle: 'About YourLocalCityGuide',
    heroSub: 'Authentic local stories. Verified facts. No tourist kitsch.',
    missionTitle: 'Our mission',
    mission1: 'YourLocalCityGuide is built for people who genuinely want to understand what makes a city special. No generic tours, no tourist clichés — just the stories locals know and tourists miss.',
    mission2: 'We combine GPS technology with carefully researched, verified historical stories. As soon as you arrive at a location, the audio starts automatically. Experience the city your way, at your pace.',
    howTitle: 'How it works',
    steps: [
      { step: '1', title: 'Open the app', desc: 'Pick a city and a route. No account needed for the free routes.' },
      { step: '2', title: 'Pick a route', desc: 'Choose a theme: History, Hidden gems, Food & drink, and more.' },
      { step: '3', title: 'Walk and listen', desc: 'GPS automatically detects when you reach a location and starts the audio.' },
    ],
    whyTitle: 'Why Leiden first?',
    whyIntro: 'Leiden is one of the most historically rich cities in the Netherlands — yet still underrated.',
    whyFacts: [
      "Birthplace of Rembrandt van Rijn (1606)",
      'Home of the Pilgrim Fathers before their journey to America (1620)',
      "The Netherlands' oldest university (1575) — founded by William of Orange",
      'The Relief of Leiden (1574) — the end of the Spanish siege',
    ],
    valuesTitle: 'Our values',
    values: [
      { title: 'Verified facts', desc: 'Every story is backed by sources. No fables, no Wikipedia copy-paste.' },
      { title: 'Free to start', desc: 'One free route per city. Always. No account needed.' },
      { title: 'Privacy-first', desc: 'Your location data is never stored or sold. Period.' },
      { title: 'Local perspective', desc: 'Written from local knowledge — not from a tourist guidebook.' },
    ],
    ctaTitle: 'Ready to get started?',
    ctaSub: 'Start free with Leiden or check out our plans.',
    ctaExplore: 'Explore Leiden for free',
    ctaPricing: 'View pricing',
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = COPY[locale as 'nl' | 'en'] ?? COPY.nl;
  return { title: t.heroTitle, description: t.heroSub };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = COPY[locale as 'nl' | 'en'] ?? COPY.nl;

  return (
    <div className="min-h-screen bg-[#0F0E0D] pt-20">
      {/* Hero */}
      <section className="bg-[#1C1916] border-b border-[rgba(255,255,255,0.08)] py-16 px-4 text-center">
        <div className="inline-flex items-center gap-2 text-[#C9A46B] text-sm font-medium mb-4">
          <MapPin className="w-4 h-4" /> {t.badge}
        </div>
        <h1 className="text-4xl font-black text-[#F5F0E8] mb-4">{t.heroTitle}</h1>
        <p className="text-[#8B7D6B] max-w-2xl mx-auto text-lg">{t.heroSub}</p>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-16 space-y-16">
        {/* Mission */}
        <section>
          <h2 className="text-2xl font-bold text-[#F5F0E8] mb-4">{t.missionTitle}</h2>
          <p className="text-[#D8CFC3] leading-relaxed mb-4">{t.mission1}</p>
          <p className="text-[#D8CFC3] leading-relaxed">{t.mission2}</p>
        </section>

        {/* How it works */}
        <section>
          <h2 className="text-2xl font-bold text-[#F5F0E8] mb-8">{t.howTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {t.steps.map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#C9A46B]/15 text-[#C9A46B] font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {step}
                </div>
                <h3 className="font-semibold text-[#F5F0E8] mb-2">{title}</h3>
                <p className="text-sm text-[#8B7D6B]">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Leiden */}
        <section className="bg-[#1C1916] rounded-2xl border border-[rgba(255,255,255,0.08)] p-8">
          <h2 className="text-2xl font-bold text-[#F5F0E8] mb-4">{t.whyTitle}</h2>
          <p className="text-[#D8CFC3] leading-relaxed mb-4">{t.whyIntro}</p>
          <ul className="space-y-2 text-[#D8CFC3]">
            {t.whyFacts.map((fact) => (
              <li key={fact} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-[#C9A46B] mt-0.5 shrink-0" />
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-2xl font-bold text-[#F5F0E8] mb-8">{t.valuesTitle}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {t.values.map(({ title, desc }, i) => {
              const Icon = [CheckCircle, Star, Shield, Heart][i];
              const color = ['text-[#4A7C59]', 'text-[#C9A46B]', 'text-[#6B8FB0]', 'text-[#B0616B]'][i];
              return (
                <div key={title} className="flex items-start gap-4 p-4 rounded-xl border border-[rgba(255,255,255,0.08)]">
                  <Icon className={`w-6 h-6 ${color} shrink-0 mt-0.5`} />
                  <div>
                    <h3 className="font-semibold text-[#F5F0E8] mb-1">{title}</h3>
                    <p className="text-sm text-[#8B7D6B]">{desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA to pricing */}
        <section className="text-center bg-[#1C1916] rounded-2xl border border-[rgba(255,255,255,0.08)] p-8">
          <h2 className="font-bold text-xl text-[#F5F0E8] mb-2">{t.ctaTitle}</h2>
          <p className="text-[#8B7D6B] text-sm mb-6">{t.ctaSub}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/${locale}/cities/leiden`}
              className="bg-[#C9A46B] text-[#0F0E0D] px-6 py-3 rounded-full font-bold hover:bg-[#D4B47E] transition-colors text-sm"
            >
              {t.ctaExplore}
            </Link>
            <Link
              href={`/${locale}/pricing`}
              className="border border-[rgba(255,255,255,0.15)] text-[#F5F0E8] px-6 py-3 rounded-full font-medium hover:border-[#C9A46B]/50 transition-colors text-sm"
            >
              {t.ctaPricing}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
