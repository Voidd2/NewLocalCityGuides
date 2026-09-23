import { setRequestLocale } from "next-intl/server";
import { AccountPage } from "@/components/account/AccountPage";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return createPageMetadata(locale, "account", "/account", { index: false });
}

export default async function Account({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AccountPage />;
}
