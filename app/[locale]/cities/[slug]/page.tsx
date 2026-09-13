import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MapPin, Route } from 'lucide-react';

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
    <main className="min-h-screen pt-14">
      <div className="bg-amber-50 border-b border-amber-100 py-16 px-4 text-center">
        <div className="inline-flex items-center gap-2 text-amber-700 text-sm font-medium mb-4">
          <MapPin className="w-4 h-4" /> Nederland
        </div>
        <h1 className="text-3xl font-bold mb-2">Leiden</h1>
        <p className="text-gray-600 max-w-md mx-auto text-sm">
          Geboortestad van Rembrandt. Thuisbasis van de Pilgrimvaders. Sta waar geschiedenis gebeurde.
        </p>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
          <Route className="w-8 h-8 text-blue-500 mx-auto mb-3" />
          <h2 className="font-semibold text-blue-900 mb-1">Routes komen eraan</h2>
          <p className="text-sm text-blue-700 mb-4">We verifiëren de beste locaties in Leiden. Meld je aan voor vroege toegang.</p>
          <form className="flex gap-2 max-w-sm mx-auto">
            <input type="email" placeholder="jouw@email.nl" className="flex-1 px-3 py-2 border border-blue-200 rounded-full text-sm focus:outline-none bg-white" />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">Aanmelden</button>
          </form>
        </div>
      </div>
    </main>
  );
}
