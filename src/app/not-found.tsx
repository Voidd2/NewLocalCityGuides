import Link from "next/link";
import { defaultLocale } from "@/i18n/config";

export default function RootNotFound() {
  return (
    <html lang={defaultLocale}>
      <body className="min-h-screen bg-warm-50 flex items-center justify-center px-4 py-16">
        <div className="max-w-md text-center">
          <p className="text-6xl font-bold text-orange-500 mb-2">404</p>
          <h1 className="text-2xl font-bold text-navy-800 mb-3">
            Deze pagina bestaat niet
          </h1>
          <p className="text-gray-500 mb-8">
            De pagina die je zoekt is verplaatst, verwijderd of heeft nooit
            bestaan.
          </p>
          <Link
            href={`/${defaultLocale}`}
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition-colors"
          >
            Terug naar home
          </Link>
        </div>
      </body>
    </html>
  );
}
