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
    <div className="min-h-screen bg-[#0F0E0D] pt-20 pb-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full bg-[#C9A46B]/15 flex items-center justify-center">
            <User className="w-7 h-7 text-[#C9A46B]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#F5F0E8]">{loc === 'nl' ? 'Mijn account' : 'My account'}</h1>
            <p className="text-sm text-[#8B7D6B]">
              {loc === 'nl' ? 'Beschikbaar bij de officiële launch' : 'Available at official launch'}
            </p>
          </div>
        </div>

        {/* Launch notice */}
        <div className="bg-[#C9A46B]/10 border border-[#C9A46B]/20 rounded-2xl p-4 mb-8 flex items-start gap-3">
          <Lock className="w-5 h-5 text-[#C9A46B] shrink-0 mt-0.5" />
          <p className="text-sm text-[#C9A46B]">
            {loc === 'nl'
              ? 'Account-functionaliteit (inloggen, abonnement, geschiedenis) wordt actief bij de officiële launch van YourLocalCityGuide.'
              : 'Account functionality (sign-in, subscription, history) will be active at the official launch of YourLocalCityGuide.'}
          </p>
        </div>

        {/* Subscription card */}
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-[#5A4E42] uppercase tracking-wide mb-3">
            {loc === 'nl' ? 'Abonnement' : 'Subscription'}
          </h2>
          <div className="bg-[#1C1916] border border-[rgba(255,255,255,0.08)] rounded-2xl p-5 opacity-60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-[#5A4E42]" />
                <div>
                  <p className="font-medium text-[#F5F0E8]">{loc === 'nl' ? 'Gratis plan' : 'Free plan'}</p>
                  <p className="text-sm text-[#8B7D6B]">
                    {loc === 'nl' ? '1 gratis route per stad' : '1 free route per city'}
                  </p>
                </div>
              </div>
              <span className="text-xs bg-[rgba(255,255,255,0.06)] text-[#8B7D6B] px-2.5 py-1 rounded-full font-medium">
                {loc === 'nl' ? 'Huidig plan' : 'Current plan'}
              </span>
            </div>
            <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
              <Link
                href={`/${locale}/pricing`}
                className="text-sm text-[#C9A46B] font-medium hover:text-[#D4B47E] flex items-center gap-1 transition-colors"
              >
                {loc === 'nl' ? 'Upgraden naar City Pass' : 'Upgrade to City Pass'}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Tour history */}
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-[#5A4E42] uppercase tracking-wide mb-3">
            {loc === 'nl' ? 'Tour-geschiedenis' : 'Tour history'}
          </h2>
          <div className="bg-[#1C1916] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden opacity-60">
            {[
              { city: 'Leiden', route: loc === 'nl' ? 'Historisch Leiden' : 'Historic Leiden', stops: '5/5', date: '—' },
            ].map((item) => (
              <div key={item.route} className="flex items-center gap-4 px-5 py-4 border-b border-[rgba(255,255,255,0.06)] last:border-0">
                <div className="w-9 h-9 rounded-full bg-[#4A7C59]/15 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#4A7C59]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-[#F5F0E8]">{item.route}</p>
                  <p className="text-xs text-[#5A4E42]">{item.city} · {item.stops} stops</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-[#5A4E42]">
                  <Clock className="w-3 h-3" /> {item.date}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Settings */}
        <section>
          <h2 className="text-sm font-semibold text-[#5A4E42] uppercase tracking-wide mb-3">
            {loc === 'nl' ? 'Instellingen' : 'Settings'}
          </h2>
          <div className="bg-[#1C1916] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden opacity-60">
            {[
              loc === 'nl' ? 'Taal: Nederlands' : 'Language: English',
              loc === 'nl' ? 'E-mailadres' : 'Email address',
              loc === 'nl' ? 'Wachtwoord wijzigen' : 'Change password',
              loc === 'nl' ? 'Uitloggen' : 'Sign out',
            ].map((item) => (
              <div key={item} className="flex items-center justify-between px-5 py-3.5 border-b border-[rgba(255,255,255,0.06)] last:border-0">
                <span className="text-sm text-[#D8CFC3]">{item}</span>
                <ChevronRight className="w-4 h-4 text-[#5A4E42]" />
              </div>
            ))}
          </div>
        </section>

        <div className="mt-10 text-center">
          <Link href={`/${locale}`} className="text-sm text-[#5A4E42] hover:text-[#F5F0E8] transition-colors">
            ← {loc === 'nl' ? 'Terug naar home' : 'Back to home'}
          </Link>
        </div>
      </div>
    </div>
  );
}
