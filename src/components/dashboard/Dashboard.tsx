"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { routes } from "@/data/routes";
import { locations } from "@/data/locations";

interface User {
  email: string;
  name: string;
  hasPaid: boolean;
  city: string;
}

export function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("ylcg_user");
      if (!stored) {
        router.push("/login");
        return;
      }
      setUser(JSON.parse(stored));
    } catch {
      router.push("/login");
    }
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("ylcg_user");
    router.push("/");
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-gray-400">Laden...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-navy-800">Welkom, {user.name}</h1>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Uitloggen
        </button>
      </div>

      {user.hasPaid ? (
        <>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-green-600 shrink-0">
              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm font-medium text-green-800">Leiden pakket actief</p>
              <p className="text-xs text-green-600">Volledige toegang tot alle routes, video&apos;s en locaties</p>
            </div>
          </div>

          <h2 className="text-lg font-bold text-navy-800 mb-4">Jouw routes</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {routes.slice(0, 2).map((route) => (
              <Link
                key={route.id}
                href={`/routes/${route.slug}`}
                className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow flex items-center gap-4"
              >
                <div className="w-16 h-16 rounded-lg bg-gray-200 shrink-0">
                  {/* {route.image} */}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-navy-800 text-sm">{route.title}</h3>
                  <p className="text-xs text-gray-500">{route.subtitle}</p>
                  <p className="text-xs text-gray-400 mt-1">{route.stops} stops - {route.duration} uur</p>
                </div>
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-orange-500 shrink-0">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </Link>
            ))}
          </div>

          <Link
            href="/routes/custom"
            className="block bg-orange-50 border-2 border-orange-200 rounded-xl p-4 mb-8 hover:bg-orange-100 transition-colors"
          >
            <h3 className="font-bold text-orange-600 mb-1">Maak je eigen route</h3>
            <p className="text-sm text-gray-600">Kies je eigen stops en wij plannen de slimste volgorde</p>
          </Link>

          <h2 className="text-lg font-bold text-navy-800 mb-4">Alle locaties</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {locations.map((loc) => (
              <div
                key={loc.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <div className="h-24 bg-gray-200">
                  {/* {loc.image} */}
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-navy-800 text-xs leading-tight">{loc.name}</h4>
                  <p className="text-[10px] text-gray-500 mt-1 line-clamp-2">{loc.shortDescription}</p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="inline-block bg-orange-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                      Video
                    </span>
                    <span className="inline-block bg-navy-800 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                      Verhaal
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-6 text-center">
            <h2 className="text-lg font-bold text-navy-800 mb-2">Je hebt nog geen pakket</h2>
            <p className="text-sm text-gray-600 mb-4">
              Koop het Leiden pakket om toegang te krijgen tot alle routes, video&apos;s en verborgen parels.
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm"
            >
              Bekijk het Leiden pakket
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

          <h2 className="text-lg font-bold text-navy-800 mb-4">Routes (preview)</h2>
          <div className="space-y-3 mb-8">
            {routes.slice(0, 2).map((route) => (
              <div key={route.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4 opacity-60">
                <div className="w-16 h-16 rounded-lg bg-gray-200 shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-navy-800 text-sm">{route.title}</h3>
                  <p className="text-xs text-gray-500">{route.subtitle}</p>
                </div>
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-300 shrink-0">
                  <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                </svg>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
