"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/lib/auth-context";

export function HeroSection() {
  const t = useTranslations("home");
  const { hasPaid } = useAuth();

  return (
    <section className="relative overflow-hidden">
      <img
        src="/images/heroes/10001-leiden-canal-historic-buildings.jpg"
        alt="Leiden binnenstad met grachten en historische gebouwen"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/40 via-navy-900/20 to-navy-900/80" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-10 pb-8 flex flex-col min-h-[400px] md:min-h-[480px]">
        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
            <svg viewBox="0 0 24 24" fill="none" className="w-9 h-9 text-white" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
          </div>

          <p className="text-white/60 text-xs tracking-[0.25em] uppercase mb-2">YourLocalCityGuide</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-2">
            LEIDEN
          </h1>
          <p className="text-hand text-orange-300 text-lg md:text-xl -rotate-1 mb-6">
            More than a city. A story.
          </p>
          <p className="text-white/80 text-sm mb-8">
            {t("heroDescription")}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto w-full">
          <Link
            href="/routes"
            className="flex flex-col items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl p-4 hover:bg-white/25 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
                <path d="M4 4v16" strokeLinecap="round" />
                <path d="M20 4v16" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-white text-xs font-semibold text-center leading-tight">Bekijk routes</span>
            <span className="text-white/50 text-[10px] text-center">Volg een verhaal</span>
          </Link>

          <Link
            href={hasPaid ? "/routes/custom" : "/pricing"}
            className="flex flex-col items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl p-4 hover:bg-white/25 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </div>
            <span className="text-white text-xs font-semibold text-center leading-tight">Eigen route</span>
            <span className="text-white/50 text-[10px] text-center">Stel zelf samen</span>
          </Link>

          <Link
            href={hasPaid ? "/map" : "/pricing"}
            className="flex flex-col items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl p-4 hover:bg-white/25 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                <line x1="8" y1="2" x2="8" y2="18" />
                <line x1="16" y1="6" x2="16" y2="22" />
              </svg>
            </div>
            <span className="text-white text-xs font-semibold text-center leading-tight">Open kaart</span>
            <span className="text-white/50 text-[10px] text-center">{hasPaid ? "Verken vrij" : "Na aankoop"}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
