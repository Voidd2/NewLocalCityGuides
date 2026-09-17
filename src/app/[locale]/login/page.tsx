import { setRequestLocale } from "next-intl/server";
import { LoginPage } from "@/components/dashboard/LoginPage";

export default async function Login({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LoginPage />;
}
