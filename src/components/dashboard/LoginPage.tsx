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
  const { login, register, isLoggedIn } = useAuth();
  const t = useTranslations("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { if (isLoggedIn) router.replace("/dashboard"); }, [isLoggedIn, router]);
  if (isLoggedIn) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    const result = mode === "login" ? await login(email, password) : await register(name, email, password);
    setIsSubmitting(false);
    if (result.user) {
      router.push("/dashboard");
    } else {
      setError(result.error === "email_exists" ? t("emailExists") : result.error === "invalid_input" ? t("registerInvalid") : t("errorMessage"));
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
          <h1 className="text-2xl font-bold text-navy-800">{mode === "login" ? t("title") : t("registerTitle")}</h1>
          <p className="text-sm text-gray-500 mt-1">{mode === "login" ? t("subtitle") : t("registerSubtitle")}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
          {error && (
            <div role="alert" className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3 mb-4">
              {error}
            </div>
          )}

          {mode === "register" && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-navy-800 mb-1">{t("name")}</label>
              <input id="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} minLength={2} required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none" />
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
              minLength={mode === "register" ? 10 : undefined}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-3 rounded-full transition-colors text-sm"
          >
            {isSubmitting ? t("pleaseWait") : mode === "login" ? t("loginButton") : t("registerButton")}
          </button>
        </form>

        <button type="button" onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }} className="mb-5 block w-full text-center text-sm font-semibold text-navy-800 underline underline-offset-4">
          {mode === "login" ? t("createAccount") : t("backToLogin")}
        </button>

        <Link href="/routes" className="mb-6 block text-center text-sm font-semibold text-navy-800 underline underline-offset-4">{t("viewRoutes")}</Link>
      </div>
    </div>
  );
}
