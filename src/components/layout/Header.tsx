"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
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
  const { isLoggedIn, hasPaid, isLoading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-navy-800 text-white">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          <Link href={hasPaid ? "/dashboard" : "/"} className="flex items-center gap-2">
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
              onClick={() => { setMenuOpen(!menuOpen); setLangOpen(false); }}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? (
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="bg-white shadow-lg border-b border-gray-100">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {!isLoading && hasPaid ? (
              <>
                <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-navy-800 font-medium hover:bg-orange-50">
                  <span className="flex items-center gap-2">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-orange-500">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    Dashboard
                  </span>
                </Link>
                <Link href="/routes" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-navy-800 font-medium hover:bg-orange-50">
                  <span className="flex items-center gap-2">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-orange-500">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                    Routes
                  </span>
                </Link>
                <Link href="/my-routes" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-navy-800 font-medium hover:bg-orange-50">
                  <span className="flex items-center gap-2">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-orange-500">
                      <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                    </svg>
                    Mijn routes
                  </span>
                </Link>
                <Link href="/routes/custom" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-navy-800 font-medium hover:bg-orange-50">
                  <span className="flex items-center gap-2">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-orange-500">
                      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>
                    Route samenstellen
                  </span>
                </Link>
                <Link href="/map" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-navy-800 font-medium hover:bg-orange-50">
                  <span className="flex items-center gap-2">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-orange-500">
                      <path fillRule="evenodd" d="M8.157 2.175a1.5 1.5 0 00-1.147 0l-4.084 1.69A1.5 1.5 0 002 5.251v10.877a1.5 1.5 0 002.074 1.386l3.51-1.453 4.26 1.763a1.5 1.5 0 001.146 0l4.083-1.69A1.5 1.5 0 0018 14.748V3.873a1.5 1.5 0 00-2.073-1.386l-3.51 1.452-4.26-1.763zM7.58 5a.75.75 0 01.75.75v6.5a.75.75 0 01-1.5 0v-6.5A.75.75 0 017.58 5zm5.59 2.75a.75.75 0 00-1.5 0v6.5a.75.75 0 001.5 0v-6.5z" clipRule="evenodd" />
                    </svg>
                    Kaart
                  </span>
                </Link>
                <Link href="/about" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-navy-800 font-medium hover:bg-orange-50">Over Leiden</Link>
                <hr className="my-2 border-gray-100" />
                <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-orange-500 font-semibold hover:bg-orange-50">
                  Mijn account
                </Link>
              </>
            ) : (
              <>
                <Link href="/" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-navy-800 font-medium hover:bg-orange-50">{t("nav.home")}</Link>
                <Link href="/routes" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-navy-800 font-medium hover:bg-orange-50">{t("nav.routes")}</Link>
                <Link href="/about" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-navy-800 font-medium hover:bg-orange-50">Over Leiden</Link>
                <Link href="/pricing" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-navy-800 font-medium hover:bg-orange-50">Prijzen</Link>
                <hr className="my-2 border-gray-100" />
                {!isLoading && (
                  isLoggedIn ? (
                    <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-orange-500 font-semibold hover:bg-orange-50">
                      Mijn account
                    </Link>
                  ) : (
                    <Link href="/login" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-orange-500 font-semibold hover:bg-orange-50">
                      Inloggen
                    </Link>
                  )
                )}
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
