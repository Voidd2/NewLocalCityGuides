import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { blogPosts, getBlogPost } from "@/data/seo-content";
import { getSchaapsvishandelUrl } from "@/data/external-sites";
import { locales } from "@/i18n/config";
import { asLocale, createDynamicMetadata, localizedUrl, SITE_NAME, SITE_URL } from "@/lib/seo";

export function generateStaticParams() {
  return locales.flatMap((locale) => blogPosts.map((post) => ({ locale, slug: post.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: value, slug } = await params;
  const locale = asLocale(value);
  const post = getBlogPost(slug);
  if (!post) return {};
  return createDynamicMetadata({ locale, title: post.title[locale], description: post.description[locale], path: `/blog/${slug}`, image: post.image, index: true });
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: value, slug } = await params;
  const locale = asLocale(value);
  setRequestLocale(locale);
  const post = getBlogPost(slug);
  if (!post) notFound();
  const labels = locale === "nl"
    ? { back: "Alle artikelen", min: "minuten lezen", updated: "Bijgewerkt", faq: "Veelgestelde vragen", sources: "Controleer actuele informatie" }
    : locale === "de"
      ? { back: "Alle Artikel", min: "Minuten Lesezeit", updated: "Aktualisiert", faq: "Häufig gestellte Fragen", sources: "Aktuelle Informationen prüfen" }
      : { back: "All articles", min: "minute read", updated: "Updated", faq: "Frequently asked questions", sources: "Check current information" };
  const url = localizedUrl(locale, `/blog/${post.slug}`);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title[locale], description: post.description[locale], image: `${SITE_URL}${post.image}`, datePublished: post.publishedAt, dateModified: post.updatedAt, inLanguage: locale, mainEntityOfPage: url, author: { "@type": "Organization", name: SITE_NAME }, publisher: { "@type": "Organization", name: SITE_NAME } }} />
      {post.faq && <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: post.faq.map((item) => ({ "@type": "Question", name: item.question[locale], acceptedAnswer: { "@type": "Answer", text: item.answer[locale] } })) }} />}
      <article>
        <header className="bg-navy-900 px-4 py-10 text-white md:py-16">
          <div className="mx-auto max-w-4xl">
            <Link href="/blog" className="text-sm font-semibold text-orange-400 hover:text-orange-300">← {labels.back}</Link>
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-orange-400">{post.category[locale]}</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight md:text-6xl">{post.title[locale]}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">{post.excerpt[locale]}</p>
            <p className="mt-5 text-xs text-white/50">{post.readingMinutes} {labels.min} · {labels.updated} {new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(new Date(post.updatedAt))}</p>
          </div>
        </header>
        <div className="relative mx-auto -mt-1 aspect-[21/9] max-w-6xl overflow-hidden md:rounded-b-3xl">
          <Image src={post.image} alt="" fill priority sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" />
        </div>
        <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
          <Breadcrumbs locale={locale} items={[{ label: labels.back, href: "/blog" }, { label: post.title[locale] }]} />
          {post.sections.map((section, index) => (
            <section key={section.heading[locale]} className={index ? "mt-12" : "mt-10"}>
              <h2 className="text-2xl font-extrabold text-navy-800 md:text-3xl">{section.heading[locale]}</h2>
              <div className="mt-5 space-y-5 text-base leading-8 text-slate-600">{section.paragraphs[locale].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
              {section.bullets && <ul className="mt-6 space-y-3 rounded-2xl bg-orange-50 p-5">{section.bullets[locale].map((item) => <li key={item} className="flex gap-3 text-sm font-semibold text-navy-800"><span className="text-orange-500">✓</span>{item}</li>)}</ul>}
            </section>
          ))}
          {post.slug === "leiden-market-days-schaapsvishandel" && (
            <aside className="mt-12 rounded-3xl bg-orange-50 p-6 md:p-8">
              <h2 className="text-2xl font-extrabold text-navy-800">Schaapsvishandel Leiden</h2>
              <p className="mt-3 leading-7 text-slate-600">{locale === "nl" ? "Bekijk de winkel- en marktlocaties bij elkaar, inclusief de juiste plek voor woensdag, zaterdag en de overige dagen." : locale === "de" ? "Sieh dir Geschäft und Marktstandorte zusammen an – mit dem passenden Ort für Mittwoch, Samstag und die übrigen Tage." : "See the shop and market locations together, including the right place for Wednesday, Saturday and all other days."}</p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link href="/leiden/schaapsvishandel" className="inline-flex justify-center rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white hover:bg-orange-600">{locale === "nl" ? "Bekijk locaties en bezoekinformatie" : locale === "de" ? "Standorte und Besuchsinformationen" : "View locations and visitor information"}</Link>
                <a href={getSchaapsvishandelUrl(locale)} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 rounded-full border border-navy-800 px-5 py-3 text-sm font-bold text-navy-800 hover:bg-white">
                  {locale === "nl" ? "Officiële website Schaapsvishandel" : locale === "de" ? "Offizielle Website von Schaapsvishandel" : "Official Schaapsvishandel website"}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </aside>
          )}
          {post.faq && (
            <section className="mt-12 rounded-3xl bg-navy-900 p-6 text-white md:p-8">
              <h2 className="text-2xl font-extrabold md:text-3xl">{labels.faq}</h2>
              <div className="mt-6 space-y-6">
                {post.faq.map((item) => (
                  <div key={item.question[locale]}>
                    <h3 className="font-extrabold text-orange-300">{item.question[locale]}</h3>
                    <p className="mt-2 leading-7 text-white/75">{item.answer[locale]}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
          {post.sources && (
            <aside className="mt-8 rounded-2xl border border-warm-200 bg-warm-50 p-5">
              <h2 className="font-extrabold text-navy-800">{labels.sources}</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {post.sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-600 underline underline-offset-4 hover:text-orange-700">
                      {source.label[locale]} <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          )}
          <div className="mt-14 flex flex-col gap-3 border-t border-warm-200 pt-8 sm:flex-row">
            <Link href="/city-guide-leiden" className="rounded-full bg-navy-800 px-5 py-3 text-center text-sm font-bold text-white hover:bg-navy-900">City guide Leiden</Link>
            <Link href="/leiden-tours" className="rounded-full bg-orange-500 px-5 py-3 text-center text-sm font-bold text-white hover:bg-orange-600">Leiden tours</Link>
          </div>
          <section className="mt-12 border-t border-warm-200 pt-8">
            <h2 className="text-2xl font-extrabold text-navy-800">{locale === "nl" ? "Lees ook" : locale === "de" ? "Auch lesen" : "Read next"}</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2).map((item) => (
                <Link key={item.slug} href={`/blog/${item.slug}`} className="rounded-2xl border border-warm-200 p-5 font-bold text-navy-800 hover:border-orange-300 hover:text-orange-600">{item.title[locale]}</Link>
              ))}
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
