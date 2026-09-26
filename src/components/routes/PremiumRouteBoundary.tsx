"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/lib/auth-context";

const PremiumRouteExperience = dynamic(
  () => import("./PremiumRouteExperience").then((module) => module.PremiumRouteExperience),
  {
    ssr: false,
    loading: () => <div className="min-h-40 animate-pulse rounded-2xl bg-gray-100" />,
  },
);

export function PremiumRouteBoundary({ slug }: { slug: string }) {
  const { hasPaid, isLoggedIn, isLoading } = useAuth();
  const t = useTranslations("routePreview");

  if (isLoading) return <div className="min-h-40 animate-pulse rounded-2xl bg-gray-100" />;
  if (hasPaid) return <PremiumRouteExperience slug={slug} />;

  return (
    <section className="rounded-[2rem] bg-navy-900 px-5 py-8 text-center text-white shadow-xl md:px-10 md:py-12">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-500" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" /></svg>
      </span>
      <h2 className="mt-4 text-2xl font-extrabold md:text-3xl">{t("unlockTitle")}</h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">{t("unlockDesc")}</p>
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href={isLoggedIn ? "/pricing" : "/login"} className="inline-flex min-h-12 items-center justify-center rounded-full bg-orange-500 px-6 text-sm font-bold text-white transition hover:bg-orange-600">
          {isLoggedIn ? t("unlockCta") : t("loginCta")}
        </Link>
        <Link href="/pricing" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-semibold text-white transition hover:bg-white/10">
          {t("pricingCta")}
        </Link>
      </div>
    </section>
  );
}
