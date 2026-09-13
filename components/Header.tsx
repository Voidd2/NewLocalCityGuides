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
    { label: locale === 'nl' ? 'Routes' : 'Routes', href: `/${locale}/cities/leiden/routes` },
    { label: locale === 'nl' ? 'Over ons' : 'About', href: `/${locale}/about` },
    { label: locale === 'nl' ? 'Prijzen' : 'Pricing', href: `/${locale}/pricing` },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F0E0D]/95 backdrop-blur border-b border-[rgba(255,255,255,0.08)] shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-start gap-2 group">
          <MapPin className="w-5 h-5 text-[#C9A46B] mt-0.5 shrink-0" />
          <div>
            <span className="block font-bold text-[#F5F0E8] text-sm leading-tight">YourLocalCityGuide</span>
            <span className="block text-[10px] tracking-widest text-[#8B7D6B] uppercase leading-none">Real Places. Real Stories.</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-[#8B7D6B]">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-[#F5F0E8] transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href={switchPath}
            className="flex items-center gap-1 text-sm text-[#8B7D6B] hover:text-[#F5F0E8] transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            {otherLocale.toUpperCase()}
          </Link>
          <Link
            href={`/${locale}/auth/signin`}
            className="text-sm border border-[#C9A46B]/50 text-[#C9A46B] rounded-full px-4 py-1.5 hover:border-[#C9A46B] hover:bg-[#C9A46B]/10 transition-all"
          >
            {locale === 'nl' ? 'Inloggen' : 'Sign in'}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen((v) => !v)} className="md:hidden p-2 text-[#8B7D6B]">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[rgba(255,255,255,0.08)] bg-[#0F0E0D] px-4 py-3 space-y-3">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm text-[#8B7D6B] hover:text-[#F5F0E8] py-1 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <div className="border-t border-[rgba(255,255,255,0.08)] pt-3 flex items-center justify-between">
            <Link href={switchPath} className="flex items-center gap-1 text-sm text-[#8B7D6B]">
              <Globe className="w-3.5 h-3.5" /> {otherLocale.toUpperCase()}
            </Link>
            <Link
              href={`/${locale}/auth/signin`}
              className="text-sm border border-[#C9A46B]/50 text-[#C9A46B] rounded-full px-4 py-1.5"
            >
              {locale === 'nl' ? 'Inloggen' : 'Sign in'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
