import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { publicEntities, publicEntityPath, type PublicEntitySection } from "@/data/public-entities";
import { asLocale, createDynamicMetadata, localizedUrl } from "@/lib/seo";
import type { Locale } from "@/i18n/config";

const copy = {
  nl: {
    title: "Plekken in Leiden: musea, historie en lokale favorieten",
    description: "Ontdek musea, historische plekken, markten en lokale adressen in Leiden. Elke plek heeft een gratis introductie en praktische informatie.",
    eyebrow: "Ontdek Leiden per plek",
    intro: "Bekijk wat bij jouw dag past. Iedere pagina geeft een korte gratis introductie; members krijgen bij geselecteerde plekken ook het volledige verhaal, video en routebegeleiding.",
    sections: { museums: "Musea", attractions: "Historische plekken", markets: "Markten", local: "Lokale favorieten" },
    read: "Bekijk deze plek",
  },
  en: {
    title: "Places in Leiden: museums, history and local favourites",
    description: "Discover museums, historic places, markets and local addresses in Leiden. Every place includes a free introduction and practical information.",
    eyebrow: "Explore Leiden place by place",
    intro: "Find the places that suit your day. Every page offers a concise free introduction; members also unlock complete stories, video and route guidance at selected stops.",
    sections: { museums: "Museums", attractions: "Historic places", markets: "Markets", local: "Local favourites" },
    read: "View this place",
  },
  de: {
    title: "Orte in Leiden: Museen, Geschichte und lokale Favoriten",
    description: "Entdecke Museen, historische Orte, Märkte und lokale Adressen in Leiden. Jeder Ort bietet eine kostenlose Einführung und praktische Informationen.",
    eyebrow: "Leiden Ort für Ort entdecken",
    intro: "Finde die Orte, die zu deinem Tag passen. Jede Seite bietet eine kurze kostenlose Einführung; Members erhalten an ausgewählten Stopps auch vollständige Geschichten, Videos und Routenbegleitung.",
    sections: { museums: "Museen", attractions: "Historische Orte", markets: "Märkte", local: "Lokale Favoriten" },
    read: "Diesen Ort ansehen",
  },
} satisfies Record<Locale, {
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  sections: Record<PublicEntitySection, string>;
  read: string;
}>;

const sections: PublicEntitySection[] = ["attractions", "museums", "markets", "local"];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeValue } = await params;
  const locale = asLocale(localeValue);
  return createDynamicMetadata({ locale, ...copy[locale], path: "/leiden/places", index: true });
}

export default async function LeidenPlacesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeValue } = await params;
  setRequestLocale(localeValue);
  const locale = asLocale(localeValue);
  const text = copy[locale];
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: text.title,
    itemListElement: publicEntities.map((entity, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entity.name,
      url: localizedUrl(locale, publicEntityPath(entity)),
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <header className="bg-navy-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <Breadcrumbs locale={locale} className="!text-white/70" items={[{ label: "Leiden", href: "/leiden" }, { label: text.title }]} />
          <p className="mt-9 text-xs font-bold uppercase tracking-[0.2em] text-orange-300">{text.eyebrow}</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">{text.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/75 md:text-lg">{text.intro}</p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-16 px-4 py-12 md:py-16">
        {sections.map((section) => {
          const entities = publicEntities.filter((entity) => entity.section === section);
          if (entities.length === 0) return null;
          return (
            <section key={section}>
              <div className="flex items-end justify-between gap-4 border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-extrabold text-navy-800 md:text-3xl">{text.sections[section]}</h2>
                <span className="text-sm font-semibold text-gray-400">{entities.length}</span>
              </div>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {entities.map((entity) => (
                  <Link key={entity.key} href={publicEntityPath(entity)} className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-lg">
                    <div className="relative h-44 bg-gray-100">
                      {entity.image ? <Image src={entity.image} alt={entity.name} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" /> : <div className="h-full bg-gradient-to-br from-navy-800 to-navy-950" />}
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-navy-800">{entity.name}</h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-500">{entity.intro[locale]}</p>
                      <span className="mt-4 inline-flex text-sm font-bold text-orange-600">{text.read} <span className="ml-1" aria-hidden="true">→</span></span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </>
  );
}
