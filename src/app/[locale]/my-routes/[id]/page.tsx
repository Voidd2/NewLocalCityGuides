import { setRequestLocale } from "next-intl/server";
import { SavedRouteWalker } from "@/components/my-routes/SavedRouteWalker";
import { PaywallGuard } from "@/components/auth/PaywallGuard";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  return createPageMetadata(locale, "myRoutes", `/my-routes/${id}`, { index: false });
}

export default async function SavedRoutePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PaywallGuard>
        <SavedRouteWalker />
      </PaywallGuard>
    </>
  );
}
