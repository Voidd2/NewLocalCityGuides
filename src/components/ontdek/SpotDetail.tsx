"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import dynamic from "next/dynamic";
import { Link } from "@/i18n/navigation";
import { SPOT_CATEGORIES, type LocalSpot } from "@/data/local-spots";
import { RoutePickerModal } from "@/components/routes/RoutePickerModal";
import { RichDescription } from "@/components/ui/RichDescription";

const MapLibreMap = dynamic(
  () => import("@/components/map/MapLibreMap").then((m) => m.MapLibreMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full rounded-xl bg-gray-100 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    ),
  }
);

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 text-gray-500">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-gray-400 uppercase tracking-wider font-medium">{label}</p>
        <p className="text-sm text-navy-800 font-medium mt-0.5">{value}</p>
      </div>
    </div>
  );
}

export function SpotDetail({ spot }: { spot: LocalSpot }) {
  const locale = useLocale() as "nl" | "en" | "de";
  const desc = spot.description[locale] || spot.description.nl;
  const catLabel =
    SPOT_CATEGORIES.find((c) => c.key === spot.category)?.label[locale] || spot.category;

  const [showRouteModal, setShowRouteModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const mapPins = spot.coords
    ? [{ id: spot.id, name: spot.name, category: catLabel, kind: "spot" as const, lat: spot.coords.lat, lng: spot.coords.lng }]
    : [];

  const labels = {
    nl: {
      address: "Adres",
      price: "Prijs",
      duration: "Bezoekduur",
      phone: "Telefoon",
      hours: "Openingstijden",
      kidFriendly: "Kindvriendelijk",
      yes: "Ja",
      no: "Nee",
      partly: "Gedeeltelijk",
      website: "Bezoek website",
      addToRoute: "Toevoegen aan route",
      backToAll: "Alle plekken",
      eventDates: "Evenement data",
      from: "Van",
      to: "Tot",
      addToRouteTitle: "Voeg toe aan route:",
      myRoutes: "Mijn routes",
      newRoute: "Nieuwe route maken",
      buyTickets: "Koop tickets",
    },
    en: {
      address: "Address",
      price: "Price",
      duration: "Visit duration",
      phone: "Phone",
      hours: "Opening hours",
      kidFriendly: "Kid-friendly",
      yes: "Yes",
      no: "No",
      partly: "Partly",
      website: "Visit website",
      addToRoute: "Add to route",
      backToAll: "All spots",
      eventDates: "Event dates",
      from: "From",
      to: "Until",
      addToRouteTitle: "Add to route:",
      myRoutes: "My routes",
      newRoute: "Create new route",
      buyTickets: "Buy tickets",
    },
    de: {
      address: "Adresse",
      price: "Preis",
      duration: "Besuchsdauer",
      phone: "Telefon",
      hours: "Offnungszeiten",
      kidFriendly: "Kinderfreundlich",
      yes: "Ja",
      no: "Nein",
      partly: "Teilweise",
      website: "Website besuchen",
      addToRoute: "Zur Route hinzufugen",
      backToAll: "Alle Orte",
      eventDates: "Veranstaltungsdaten",
      from: "Von",
      to: "Bis",
      addToRouteTitle: "Zur Route hinzufugen:",
      myRoutes: "Meine Routen",
      newRoute: "Neue Route erstellen",
      buyTickets: "Tickets kaufen",
    },
  };
  const l = labels[locale];

  const dayNames = {
    nl: ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"],
    en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    de: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
  };

  return (
    <div>
      {toast && (
        <div className="fixed top-20 left-4 right-4 z-[2000] flex justify-center pointer-events-none">
          <div className="pointer-events-auto px-4 py-3 rounded-xl shadow-xl text-sm font-medium flex items-center gap-2 max-w-sm bg-green-600 text-white">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 shrink-0">
              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
            </svg>
            {toast}
          </div>
        </div>
      )}

      <section className="bg-gradient-to-b from-navy-800 to-navy-900 text-white px-4 pt-6 pb-10">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/ontdek"
            className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white/90 mb-4 transition-colors"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
            </svg>
            {l.backToAll}
          </Link>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-semibold bg-orange-500/20 text-orange-300 px-2.5 py-1 rounded-full uppercase tracking-wider">
              {catLabel}
            </span>
            {spot.featured && (
              <span className="text-[10px] font-semibold bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-full uppercase tracking-wider">
                {locale === "de" ? "Empfohlen" : locale === "en" ? "Featured" : "Uitgelicht"}
              </span>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{spot.name}</h1>
          <p className="text-white/70 text-sm">{spot.address}</p>
          {spot.rating && (
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} viewBox="0 0 20 20" fill={star <= spot.rating! ? "#F59E0B" : star - 0.5 <= spot.rating! ? "url(#halfDetail)" : "#4B5563"} className="w-4 h-4">
                    <defs>
                      <linearGradient id="halfDetail">
                        <stop offset="50%" stopColor="#F59E0B" />
                        <stop offset="50%" stopColor="#4B5563" />
                      </linearGradient>
                    </defs>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-semibold text-white">{spot.rating}</span>
            </div>
          )}
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 -mt-5 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-5">
            <div className="mb-5"><RichDescription text={desc} /></div>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {spot.tags.map((tag) => (
                <span key={tag} className="text-[11px] font-medium bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            {spot.ticketUrl && (
              <a
                href={spot.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-3.5 rounded-xl transition-colors mb-3 shadow-md shadow-green-600/20"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M13 3v1.27a.75.75 0 001.5 0V3h2.75A.75.75 0 0118 3.75v3.5a.75.75 0 01-.75.75 1.5 1.5 0 000 3c.414 0 .75.336.75.75v3.5a.75.75 0 01-.75.75H3.75a.75.75 0 01-.75-.75v-3.5c0-.414.336-.75.75-.75a1.5 1.5 0 000-3 .75.75 0 01-.75-.75v-3.5A.75.75 0 013.75 3H6.5v1.27a.75.75 0 001.5 0V3h5zm-6.5 5a.75.75 0 00-1.5 0v.5a.75.75 0 001.5 0V8zm-1.5 3a.75.75 0 011.5 0v.5a.75.75 0 01-1.5 0V11zm1.5 3a.75.75 0 00-1.5 0v.5a.75.75 0 001.5 0V14z" clipRule="evenodd" />
                </svg>
                {l.buyTickets}
              </a>
            )}

            <div className="flex gap-2 mb-5">
              {spot.website && (
                <a
                  href={spot.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-navy-800 hover:bg-navy-900 text-white text-sm font-semibold py-3 rounded-xl transition-colors"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                  </svg>
                  {l.website}
                </a>
              )}
              <button
                onClick={() => setShowRouteModal(true)}
                className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-3 rounded-xl transition-colors"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
                {l.addToRoute}
              </button>
            </div>
          </div>

          <div className="border-t border-gray-100 px-5 py-2">
            <InfoRow
              icon={
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                </svg>
              }
              label={l.address}
              value={spot.address}
            />
            {spot.priceRange && (
              <InfoRow
                icon={
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M10.75 10.818v2.614A3.13 3.13 0 0011.888 13c.482-.315.612-.648.612-.875 0-.227-.13-.56-.612-.875a3.13 3.13 0 00-1.138-.432zM8.33 8.62c.053.055.115.11.184.164.208.16.46.284.736.363V6.603a2.45 2.45 0 00-.35.13c-.14.065-.27.143-.386.233-.377.292-.514.627-.514.909 0 .184.058.39.202.592.037.051.08.102.128.152z" />
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-6a.75.75 0 01.75.75v.316a3.78 3.78 0 011.653.713c.426.33.744.74.925 1.2a.75.75 0 01-1.395.55 1.35 1.35 0 00-.447-.563 2.187 2.187 0 00-.736-.363V9.3c.514.141.956.341 1.32.6.483.343.808.694.978 1.074.164.374.238.772.238 1.176 0 .527-.174 1.037-.548 1.456-.37.414-.886.713-1.489.878a.75.75 0 01-.75.75v-.316a3.78 3.78 0 01-1.653-.713 2.67 2.67 0 01-.925-1.2.75.75 0 011.395-.55c.12.3.277.508.447.563.256.121.532.196.736.363v-2.697a3.768 3.768 0 01-1.32-.6c-.483-.343-.808-.694-.978-1.074A2.555 2.555 0 017.5 7.15c0-.527.174-1.037.548-1.456.37-.414.886-.713 1.489-.878V4.75A.75.75 0 0110 4z" clipRule="evenodd" />
                  </svg>
                }
                label={l.price}
                value={`${spot.priceRange}`}
              />
            )}
            {spot.visitDuration && (
              <InfoRow
                icon={
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                  </svg>
                }
                label={l.duration}
                value={spot.visitDuration}
              />
            )}
            {spot.phone && (
              <InfoRow
                icon={
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
                  </svg>
                }
                label={l.phone}
                value={spot.phone}
              />
            )}
            <InfoRow
              icon={
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                </svg>
              }
              label={l.kidFriendly}
              value={
                spot.kidFriendly === true
                  ? l.yes
                  : spot.kidFriendly === "partly"
                  ? l.partly
                  : l.no
              }
            />
            {spot.hours && (
              <InfoRow
                icon={
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
                  </svg>
                }
                label={l.hours}
                value={spot.hours.map((h, i) => `${dayNames[locale][i]} ${h}`).join(" | ")}
              />
            )}
            {spot.eventDates && (
              <InfoRow
                icon={
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2z" clipRule="evenodd" />
                  </svg>
                }
                label={l.eventDates}
                value={`${spot.eventDates.start} - ${spot.eventDates.end}`}
              />
            )}
          </div>
        </div>

        {mapPins.length > 0 && (
          <div className="mt-6 rounded-2xl overflow-hidden shadow-md h-56 relative z-0">
            <MapLibreMap pins={mapPins} selectedId={null} onSelectPin={() => {}} />
          </div>
        )}
      </div>

      <div className="h-24" />

      {showRouteModal && (
        <RoutePickerModal
          placeId={spot.id}
          placeName={spot.name}
          onClose={() => setShowRouteModal(false)}
          onResult={setToast}
        />
      )}
    </div>
  );
}
