"use client";

import { useEffect } from "react";
import "./globals.css";

export default function GlobalError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="nl">
      <body className="bg-warm-50">
        <main className="flex min-h-screen items-center justify-center px-4 py-12 text-center">
          <div className="max-w-lg">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-3xl font-extrabold text-orange-500">500</div>
            <h1 className="mb-3 text-3xl font-extrabold text-navy-800">Er ging iets mis</h1>
            <p className="mb-8 text-gray-500">Something went wrong. Etwas ist schiefgegangen.</p>
            <button onClick={retry} className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600">
              Opnieuw proberen
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
