import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/config";
import type { SeoLanding } from "@/data/seo-content";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export function SeoLandingPage({ page, locale }: { page: SeoLanding; locale: Locale }) {
  return (
    <>
      <section className="relative min-h-[460px] overflow-hidden bg-navy-900 text-white">
        <Image src={page.image} alt="" fill priority sizes="100vw" className="object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/85 to-navy-900/30" />
        <div className="relative mx-auto flex min-h-[460px] max-w-7xl items-center px-4 py-16">
          <div className="max-w-3xl animate-fade-in-up">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-orange-400">{page.eyebrow[locale]}</p>
            <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">{page.title[locale]}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 md:text-lg">{page.intro[locale]}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={page.primaryHref} className="rounded-full bg-orange-500 px-6 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-colors hover:bg-orange-600">
                {page.primaryCta[locale]}
              </Link>
              <Link href={page.secondaryHref} className="rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-center text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/20">
                {page.secondaryCta[locale]}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-4 py-14 md:py-20">
        <Breadcrumbs locale={locale} items={[{ label: "Leiden", href: "/leiden" }, { label: page.title[locale] }]} />
        {page.sections.map((section, index) => (
          <section key={section.heading[locale]} className={index === 0 ? "mt-10" : "mt-14 border-t border-warm-200 pt-14"}>
            <h2 className="text-2xl font-extrabold text-navy-800 md:text-3xl">{section.heading[locale]}</h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-slate-600">
              {section.paragraphs[locale].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            {section.bullets && (
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {section.bullets[locale].map((item) => (
                  <li key={item} className="flex gap-3 rounded-2xl bg-orange-50 p-4 text-sm font-semibold text-navy-800">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500 text-xs text-white">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <section className="mt-16 rounded-3xl bg-navy-900 p-6 text-white md:p-10">
          <h2 className="text-2xl font-extrabold">{locale === "nl" ? "Veelgestelde vragen" : locale === "de" ? "Häufige Fragen" : "Frequently asked questions"}</h2>
          <div className="mt-6 divide-y divide-white/10">
            {page.faq.map((item) => (
              <details key={item.question[locale]} className="group py-5">
                <summary className="cursor-pointer list-none pr-8 font-bold text-white marker:hidden">{item.question[locale]}</summary>
                <p className="mt-3 text-sm leading-7 text-white/70">{item.answer[locale]}</p>
              </details>
            ))}
          </div>
        </section>

        <nav aria-label={locale === "nl" ? "Meer over Leiden" : locale === "de" ? "Mehr über Leiden" : "More about Leiden"} className="mt-10 grid gap-3 sm:grid-cols-3">
          <Link href="/leiden" className="rounded-2xl border border-warm-200 p-4 text-center text-sm font-bold text-navy-800 hover:border-orange-300">Leiden</Link>
          <Link href="/leiden/things-to-do" className="rounded-2xl border border-warm-200 p-4 text-center text-sm font-bold text-navy-800 hover:border-orange-300">{locale === "nl" ? "Wat te doen" : locale === "de" ? "Aktivitäten" : "Things to do"}</Link>
          <Link href="/leiden/schaapsvishandel" className="rounded-2xl border border-warm-200 p-4 text-center text-sm font-bold text-navy-800 hover:border-orange-300">Schaapsvishandel</Link>
        </nav>
      </article>

    </>
  );
}
