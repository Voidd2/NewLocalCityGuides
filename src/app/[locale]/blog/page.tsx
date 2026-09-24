import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { blogPosts } from "@/data/seo-content";
import { asLocale, createDynamicMetadata } from "@/lib/seo";

const copy = {
  nl: { title: "Leiden blog: routes, tips en lokale verhalen", description: "Praktische artikelen over Leiden, stadswandelingen, marktdagen, musea en lokale plekken.", eyebrow: "Plan je bezoek", intro: "Lokale kennis en praktische routes voor een dag, weekend of spontane wandeling door Leiden.", read: "Lees artikel", min: "minuten lezen" },
  en: { title: "Leiden blog: routes, tips and local stories", description: "Practical articles about Leiden, walking tours, market days, museums and local places.", eyebrow: "Plan your visit", intro: "Local knowledge and practical routes for a day trip, weekend or spontaneous walk through Leiden.", read: "Read article", min: "minute read" },
  de: { title: "Leiden Blog: Routen, Tipps und lokale Geschichten", description: "Praktische Artikel über Leiden, Stadtrundgänge, Markttage, Museen und lokale Orte.", eyebrow: "Besuch planen", intro: "Lokales Wissen und praktische Routen für einen Tag, ein Wochenende oder einen spontanen Spaziergang durch Leiden.", read: "Artikel lesen", min: "Minuten Lesezeit" },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: value } = await params;
  const locale = asLocale(value);
  return createDynamicMetadata({ locale, title: copy[locale].title, description: copy[locale].description, path: "/blog", index: true });
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params;
  const locale = asLocale(value);
  setRequestLocale(locale);
  const t = copy[locale];
  return (
    <>
      <section className="bg-navy-900 px-4 py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl animate-fade-in-up">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-400">{t.eyebrow}</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">{t.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/70 md:text-lg">{t.intro}</p>
        </div>
      </section>
      <main className="mx-auto max-w-7xl px-4 py-14 md:py-20">
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.slug} className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-xl">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  <Image src={post.image} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3 text-xs font-semibold text-orange-600"><span>{post.category[locale]}</span><span className="text-gray-400">{post.readingMinutes} {t.min}</span></div>
                  <h2 className="mt-3 text-xl font-extrabold leading-snug text-navy-800">{post.title[locale]}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{post.excerpt[locale]}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-orange-600">{t.read}<span aria-hidden="true">→</span></span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
