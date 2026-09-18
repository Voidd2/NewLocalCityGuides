"use client";

import { useState } from "react";

const steps = [
  { num: 1, label: "Kies je pakket" },
  { num: 2, label: "Gegevens" },
  { num: 3, label: "Betaling" },
  { num: 4, label: "Bevestiging" },
];

export function PricingPage() {
  const [persons, setPersons] = useState(2);
  const [extraDevices, setExtraDevices] = useState(0);
  const pricePerPerson = 5.99;
  const pricePerDevice = 1.0;
  const total = persons * pricePerPerson + extraDevices * pricePerDevice;

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2 mb-8 overflow-x-auto">
          {steps.map((step, i) => (
            <div key={step.num} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  step.num === 1
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {step.num}
              </div>
              <span className={`text-xs whitespace-nowrap ${step.num === 1 ? "text-navy-800 font-medium" : "text-gray-400"}`}>
                {step.label}
              </span>
              {i < steps.length - 1 && (
                <div className="w-8 h-px bg-gray-200 shrink-0" />
              )}
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-[1fr,380px] gap-8">
          <div>
            <h1 className="text-2xl font-bold text-navy-800 mb-1">Maak je avontuur compleet</h1>
            <p className="text-sm text-gray-500 mb-6">Direct toegang. Geen wachttijden. Gewoon ontdekken!</p>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-bold text-navy-800">Leiden pakket</h2>
                <span className="text-2xl font-extrabold text-orange-500">&euro;5,99</span>
              </div>
              <p className="text-xs text-gray-500 mb-4">Toegang tot alle routes in Leiden</p>

              <ul className="space-y-1.5 text-sm text-gray-700">
                {[
                  "Alle routes in Leiden",
                  "Interactieve video's",
                  "Maak je eigen route (inbegrepen)",
                  "Verborgen parels en lokale tips",
                  "Levenslange toegang",
                  "Regelmatig nieuwe routes",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-green-600 shrink-0">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-orange-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">1</span>
                <h3 className="font-bold text-navy-800">Aantal personen</h3>
              </div>
              <p className="text-xs text-gray-500 mb-4 ml-8">Voor wie is het pakket?</p>

              <div className="flex items-center justify-between ml-8">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setPersons(Math.max(1, persons - 1))}
                    className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="text-xl font-bold text-navy-800 w-8 text-center">{persons}</span>
                  <button
                    onClick={() => setPersons(persons + 1)}
                    className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-500">personen</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-navy-800">&euro;{(persons * pricePerPerson).toFixed(2).replace(".", ",")}</p>
                  <p className="text-[10px] text-gray-400">&euro;{pricePerPerson.toFixed(2).replace(".", ",")} p.p.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-gray-200 text-gray-500 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">2</span>
                <h3 className="font-bold text-navy-800">Extra devices (optioneel)</h3>
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-400">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-xs text-gray-500 mb-4 ml-8">Wil je het op meerdere apparaten gebruiken? Handig als je samen op pad gaat.</p>

              <div className="flex items-center justify-between ml-8">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setExtraDevices(Math.max(0, extraDevices - 1))}
                    className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="text-xl font-bold text-navy-800 w-8 text-center">{extraDevices}</span>
                  <button
                    onClick={() => setExtraDevices(extraDevices + 1)}
                    className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-500">extra devices</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-navy-800">&euro;{(extraDevices * pricePerDevice).toFixed(2).replace(".", ",")}</p>
                  <p className="text-[10px] text-gray-400">&euro;{pricePerDevice.toFixed(2).replace(".", ",")} per device</p>
                </div>
              </div>

              <p className="text-xs text-gray-400 ml-8 mt-3 flex items-center gap-1">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-blue-500">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                </svg>
                Je kunt inloggen op meerdere apparaten, ideaal voor families of vrienden!
              </p>
            </div>
          </div>

          <div className="md:sticky md:top-20 self-start">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                <span className="font-bold text-navy-800">Totaal</span>
                <span className="text-3xl font-extrabold text-navy-800">&euro;{total.toFixed(2).replace(".", ",")}</span>
              </div>

              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 rounded-full text-sm transition-colors mb-4">
                Ga verder naar je gegevens
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 inline-block ml-1">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] text-gray-400 mb-4">
                <span className="flex items-center gap-1">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-green-500">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  Direct toegang na betaling
                </span>
                <span className="flex items-center gap-1">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-green-500">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  Ontdekrijpt geldig
                </span>
              </div>

              <div className="flex items-center justify-center gap-4 text-[10px] text-gray-400">
                <span className="flex items-center gap-1">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-green-500">
                    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                  </svg>
                  Veilig betalen en betrouwbaar
                </span>
                <span className="flex items-center gap-1">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-green-500">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  Ondersteuning lokale initiatieven
                </span>
              </div>

              <div className="flex items-center justify-center gap-3 mt-5 pt-4 border-t border-gray-100">
                {["VISA", "Mastercard", "Apple Pay", "Google Pay", "+ meer"].map((method) => (
                  <div key={method} className="bg-gray-100 rounded px-2 py-1 text-[10px] text-gray-500 font-medium">
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-gradient-to-br from-navy-800 to-navy-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-hand text-orange-300 text-xl mb-2">Zelf ontdekken is zoveel leuker!</p>
          <h2 className="text-lg font-bold mb-2">Een stad is het begin...</h2>
          <p className="text-white/60 text-sm mb-4">Meer steden volgen snel!</p>

          <div className="flex items-center justify-center gap-3 mb-6">
            {["Leiden", "Delft", "Utrecht", "Amsterdam", "Den Haag"].map((city, i) => (
              <div key={city} className="text-center">
                <div className={`w-12 h-12 rounded-full ${i === 0 ? "bg-orange-500" : "bg-white/10"} flex items-center justify-center overflow-hidden`}>
                  {i === 0 && <span className="text-xs font-bold">Nu</span>}
                </div>
                <p className="text-[10px] mt-1 text-white/70">{city}</p>
              </div>
            ))}
          </div>

          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-colors">
            Blijf op de hoogte
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 inline-block ml-1">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
}
