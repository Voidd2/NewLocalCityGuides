"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function AboutPage() {
  const t = useTranslations("about");

  return (
    <div>
      <section className="bg-gradient-to-b from-navy-800 to-navy-900 text-white px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
            Same streets.<br />
            <span className="text-orange-500">A richer story.</span>
          </h1>
          <p className="text-white/70 text-base max-w-lg mx-auto">
            YourLocalCityGuide laat je de stad ontdekken zoals een lokale bewoner dat zou doen.
            Geen grote groepen, geen haast. Alleen jij, de stad en haar verhalen.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-xl font-bold text-navy-800 mb-4">{t("whyTitle")}</h2>
            <div className="space-y-4">
              {[
                { icon: "money", text: t("whyPoint1", { price: "~€50" }) },
                { icon: "clock", text: t("whyPoint2") },
                { icon: "eye", text: t("whyPoint3") },
                { icon: "group", text: t("whyPoint4") },
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-red-500">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-700">{point.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-800 mb-4">{t("withAppTitle")}</h2>
            <div className="space-y-4">
              {[
                t("withAppPoint1"),
                t("withAppPoint2"),
                t("withAppPoint3"),
                t("withAppPoint4"),
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-green-600">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-700">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-full transition-colors"
          >
            {t("viewPricing")}
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </section>

      <section className="bg-warm-100 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-bold text-navy-800 text-center mb-8">Zo werkt het</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Koop je stadspakket",
                desc: "Eenmalig betalen, levenslang toegang tot alle routes en video's in de stad.",
                image: "10040 - screenshot van pricing pagina op telefoon",
              },
              {
                step: "2",
                title: "Kies je route of maak er een",
                desc: "Volg een themaroute of stel je eigen route samen uit alle beschikbare locaties.",
                image: "10041 - screenshot van routes kiezen op telefoon",
              },
              {
                step: "3",
                title: "Ontdek op locatie",
                desc: "Bij elke stop kies je: video bekijken, verhaal lezen, of gewoon rondkijken. Op jouw tempo.",
                image: "10042 - screenshot van locatie ervaring op telefoon",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-48 h-80 mx-auto bg-white rounded-3xl shadow-lg overflow-hidden mb-4 border border-gray-100">
                  {/* {item.image} */}
                  <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300 text-xs p-4">
                    App preview {item.step}
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

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold text-navy-800 text-center mb-2">Bekijk de preview video</h2>
        <p className="text-sm text-gray-500 text-center mb-6">Zie hoe de app en de video-content eruitzien op locatie.</p>

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

      <section className="bg-orange-50 border-t border-orange-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-lg font-bold text-navy-800 text-center mb-6">Perfect voor kinderen</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: "Geen grote groepen", desc: "Kinderen lopen niet verloren in een menigte. Je bepaalt zelf het tempo." },
              { title: "Leerzaam en leuk", desc: "Interactieve video's laten zien hoe de stad er vroeger uitzag. Geschiedenis komt tot leven." },
              { title: "Eigen taal", desc: "Alles in het Nederlands, Engels of Duits. Kinderen begrijpen elk verhaal." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-5 border border-orange-100">
                <h3 className="font-bold text-navy-800 text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-lg font-bold text-navy-800 text-center mb-6">Verborgen parels</h2>
        <p className="text-sm text-gray-500 text-center mb-8 max-w-lg mx-auto">
          Naast de grote bezienswaardigheden leiden wij je ook naar de authentieke lokale plekken die alleen bewoners kennen.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { code: "10056", desc: "foto van een stroopwafeltent op de markt" },
            { code: "10057", desc: "foto van ambachtelijke vishandel in Leiden" },
            { code: "10058", desc: "foto van verborgen hofje binnenplaats" },
            { code: "10059", desc: "foto van authentiek bruin cafe in steeg" },
          ].map((gem) => (
            <div key={gem.code} className="rounded-xl overflow-hidden bg-gray-100 aspect-square relative group">
              {/* {gem.code} - {gem.desc} */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xs font-medium">Verborgen parel</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-orange-500 text-white py-10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">Klaar om Leiden te ontdekken?</h2>
          <p className="text-white/80 text-sm mb-6">
            Vanaf &euro;5,99 per persoon. Alle routes, video&apos;s en verborgen parels. Op jouw tempo.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 bg-white text-orange-500 font-semibold px-8 py-4 rounded-full hover:bg-orange-50 transition-colors"
          >
            Bekijk prijzen
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
