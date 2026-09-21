import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { localSpots } from "@/data/local-spots";
import { SpotDetail } from "@/components/ontdek/SpotDetail";
import { PaywallGuard } from "@/components/auth/PaywallGuard";

export function generateStaticParams() {
  return localSpots.map((spot) => ({ id: spot.id }));
}

export default async function SpotPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const spot = localSpots.find((s) => s.id === id);
  if (!spot) notFound();

  return (
    <PaywallGuard>
      <SpotDetail spot={spot} />
    </PaywallGuard>
  );
}
