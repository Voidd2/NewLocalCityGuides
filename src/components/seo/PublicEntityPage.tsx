import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { EntityMemberPanel } from "@/components/seo/EntityMemberPanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { localizedUrl, SITE_URL } from "@/lib/seo";
import { nearbyPublicEntities, publicEntityPath, type PublicEntity } from "@/data/public-entities";
import type { Locale } from "@/i18n/config";

function schemaType(entity: PublicEntity): string {
  if (entity.section === "museums") return "Museum";
  if (entity.section === "attractions") return "TouristAttraction";
  if (entity.section === "markets") return "Place";
  return "LocalBusiness";
}

export function PublicEntityPage({ entity, locale }: { entity: PublicEntity; locale: Locale }) {
  const t = useTranslations("entityPage");
  const path = publicEntityPath(entity);
  const nearby = nearbyPublicEntities(entity);
  const routeSlug = entity.section === "markets" || entity.section === "local" ? "markt-en-ambacht" : "centrum-route";

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": schemaType(entity),
    name: entity.name,
    description: entity.intro[locale],
    url: localizedUrl(locale, path),
    image: entity.image ? `${SITE_URL}${entity.image}` : undefined,
    inLanguage: locale,
    address: entity.address ? {
      "@type": "PostalAddress",
      streetAddress: entity.address,
      addressLocality: "Leiden",
      addressCountry: "NL",
    } : undefined,
    geo: entity.coords ? {
      "@type": "GeoCoordinates",
      latitude: entity.coords.lat,
      longitude: entity.coords.lng,
    } : undefined,
  };

  return (
    <>
      <JsonLd data={schema} />
      <section className="relative min-h-[430px] overflow-hidden bg-navy-900 text-white">
        {entity.image ? <Image src={entity.image} alt={entity.name} fill priority sizes="100vw" className="object-cover opacity-40" /> : <div className="absolute inset-0 bg-gradient-to-br from-navy-700 to-navy-950" />}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900/90 to-navy-900/35" />
        <div className="relative mx-auto max-w-6xl px-4 py-12 md:py-20">
          <Breadcrumbs locale={locale} className="!text-white/75" items={[{ label: "Leiden", href: "/leiden" }, { label: t(`sections.${entity.section}`), href: "/leiden/places" }, { label: entity.name }]} />
          <div className="mt-10 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">{t(`sections.${entity.section}`)}</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight md:text-6xl">{entity.name}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 md:text-lg">{entity.intro[locale]}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {entity.address && <span className="rounded-full bg-white/10 px-3 py-2 text-xs font-semibold ring-1 ring-white/15">{entity.address}</span>}
              {entity.visitDuration && <span className="rounded-full bg-white/10 px-3 py-2 text-xs font-semibold ring-1 ring-white/15">{t("visitDuration")}: {entity.visitDuration}</span>}
              {entity.familyFriendly === true && <span className="rounded-full bg-white/10 px-3 py-2 text-xs font-semibold ring-1 ring-white/15">{t("familyFriendly")}</span>}
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl space-y-14 px-4 py-12 md:py-16">
        <section className="grid gap-8 md:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">{t("freeIntroduction")}</p>
            <h2 className="mt-2 text-2xl font-extrabold text-navy-800">{t("whyVisit", { name: entity.name })}</h2>
            <p className="mt-4 leading-8 text-gray-600">{entity.whyVisit[locale]}</p>
          </div>
          <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="font-bold text-navy-800">{t("practicalInfo")}</h2>
            <dl className="mt-4 space-y-4 text-sm">
              {entity.address && <div><dt className="font-semibold text-gray-400">{t("address")}</dt><dd className="mt-1 text-navy-800">{entity.address}</dd></div>}
              {entity.visitDuration && <div><dt className="font-semibold text-gray-400">{t("duration")}</dt><dd className="mt-1 text-navy-800">{entity.visitDuration}</dd></div>}
              <div><dt className="font-semibold text-gray-400">{t("location")}</dt><dd className="mt-1 text-navy-800">Leiden, Nederland</dd></div>
            </dl>
            <p className="mt-4 text-xs leading-5 text-gray-400">{t("verifyDetails")}</p>
          </aside>
        </section>

        {entity.tags.length > 0 && (
          <section>
            <h2 className="text-2xl font-extrabold text-navy-800">{t("highlights")}</h2>
            <div className="mt-5 flex flex-wrap gap-2">{entity.tags.map((tag) => <span key={tag} className="rounded-full border border-orange-100 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">{tag}</span>)}</div>
          </section>
        )}

        <EntityMemberPanel premiumHref={entity.premiumHref} videoPlanned={entity.videoPlanned} />

        <section className="rounded-3xl bg-warm-100 p-6 md:p-9">
          <h2 className="text-2xl font-extrabold text-navy-800">{t("includeInRoute")}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600">{t("routeDesc")}</p>
          <Link href={`/routes/${routeSlug}`} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-navy-800 px-6 text-sm font-bold text-white hover:bg-navy-900">{t("viewRelevantRoute")} <span aria-hidden="true">→</span></Link>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold text-navy-800">{t("nearby")}</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {nearby.map((item) => <Link key={item.key} href={publicEntityPath(item)} className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-orange-300 hover:shadow-md"><p className="text-xs font-bold uppercase tracking-wider text-orange-600">{t(`sections.${item.section}`)}</p><h3 className="mt-2 font-bold text-navy-800">{item.name}</h3></Link>)}
          </div>
        </section>

        <nav aria-label={t("moreLeiden")} className="grid gap-3 sm:grid-cols-5">
          <Link href="/leiden" className="rounded-2xl border border-gray-200 p-4 text-center text-sm font-bold text-navy-800 hover:border-orange-300">Leiden</Link>
          <Link href="/leiden/places" className="rounded-2xl border border-gray-200 p-4 text-center text-sm font-bold text-navy-800 hover:border-orange-300">{t("allPlaces")}</Link>
          <Link href="/leiden/things-to-do" className="rounded-2xl border border-gray-200 p-4 text-center text-sm font-bold text-navy-800 hover:border-orange-300">{t("thingsToDo")}</Link>
          <Link href="/leiden-tours" className="rounded-2xl border border-gray-200 p-4 text-center text-sm font-bold text-navy-800 hover:border-orange-300">{t("leidenTours")}</Link>
          <Link href="/blog" className="rounded-2xl border border-gray-200 p-4 text-center text-sm font-bold text-navy-800 hover:border-orange-300">{t("localStories")}</Link>
        </nav>
      </main>
    </>
  );
}
