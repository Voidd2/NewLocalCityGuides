import { setRequestLocale } from "next-intl/server";
import { MyRoutesList } from "@/components/my-routes/MyRoutesList";
import { PaywallGuard } from "@/components/auth/PaywallGuard";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return createPageMetadata(locale, "myRoutes", "/my-routes", { index: false });
}

export default async function MyRoutesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PaywallGuard>
        <MyRoutesList />
      </PaywallGuard>
    </>
  );
}
