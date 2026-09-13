'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { Menu, X, Globe, MapPin } from 'lucide-react';

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as string) ?? 'nl';
  const otherLocale = locale === 'nl' ? 'en' : 'nl';
  const switchPath = pathname.replace(/^\/(nl|en)/, `/${otherLocale}`);

  const navLinks = [
    { label: locale === 'nl' ? 'Steden' : 'Cities', href: `/${locale}/cities` },
    { label: locale === 'nl' ? 'Over ons' : 'About', href: `/${locale}/about` },
    { label: locale === 'nl' ? 'Prijzen' : 'Pricing', href: `/${locale}/pricing` },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2 font-semibold text-gray-900">
          <MapPin className="w-4 h-4 text-amber-500" />
          YourLocalCityGuide
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-gray-900 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link href={switchPath} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors">
            <Globe className="w-3.5 h-3.5" />
            {otherLocale.toUpperCase()}
          </Link>
          <Link href={`/${locale}/auth/signin`} className="text-sm border border-gray-300 rounded-full px-4 py-1.5 hover:border-gray-900 transition-colors">
            {locale === 'nl' ? 'Inloggen' : 'Sign in'}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen((v) => !v)} className="md:hidden p-2 text-gray-600">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-3">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-sm text-gray-700 hover:text-gray-900 py-1">
              {l.label}
            </Link>
          ))}
          <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
            <Link href={switchPath} className="flex items-center gap-1 text-sm text-gray-500">
              <Globe className="w-3.5 h-3.5" /> {otherLocale.toUpperCase()}
            </Link>
            <Link href={`/${locale}/auth/signin`} className="text-sm border border-gray-300 rounded-full px-4 py-1.5">
              {locale === 'nl' ? 'Inloggen' : 'Sign in'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
