import Link from 'next/link';
import { MapPin, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0A0908] border-t border-[rgba(255,255,255,0.08)] mt-16">
      <div className="max-w-5xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        {/* Col 1: Logo + tagline + socials */}
        <div>
          <div className="flex items-start gap-2 mb-4">
            <MapPin className="w-4 h-4 text-[#C9A46B] mt-0.5 shrink-0" />
            <div>
              <span className="block font-bold text-[#F5F0E8] text-sm leading-tight">YourLocalCityGuide</span>
              <span className="block text-[10px] tracking-widest text-[#5A4E42] uppercase">Real Places. Real Stories.</span>
            </div>
          </div>
          <p className="text-sm text-[#8B7D6B] mb-5 leading-relaxed">
            Sta waar geschiedenis gebeurde. Echte verhalen, geverifieerde feiten, geen toeristenkitsch.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#8B7D6B] hover:text-[#C9A46B] hover:border-[#C9A46B]/40 transition-all"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#8B7D6B] hover:text-[#C9A46B] hover:border-[#C9A46B]/40 transition-all"
            >
              <span className="text-xs font-bold">f</span>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#8B7D6B] hover:text-[#C9A46B] hover:border-[#C9A46B]/40 transition-all"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Col 2: Links */}
        <div>
          <h3 className="text-xs font-semibold tracking-widest uppercase text-[#5A4E42] mb-4">Navigatie</h3>
          <ul className="space-y-3 text-sm text-[#8B7D6B]">
            <li><Link href="/nl/cities" className="hover:text-[#F5F0E8] transition-colors">Steden</Link></li>
            <li><Link href="/nl/cities/leiden/routes" className="hover:text-[#F5F0E8] transition-colors">Routes</Link></li>
            <li><Link href="/nl/about" className="hover:text-[#F5F0E8] transition-colors">Over ons</Link></li>
            <li><Link href="/nl/pricing" className="hover:text-[#F5F0E8] transition-colors">Pricing</Link></li>
            <li><Link href="/nl/privacy" className="hover:text-[#F5F0E8] transition-colors">Privacy</Link></li>
          </ul>
        </div>

        {/* Col 3: Newsletter */}
        <div>
          <h3 className="text-xs font-semibold tracking-widest uppercase text-[#5A4E42] mb-4">Nieuwsbrief</h3>
          <p className="text-sm text-[#8B7D6B] mb-4 leading-relaxed">
            Ontvang updates over nieuwe steden en routes als eerste.
          </p>
          <form className="space-y-2">
            <input
              type="email"
              placeholder="jouw@email.nl"
              className="w-full px-4 py-2.5 bg-[#1C1916] border border-[rgba(255,255,255,0.08)] rounded-xl text-sm text-[#F5F0E8] placeholder-[#5A4E42] focus:outline-none focus:border-[#C9A46B]/50"
            />
            <button
              type="submit"
              className="w-full bg-[#C9A46B] text-[#0F0E0D] px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#D4B47E] transition-colors"
            >
              Aanmelden
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-[rgba(255,255,255,0.06)] py-4 text-center text-xs text-[#5A4E42]">
        &copy; 2026 YourLocalCityGuide &middot; Gemaakt in Leiden
      </div>
    </footer>
  );
}
