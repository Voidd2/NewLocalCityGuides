"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-semibold text-navy-800 text-sm">{title}</span>
        <svg viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}>
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      {open && (
        <div className="pb-4 text-sm text-gray-600 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}

export function AboutPage() {
  const t = useTranslations("about");
  const tFooter = useTranslations("footer");

  return (
    <div>
      <section className="bg-gradient-to-b from-navy-800 to-navy-900 text-white px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
            {t("aboutLeiden")}
          </h1>
          <p className="text-white/70 text-base max-w-lg mx-auto">
            {t("aboutLeidenDesc")}
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-8">
        <Accordion title={t("historyTitle")}>
          <p className="mb-3">
            {t("historyP1")}
          </p>
          <p className="mb-3">
            {t("historyP2")}
          </p>
          <p>
            {t("historyP3")}
          </p>
        </Accordion>

        <Accordion title={t("practicalTipsTitle")}>
          <ul className="space-y-2">
            {[t("tip1"), t("tip2"), t("tip3"), t("tip4")].map((tip, i) => (
            <li key={i} className="flex items-start gap-2">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-orange-500 mt-0.5 shrink-0"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>
              <span>{tip}</span>
            </li>
            ))}
          </ul>
        </Accordion>

        <Accordion title={t("faqTitle")}>
          <div className="space-y-4">
            <div>
              <p className="font-medium text-navy-800 mb-1">{t("faq1Q")}</p>
              <p>{t("faq1A")}</p>
            </div>
            <div>
              <p className="font-medium text-navy-800 mb-1">{t("faq2Q")}</p>
              <p>{t("faq2A")}</p>
            </div>
            <div>
              <p className="font-medium text-navy-800 mb-1">{t("faq3Q")}</p>
              <p>{t("faq3A")}</p>
            </div>
            <div>
              <p className="font-medium text-navy-800 mb-1">{t("faq4Q")}</p>
              <p>{t("faq4A")}</p>
            </div>
          </div>
        </Accordion>
      </section>

      <section className="bg-warm-100 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-bold text-navy-800 text-center mb-8">{t("howItWorks")}</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: t("howStep1Title"),
                desc: t("howStep1Desc"),
                image: "10040 - screenshot van pricing pagina op telefoon",
              },
              {
                step: "2",
                title: t("howStep2Title"),
                desc: t("howStep2Desc"),
                image: "10041 - screenshot van routes kiezen op telefoon",
              },
              {
                step: "3",
                title: t("howStep3Title"),
                desc: t("howStep3Desc"),
                image: "10042 - screenshot van locatie ervaring op telefoon",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-48 h-80 mx-auto bg-white rounded-3xl shadow-lg overflow-hidden mb-4 border border-gray-100">
                  {/* {item.image} */}
                  <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300 text-xs p-4">
                    {t("appPreview")} {item.step}
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-orange-500 text-white font-bold text-sm flex items-center justify-center mx-auto mb-2">
                  {item.step}
                </div>
                <h3 className="font-bold text-navy-800 text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold text-navy-800 text-center mb-2">{t("previewVideo")}</h2>
        <p className="text-sm text-gray-500 text-center mb-6">{t("previewVideoDesc")}</p>

        <div className="relative bg-gray-200 rounded-2xl overflow-hidden aspect-video max-w-2xl mx-auto">
          {/* 10043 - preview video thumbnail van app in gebruik op locatie */}
          <div className="absolute inset-0 flex items-center justify-center bg-navy-800/20">
            <button className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-navy-800 ml-1">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-navy-800 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-navy-800">YourLocalCityGuide</p>
              <p className="text-xs text-gray-500">REAL PLACES. REAL STORIES.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <Link href="/about" className="flex items-center gap-2 text-sm text-gray-700 hover:text-orange-500">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-orange-500"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" /></svg>
                {t("ourMission")}
              </Link>
              <a href="mailto:info@yourlocalcityguide.com" className="flex items-center gap-2 text-sm text-gray-700 hover:text-orange-500">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-orange-500"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                {t("contact")}
              </a>
              <Link href="/about" className="flex items-center gap-2 text-sm text-gray-700 hover:text-orange-500">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-orange-500"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>
                {t("collaborate")}
              </Link>
            </div>
            <div className="space-y-3">
              <Link href="/privacy" className="flex items-center gap-2 text-sm text-gray-700 hover:text-orange-500">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-orange-500"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                {t("privacy")}
              </Link>
              <Link href="/terms" className="flex items-center gap-2 text-sm text-gray-700 hover:text-orange-500">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-orange-500"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" /></svg>
                {t("termsOfUse")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy-800 text-white py-10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-hand text-orange-300 text-2xl mb-2 -rotate-1">{t("sameStreets")}</p>
          <h2 className="text-2xl font-bold mb-3">{t("aRicherStory")}</h2>
          <p className="text-white/60 text-sm mb-6">
            {t("ctaDesc")}
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-full transition-colors"
          >
            {t("ctaButton")}
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
