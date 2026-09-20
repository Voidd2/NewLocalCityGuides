"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { locations } from "@/data/locations";

const categories = [
  { key: "all", label: "All" },
  { key: "origins", label: "History" },
  { key: "art", label: "Art" },
  { key: "science", label: "Science" },
  { key: "religion", label: "Religion" },
  { key: "trade", label: "Trade" },
];

const tabs = [
  { key: "all", label: "All" },
  { key: "nearby", label: "Nearby" },
  { key: "popular", label: "Popular" },
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
    <div>
      <div className="bg-navy-800 text-white px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto pb-1">
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
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setView("map")}
            className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
              view === "map" ? "bg-navy-800 text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            Kaart
          </button>
          <button
            onClick={() => setView("list")}
            className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
              view === "list" ? "bg-navy-800 text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            Lijst
          </button>
        </div>
      </div>

      {view === "map" ? (
        <div className="relative">
          <div className="mx-4 bg-gray-100 rounded-xl h-[60vh] flex items-center justify-center text-gray-400 text-sm mb-4">
            Kaart wordt geladen...
          </div>
          <div className="absolute bottom-8 left-4 right-4">
            {filtered.length > 0 && (
              <Link
                href={`/locations/${filtered[0].slug}`}
                className="block bg-white rounded-xl shadow-lg p-4 mx-auto max-w-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-lg bg-gray-200 shrink-0 overflow-hidden">
                    {/* image */}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-navy-800 text-sm">{filtered[0].name}</h3>
                    <p className="text-xs text-gray-500 line-clamp-1">{filtered[0].shortDescription}</p>
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
          <input
            type="text"
            placeholder="Search locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none mb-3"
          />

          <div className="space-y-2 pb-20">
            {filtered.map((loc) => (
              <Link
                key={loc.id}
                href={`/locations/${loc.slug}`}
                className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-3 hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 rounded-xl bg-gray-200 shrink-0 overflow-hidden">
                  {/* {loc.image} */}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-navy-800 text-sm">{loc.name}</h3>
                  <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{loc.shortDescription}</p>
                </div>
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-300 shrink-0">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
