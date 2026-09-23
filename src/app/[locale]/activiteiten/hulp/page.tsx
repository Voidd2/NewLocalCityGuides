import { setRequestLocale } from "next-intl/server";
import { HulpPage } from "@/components/activiteiten/HulpPage";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return createPageMetadata(locale, "help", "/activiteiten/hulp");
}

export default async function ActiviteitenHulp({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HulpPage />;
}
