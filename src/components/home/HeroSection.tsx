"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function HeroSection() {
  const t = useTranslations("home");

  return (
    <section className="relative min-h-[520px] md:min-h-[600px] overflow-hidden">
      {/* 10001 - hero foto van Leiden binnenstad, grachten met historische gebouwen */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/40 via-navy-900/20 to-navy-900/80" />
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(15,29,54,0.35) 0%, rgba(15,29,54,0.15) 40%, rgba(15,29,54,0.75) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-navy-800/30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-8 pb-12 flex flex-col min-h-[520px] md:min-h-[600px]">
        <div className="mb-4">
          <span className="inline-block bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Leiden
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-lg">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
            {t("heroTitle")}
            <br />
            <span className="text-orange-500">{t("heroSubtitle")}</span>
          </h1>

          <p className="text-white/90 text-base md:text-lg leading-relaxed mb-6 max-w-md">
            {t("heroDescription")}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/routes"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm"
            >
              {t("heroTitle") === "Ontdek Leiden" ? "Bekijk tours" : t("heroTitle") === "Discover Leiden" ? "View tours" : "Touren ansehen"}
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-navy-800 font-semibold px-6 py-3 rounded-full transition-colors text-sm"
            >
              Kies Leiden
            </Link>
          </div>
        </div>

        <div className="hidden md:block absolute right-8 top-1/3 text-hand text-white/80 text-xl -rotate-6 max-w-[180px] leading-snug">
          Echte verhalen.<br />Op echte plekken.
        </div>
        <div className="hidden md:block absolute right-12 top-16 text-hand text-orange-300 text-lg rotate-3">
          Alle routes inbegrepen!
        </div>
      </div>
    </section>
  );
}
