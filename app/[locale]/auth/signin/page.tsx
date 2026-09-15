import type { Metadata } from 'next';
import Link from 'next/link';

interface Props {
  params: Promise<{ locale: string }>;
}

const COPY = {
  nl: {
    title: 'Inloggen',
    welcome: 'Welkom terug bij YourLocalCityGuide',
    google: 'Doorgaan met Google',
    availableAtLaunch: 'Beschikbaar bij launch',
    or: 'of',
    email: 'E-mailadres',
    emailPlaceholder: 'jouw@email.nl',
    password: 'Wachtwoord',
    signIn: 'Inloggen',
    noAccount: 'Nog geen account? Aanmelden →',
    authNotice: 'Auth wordt actief bij de officiële launch.',
  },
  en: {
    title: 'Sign in',
    welcome: 'Welcome back to YourLocalCityGuide',
    google: 'Continue with Google',
    availableAtLaunch: 'Available at launch',
    or: 'or',
    email: 'Email address',
    emailPlaceholder: 'you@email.com',
    password: 'Password',
    signIn: 'Sign in',
    noAccount: "Don't have an account yet? Sign up →",
    authNotice: 'Auth becomes active at the official launch.',
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = COPY[locale as 'nl' | 'en'] ?? COPY.nl;
  return { title: t.title, description: t.welcome };
}

export default async function SignInPage({ params }: Props) {
  const { locale } = await params;
  const t = COPY[locale as 'nl' | 'en'] ?? COPY.nl;

  return (
    <div className="min-h-screen bg-[#0F0E0D] pt-20 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-[#1C1916] border border-[rgba(255,255,255,0.08)] rounded-2xl shadow-sm p-8">
          <h1 className="text-2xl font-bold text-[#F5F0E8] text-center mb-2">{t.title}</h1>
          <p className="text-sm text-[#8B7D6B] text-center mb-6">{t.welcome}</p>

          {/* Google button */}
          <div className="relative group mb-4">
            <button
              disabled
              className="w-full flex items-center justify-center gap-3 border border-[rgba(255,255,255,0.1)] rounded-full px-4 py-2.5 text-sm font-medium text-[#5A4E42] bg-[#0F0E0D] cursor-not-allowed"
              title={t.availableAtLaunch}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {t.google}
            </button>
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-[#5A4E42] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {t.availableAtLaunch}
            </span>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[rgba(255,255,255,0.08)]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#1C1916] px-2 text-[#5A4E42]">{t.or}</span>
            </div>
          </div>

          {/* Email form */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-[#8B7D6B] mb-1 block">{t.email}</label>
              <input
                type="email"
                disabled
                placeholder={t.emailPlaceholder}
                className="w-full px-4 py-2.5 border border-[rgba(255,255,255,0.1)] rounded-full text-sm text-[#5A4E42] bg-[#0F0E0D] cursor-not-allowed focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-[#8B7D6B] mb-1 block">{t.password}</label>
              <input
                type="password"
                disabled
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-[rgba(255,255,255,0.1)] rounded-full text-sm text-[#5A4E42] bg-[#0F0E0D] cursor-not-allowed focus:outline-none"
              />
            </div>
            <button
              disabled
              className="w-full bg-[rgba(255,255,255,0.06)] text-[#5A4E42] px-4 py-2.5 rounded-full text-sm font-medium cursor-not-allowed"
            >
              {t.signIn}
            </button>
          </div>

          <p className="text-xs text-center text-[#5A4E42] mt-6">
            <Link href={`/${locale}/auth/signup`} className="text-[#8B7D6B] hover:text-[#F5F0E8] hover:underline transition-colors">
              {t.noAccount}
            </Link>
          </p>

          <div className="mt-4 bg-[#C9A46B]/10 border border-[#C9A46B]/20 rounded-xl p-3 text-center">
            <p className="text-xs text-[#C9A46B]">{t.authNotice}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
