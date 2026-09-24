import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { thingsToDo } from "@/data/city-pages";
import { asLocale, createDynamicMetadata, localizedUrl, SITE_URL } from "@/lib/seo";

const image = "/images/routes/10002-leiden-canal-pieterskerk.jpg";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: value } = await params;
  const locale = asLocale(value);
  return createDynamicMetadata({ locale, title: thingsToDo.title[locale], description: thingsToDo.description[locale], path: "/leiden/things-to-do", image, index: true });
}

export default async function ThingsToDoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params;
  const locale = asLocale(value);
  setRequestLocale(locale);
  const list = thingsToDo.ideas.map((idea, index) => ({ "@type": "ListItem", position: index + 1, name: idea.title[locale], url: localizedUrl(locale, idea.href) }));

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", name: thingsToDo.title[locale], description: thingsToDo.description[locale], url: localizedUrl(locale, "/leiden/things-to-do"), image: `${SITE_URL}${image}`, itemListElement: list }} />
      <header className="bg-navy-900 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <div><p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-400">Leiden</p><h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-6xl">{thingsToDo.title[locale]}</h1><p className="mt-6 text-lg leading-8 text-white/70">{thingsToDo.intro[locale]}</p></div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl"><Image src={image} alt="" fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /></div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <Breadcrumbs locale={locale} items={[{ label: "Leiden", href: "/leiden" }, { label: thingsToDo.title[locale] }]} />
        <div className="mt-10 space-y-5">
          {thingsToDo.ideas.map((idea, index) => (
            <section key={idea.href} className="rounded-3xl border border-warm-200 p-6 md:p-8">
              <p className="text-xs font-extrabold text-orange-500">0{index + 1}</p>
              <h2 className="mt-2 text-2xl font-extrabold text-navy-800">{idea.title[locale]}</h2>
              <p className="mt-3 leading-7 text-slate-600">{idea.text[locale]}</p>
              <Link href={idea.href} className="mt-5 inline-flex text-sm font-bold text-orange-600 hover:text-orange-700">{locale === "nl" ? "Meer informatie" : locale === "de" ? "Mehr Informationen" : "More information"} →</Link>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
