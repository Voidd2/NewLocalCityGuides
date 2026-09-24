"use client";

import { FormEvent, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

export function NewsletterSignup({ variant = "compact" }: { variant?: "compact" | "wide" }) {
  const t = useTranslations("newsletter");
  const locale = useLocale();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    const data = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.get("email"), consent: data.get("consent") === "on", locale }),
      });
      if (!response.ok) throw new Error(t("error"));
      setStatus("success");
      setMessage(t("success"));
      event.currentTarget.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : t("error"));
    }
  }

  return (
    <section className={variant === "wide" ? "bg-orange-50 px-4 py-14" : "mt-8 border-t border-white/10 pt-8"}>
      <div className={variant === "wide" ? "mx-auto max-w-4xl rounded-3xl bg-white p-6 shadow-sm ring-1 ring-orange-100 md:p-10" : "max-w-md"}>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">{t("eyebrow")}</p>
        <h2 className={`mt-2 font-extrabold ${variant === "wide" ? "text-2xl text-navy-800 md:text-3xl" : "text-xl text-white"}`}>{t("title")}</h2>
        <p className={`mt-2 text-sm leading-6 ${variant === "wide" ? "text-slate-600" : "text-white/60"}`}>{t("description")}</p>
        <form onSubmit={subscribe} className="mt-5 space-y-3">
          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="sr-only" htmlFor={`newsletter-email-${variant}`}>{t("emailLabel")}</label>
            <input id={`newsletter-email-${variant}`} name="email" type="email" required autoComplete="email" placeholder={t("emailPlaceholder")} className="min-w-0 flex-1 rounded-full border border-gray-200 bg-white px-4 py-3 text-sm text-navy-800 outline-none ring-orange-500 transition focus:ring-2" />
            <button disabled={status === "loading"} className="rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-orange-600 disabled:opacity-60">
              {status === "loading" ? t("submitting") : t("button")}
            </button>
          </div>
          <label className={`flex items-start gap-2 text-xs leading-5 ${variant === "wide" ? "text-slate-600" : "text-white/50"}`}>
            <input name="consent" type="checkbox" required className="mt-1 accent-orange-500" />
            <span>{t("consent")}</span>
          </label>
          {message && <p aria-live="polite" className={`text-sm ${status === "success" ? "text-green-600" : "text-red-500"}`}>{message}</p>}
        </form>
      </div>
    </section>
  );
}
