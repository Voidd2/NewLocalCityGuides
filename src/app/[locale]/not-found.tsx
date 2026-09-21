import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 min-h-[60vh] flex flex-col items-center justify-center text-center">
      <p className="text-sm font-bold text-orange-500 mb-2">404</p>
      <h1 className="text-2xl font-bold text-navy-800 mb-2">Pagina niet gevonden</h1>
      <p className="text-sm text-gray-500 mb-6 max-w-md">
        Deze pagina bestaat niet (meer). Misschien is de link verouderd, of klopt de locatie
        of route niet helemaal.
      </p>
      <Link
        href="/"
        className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
      >
        Terug naar de homepage
      </Link>
    </div>
  );
}
