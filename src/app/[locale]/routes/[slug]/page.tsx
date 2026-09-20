import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routes } from "@/data/routes";
import { RouteDetail } from "@/components/routes/RouteDetail";
import { PaywallGuard } from "@/components/auth/PaywallGuard";
import { Footer } from "@/components/layout/Footer";

export function generateStaticParams() {
  return routes.map((route) => ({ slug: route.slug }));
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
      <Footer />
    </>
  );
}
