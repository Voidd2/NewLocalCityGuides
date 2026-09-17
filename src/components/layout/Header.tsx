"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useState } from "react";
import type { Locale } from "@/i18n/config";

const localeLabels: Record<Locale, string> = {
  nl: "NL",
  en: "EN",
  de: "DE",
};

export function Header() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-navy-800 text-white">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold leading-tight tracking-wide">
                YourLocal<span className="text-orange-500">City</span>Guide
              </span>
              <span className="text-[9px] tracking-[0.2em] text-white/70 uppercase">
                Wandelen &middot; Ontdekken &middot; Beleven
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => { setLangOpen(!langOpen); setMenuOpen(false); }}
                className="text-xs font-semibold px-2 py-1 rounded border border-white/30 hover:bg-white/10 transition-colors"
                aria-label="Change language"
              >
                {localeLabels[locale]}
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg py-1 min-w-[100px] z-50">
                  {(["nl", "en", "de"] as Locale[]).map((loc) => (
                    <Link
                      key={loc}
                      href={pathname}
                      locale={loc}
                      className={`block px-4 py-2 text-sm text-navy-800 hover:bg-orange-50 ${
                        loc === locale ? "font-bold text-orange-500" : ""
                      }`}
                      onClick={() => setLangOpen(false)}
                    >
                      {loc === "nl" ? "Nederlands" : loc === "en" ? "English" : "Deutsch"}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <button
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Search"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            <button
              onClick={() => { setMenuOpen(!menuOpen); setLangOpen(false); }}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Menu"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="bg-white shadow-lg border-b border-gray-100 md:hidden">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            <Link href="/" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-navy-800 font-medium hover:bg-orange-50">{t("nav.home")}</Link>
            <Link href="/routes" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-navy-800 font-medium hover:bg-orange-50">{t("nav.routes")}</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-navy-800 font-medium hover:bg-orange-50">Over ons</Link>
            <Link href="/pricing" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-navy-800 font-medium hover:bg-orange-50">Prijzen</Link>
            <Link href="/map" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-navy-800 font-medium hover:bg-orange-50">Kaart</Link>
            <hr className="my-2 border-gray-100" />
            <Link href="/login" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-orange-500 font-medium hover:bg-orange-50">Inloggen</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
