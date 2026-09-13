import Link from 'next/link';
import { MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#111] text-white mt-16">
      <div className="max-w-5xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        {/* Col 1: Logo + tagline */}
        <div>
          <div className="flex items-center gap-2 font-semibold text-lg mb-3">
            <MapPin className="w-4 h-4 text-amber-400" />
            YourLocalCityGuide
          </div>
          <p className="text-sm text-gray-400 mb-4">
            Sta waar geschiedenis gebeurde. Echte verhalen, geverifieerde feiten, geen toeristenkitsch.
          </p>
          <p className="text-xs text-gray-600">© 2026 YourLocalCityGuide</p>
        </div>

        {/* Col 2: Links */}
        <div>
          <h3 className="text-sm font-semibold mb-4 text-gray-300">Navigatie</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/nl/cities" className="hover:text-white transition-colors">Steden</Link></li>
            <li><Link href="/nl/about" className="hover:text-white transition-colors">Over ons</Link></li>
            <li><Link href="/nl/pricing" className="hover:text-white transition-colors">Prijzen</Link></li>
            <li><Link href="/nl/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
          </ul>
        </div>

        {/* Col 3: Newsletter */}
        <div>
          <h3 className="text-sm font-semibold mb-4 text-gray-300">Blijf op de hoogte</h3>
          <p className="text-sm text-gray-400 mb-3">Ontvang updates over nieuwe steden en routes.</p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="jouw@email.nl"
              className="flex-1 px-3 py-2 bg-white/10 border border-white/10 rounded-full text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
            <button
              type="submit"
              className="bg-amber-400 text-gray-900 px-3 py-2 rounded-full text-sm font-medium hover:bg-amber-300 transition-colors"
            >
              OK
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-600">
        Gemaakt met ❤️ in Leiden
      </div>
    </footer>
  );
}
