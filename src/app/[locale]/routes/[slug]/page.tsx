import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { PublicRoutePreview } from "@/components/routes/PublicRoutePreview";
import { getPublicRoutePreview, publicRoutePreviews } from "@/data/public-route-seo";
import { asLocale, createDynamicMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return publicRoutePreviews.map((route) => ({ slug: route.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: localeValue, slug } = await params;
  const route = getPublicRoutePreview(slug);
  if (!route) return {};
  const locale = asLocale(localeValue);
  const copy = route.copy[locale];
  return createDynamicMetadata({
    locale,
    title: copy.title,
    description: copy.metaDescription,
    path: `/routes/${route.slug}`,
    image: route.image,
    index: true,
  });
}

export default async function RouteDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: localeValue, slug } = await params;
  setRequestLocale(localeValue);
  const route = getPublicRoutePreview(slug);
  if (!route) notFound();
  return <PublicRoutePreview route={route} locale={asLocale(localeValue)} />;
}
