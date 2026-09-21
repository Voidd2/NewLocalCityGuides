"use client";

import { useEffect } from "react";
import "./globals.css";

export default function GlobalError({
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
    <html lang="nl">
      <body className="min-h-screen bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center text-center">
          <p className="text-sm font-bold text-orange-500 mb-2">Oeps</p>
          <h1 className="text-2xl font-bold text-navy-800 mb-2">Er ging iets mis</h1>
          <p className="text-sm text-gray-500 mb-6 max-w-md">
            De applicatie kon niet worden geladen. Probeer het opnieuw.
          </p>
          <button
            onClick={() => retry()}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
          >
            Probeer opnieuw
          </button>
        </div>
      </body>
    </html>
  );
}
