import { setRequestLocale } from "next-intl/server";
import { CustomRouteBuilder } from "@/components/custom-route/CustomRouteBuilder";
import { PaywallGuard } from "@/components/auth/PaywallGuard";
import { createPageMetadata } from "@/lib/seo";
import { locations } from "@/data/locations";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return createPageMetadata(locale, "customRoute", "/routes/custom", { index: false });
}

export default async function CustomRoutePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ stops?: string; name?: string }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);
  const knownIds = new Set(locations.map((location) => location.id));
  const initialStops = [...new Set((query.stops ?? "").split(",").filter((id) => knownIds.has(id)))].slice(0, 20);
  const initialName = (query.name ?? "").trim().slice(0, 80);

  return (
    <>
      <PaywallGuard>
        <CustomRouteBuilder initialStops={initialStops} initialName={initialName} />
      </PaywallGuard>
    </>
  );
}
