"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const isHomePage = pathname === "/" || pathname === "/dashboard";
  const showSolid = !isHomePage || scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          showSolid || menuOpen
            ? "bg-navy-900/95 backdrop-blur-xl shadow-lg shadow-black/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          {!isHomePage && (
            <button
              onClick={() => window.history.back()}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors mr-1 shrink-0"
              aria-label="Terug"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-white">
                <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
              </svg>
            </button>
          )}
          <Link href={hasPaid ? "/dashboard" : "/"} className="flex items-center gap-2.5 group">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
              showSolid ? "bg-orange-500 shadow-lg shadow-orange-500/30" : "bg-white/15 backdrop-blur-sm"
            }`}>
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold leading-tight tracking-wide text-white group-hover:text-orange-300 transition-colors">
                YourLocal<span className="text-orange-500">City</span>Guide
              </span>
              <span className={`text-[9px] tracking-[0.2em] uppercase transition-opacity duration-300 ${
                showSolid ? "text-white/50" : "text-white/70"
              }`}>
                Wandelen &middot; Ontdekken &middot; Beleven
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => { setLangOpen(!langOpen); setMenuOpen(false); }}
                className={`text-xs font-semibold px-2.5 py-1.5 rounded-full transition-all duration-300 ${
                  showSolid
                    ? "border border-white/20 text-white/80 hover:bg-white/10"
                    : "border border-white/30 text-white hover:bg-white/15"
                }`}
                aria-label="Change language"
              >
                {localeLabels[locale]}
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 glass rounded-xl shadow-xl py-1.5 min-w-[120px] z-50 border border-white/20">
                  {(["nl", "en", "de"] as Locale[]).map((loc) => (
                    <Link
                      key={loc}
                      href={pathname}
                      locale={loc}
                      className={`block px-4 py-2.5 text-sm transition-colors ${
                        loc === locale
                          ? "font-bold text-orange-500 bg-orange-50/80"
                          : "text-navy-800 hover:bg-orange-50/60"
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
              className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-all duration-300"
              aria-label="Menu"
            >
              <div className="w-5 h-5 relative">
                <span className={`absolute left-0 w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${
                  menuOpen ? "top-[9px] rotate-45" : "top-1"
                }`} />
                <span className={`absolute left-0 top-[9px] w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${
                  menuOpen ? "opacity-0 scale-0" : "opacity-100"
                }`} />
                <span className={`absolute left-0 w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${
                  menuOpen ? "top-[9px] -rotate-45" : "top-[17px]"
                }`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-40 transition-all duration-500 ${
        menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}>
        <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <div className={`absolute top-16 left-0 right-0 max-h-[calc(100vh-4rem)] overflow-y-auto transition-all duration-500 ${
          menuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
        }`}>
          <div className="glass-dark border-b border-white/10">
            <nav className="max-w-7xl mx-auto px-4 py-6 space-y-1">
              {!isLoading && hasPaid ? (
                <>
                  <MenuLink href="/dashboard" onClick={() => setMenuOpen(false)} icon={
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  }>Dashboard</MenuLink>
                  <MenuLink href="/routes" onClick={() => setMenuOpen(false)} icon={
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                  }>Routes</MenuLink>
                  <MenuLink href="/my-routes" onClick={() => setMenuOpen(false)} icon={
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                    </svg>
                  }>Mijn routes</MenuLink>
                  <MenuLink href="/routes/custom" onClick={() => setMenuOpen(false)} icon={
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>
                  }>Route samenstellen</MenuLink>
                  <MenuLink href="/map" onClick={() => setMenuOpen(false)} icon={
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M8.157 2.175a1.5 1.5 0 00-1.147 0l-4.084 1.69A1.5 1.5 0 002 5.251v10.877a1.5 1.5 0 002.074 1.386l3.51-1.453 4.26 1.763a1.5 1.5 0 001.146 0l4.083-1.69A1.5 1.5 0 0018 14.748V3.873a1.5 1.5 0 00-2.073-1.386l-3.51 1.452-4.26-1.763zM7.58 5a.75.75 0 01.75.75v6.5a.75.75 0 01-1.5 0v-6.5A.75.75 0 017.58 5zm5.59 2.75a.75.75 0 00-1.5 0v6.5a.75.75 0 001.5 0v-6.5z" clipRule="evenodd" />
                    </svg>
                  }>Kaart</MenuLink>
                  <MenuLink href="/about" onClick={() => setMenuOpen(false)}>Over Leiden</MenuLink>
                  <div className="pt-3 mt-3 border-t border-white/10">
                    <MenuLink href="/dashboard" onClick={() => setMenuOpen(false)} highlight>
                      Mijn account
                    </MenuLink>
                  </div>
                </>
              ) : (
                <>
                  <MenuLink href="/" onClick={() => setMenuOpen(false)}>{t("nav.home")}</MenuLink>
                  <MenuLink href="/routes" onClick={() => setMenuOpen(false)}>{t("nav.routes")}</MenuLink>
                  <MenuLink href="/about" onClick={() => setMenuOpen(false)}>Over Leiden</MenuLink>
                  <MenuLink href="/pricing" onClick={() => setMenuOpen(false)}>Prijzen</MenuLink>
                  <div className="pt-3 mt-3 border-t border-white/10">
                    {!isLoading && (
                      isLoggedIn ? (
                        <MenuLink href="/dashboard" onClick={() => setMenuOpen(false)} highlight>
                          Mijn account
                        </MenuLink>
                      ) : (
                        <MenuLink href="/login" onClick={() => setMenuOpen(false)} highlight>
                          Inloggen
                        </MenuLink>
                      )
                    )}
                  </div>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

function MenuLink({
  href,
  onClick,
  icon,
  highlight,
  children,
}: {
  href: string;
  onClick: () => void;
  icon?: React.ReactNode;
  highlight?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        highlight
          ? "text-orange-400 font-semibold hover:bg-orange-500/10"
          : "text-white/90 font-medium hover:bg-white/10"
      }`}
    >
      {icon && <span className="text-orange-500">{icon}</span>}
      {children}
    </Link>
  );
}
