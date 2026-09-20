import { setRequestLocale } from "next-intl/server";
import { SavedRouteWalker } from "@/components/my-routes/SavedRouteWalker";
import { PaywallGuard } from "@/components/auth/PaywallGuard";
import { Footer } from "@/components/layout/Footer";

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
      <Footer />
    </>
  );
}
