import { setRequestLocale } from "next-intl/server";
import { LoginPage } from "@/components/dashboard/LoginPage";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return createPageMetadata(locale, "login", "/login", { index: false });
}

export default async function Login({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LoginPage />;
}
