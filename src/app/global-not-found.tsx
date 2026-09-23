import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pagina niet gevonden | YourLocalCityGuide",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="nl">
      <body className="bg-warm-50">
        <main className="flex min-h-screen items-center justify-center px-4 py-12 text-center">
          <div className="max-w-lg">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-3xl font-extrabold text-orange-500">404</div>
            <h1 className="mb-3 text-3xl font-extrabold text-navy-800">Deze route bestaat niet</h1>
            <p className="mb-8 text-gray-500">Page not found. Seite nicht gefunden.</p>
            <Link href="/nl" className="inline-block rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600">
              Terug naar home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
