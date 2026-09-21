import { setRequestLocale } from "next-intl/server";
import { CustomRouteBuilder } from "@/components/custom-route/CustomRouteBuilder";
import { PaywallGuard } from "@/components/auth/PaywallGuard";

export default async function CustomRoutePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PaywallGuard>
        <CustomRouteBuilder />
      </PaywallGuard>
    </>
  );
}
