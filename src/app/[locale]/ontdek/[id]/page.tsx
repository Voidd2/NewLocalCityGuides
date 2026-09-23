import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { localSpots } from "@/data/local-spots";
import { SpotDetail } from "@/components/ontdek/SpotDetail";
import { PaywallGuard } from "@/components/auth/PaywallGuard";
import { asLocale, createDynamicMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return localSpots.map((spot) => ({ id: spot.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const spot = localSpots.find((item) => item.id === id);
  if (!spot) return {};
  const safeLocale = asLocale(locale);
  return createDynamicMetadata({
    locale,
    title: spot.name,
    description: spot.description[safeLocale].replace(/\*\*/g, "").split("\n")[0],
    path: `/ontdek/${spot.id}`,
    image: spot.image,
    index: false,
  });
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
