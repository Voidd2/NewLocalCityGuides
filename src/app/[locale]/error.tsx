"use client";

import { useEffect } from "react";
import { Link } from "@/i18n/navigation";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 min-h-[60vh] flex flex-col items-center justify-center text-center">
      <p className="text-sm font-bold text-orange-500 mb-2">Oeps</p>
      <h1 className="text-2xl font-bold text-navy-800 mb-2">Er ging iets mis</h1>
      <p className="text-sm text-gray-500 mb-6 max-w-md">
        Er is een onverwachte fout opgetreden. Probeer het opnieuw, of ga terug naar de
        homepage.
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={() => retry()}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
        >
          Probeer opnieuw
        </button>
        <Link
          href="/"
          className="border-2 border-gray-200 text-navy-800 hover:bg-gray-50 font-semibold px-6 py-3 rounded-full text-sm transition-colors"
        >
          Homepage
        </Link>
      </div>
    </div>
  );
}
