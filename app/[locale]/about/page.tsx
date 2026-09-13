import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Shield, Star, Heart, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Over ons',
  description: 'Ontdek het verhaal achter YourLocalCityGuide.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="bg-amber-50 border-b border-amber-100 py-16 px-4 text-center">
        <div className="inline-flex items-center gap-2 text-amber-700 text-sm font-medium mb-4">
          <MapPin className="w-4 h-4" /> YourLocalCityGuide
        </div>
        <h1 className="text-4xl font-bold mb-4">Over YourLocalCityGuide</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Authentieke lokale verhalen. Geverifieerde feiten. Geen toeristenkitsch.
        </p>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-16 space-y-16">
        {/* Mission */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Onze missie</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            YourLocalCityGuide is gebouwd voor mensen die écht willen begrijpen wat een stad bijzonder maakt.
            Geen generieke tours, geen toeristische clichés — maar de verhalen die locals kennen en touristen missen.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We combineren GPS-technologie met zorgvuldig onderzochte, geverifieerde historische verhalen.
            Zodra je bij een locatie aankomt, start de audio automatisch. Zo beleef je de stad op jouw manier,
            in jouw tempo.
          </p>
        </section>

        {/* How it works */}
        <section>
          <h2 className="text-2xl font-bold mb-8">Hoe het werkt</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Open de app',
                desc: 'Kies een stad en een route. Geen account nodig voor de gratis routes.',
              },
              {
                step: '2',
                title: 'Kies een route',
                desc: 'Selecteer een thema: Geschiedenis, Verborgen plekken, Eten & drinken, of meer.',
              },
              {
                step: '3',
                title: 'Loop en luister',
                desc: 'GPS detecteert automatisch wanneer je bij een locatie bent en start de audio.',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {step}
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Leiden */}
        <section className="bg-amber-50 rounded-2xl border border-amber-100 p-8">
          <h2 className="text-2xl font-bold mb-4">Waarom Leiden als eerste?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Leiden is een van de rijkst historische steden van Nederland — maar wordt nog steeds onderschat.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
              <span>Geboorteplaats van Rembrandt van Rijn (1606)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
              <span>Thuisbasis van de Pilgrimvaders voor hun reis naar Amerika (1620)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
              <span>Oudste universiteit van Nederland (1575) — opgericht door Willem van Oranje</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
              <span>Ontzet van Leiden (1574) — het einde van de Spaanse belegering</span>
            </li>
          </ul>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-2xl font-bold mb-8">Onze waarden</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                Icon: CheckCircle,
                title: 'Geverifieerde feiten',
                desc: 'Elk verhaal is onderbouwd met bronnen. Geen fabeltjes, geen Wikipedia-copy.',
                color: 'text-green-500',
              },
              {
                Icon: Star,
                title: 'Gratis te starten',
                desc: 'Eén gratis route per stad. Altijd. Geen account nodig.',
                color: 'text-amber-500',
              },
              {
                Icon: Shield,
                title: 'Privacy-first',
                desc: 'Je locatiedata wordt nooit opgeslagen of verkocht. Punt.',
                color: 'text-blue-500',
              },
              {
                Icon: Heart,
                title: 'Lokaal perspectief',
                desc: 'Geschreven vanuit lokale kennis — niet vanuit een toeristische gids.',
                color: 'text-red-500',
              },
            ].map(({ Icon, title, desc, color }) => (
              <div key={title} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100">
                <Icon className={`w-6 h-6 ${color} shrink-0 mt-0.5`} />
                <div>
                  <h3 className="font-semibold mb-1">{title}</h3>
                  <p className="text-sm text-gray-600">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA to pricing */}
        <section className="text-center bg-gray-50 rounded-2xl border p-8">
          <h2 className="font-bold text-xl mb-2">Klaar om te beginnen?</h2>
          <p className="text-gray-600 text-sm mb-6">Start gratis met Leiden of bekijk onze plannen.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/nl/cities/leiden"
              className="bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-sm"
            >
              Verken Leiden gratis
            </Link>
            <Link
              href="/nl/pricing"
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-gray-900 transition-colors text-sm"
            >
              Bekijk prijzen
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
