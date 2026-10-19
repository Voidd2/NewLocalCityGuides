"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { BrandLogo } from "@/components/brand/BrandLogo";
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
              <Link href="/" className="inline-block rounded-xl bg-warm-50 p-4"><BrandLogo className="w-60 h-auto" /></Link>
              <p className="mt-4 max-w-xs text-sm leading-6 text-white/70">{t("brandDescription")}</p>
            </div>

            <nav className="grid grid-cols-2 gap-x-12 gap-y-2.5 text-sm">
              <Link href="/leiden" className="text-white/60 hover:text-orange-400 transition-colors duration-200">Leiden</Link>
              <Link href="/routes" className="text-white/60 hover:text-orange-400 transition-colors duration-200">{t("routes")}</Link>
              <Link href="/ontdek" className="text-white/60 hover:text-orange-400 transition-colors duration-200">{t("discover")}</Link>
              <Link href="/city-guide-leiden" className="text-white/60 hover:text-orange-400 transition-colors duration-200">{t("cityGuide")}</Link>
              <Link href="/leiden-tours" className="text-white/60 hover:text-orange-400 transition-colors duration-200">{t("tours")}</Link>
              <Link href="/blog" className="text-white/60 hover:text-orange-400 transition-colors duration-200">{t("blog")}</Link>
              <a href="mailto:info@citywalkstories.com" className="text-white/60 hover:text-orange-400 transition-colors duration-200">{t("contact")}</a>
              <Link href="/privacy" className="text-white/60 hover:text-orange-400 transition-colors duration-200">{t("privacy")}</Link>
              <Link href="/terms" className="text-white/60 hover:text-orange-400 transition-colors duration-200">{t("terms")}</Link>
            </nav>
          </div>
        </AnimateOnScroll>

        <NewsletterSignup />

        <div className="mt-10 pt-6 border-t border-white/10 text-xs text-white/60 text-center">
          &copy; 2026 CityWalkStories. {t("allRightsReserved")}
        </div>
      </div>
    </footer>
  );
}
