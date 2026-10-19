"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/lib/auth-context";

export function HeroSection() {
  const t = useTranslations("home");
  const { hasPaid } = useAuth();
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white">
      <Image src="/images/heroes/10008-leiden-canal-panorama.jpg" alt={t("heroImageAlt")} fill priority sizes="100vw" className="object-cover object-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/75 to-navy-950/20" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:min-h-[600px] md:grid-cols-[1.5fr_1fr] md:items-end md:py-20">
        <div className="max-w-2xl animate-fade-in-up">
          <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[.2em] text-orange-300"><span className="h-px w-8 bg-orange-400" />CityWalkStories · Leiden</p>
          <h1 className="text-[clamp(2.6rem,5.5vw,4.6rem)] font-extrabold leading-[1.08] tracking-tight">{t("heroHeadline")}</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/85 md:text-lg">{t("heroDescription")}</p>
          {hasPaid ? (
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/routes" className="cws-primary">{t("allRoutes")} <span aria-hidden="true">→</span></Link>
              <Link href="/my-routes" className="cws-secondary">{t("myRoutes")}</Link>
              <Link href="/map" className="cws-secondary">{t("mapLabel")}</Link>
            </div>
          ) : (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/routes" className="cws-primary">{t("viewRoutes")} <span aria-hidden="true">→</span></Link>
              <Link href="/ontdek" className="cws-secondary">{t("startExploring")}</Link>
            </div>
          )}
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/80">
            {[t("trustLanguages"), t("trustOwnPace"), t("trustOneTime")].map(label => <span key={label}><span className="mr-2 text-orange-300" aria-hidden="true">✓</span>{label}</span>)}
          </div>
          {!hasPaid && <Link href="/pricing" className="mt-4 inline-block text-sm text-white/75 underline underline-offset-4">{t("fromPrice")}</Link>}
        </div>
        <div className="hidden justify-self-end rounded-2xl border border-white/25 bg-navy-900/65 p-5 backdrop-blur-sm md:block">
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-300">{t("heroPhotoLabel")}</p>
          <p className="mt-2 text-lg font-semibold">{t("heroPhotoTitle")}</p>
          <Link href="/leiden" className="mt-3 inline-block text-sm text-white/80 underline underline-offset-4">{t("heroPhotoLink")} →</Link>
        </div>
      </div>
    </section>
  );
}
