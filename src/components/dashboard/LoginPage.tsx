"use client";

import Image from "next/image";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Link } from "@/i18n/navigation";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useAuth } from "@/lib/auth-context";

export function LoginPage() {
  const router = useRouter();
  const { login, isLoggedIn } = useAuth();
  const t = useTranslations("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => { if (isLoggedIn) router.replace("/dashboard"); }, [isLoggedIn, router]);
  if (isLoggedIn) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const result = login(email, password);
    if (result) {
      router.push("/dashboard");
    } else {
      setError(t(process.env.NODE_ENV === "production" ? "accountUnavailable" : "errorMessage"));
    }
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 md:grid-cols-2 md:items-center md:py-16">
      <aside className="relative hidden min-h-[610px] overflow-hidden rounded-[2rem] bg-navy-900 md:block">
        <Image src="/images/locations/10022-koornbrug-leiden.jpg" alt="Koornbrug, Leiden" fill sizes="50vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-9 text-white"><p className="text-xs uppercase tracking-widest text-orange-300">CityWalkStories · Leiden</p><h2 className="mt-3 text-4xl font-bold leading-tight">{t("brandIntro")}</h2><p className="mt-5 text-sm text-white/70">Koornbrug · Leiden</p></div>
      </aside>
      <div className="mx-auto w-full max-w-md">
        <div className="text-center mb-8">
          <BrandLogo className="mx-auto mb-8 h-auto w-72 max-w-full" />
          <h1 className="text-2xl font-bold text-navy-800">{t("title")}</h1>
          <p className="text-sm text-gray-500 mt-1">{t("subtitle")}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
          {error && (
            <div role="alert" className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3 mb-4">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-navy-800 mb-1">
              {t("email")}
            </label>
            <input
              id="email"
              autoComplete="username"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
              placeholder={t("emailPlaceholder")}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-navy-800 mb-1">
              {t("password")}
            </label>
            <input
              id="password"
              autoComplete="current-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
              placeholder={t("passwordPlaceholder")}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-full transition-colors text-sm"
          >
            {t("loginButton")}
          </button>
        </form>

        <Link href="/routes" className="mb-6 block text-center text-sm font-semibold text-navy-800 underline underline-offset-4">{t("viewRoutes")}</Link>
      </div>
    </div>
  );
}
