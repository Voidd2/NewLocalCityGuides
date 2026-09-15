import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MapPin, Route } from 'lucide-react';

// Cities with a full, dedicated route (e.g. `cities/leiden/page.tsx`) are
// served by that static route instead of this dynamic fallback — Next.js
// prefers the static segment. This page only ever renders for cities that
// have been announced but don't have a dedicated page yet.
const SUPPORTED = ['leiden'];

interface Props { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!SUPPORTED.includes(slug)) return {};
  return { title: 'Leiden', description: 'Ontdek Leiden via een gratis audio wandeltour.' };
}

export default async function CityPage({ params }: Props) {
  const { slug } = await params;
  if (!SUPPORTED.includes(slug)) notFound();
  return (
    <main className="min-h-screen bg-[#0F0E0D] pt-14">
      <div className="bg-[#1C1916] border-b border-[rgba(255,255,255,0.08)] py-16 px-4 text-center">
        <div className="inline-flex items-center gap-2 text-[#C9A46B] text-sm font-medium mb-4">
          <MapPin className="w-4 h-4" /> Nederland
        </div>
        <h1 className="text-3xl font-bold text-[#F5F0E8] mb-2">Leiden</h1>
        <p className="text-[#8B7D6B] max-w-md mx-auto text-sm">
          Geboortestad van Rembrandt. Thuisbasis van de Pilgrimvaders. Sta waar geschiedenis gebeurde.
        </p>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-[#1C1916] border border-[rgba(255,255,255,0.08)] rounded-xl p-8 text-center">
          <Route className="w-8 h-8 text-[#C9A46B] mx-auto mb-3" />
          <h2 className="font-semibold text-[#F5F0E8] mb-1">Routes komen eraan</h2>
          <p className="text-sm text-[#8B7D6B] mb-4">We verifiëren de beste locaties in Leiden. Meld je aan voor vroege toegang.</p>
          <form className="flex gap-2 max-w-sm mx-auto">
            <input type="email" placeholder="jouw@email.nl" className="flex-1 px-3 py-2 border border-[rgba(255,255,255,0.12)] rounded-full text-sm text-[#F5F0E8] placeholder:text-[#5A4E42] focus:outline-none focus:border-[#C9A46B]/50 bg-[#0F0E0D]" />
            <button className="bg-[#C9A46B] text-[#0F0E0D] px-4 py-2 rounded-full text-sm font-bold hover:bg-[#D4B47E] transition-colors">Aanmelden</button>
          </form>
        </div>
      </div>
    </main>
  );
}
