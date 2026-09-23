import { setRequestLocale } from "next-intl/server";
import { CustomRouteBuilder } from "@/components/custom-route/CustomRouteBuilder";
import { PaywallGuard } from "@/components/auth/PaywallGuard";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return createPageMetadata(locale, "customRoute", "/routes/custom", { index: false });
}

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
