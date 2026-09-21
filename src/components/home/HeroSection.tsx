"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/lib/auth-context";
import { useEffect, useRef, useState } from "react";

export function HeroSection() {
  const t = useTranslations("home");
  const tHeader = useTranslations("header");
  const { hasPaid } = useAuth();
  const heroRef = useRef<HTMLElement>(null);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        if (rect.bottom > 0) {
          setParallaxY(window.scrollY * 0.35);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={heroRef} className="relative overflow-hidden -mt-16">
      <div
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{ transform: `translateY(${parallaxY}px)` }}
      >
        <img
          src="/images/heroes/10001-leiden-canal-historic-buildings.jpg"
          alt="Leiden"
          className="absolute inset-0 w-full h-full object-cover scale-110"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/50 via-navy-900/20 to-navy-900/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/30 via-transparent to-navy-900/30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-24 pb-10 flex flex-col min-h-[480px] md:min-h-[560px]">
        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-lg mx-auto">
          <div className="animate-fade-in-up w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-5 ring-1 ring-white/20">
            <svg viewBox="0 0 24 24" fill="none" className="w-9 h-9 text-white animate-float" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
          </div>

          <p className="animate-fade-in-up animate-delay-100 text-white/50 text-xs tracking-[0.3em] uppercase mb-3 font-medium">
            YourLocalCityGuide
          </p>
          <h1 className="animate-fade-in-up animate-delay-200 text-5xl md:text-6xl font-extrabold text-white leading-none mb-3 tracking-tight">
            LEIDEN
          </h1>
          <p className="animate-fade-in-up animate-delay-300 text-hand text-orange-300 text-xl md:text-2xl -rotate-1 mb-5">
            {tHeader("subtitle")}
          </p>
          <p className="animate-fade-in-up animate-delay-400 text-white/70 text-sm mb-10 max-w-sm leading-relaxed">
            {t("heroDescription")}
          </p>
        </div>

        {hasPaid ? (
          <div className="animate-fade-in-up animate-delay-500 grid grid-cols-3 gap-3 max-w-md mx-auto w-full">
            <HeroButton href="/routes" label={t("allRoutes")} sub={t("pickRoute")}>
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
                <path d="M4 4v16" strokeLinecap="round" />
                <path d="M20 4v16" strokeLinecap="round" />
              </svg>
            </HeroButton>
            <HeroButton href="/my-routes" label={t("myRoutes")} sub={t("continueLabel")}>
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </HeroButton>
            <HeroButton href="/map" label={t("mapLabel")} sub={t("exploreFreely")}>
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                <line x1="8" y1="2" x2="8" y2="18" />
                <line x1="16" y1="6" x2="16" y2="22" />
              </svg>
            </HeroButton>
          </div>
        ) : (
          <div className="animate-fade-in-up animate-delay-500 grid grid-cols-2 gap-3 max-w-sm mx-auto w-full">
            <HeroButton href="/routes" label={t("viewRoutes")} sub={t("followStory")}>
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
                <path d="M4 4v16" strokeLinecap="round" />
                <path d="M20 4v16" strokeLinecap="round" />
              </svg>
            </HeroButton>
            <HeroButton href="/pricing" label={t("viewPricing")} sub={t("fromPrice")}>
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
              </svg>
            </HeroButton>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-warm-50 to-transparent" />
    </section>
  );
}

function HeroButton({
  href,
  label,
  sub,
  children,
}: {
  href: string;
  label: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col items-center gap-2 bg-white/10 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/15 hover:bg-white/20 hover:ring-white/30 hover:scale-105 transition-all duration-300"
    >
      <div className="w-11 h-11 rounded-full bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-shadow">
        {children}
      </div>
      <span className="text-white text-xs font-semibold text-center leading-tight">{label}</span>
      <span className="text-white/40 text-[10px] text-center">{sub}</span>
    </Link>
  );
}
