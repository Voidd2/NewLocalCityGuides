import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routes } from "@/data/routes";
import { RouteDetail } from "@/components/routes/RouteDetail";
import { PaywallGuard } from "@/components/auth/PaywallGuard";
import { createDynamicMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return routes.map((route) => ({ slug: route.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const route = routes.find((item) => item.slug === slug);
  if (!route) return {};
  return createDynamicMetadata({
    locale,
    title: route.title,
    description: route.description,
    path: `/routes/${route.slug}`,
    image: route.image,
    index: false,
  });
}

export default async function RouteDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const route = routes.find((r) => r.slug === slug);
  if (!route) notFound();

  return (
    <>
      <PaywallGuard>
        <RouteDetail route={route} />
      </PaywallGuard>
    </>
  );
}
