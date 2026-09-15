import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Map, Navigation, Play, BookOpen, ChevronDown, ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import NewsletterForm from '@/components/NewsletterForm';

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.hero' });
  return { title: t('headline'), description: t('subline') };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-[#0F0E0D]">

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Leiden_Rapenburg.jpg/1280px-Leiden_Rapenburg.jpg"
          alt="Leiden Rapenburg"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />

        {/* Content */}
        <div className="relative z-10 px-4 max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#C9A46B]/20 border border-[#C9A46B]/30 text-[#C9A46B] text-xs font-semibold px-4 py-1.5 rounded-full mb-8 tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            Leiden &middot; Nederland &middot; Early Access
          </div>

          {/* City name */}
          <h1 className="text-6xl md:text-8xl font-black tracking-widest text-[#F5F0E8] uppercase mb-4">
            LEIDEN
          </h1>

          {/* Italic subtitle */}
          <p className="text-xl md:text-2xl italic text-[#C9A46B] mb-3 font-medium">
            More than a city. A story.
          </p>

          {/* Tagline */}
          <p className="text-xs tracking-[0.3em] text-[#8B7D6B] uppercase mb-12">
            Real Places. Real Stories.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${locale}/cities/leiden`}
              className="inline-flex items-center gap-2 bg-[#C9A46B] text-[#0F0E0D] px-6 py-3 rounded-full font-semibold hover:bg-[#D4B47E] transition-colors text-sm"
            >
              <Navigation className="w-4 h-4" />
              Start wandeltour
            </Link>
            <Link
              href={`/${locale}/cities/leiden/routes`}
              className="inline-flex items-center gap-2 border border-[rgba(255,255,255,0.25)] text-[#F5F0E8] px-6 py-3 rounded-full font-semibold hover:border-[rgba(255,255,255,0.5)] transition-colors text-sm"
            >
              Bekijk routes
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#8B7D6B] animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* ── What would you like to do? ── */}
      <section className="bg-[#0F0E0D] py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.25em] uppercase text-[#8B7D6B] mb-3">Aan de slag</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#F5F0E8] mb-10">
            What would you like to do?
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Card 1 */}
            <Link
              href={`/${locale}/cities/leiden`}
              className="group bg-[#1C1916] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 hover:border-[#C9A46B]/30 hover:bg-[#252118] transition-all"
            >
              <div className="text-2xl mb-4">📍</div>
              <h3 className="font-bold text-[#F5F0E8] mb-2">Explore near me</h3>
              <p className="text-sm text-[#8B7D6B] mb-4 leading-relaxed">Ontdek wat er om je heen is</p>
              <span className="text-[#C9A46B] text-sm font-medium group-hover:translate-x-1 inline-block transition-transform">
                Verkennen →
              </span>
            </Link>

            {/* Card 2 */}
            <Link
              href={`/${locale}/cities/leiden/routes`}
              className="group bg-[#1C1916] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 hover:border-[#C9A46B]/30 hover:bg-[#252118] transition-all"
            >
              <div className="text-2xl mb-4">🗺️</div>
              <h3 className="font-bold text-[#F5F0E8] mb-2">Kies een route</h3>
              <p className="text-sm text-[#8B7D6B] mb-4 leading-relaxed">Volg een verhaal door de stad</p>
              <span className="text-[#C9A46B] text-sm font-medium group-hover:translate-x-1 inline-block transition-transform">
                Routes bekijken →
              </span>
            </Link>

            {/* Card 3 */}
            <Link
              href={`/${locale}/cities/leiden`}
              className="group bg-[#1C1916] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 hover:border-[#C9A46B]/30 hover:bg-[#252118] transition-all"
            >
              <div className="text-2xl mb-4">🎯</div>
              <h3 className="font-bold text-[#F5F0E8] mb-2">Open kaart</h3>
              <p className="text-sm text-[#8B7D6B] mb-4 leading-relaxed">Verken vrijelijk</p>
              <span className="text-[#C9A46B] text-sm font-medium group-hover:translate-x-1 inline-block transition-transform">
                Kaart openen →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Hoe het werkt ── */}
      <section className="py-20 px-4 border-t border-[rgba(255,255,255,0.06)]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.25em] uppercase text-[#8B7D6B] mb-3">Simpel</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#F5F0E8] mb-12">Hoe het werkt</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: '01',
                icon: <MapPin className="w-5 h-5" />,
                title: 'Kom aan bij een locatie',
                desc: 'GPS detecteert automatisch wanneer je bij een historische plek aankomt.',
              },
              {
                num: '02',
                icon: <Play className="w-5 h-5" />,
                title: 'Video start automatisch',
                desc: 'Een korte video onthult het verhaal achter de locatie — zoals het was in 1650.',
              },
              {
                num: '03',
                icon: <BookOpen className="w-5 h-5" />,
                title: 'Lees het verhaal',
                desc: 'Verdiep je in het volledige verhaal, weetjes en historische feiten.',
              },
            ].map(({ num, icon, title, desc }) => (
              <div key={num} className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold tracking-widest text-[#C9A46B]">{num}</span>
                  <div className="w-px h-4 bg-[rgba(255,255,255,0.1)]" />
                  <div className="text-[#C9A46B]">{icon}</div>
                </div>
                <h3 className="font-bold text-[#F5F0E8] mb-2">{title}</h3>
                <p className="text-sm text-[#8B7D6B] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Available cities ── */}
      <section className="py-20 px-4 border-t border-[rgba(255,255,255,0.06)]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.25em] uppercase text-[#8B7D6B] mb-3">Beschikbaar</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#F5F0E8] mb-10">Steden</h2>

          <div className="grid sm:grid-cols-3 gap-4">
            {/* Leiden — active */}
            <div className="relative rounded-2xl overflow-hidden group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Leiden_Rapenburg.jpg/640px-Leiden_Rapenburg.jpg"
                alt="Leiden"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-xs tracking-widest text-[#C9A46B] font-semibold mb-0.5">5 locaties &middot; Early Access</p>
                <h3 className="text-xl font-black text-white tracking-wider mb-3">LEIDEN</h3>
                <Link
                  href={`/${locale}/cities/leiden`}
                  className="inline-flex items-center gap-1.5 bg-[#C9A46B] text-[#0F0E0D] text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-[#D4B47E] transition-colors"
                >
                  Verken <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Amsterdam — coming soon */}
            <div className="relative rounded-2xl overflow-hidden bg-[#1C1916] border border-[rgba(255,255,255,0.06)]">
              <div className="h-48 bg-[#1C1916] flex items-center justify-center">
                <Map className="w-10 h-10 text-[#2A2520]" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-xs tracking-widest text-[#5A4E42] font-semibold mb-0.5">Binnenkort</p>
                <h3 className="text-xl font-black text-[#5A4E42] tracking-wider">AMSTERDAM</h3>
              </div>
            </div>

            {/* Rotterdam — coming soon */}
            <div className="relative rounded-2xl overflow-hidden bg-[#1C1916] border border-[rgba(255,255,255,0.06)]">
              <div className="h-48 bg-[#1C1916] flex items-center justify-center">
                <Map className="w-10 h-10 text-[#2A2520]" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-xs tracking-widest text-[#5A4E42] font-semibold mb-0.5">Binnenkort</p>
                <h3 className="text-xl font-black text-[#5A4E42] tracking-wider">ROTTERDAM</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Banner ── */}
      <section className="relative py-24 px-4 overflow-hidden border-t border-[rgba(255,255,255,0.06)]">
        <div className="absolute inset-0 opacity-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Leiden_Rapenburg.jpg/1280px-Leiden_Rapenburg.jpg"
            alt=""
            className="w-full h-full object-cover object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0E0D] via-[#0F0E0D]/80 to-transparent" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-3xl md:text-5xl font-black tracking-[0.15em] text-[#F5F0E8] uppercase">
            Discover &middot; Explore &middot; Experience
          </p>
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <section className="py-20 px-4 border-t border-[rgba(255,255,255,0.06)]">
        <div className="max-w-md mx-auto text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-[#8B7D6B] mb-3">Early Access</p>
          <h2 className="text-2xl font-bold text-[#F5F0E8] mb-3">
            Meld je aan voor vroege toegang
          </h2>
          <p className="text-sm text-[#8B7D6B] mb-8 leading-relaxed">
            Ontvang updates zodra nieuwe steden en routes beschikbaar zijn.
          </p>
          <NewsletterForm locale={locale} variant="dark" />
        </div>
      </section>

    </div>
  );
}
