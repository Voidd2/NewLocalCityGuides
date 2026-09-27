import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { PublicEntityPage } from "@/components/seo/PublicEntityPage";
import { getPublicEntity, publicEntities, publicEntityPath } from "@/data/public-entities";
import { asLocale, createDynamicMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return publicEntities.map((entity) => ({ entityType: entity.section, slug: entity.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; entityType: string; slug: string }> }) {
  const { locale: localeValue, entityType, slug } = await params;
  const entity = getPublicEntity(entityType, slug);
  if (!entity) return {};
  const locale = asLocale(localeValue);
  const title = locale === "de" ? `${entity.name} in Leiden besuchen` : locale === "en" ? `Visit ${entity.name} in Leiden` : `${entity.name} in Leiden bezoeken`;
  return createDynamicMetadata({
    locale,
    title,
    description: entity.metaDescription[locale],
    path: publicEntityPath(entity),
    image: entity.image,
    index: true,
  });
}

export default async function EntityPage({ params }: { params: Promise<{ locale: string; entityType: string; slug: string }> }) {
  const { locale: localeValue, entityType, slug } = await params;
  setRequestLocale(localeValue);
  const entity = getPublicEntity(entityType, slug);
  if (!entity) notFound();
  return <PublicEntityPage entity={entity} locale={asLocale(localeValue)} />;
}
