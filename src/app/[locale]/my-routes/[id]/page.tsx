import { setRequestLocale } from "next-intl/server";
import { SavedRouteWalker } from "@/components/my-routes/SavedRouteWalker";
import { PaywallGuard } from "@/components/auth/PaywallGuard";

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
