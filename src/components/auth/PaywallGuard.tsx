"use client";

import { Link } from "@/i18n/navigation";
import { useAuth } from "@/lib/auth-context";

export function PaywallGuard({ children }: { children: React.ReactNode }) {
  const { hasPaid, isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="animate-pulse text-gray-400">Laden...</div>
      </div>
    );
  }

  if (!isLoggedIn || !hasPaid) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center max-w-md mx-auto">
          <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-navy-800 mx-auto mb-3" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
          <h2 className="text-lg font-bold text-navy-800 mb-2">
            {!isLoggedIn ? "Log in om verder te gaan" : "Koop het Leiden pakket"}
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            {!isLoggedIn
              ? "Je hebt een account nodig om deze pagina te bekijken."
              : "Krijg toegang tot alle routes, interactieve video's en locaties in Leiden."}
          </p>
          <Link
            href={!isLoggedIn ? "/login" : "/pricing"}
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
          >
            {!isLoggedIn ? "Inloggen" : "Bekijk prijzen"}
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
