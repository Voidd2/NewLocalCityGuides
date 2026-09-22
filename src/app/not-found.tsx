import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pagina niet gevonden",
  description: "De pagina die je zoekt bestaat niet.",
};

export default function GlobalNotFound() {
  return (
    <html lang="nl">
      <body className="bg-warm-50">
        <div className="min-h-screen flex items-center justify-center px-4 py-16">
          <div className="text-center max-w-md">
            <p className="font-hand text-5xl text-orange-500 mb-2">404</p>
            <h1 className="text-2xl font-bold text-navy-800 mb-3">
              Deze plek bestaat niet (nog niet)
            </h1>
            <p className="text-gray-600 mb-8">
              De pagina die je zoekt is verplaatst, verwijderd, of nooit gemaakt.
              Ontdek in plaats daarvan wat Leiden wel te bieden heeft.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/nl"
                className="inline-flex items-center justify-center rounded-full bg-navy-800 px-6 py-3 text-sm font-medium text-white hover:bg-navy-800/90 transition-colors"
              >
                Terug naar home
              </Link>
              <Link
                href="/nl/routes"
                className="inline-flex items-center justify-center rounded-full border border-navy-800/20 px-6 py-3 text-sm font-medium text-navy-800 hover:bg-navy-800/5 transition-colors"
              >
                Bekijk routes
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
