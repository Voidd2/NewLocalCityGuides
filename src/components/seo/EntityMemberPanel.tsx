"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/lib/auth-context";

export function EntityMemberPanel({ premiumHref, videoPlanned }: { premiumHref: string; videoPlanned: boolean }) {
  const t = useTranslations("entityPage");
  const { hasPaid, isLoading, isLoggedIn } = useAuth();

  if (isLoading) return <div className="h-40 animate-pulse rounded-3xl bg-gray-100" />;

  if (hasPaid) {
    return (
      <section className="rounded-3xl bg-navy-900 p-6 text-white md:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-300">{t("memberAccess")}</p>
        <h2 className="mt-2 text-2xl font-extrabold">{videoPlanned ? t("watchMemberVideo") : t("openMemberStory")}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">{videoPlanned ? t("videoMemberDesc") : t("storyMemberDesc")}</p>
        <Link href={premiumHref} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-orange-500 px-6 text-sm font-bold text-white hover:bg-orange-600">
          {videoPlanned ? t("watchVideo") : t("readFullStory")} <span aria-hidden="true">→</span>
        </Link>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-6 md:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">{t("memberPreview")}</p>
      <h2 className="mt-2 text-2xl font-extrabold text-navy-800">{videoPlanned ? t("videoForMembers") : t("fullStoryForMembers")}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600">{videoPlanned ? t("videoLockedDesc") : t("storyLockedDesc")}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link href="/pricing" className="inline-flex min-h-11 items-center rounded-full bg-orange-500 px-6 text-sm font-bold text-white hover:bg-orange-600">{t("unlockLeiden")}</Link>
        <Link href={isLoggedIn ? premiumHref : "/login"} className="inline-flex min-h-11 items-center rounded-full border border-navy-200 bg-white px-6 text-sm font-bold text-navy-800 hover:border-orange-300">{isLoggedIn ? t("checkAccess") : t("login")}</Link>
      </div>
    </section>
  );
}
