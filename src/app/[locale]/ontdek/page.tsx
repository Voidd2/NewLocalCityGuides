import { setRequestLocale } from "next-intl/server";
import { OntdekPage } from "@/components/ontdek/OntdekPage";

export default async function Ontdek({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <OntdekPage />;
}
