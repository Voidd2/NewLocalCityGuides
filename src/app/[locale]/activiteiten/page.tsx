import { setRequestLocale } from "next-intl/server";
import { OntdekPage } from "@/components/ontdek/OntdekPage";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return createPageMetadata(locale, "activities", "/activiteiten", { index: false });
}

export default async function Activiteiten({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <OntdekPage />;
}
