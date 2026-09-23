import { setRequestLocale } from "next-intl/server";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return createPageMetadata(locale, "terms", "/terms", { index: false });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-navy-800 mb-6">Gebruiksvoorwaarden</h1>

        <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
          <p>
            Door gebruik te maken van YourLocalCityGuide ga je akkoord met deze gebruiksvoorwaarden.
          </p>

          <h2 className="text-lg font-bold text-navy-800 mt-6">Toegang en gebruik</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Na aankoop van een stadspakket krijg je levenslange toegang tot de bijbehorende content</li>
            <li>Je account is persoonlijk en mag niet worden gedeeld met anderen</li>
            <li>Extra devices kunnen worden toegevoegd aan je account voor mede-reizigers</li>
          </ul>

          <h2 className="text-lg font-bold text-navy-800 mt-6">Content</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Alle content (teksten, video&apos;s, afbeeldingen) is eigendom van YourLocalCityGuide</li>
            <li>Het is niet toegestaan content te kopiëren, verspreiden of commercieel te gebruiken</li>
            <li>Video&apos;s kunnen AI-geassisteerde reconstructies bevatten ter illustratie</li>
          </ul>

          <h2 className="text-lg font-bold text-navy-800 mt-6">Betalingen</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Prijzen zijn inclusief BTW</li>
            <li>Betaling is eenmalig, er zijn geen terugkerende kosten</li>
            <li>Restitutie is mogelijk binnen 14 dagen na aankoop als je de content niet hebt gebruikt</li>
          </ul>

          <h2 className="text-lg font-bold text-navy-800 mt-6">Aansprakelijkheid</h2>
          <p>
            YourLocalCityGuide is niet aansprakelijk voor schade die voortvloeit uit het gebruik van onze dienst. Routes en locatie-informatie zijn informatief; gebruik je eigen oordeel bij het bezoeken van locaties.
          </p>

          <h2 className="text-lg font-bold text-navy-800 mt-6">Contact</h2>
          <p>
            Vragen over deze voorwaarden? Neem contact met ons op via{" "}
            <a href="mailto:info@yourlocalcityguide.com" className="text-orange-500 hover:text-orange-600">
              info@yourlocalcityguide.com
            </a>
          </p>

          <p className="text-xs text-gray-400 mt-8">Laatst bijgewerkt: september 2026</p>
        </div>
      </div>
    </>
  );
}
