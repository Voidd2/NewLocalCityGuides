import { setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/layout/Footer";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-navy-800 mb-6">Privacybeleid</h1>

        <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
          <p>
            YourLocalCityGuide respecteert je privacy. Dit privacybeleid beschrijft welke gegevens wij verzamelen en hoe wij hiermee omgaan.
          </p>

          <h2 className="text-lg font-bold text-navy-800 mt-6">Welke gegevens verzamelen wij?</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>E-mailadres en naam bij het aanmaken van een account</li>
            <li>Betalingsgegevens via onze betalingsprovider (wij slaan geen creditcardgegevens op)</li>
            <li>Gebruiksgegevens zoals bezochte pagina&apos;s en routes</li>
          </ul>

          <h2 className="text-lg font-bold text-navy-800 mt-6">Waarvoor gebruiken wij je gegevens?</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Om je account te beheren en toegang te verlenen tot gekochte content</li>
            <li>Om onze dienst te verbeteren</li>
            <li>Om je te informeren over updates en nieuwe routes (alleen met toestemming)</li>
          </ul>

          <h2 className="text-lg font-bold text-navy-800 mt-6">Delen met derden</h2>
          <p>
            Wij delen je gegevens niet met derden, behalve waar nodig voor de betalingsverwerking of wanneer wij wettelijk verplicht zijn.
          </p>

          <h2 className="text-lg font-bold text-navy-800 mt-6">Contact</h2>
          <p>
            Vragen over dit privacybeleid? Neem contact met ons op via{" "}
            <a href="mailto:info@yourlocalcityguide.com" className="text-orange-500 hover:text-orange-600">
              info@yourlocalcityguide.com
            </a>
          </p>

          <p className="text-xs text-gray-400 mt-8">Laatst bijgewerkt: september 2026</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
