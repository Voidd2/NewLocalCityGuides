"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function PriceComparison() {
  const t = useTranslations("home");

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-orange-50 border-2 border-orange-500 rounded-2xl p-6">
          <p className="text-sm text-gray-600 font-medium mb-1">Leiden pakket vanaf</p>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-4xl md:text-5xl font-extrabold text-orange-500">&euro;5,99</span>
          </div>
          <p className="text-sm text-gray-500 mb-4">{t("pricePerPerson")}</p>

          <ul className="space-y-2 mb-6">
            {[
              "Toegang tot alle routes",
              "Interactieve video's",
              "Maak je eigen route",
              "Verborgen parels en lokale tips",
              "Levenslange toegang",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-green-600 mt-0.5 shrink-0">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          <Link
            href="/pricing"
            className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-full text-center transition-colors text-sm"
          >
            Bekijk prijzen
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 inline-block ml-1">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
          <p className="text-sm text-gray-600 font-medium mb-1">Traditionele groepsrondleiding</p>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-4xl md:text-5xl font-extrabold text-gray-400">~&euro;50</span>
          </div>
          <p className="text-sm text-gray-500 mb-4">{t("pricePerPerson")}</p>

          <ul className="space-y-2">
            {[
              { text: "Vaste tijd", negative: true },
              { text: "Grote groepen", negative: true },
              { text: "Geen eigen keuze", negative: true },
              { text: "Vaak alleen highlights", negative: true },
            ].map((item) => (
              <li key={item.text} className="flex items-start gap-2 text-sm text-gray-500">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-red-500 mt-0.5 shrink-0">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-hand text-orange-600 text-lg md:text-xl text-center mt-4 -rotate-1">
        Veel meer ontdekken voor een veel betere prijs!
      </p>
    </section>
  );
}
