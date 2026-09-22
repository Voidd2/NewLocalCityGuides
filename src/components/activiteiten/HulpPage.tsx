"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/lib/auth-context";

export function HulpPage() {
  const { hasPaid, isLoading } = useAuth();
  const t = useTranslations("help");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dagen: "",
    groepsgrootte: "2",
    kinderen: "0",
    volwassenen: "2",
    interesse: "",
    bericht: "",
  });
  const [submitted, setSubmitted] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="animate-pulse text-gray-400">{t("loading")}</div>
      </div>
    );
  }

  if (!hasPaid) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
          <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-orange-500" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-navy-800 mb-2">Persoonlijke hulp ontgrendelen</h2>
        <p className="text-sm text-gray-500 mb-4">
          Koop het Leiden pakket voor toegang tot persoonlijke hulp bij het plannen van jouw perfecte dag.
        </p>
        <Link
          href="/pricing"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
        >
          Bekijk het Leiden pakket
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div>
        <section className="bg-gradient-to-b from-navy-800 to-navy-900 text-white px-4 py-12 pb-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-green-400" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-3">{t("thankYou", { name: formData.name })}</h1>
            <p className="text-white/70 text-sm leading-relaxed mb-2">
              {t("thankYouDesc")}
            </p>
          </div>
        </section>
        <section className="max-w-2xl mx-auto px-4 py-8 text-center mb-16">
          <Link
            href="/activiteiten"
            className="inline-flex items-center gap-2 text-orange-500 font-semibold text-sm hover:text-orange-600 transition-colors"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
            </svg>
            {t("backToHome")}
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-b from-navy-800 to-navy-900 text-white px-4 py-10 pb-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-5">
              <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-orange-400" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
              </svg>
            </div>
            <p className="text-hand text-orange-300 text-xl mb-2">Jouw persoonlijke reisplanner</p>
            <h1 className="text-2xl md:text-3xl font-bold mb-3">{t("title")}</h1>
            <p className="text-white/70 text-sm leading-relaxed max-w-xl mx-auto">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 -mt-3 mb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 text-center shadow-sm">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-3">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-blue-500" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </div>
            <h3 className="font-bold text-navy-800 text-sm mb-1">{t("discoverLeiden")}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              {t("discoverLeidenDesc")}
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 text-center shadow-sm">
            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-3">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-purple-500" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-navy-800 text-sm mb-1">{t("dayTripAmsterdam")}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              {t("dayTripAmsterdamDesc")}
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 text-center shadow-sm">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-3">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-green-500" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 className="font-bold text-navy-800 text-sm mb-1">{t("arrangeStay")}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              {t("arrangeStayDesc")}
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 mb-10">
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-6 md:p-8">
          <h2 className="text-lg font-bold text-navy-800 mb-2">{t("howItWorks")}</h2>
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            Wij zijn je persoonlijke reisplanner. Je vertelt ons wat je leuk vindt, en wij doen de rest. Zo simpel is het.
          </p>

          <div className="space-y-5">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 text-sm font-bold">1</div>
              <div>
                <h3 className="font-bold text-navy-800 text-sm mb-0.5">{t("step1Title")}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {t("step1Desc")}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 text-sm font-bold">2</div>
              <div>
                <h3 className="font-bold text-navy-800 text-sm mb-0.5">{t("step2Title")}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {t("step2Desc")}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 text-sm font-bold">3</div>
              <div>
                <h3 className="font-bold text-navy-800 text-sm mb-0.5">{t("step3Title")}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {t("step3Desc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 mb-10">
        <h2 className="text-lg font-bold text-navy-800 mb-2">{t("whatCanWeHelp")}</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Wij zijn lokale experts en helpen je met alles. Niet alleen Leiden, maar de hele regio en verder.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <HelpCard
            icon={
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
            title={t("discoverLeiden")}
            description={t("discoverLeidenDesc")}
          />
          <HelpCard
            icon={
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
            title={t("dayTripAmsterdam")}
            description={t("dayTripAmsterdamDesc")}
          />
          <HelpCard
            icon={
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            title={t("arrangeStay")}
            description={t("arrangeStayDesc")}
          />
          <HelpCard
            icon={
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            }
            title={t("familyDay")}
            description={t("familyDayDesc")}
          />
          <HelpCard
            icon={
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
                <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            title={t("groupOuting")}
            description={t("groupOutingDesc")}
          />
          <HelpCard
            icon={
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A1.75 1.75 0 003 15.546" />
                <path d="M3 11.546c.523 0 1.046.151 1.5.454a2.704 2.704 0 003 0 2.704 2.704 0 013 0 2.704 2.704 0 003 0 2.704 2.704 0 013 0c.454-.303.977-.454 1.5-.454" />
                <path d="M5 7.5h14M7 4h10" />
              </svg>
            }
            title={t("customRoute")}
            description={t("customRouteDesc")}
          />
          <HelpCard
            icon={
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            }
            title={t("restaurantTips")}
            description={t("restaurantTipsDesc")}
          />
          <HelpCard
            icon={
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
                <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
            }
            title={t("eventPlanning")}
            description={t("eventPlanningDesc")}
          />
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 mb-10">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-navy-800 mb-1">Vertel ons over je plannen</h2>
          <p className="text-sm text-gray-500 mb-6">
            Vul onderstaand formulier in en wij nemen binnen 24 uur contact op met een persoonlijk voorstel.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-navy-800 mb-1.5">{t("name")} *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Je naam"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-navy-800 mb-1.5">{t("emailLabel")} *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="je@email.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-800 mb-1.5">{t("whichDays")} *</label>
              <input
                type="text"
                required
                value={formData.dagen}
                onChange={(e) => setFormData({ ...formData, dagen: e.target.value })}
                placeholder="Bijv. 15-17 oktober, of 'flexibel'"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-colors"
              />
              <p className="text-[11px] text-gray-400 mt-1">Je kunt meerdere dagen of een periode opgeven</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-navy-800 mb-1.5">{t("adults")}</label>
                <select
                  value={formData.volwassenen}
                  onChange={(e) => setFormData({ ...formData, volwassenen: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-colors"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                  <option value="10+">Meer dan 10</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-navy-800 mb-1.5">{t("children")}</label>
                <select
                  value={formData.kinderen}
                  onChange={(e) => setFormData({ ...formData, kinderen: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-colors"
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-navy-800 mb-1.5">{t("groupSize")}</label>
                <input
                  type="text"
                  value={formData.groepsgrootte}
                  onChange={(e) => setFormData({ ...formData, groepsgrootte: e.target.value })}
                  placeholder="Aantal personen"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-800 mb-1.5">{t("interests")}</label>
              <select
                value={formData.interesse}
                onChange={(e) => setFormData({ ...formData, interesse: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-colors"
              >
                <option value="">Kies een optie...</option>
                <option value="leiden-ontdekken">Leiden ontdekken</option>
                <option value="dagje-amsterdam">Dagje Amsterdam</option>
                <option value="andere-stad">Een andere stad bezoeken</option>
                <option value="rondvaart">Rondvaart of boottocht</option>
                <option value="wandeltour">Stadswandeling met gids</option>
                <option value="musea">Musea en cultuur</option>
                <option value="gezin">Iets leuks met het gezin</option>
                <option value="meerdaags">Meerdaagse trip plannen</option>
                <option value="weet-niet">Ik weet het nog niet - verras me!</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-800 mb-1.5">{t("tellUsMore")}</label>
              <textarea
                value={formData.bericht}
                onChange={(e) => setFormData({ ...formData, bericht: e.target.value })}
                rows={4}
                placeholder="Zijn er speciale wensen? Budget? Iets wat je zeker wilt doen of juist niet? Alles helpt ons om het perfecte plan te maken."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl text-sm transition-colors shadow-lg shadow-orange-500/20"
            >
              {t("sendRequest")}
            </button>

            <p className="text-[11px] text-gray-400 text-center">
              We reageren binnen 24 uur met een persoonlijk voorstel. Geen spam, geen verplichtingen.
            </p>
          </form>
        </div>
      </section>

      <section className="bg-navy-800 text-white py-10 mb-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-hand text-orange-300 text-xl mb-2">{t("whyUs")}</p>
          <h2 className="text-lg font-bold mb-6">Lokale kennis, persoonlijke service</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-8">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-orange-400">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                <h3 className="font-semibold text-sm">{t("localKnowledge")}</h3>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                {t("localKnowledgeDesc")}
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-orange-400">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                <h3 className="font-semibold text-sm">{t("personalAdvice")}</h3>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                {t("personalAdviceDesc")}
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-orange-400">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                <h3 className="font-semibold text-sm">{t("fastResponse")}</h3>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                {t("fastResponseDesc")}
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-orange-400">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                <h3 className="font-semibold text-sm">{t("freeService")}</h3>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                {t("freeServiceDesc")}
              </p>
            </div>
          </div>

          <Link
            href="/activiteiten"
            className="inline-flex items-center gap-2 text-orange-300 text-sm font-semibold hover:text-orange-200 transition-colors"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
            </svg>
            Of bekijk de activiteiten en boek zelf
          </Link>
        </div>
      </section>
    </div>
  );
}

function HelpCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3 bg-white rounded-xl border border-gray-100 p-4 hover:border-orange-200 hover:shadow-sm transition-all">
      <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0 text-orange-500">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-navy-800 text-sm mb-0.5">{title}</h3>
        <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
