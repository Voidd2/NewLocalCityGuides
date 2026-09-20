"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { locations } from "@/data/locations";

const categories = [
  { key: "all", label: "Alles" },
  { key: "origins", label: "Geschiedenis" },
  { key: "art", label: "Kunst" },
  { key: "science", label: "Wetenschap" },
  { key: "religion", label: "Religie" },
  { key: "trade", label: "Handel" },
];

const tabs = [
  { key: "all", label: "Alles" },
  { key: "nearby", label: "Dichtbij" },
  { key: "popular", label: "Populair" },
];

export function MapPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [view, setView] = useState<"map" | "list">("list");
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = locations
    .filter((l) => activeCategory === "all" || l.categories.includes(activeCategory))
    .filter((l) => !searchQuery || l.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="pb-20">
      <div className="bg-navy-800 text-white px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`text-xs font-medium px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                activeCategory === cat.key
                  ? "bg-white text-navy-800"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex gap-1">
          {view === "list" && tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === tab.key ? "bg-navy-800 text-white" : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
          {view === "map" && (
            <span className="text-xs text-gray-500 py-1.5">
              {filtered.length} locatie{filtered.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
        <div className="flex gap-1.5 bg-gray-100 rounded-lg p-0.5">
          <button
            onClick={() => setView("map")}
            className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
              view === "map" ? "bg-white text-navy-800 shadow-sm" : "text-gray-500"
            }`}
          >
            Kaart
          </button>
          <button
            onClick={() => setView("list")}
            className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
              view === "list" ? "bg-white text-navy-800 shadow-sm" : "text-gray-500"
            }`}
          >
            Lijst
          </button>
        </div>
      </div>

      {view === "map" ? (
        <div className="relative">
          <div className="mx-4 bg-gray-100 rounded-xl h-[60vh] flex items-center justify-center text-gray-400 text-sm mb-4">
            <div className="text-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-gray-300 mx-auto mb-2" stroke="currentColor" strokeWidth="1.5">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                <line x1="8" y1="2" x2="8" y2="18" />
                <line x1="16" y1="6" x2="16" y2="22" />
              </svg>
              <p>Kaart wordt geladen...</p>
            </div>
          </div>
          <div className="absolute bottom-8 left-4 right-4">
            {filtered.length > 0 && (
              <Link
                href={`/locations/${filtered[0].slug}`}
                className="block bg-white rounded-xl shadow-lg p-4 mx-auto max-w-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-lg bg-gray-200 shrink-0 overflow-hidden">
                    {filtered[0].image && (
                      <img src={filtered[0].image} alt={filtered[0].name} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-navy-800 text-sm">{filtered[0].name}</h3>
                    <p className="text-xs text-gray-500 line-clamp-1">{filtered[0].shortDescription}</p>
                    <span className="text-[10px] text-orange-500 font-medium mt-0.5 inline-block">{filtered[0].mainTheme}</span>
                  </div>
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-300 shrink-0">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </div>
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative mb-3">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2">
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
            </svg>
            <input
              type="text"
              placeholder="Zoek locaties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            )}
          </div>

          <p className="text-xs text-gray-400 mb-2">
            {filtered.length} locatie{filtered.length !== 1 ? "s" : ""} gevonden
          </p>

          <div className="space-y-2 pb-4">
            {filtered.map((loc) => (
              <Link
                key={loc.id}
                href={`/locations/${loc.slug}`}
                className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-3 hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 rounded-xl bg-gray-200 shrink-0 overflow-hidden">
                  {loc.image && (
                    <img src={loc.image} alt={loc.name} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-navy-800 text-sm">{loc.name}</h3>
                  <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{loc.shortDescription}</p>
                  <span className="text-[10px] text-orange-500 font-medium mt-0.5 inline-block">{loc.mainTheme}</span>
                </div>
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-300 shrink-0">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </Link>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-12">
                <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-gray-300 mx-auto mb-3" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                <p className="text-sm text-gray-500">Geen locaties gevonden</p>
                <button
                  onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                  className="text-sm text-orange-500 font-medium mt-2 hover:text-orange-600"
                >
                  Filters wissen
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
