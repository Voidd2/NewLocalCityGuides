"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/lib/auth-context";
import { routes } from "@/data/routes";
import { getSavedRoutes } from "@/lib/saved-routes";
import { getLocationById } from "@/data/locations";
import { PriceComparison } from "./PriceComparison";
import { PopularRoutes } from "./PopularRoutes";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { useEffect, useState } from "react";
import type { SavedRoute } from "@/lib/saved-routes";
import Image from "next/image";

function ProductPreview({ type }: { type: "package" | "route" | "location" }) {
  const t = useTranslations("home");

  if (type === "package") {
    return (
      <div className="h-full bg-warm-50 p-4 text-left">
        <div className="h-28 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-4 text-white shadow-lg shadow-orange-500/20">
          <span className="text-[9px] font-bold uppercase tracking-widest text-white/70">{t("previewPackageCity")}</span>
          <p className="mt-2 text-xl font-extrabold">€5,99</p>
          <div className="mt-3 h-2 w-20 rounded-full bg-white/30" />
        </div>
        <div className="mt-4 space-y-2.5">
          {["w-4/5", "w-full", "w-3/5"].map((width) => (
            <div key={width} className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-green-100 ring-4 ring-green-50" />
              <div className={`h-2 ${width} rounded-full bg-gray-200`} />
            </div>
          ))}
        </div>
        <div className="mt-5 h-10 rounded-full bg-navy-800" />
      </div>
    );
  }

  if (type === "route") {
    return (
      <div className="relative h-full overflow-hidden bg-[#e8e3d9]">
        <svg viewBox="0 0 220 340" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path d="M-10 74 C48 48 78 112 128 82 S194 45 238 70" fill="none" stroke="#fff" strokeWidth="18" opacity=".75" />
          <path d="M20 290 C58 250 62 194 110 180 S183 168 218 112" fill="none" stroke="#fff" strokeWidth="13" opacity=".8" />
          <path d="M25 300 C66 252 60 208 111 180 S177 168 215 112" fill="none" stroke="#FF6B00" strokeWidth="5" strokeLinecap="round" strokeDasharray="8 7" />
          {["25,300", "74,230", "111,180", "166,158", "215,112"].map((point, index) => {
            const [cx, cy] = point.split(",");
            return <circle key={point} cx={cx} cy={cy} r="9" fill={index === 0 ? "#1B2A4A" : "#fff"} stroke="#FF6B00" strokeWidth="4" />;
          })}
        </svg>
        <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/95 p-3 shadow-xl backdrop-blur">
          <p className="text-[9px] font-bold uppercase tracking-wider text-orange-600">{t("previewRouteTitle")}</p>
          <div className="mt-2 flex justify-between text-[10px] font-semibold text-navy-800"><span>{t("previewRouteStops")}</span><span>3,5 km</span></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full overflow-hidden bg-navy-900 text-left">
      <div className="absolute inset-x-0 top-0 h-2/3">
        <Image src="/images/locations/10025-pieterskerk-leiden.jpg" alt="" fill sizes="192px" className="object-cover opacity-80" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/20 to-transparent" />
      <div className="absolute inset-x-4 bottom-4 text-white">
        <span className="inline-flex rounded-full bg-orange-500 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider">{t("previewStopBadge")}</span>
        <p className="mt-2 text-lg font-extrabold">{t("previewLocationName")}</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="flex h-9 items-center justify-center rounded-full bg-white px-2 text-center text-[8px] font-bold text-navy-800">
            {t("previewStoryButton")}
          </div>
          <div className="flex h-9 items-center justify-center gap-1 rounded-full bg-orange-500 px-2 text-center text-[8px] font-bold text-white">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3 shrink-0" aria-hidden="true">
              <path d="M6 4v12l9-6z" />
            </svg>
            {t("previewWatchVideoButton")}
          </div>
        </div>
      </div>
    </div>
  );
}

function HowItWorksSection() {
  const t = useTranslations("home");

  const steps = [
    { step: "1", title: t("howStep1Title"), desc: t("howStep1Desc"), preview: "package" as const },
    { step: "2", title: t("howStep2Title"), desc: t("howStep2Desc"), preview: "route" as const },
    { step: "3", title: t("howStep3Title"), desc: t("howStep3Desc"), preview: "location" as const },
  ];

  return (
    <section className="bg-warm-100 py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <AnimateOnScroll>
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-orange-600 text-center mb-2">{t("howEyebrow")}</p>
          <h2 className="text-2xl md:text-4xl font-extrabold text-navy-800 text-center">{t("howItWorks")}</h2>
          <p className="mx-auto mb-10 mt-3 max-w-2xl text-center text-sm leading-relaxed text-gray-500 md:text-base">{t("howIntro")}</p>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {steps.map((item, i) => (
            <AnimateOnScroll key={item.step} delay={i * 150}>
              <div className="text-center">
                <div className="relative w-48 h-80 mx-auto bg-navy-900 rounded-[2rem] p-2 shadow-2xl shadow-navy-900/15 overflow-hidden mb-5 ring-1 ring-navy-900/10">
                  <div className="absolute top-2 left-1/2 z-10 h-4 w-16 -translate-x-1/2 rounded-b-xl bg-navy-900" />
                  <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-white">
                    <ProductPreview type={item.preview} />
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-orange-500 text-white font-bold text-sm flex items-center justify-center mx-auto mb-2">
                  {item.step}
                </div>
                <h3 className="font-bold text-navy-800 text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

function AppHighlightsSection() {
  const t = useTranslations("home");

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="overflow-hidden rounded-[2rem] bg-navy-900 p-4 shadow-2xl shadow-navy-900/15 sm:p-6 md:p-8">
          <AnimateOnScroll>
            <div className="mb-6 max-w-2xl">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-400">{t("appInsideEyebrow")}</p>
              <h3 className="text-2xl font-extrabold text-white md:text-3xl">{t("appInsideTitle")}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60 md:text-base">{t("appInsideDesc")}</p>
            </div>
          </AnimateOnScroll>

          <div className="grid gap-4 lg:grid-cols-12">
            <AnimateOnScroll className="lg:col-span-7">
              <Link href="/routes" className="group relative block min-h-[330px] overflow-hidden rounded-3xl bg-black md:min-h-[390px]">
                <Image
                  src="/images/video-posters/10034-pieterskerk-interactive-video-poster.jpg"
                  alt={t("appVideoImageAlt")}
                  fill
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/35 to-transparent" />
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-bold text-navy-900 shadow-lg backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-orange-500" />
                  {t("appVideoBadge")}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-white shadow-xl transition group-hover:scale-110">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-7 w-7" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-300">{t("appVideoKicker")}</p>
                  <h4 className="mt-2 max-w-lg text-2xl font-extrabold text-white md:text-3xl">{t("appVideoTitle")}</h4>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">{t("appVideoDesc")}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white">
                    {t("appVideoCta")}
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </AnimateOnScroll>

            <div className="grid gap-4 lg:col-span-5">
              <AnimateOnScroll delay={100}>
                <Link href="/pricing" className="group block rounded-3xl bg-white p-5 transition hover:-translate-y-1 md:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-600">{t("appLocalKicker")}</p>
                      <h4 className="mt-2 text-xl font-extrabold text-navy-800">{t("appLocalTitle")}</h4>
                    </div>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden="true">
                        <path d="M4 10h16M5 10l1-5h12l1 5M6 10v9h12v-9M9 19v-5h6v5" />
                      </svg>
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-gray-500">{t("appLocalDesc")}</p>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {[t("appLocalFish"), t("appLocalFood"), t("appLocalMarket")].map((label, index) => (
                      <div key={label} className="rounded-2xl bg-warm-100 px-2 py-3 text-center">
                        <span className="mx-auto mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-extrabold text-orange-600 shadow-sm">{index + 1}</span>
                        <p className="text-[10px] font-bold leading-tight text-navy-800">{label}</p>
                      </div>
                    ))}
                  </div>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-orange-600">
                    {t("appLocalCta")} <span className="transition group-hover:translate-x-1" aria-hidden="true">→</span>
                  </span>
                </Link>
              </AnimateOnScroll>

              <AnimateOnScroll delay={200}>
                <Link href="/pricing" className="group relative block overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 p-5 text-white transition hover:-translate-y-1 md:p-6">
                  <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10" />
                  <div className="relative flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7" aria-hidden="true">
                        <path d="M3 9h18M5 9V7l7-4 7 4v2M5 9v10M9 9v10M15 9v10M19 9v10M3 19h18M2 22h20" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/70">{t("appTicketsKicker")}</p>
                      <h4 className="mt-1 text-xl font-extrabold">{t("appTicketsTitle")}</h4>
                    </div>
                  </div>
                  <p className="relative mt-3 text-sm leading-relaxed text-white/80">{t("appTicketsDesc")}</p>
                  <div className="relative mt-4 flex flex-wrap gap-2">
                    {['Museum De Lakenhal', 'Naturalis', 'Rijksmuseum van Oudheden'].map((museum) => (
                      <span key={museum} className="rounded-full bg-white/15 px-3 py-1.5 text-[10px] font-semibold ring-1 ring-white/15">{museum}</span>
                    ))}
                  </div>
                  <span className="relative mt-4 inline-flex items-center gap-2 text-sm font-bold">
                    {t("appTicketsCta")} <span className="transition group-hover:translate-x-1" aria-hidden="true">→</span>
                  </span>
                </Link>
              </AnimateOnScroll>
            </div>
          </div>

          <AnimateOnScroll delay={225}>
            <Link href="/pricing" className="group relative mt-4 grid min-h-56 overflow-hidden rounded-3xl bg-white md:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-52 overflow-hidden md:min-h-full">
                <Image
                  src="/images/future-cities/10012-amsterdam-canals.jpg"
                  alt={t("appTripImageAlt")}
                  fill
                  sizes="(min-width: 768px) 42vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/55 to-transparent md:bg-gradient-to-r" />
                <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-bold text-navy-900 shadow-lg backdrop-blur">Amsterdam</span>
              </div>
              <div className="flex flex-col justify-center p-5 md:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">{t("appTripKicker")}</p>
                <h4 className="mt-2 text-2xl font-extrabold text-navy-800">{t("appTripTitle")}</h4>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">{t("appTripDesc")}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[t("appTripTrain"), t("appTripRoute"), t("appTripMuseums")].map((item) => (
                    <span key={item} className="rounded-full bg-warm-100 px-3 py-1.5 text-[11px] font-semibold text-navy-800">{item}</span>
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-orange-600">
                  {t("appTripCta")} <span className="transition group-hover:translate-x-1" aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          </AnimateOnScroll>

          <AnimateOnScroll delay={250}>
            <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-4">
              {[t("appBenefitGps"), t("appBenefitLanguages"), t("appBenefitPace"), t("appBenefitUpdates")].map((benefit) => (
                <div key={benefit} className="bg-white/[0.06] px-3 py-4 text-center text-xs font-semibold text-white/80">{benefit}</div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

function AboutLeidenSection() {
  const t = useTranslations("home");

  return (
    <section className="bg-warm-100 py-14 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <AnimateOnScroll>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-navy-800 mb-3">{t("aboutLeiden")}</h2>
            <p className="text-gray-600 max-w-lg mx-auto">{t("aboutLeidenDesc")}</p>
          </div>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 gap-6 items-center">
          <AnimateOnScroll animation="slide-left">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-200 shadow-xl shadow-navy-900/10">
              <Image
                src="/images/heroes/10001-leiden-canal-historic-buildings.jpg"
                alt="Historische grachten en gebouwen in Leiden"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="w-full h-full object-cover"
              />
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll animation="slide-right">
            <div className="space-y-4">
              <p className="text-sm text-gray-600 leading-relaxed">{t("historyP1")}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{t("historyP2")}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{t("historyP3")}</p>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

function WhyNotGuideSection() {
  const t = useTranslations("home");

  const whyPoints = [
    { text: t("whyPoint1", { price: "28" }), icon: "money" },
    { text: t("whyPoint2"), icon: "clock" },
    { text: t("whyPoint3"), icon: "eye" },
    { text: t("whyPoint4"), icon: "group" },
  ];

  const withAppPoints = [
    { text: t("withAppPoint1"), icon: "language" },
    { text: t("withAppPoint2"), icon: "pause" },
    { text: t("withAppPoint3"), icon: "kids" },
    { text: t("withAppPoint4"), icon: "gem" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <AnimateOnScroll>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-red-400">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-bold text-navy-800">{t("whyTitle")}</h3>
            </div>
            <ul className="space-y-3">
              {whyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-500">
                  <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-red-400">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  {point.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-white border-2 border-orange-500 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-green-600">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-bold text-navy-800">{t("withAppTitle")}</h3>
            </div>
            <ul className="space-y-3">
              {withAppPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-green-600">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                  </div>
                  {point.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
}

function CustomRouteCta() {
  const t = useTranslations("home");

  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      <AnimateOnScroll animation="scale-in">
        <Link
          href="/pricing"
          className="block bg-gradient-to-br from-orange-50 to-orange-100/50 border-2 border-orange-200 rounded-2xl p-6 hover:from-orange-100 hover:to-orange-100 hover:border-orange-300 hover-lift transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20 shrink-0 group-hover:scale-110 transition-transform">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-white">
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-orange-600 text-lg mb-1">{t("createRoute")}</h3>
              <p className="text-sm text-gray-600">{t("createRouteDesc")}</p>
            </div>
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-orange-400 shrink-0 group-hover:translate-x-1 transition-transform">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </div>
        </Link>
      </AnimateOnScroll>
    </section>
  );
}

function FaqSection() {
  const t = useTranslations("home");

  const faqs = [
    { q: t("faq1Q"), a: t("faq1A") },
    { q: t("faq2Q"), a: t("faq2A") },
    { q: t("faq3Q"), a: t("faq3A") },
    { q: t("faq4Q"), a: t("faq4A") },
  ];

  return (
    <section className="bg-warm-100 py-10">
      <div className="max-w-3xl mx-auto px-4">
        <AnimateOnScroll>
          <h2 className="text-xl font-bold text-navy-800 text-center mb-6">{t("faqTitle")}</h2>
        </AnimateOnScroll>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <AnimateOnScroll key={i} delay={i * 100}>
              <FaqItem question={faq.q} answer={faq.a} />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <span className="font-semibold text-navy-800 text-sm">{question}</span>
        <svg viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 text-gray-400 transition-transform shrink-0 ml-2 ${open ? "rotate-180" : ""}`}>
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

function PracticalTipsSection() {
  const t = useTranslations("home");

  const tips = [t("tip1"), t("tip2"), t("tip3"), t("tip4")];

  return (
    <section className="bg-white py-10">
      <div className="max-w-3xl mx-auto px-4">
        <AnimateOnScroll>
          <h2 className="text-xl font-bold text-navy-800 text-center mb-6">{t("practicalTipsTitle")}</h2>
        </AnimateOnScroll>
        <div className="grid md:grid-cols-2 gap-4">
          {tips.map((tip, i) => (
            <AnimateOnScroll key={i} delay={i * 100}>
              <div className="flex items-start gap-3 bg-warm-50 rounded-xl p-4 border border-gray-100">
                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0 mt-0.5">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-orange-500">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm text-gray-700">{tip}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  const t = useTranslations("home");

  return (
    <section className="bg-navy-800 text-white py-10">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <AnimateOnScroll>
          <p className="text-hand text-orange-300 text-2xl mb-2 -rotate-1">{t("sameStreets")}</p>
          <h2 className="text-2xl font-bold mb-3">{t("aRicherStory")}</h2>
          <p className="text-white/60 text-sm mb-6">{t("ctaDesc")}</p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-full transition-colors shadow-lg shadow-orange-500/30"
          >
            {t("ctaButton")}
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

export function HomeContent() {
  const t = useTranslations("home");
  const tRoutes = useTranslations("routes");
  const { hasPaid, isLoading } = useAuth();
  const [savedRoutes, setSavedRoutes] = useState<SavedRoute[]>([]);

  useEffect(() => {
    if (hasPaid) {
      const timeout = window.setTimeout(() => setSavedRoutes(getSavedRoutes()), 0);
      return () => window.clearTimeout(timeout);
    }
    return undefined;
  }, [hasPaid]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[20vh]">
        <div className="animate-pulse text-gray-400">{t("loading")}</div>
      </div>
    );
  }

  if (hasPaid) {
    return (
      <section className="bg-warm-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <AnimateOnScroll>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3 mb-8 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-green-600">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-green-800">{t("packageActive")}</p>
                <p className="text-xs text-green-600">{t("packageActiveDesc")}</p>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={100}>
            <h2 className="text-lg font-bold text-navy-800 mb-4">{t("availableRoutes")}</h2>
          </AnimateOnScroll>

          <div className="space-y-3 mb-8">
            {routes.map((route, i) => (
              <AnimateOnScroll key={route.id} delay={i * 100 + 150}>
                <Link
                  href={`/routes/${route.slug}`}
                  className="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 p-3.5 hover-lift hover-zoom-img group shadow-sm"
                >
                  <div className="w-18 h-18 rounded-xl bg-gray-200 shrink-0 overflow-hidden">
                    {route.image && (
                      <img src={route.image} alt={route.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-navy-800 text-sm">{route.title}</h3>
                      {route.popular && (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-orange-500 text-white uppercase shadow-sm">
                          {tRoutes("popular")}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{route.subtitle}</p>
                    <p className="text-[11px] text-gray-400 mt-1">{route.stops} stops - {route.distance}</p>
                  </div>
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-orange-500 shrink-0 group-hover:translate-x-1 transition-transform">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>

          {savedRoutes.length > 0 && (
            <>
              <AnimateOnScroll>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-navy-800">{t("myRoutesLabel")}</h2>
                  <Link href="/my-routes" className="text-sm text-orange-500 font-medium hover:text-orange-600 transition-colors">
                    {t("viewAll")}
                  </Link>
                </div>
              </AnimateOnScroll>
              <div className="space-y-3 mb-8">
                {savedRoutes.slice(0, 3).map((sr, i) => {
                  const locs = sr.locationIds.map(getLocationById).filter(Boolean);
                  const progress = sr.arrivedLocationIds.length;
                  const total = sr.locationIds.length;
                  const pct = total > 0 ? Math.round((progress / total) * 100) : 0;
                  return (
                    <AnimateOnScroll key={sr.id} delay={i * 100}>
                      <Link
                        href={`/my-routes/${sr.id}`}
                        className="block bg-white rounded-2xl border border-gray-200 p-4 hover-lift shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-navy-800 text-sm">{sr.name}</h3>
                          <span className="text-xs text-gray-400">{progress}/{total} {t("visited")}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2 overflow-hidden">
                          <div className="bg-gradient-to-r from-orange-500 to-orange-400 h-1.5 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                        </div>
                        <div className="flex gap-1.5">
                          {locs.slice(0, 5).map((loc) => (
                            <div key={loc!.id} className="w-8 h-8 rounded-lg bg-gray-200 shrink-0 overflow-hidden">
                              {loc!.image && <img src={loc!.image} alt={loc!.name} className="w-full h-full object-cover" />}
                            </div>
                          ))}
                        </div>
                      </Link>
                    </AnimateOnScroll>
                  );
                })}
              </div>
            </>
          )}

          <AnimateOnScroll animation="scale-in">
            <Link
              href="/routes/custom"
              className="block bg-gradient-to-br from-orange-50 to-orange-100/50 border-2 border-orange-200 rounded-2xl p-5 mb-6 hover:from-orange-100 hover:to-orange-100 hover:border-orange-300 hover-lift transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20 shrink-0 group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-white">
                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-orange-600 mb-0.5">{t("createRoute")}</h3>
                  <p className="text-sm text-gray-600">{t("createRouteDesc")}</p>
                </div>
              </div>
            </Link>
          </AnimateOnScroll>
        </div>
      </section>
    );
  }

  return (
    <>
      <HowItWorksSection />
      <AppHighlightsSection />
      <PopularRoutes />
      <CustomRouteCta />
      <PriceComparison />
      <WhyNotGuideSection />
      <AboutLeidenSection />
      <PracticalTipsSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
