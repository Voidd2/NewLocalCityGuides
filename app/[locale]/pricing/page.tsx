import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Prijzen',
  description: 'Gratis starten of koop een City Pass voor onbeperkte toegang.',
};

const PLANS = [
  {
    id: 'free',
    name: 'Gratis',
    price: '€0',
    period: null,
    recommended: false,
    features: [
      '1 gratis route per stad',
      'GPS-geleide audio',
      '5 locaties zichtbaar',
      'Geen account nodig',
    ],
    cta: 'Gratis starten',
    ctaHref: '/nl/cities/leiden',
    ctaDisabled: false,
    ctaNote: null,
  },
  {
    id: 'leiden',
    name: 'City Pass — Leiden',
    price: '€4,99',
    period: 'eenmalig',
    recommended: true,
    features: [
      'Alle routes in Leiden',
      'Offline beschikbaar',
      'Exclusieve locaties',
      '1 jaar geldig',
      'Geen abonnement',
    ],
    cta: 'Koop City Pass',
    ctaHref: null,
    ctaDisabled: true,
    ctaNote: 'Beschikbaar bij launch',
  },
  {
    id: 'multi',
    name: 'Multi-City',
    price: '€9,99',
    period: 'per jaar',
    recommended: false,
    features: [
      'Alle steden onbeperkt',
      'Early access nieuwe steden',
      'Offline beschikbaar',
      'Prioriteit support',
    ],
    cta: 'Binnenkort beschikbaar',
    ctaHref: null,
    ctaDisabled: true,
    ctaNote: null,
  },
];

const FAQ = [
  {
    q: 'Moet ik internet hebben tijdens de tour?',
    a: 'Aanbevolen, maar offline werkt ook met City Pass. Download de route van tevoren en loop zonder verbinding.',
  },
  {
    q: 'Hoe werkt GPS?',
    a: 'De app detecteert automatisch wanneer je bij een locatie bent en start de audio. Je hoeft niets in te drukken.',
  },
  {
    q: 'Kan ik de tour pauzeren?',
    a: 'Ja, op elk moment. Je voortgang wordt opgeslagen en je kunt later verdergaan waar je gebleven was.',
  },
  {
    q: 'Welke steden komen eraan?',
    a: 'Amsterdam, Rotterdam, Utrecht en Haarlem — verwacht in Q1 2027. Meld je aan voor vroege toegang.',
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="bg-gray-50 border-b py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-3">Eenvoudige prijzen</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Begin gratis. Upgrade wanneer je meer wilt ontdekken.
        </p>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl border p-6 relative ${
                plan.recommended
                  ? 'border-amber-400 shadow-lg shadow-amber-100'
                  : 'border-gray-200'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                    <Star className="w-3 h-3" /> Aanbevolen
                  </span>
                </div>
              )}

              <h2 className="font-bold text-lg mb-1">{plan.name}</h2>
              <div className="mb-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.period && (
                  <span className="text-gray-500 text-sm ml-1">/ {plan.period}</span>
                )}
              </div>

              <ul className="space-y-2.5 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              {plan.ctaHref && !plan.ctaDisabled ? (
                <Link
                  href={plan.ctaHref}
                  className="block text-center text-sm font-medium bg-gray-900 text-white px-4 py-2.5 rounded-full hover:bg-gray-700 transition-colors"
                >
                  {plan.cta}
                </Link>
              ) : (
                <div>
                  <span
                    className={`block text-center text-sm font-medium px-4 py-2.5 rounded-full cursor-not-allowed ${
                      plan.recommended
                        ? 'bg-amber-100 text-amber-600'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                    title={plan.ctaNote ?? undefined}
                  >
                    {plan.cta}
                  </span>
                  {plan.ctaNote && (
                    <p className="text-xs text-gray-400 text-center mt-2">{plan.ctaNote}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-center">Veelgestelde vragen</h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="border border-gray-200 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-2">{q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
