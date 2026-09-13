import type { Metadata } from 'next';
import Link from 'next/link';
import { User, CreditCard, MapPin, Clock, ChevronRight, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Account',
  description: 'Beheer je abonnement en tour-geschiedenis.',
  robots: { index: false },
};

interface Props { params: Promise<{ locale: string }> }

export default async function AccountPage({ params }: Props) {
  const { locale } = await params;
  const loc = locale as 'nl' | 'en';

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center">
            <User className="w-7 h-7 text-amber-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{loc === 'nl' ? 'Mijn account' : 'My account'}</h1>
            <p className="text-sm text-gray-500">
              {loc === 'nl' ? 'Beschikbaar bij de officiële launch' : 'Available at official launch'}
            </p>
          </div>
        </div>

        {/* Launch notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8 flex items-start gap-3">
          <Lock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            {loc === 'nl'
              ? 'Account-functionaliteit (inloggen, abonnement, geschiedenis) wordt actief bij de officiële launch van YourLocalCityGuide.'
              : 'Account functionality (sign-in, subscription, history) will be active at the official launch of YourLocalCityGuide.'}
          </p>
        </div>

        {/* Subscription card */}
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            {loc === 'nl' ? 'Abonnement' : 'Subscription'}
          </h2>
          <div className="bg-white border border-gray-200 rounded-2xl p-5 opacity-60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">{loc === 'nl' ? 'Gratis plan' : 'Free plan'}</p>
                  <p className="text-sm text-gray-500">
                    {loc === 'nl' ? '1 gratis route per stad' : '1 free route per city'}
                  </p>
                </div>
              </div>
              <span className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full font-medium">
                {loc === 'nl' ? 'Huidig plan' : 'Current plan'}
              </span>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link
                href={`/${locale}/pricing`}
                className="text-sm text-amber-700 font-medium hover:text-amber-900 flex items-center gap-1 transition-colors"
              >
                {loc === 'nl' ? 'Upgraden naar City Pass' : 'Upgrade to City Pass'}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Tour history */}
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            {loc === 'nl' ? 'Tour-geschiedenis' : 'Tour history'}
          </h2>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden opacity-60">
            {[
              { city: 'Leiden', route: loc === 'nl' ? 'Historisch Leiden' : 'Historic Leiden', stops: '5/5', date: '—' },
            ].map((item) => (
              <div key={item.route} className="flex items-center gap-4 px-5 py-4 border-b border-gray-50 last:border-0">
                <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900">{item.route}</p>
                  <p className="text-xs text-gray-400">{item.city} · {item.stops} stops</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="w-3 h-3" /> {item.date}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Settings */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            {loc === 'nl' ? 'Instellingen' : 'Settings'}
          </h2>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden opacity-60">
            {[
              loc === 'nl' ? 'Taal: Nederlands' : 'Language: English',
              loc === 'nl' ? 'E-mailadres' : 'Email address',
              loc === 'nl' ? 'Wachtwoord wijzigen' : 'Change password',
              loc === 'nl' ? 'Uitloggen' : 'Sign out',
            ].map((item) => (
              <div key={item} className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-700">{item}</span>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </div>
            ))}
          </div>
        </section>

        <div className="mt-10 text-center">
          <Link href={`/${locale}`} className="text-sm text-gray-400 hover:text-gray-900 transition-colors">
            ← {loc === 'nl' ? 'Terug naar home' : 'Back to home'}
          </Link>
        </div>
      </div>
    </div>
  );
}
