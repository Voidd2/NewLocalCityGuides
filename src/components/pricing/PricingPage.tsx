"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { LEIDEN_GUIDE, formatGuidePrice } from "@/lib/product";

export function PricingPage() {
  const t = useTranslations("pricing");
  const locale = useLocale();
  const [extraDevices, setExtraDevices] = useState(0);

  const pricePerDevice = LEIDEN_GUIDE.extraDevicePriceCents;
  const total = LEIDEN_GUIDE.basePriceCents + extraDevices * pricePerDevice;

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_380px] gap-8">
          <div>
            <h1 className="text-2xl font-bold text-navy-800 mb-1">{t("completeAdventure")}</h1>
            <p className="text-sm text-gray-500 mb-6">{t("directAccess")}</p>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-bold text-navy-800">{t("leidenPackage")}</h2>
                <span className="text-2xl font-extrabold text-orange-500">{formatGuidePrice(locale)}</span>
              </div>
              <p className="text-xs text-gray-500 mb-4">{t("onePersonFullAccess")}</p>

              <ul className="space-y-1.5 text-sm text-gray-700">
                {[
                  t("allRoutesInLeiden"),
                  t("createOwnRouteIncluded"),
                  t("hiddenGemsAndTips"),
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
                <span className="bg-orange-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">+</span>
                <h3 className="font-bold text-navy-800">{t("extraDevicesTitle")}</h3>
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-400">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-xs text-gray-500 mb-4 ml-8">{t("extraDevicesDesc")}</p>

              <div className="flex flex-wrap gap-4 items-center justify-between sm:ml-8">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setExtraDevices(Math.max(0, extraDevices - 1))}
                    aria-label={t("extraDevicesLabel") + " −1"}
                    className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="text-xl font-bold text-navy-800 w-8 text-center">{extraDevices}</span>
                  <button
                    onClick={() => setExtraDevices(extraDevices + 1)}
                    aria-label={t("extraDevicesLabel") + " +1"}
                    className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-500">{t("extraDevicesLabel")}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-navy-800">{formatGuidePrice(locale, extraDevices * pricePerDevice)}</p>
                  <p className="text-[10px] text-gray-400">{formatGuidePrice(locale, pricePerDevice)} {t("perDevice")}</p>
                </div>
              </div>

              <p className="text-xs text-gray-400 ml-8 mt-3 flex items-center gap-1">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-blue-500">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                </svg>
                {t("multiDeviceHint")}
              </p>
            </div>
          </div>

          <div className="md:sticky md:top-20 self-start">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                <span className="font-bold text-navy-800">{t("total")}</span>
                <span className="text-3xl font-extrabold text-navy-800">{formatGuidePrice(locale, total)}</span>
              </div>

              <p className="mb-4 rounded-xl border border-orange-200 bg-orange-50 p-4 text-sm leading-6 text-navy-800" role="status">{t("checkoutUnavailable")}</p>

            </div>
          </div>
        </div>
      </div>

      <section className="bg-gradient-to-br from-navy-800 to-navy-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-hand text-orange-300 text-xl mb-2">{t("selfDiscoverFun")}</p>
          <h2 className="text-lg font-bold mb-2">{t("discoverMoreNL")}</h2>
          <p className="text-white/60 text-sm mb-4">{t("startInLeiden")}</p>

          <div className="flex items-center justify-center gap-3 mb-6">
            {["Leiden", "Delft", "Utrecht", "Amsterdam", "Den Haag"].map((city, i) => (
              <div key={city} className="text-center">
                <div className={`w-12 h-12 rounded-full ${i === 0 ? "bg-orange-500" : "bg-white/10"} flex items-center justify-center overflow-hidden`}>
                  {i === 0 && <span className="text-xs font-bold">{t("now")}</span>}
                </div>
                <p className="text-[10px] mt-1 text-white/70">{city}</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-white/50 italic">{t("comingSoon")}</p>
        </div>
      </section>
    </div>
  );
}
