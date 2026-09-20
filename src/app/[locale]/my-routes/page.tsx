import { setRequestLocale } from "next-intl/server";
import { MyRoutesList } from "@/components/my-routes/MyRoutesList";
import { PaywallGuard } from "@/components/auth/PaywallGuard";
import { Footer } from "@/components/layout/Footer";

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
      <Footer />
    </>
  );
}
