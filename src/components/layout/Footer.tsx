"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-navy-900 text-white py-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-500/5 rounded-full -translate-y-2/3 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <AnimateOnScroll>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                </div>
                <span className="font-bold text-sm">
                  YourLocal<span className="text-orange-500">City</span>Guide
                </span>
              </div>
              <p className="text-xs text-white/40 max-w-xs tracking-wide">
                REAL PLACES. REAL STORIES.
              </p>
            </div>

            <nav className="grid grid-cols-2 gap-x-12 gap-y-2.5 text-sm">
              <Link href="/leiden" className="text-white/60 hover:text-orange-400 transition-colors duration-200">Leiden</Link>
              <Link href="/routes" className="text-white/60 hover:text-orange-400 transition-colors duration-200">{t("routes")}</Link>
              <Link href="/ontdek" className="text-white/60 hover:text-orange-400 transition-colors duration-200">{t("discover")}</Link>
              <Link href="/city-guide-leiden" className="text-white/60 hover:text-orange-400 transition-colors duration-200">{t("cityGuide")}</Link>
              <Link href="/leiden-tours" className="text-white/60 hover:text-orange-400 transition-colors duration-200">{t("tours")}</Link>
              <Link href="/blog" className="text-white/60 hover:text-orange-400 transition-colors duration-200">{t("blog")}</Link>
              <a href="mailto:info@yourlocalcityguide.com" className="text-white/60 hover:text-orange-400 transition-colors duration-200">{t("contact")}</a>
              <Link href="/privacy" className="text-white/60 hover:text-orange-400 transition-colors duration-200">{t("privacy")}</Link>
              <Link href="/terms" className="text-white/60 hover:text-orange-400 transition-colors duration-200">{t("terms")}</Link>
            </nav>
          </div>
        </AnimateOnScroll>

        <NewsletterSignup />

        <div className="mt-10 pt-6 border-t border-white/10 text-xs text-white/30 text-center">
          &copy; 2026 YourLocalCityGuide. {t("allRightsReserved")}
        </div>
      </div>
    </footer>
  );
}
