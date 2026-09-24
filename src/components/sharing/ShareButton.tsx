"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function ShareButton({ title, text, url, className = "" }: { title: string; text?: string; url?: string; className?: string }) {
  const t = useTranslations("sharing");
  const [copied, setCopied] = useState(false);

  async function share() {
    const shareUrl = url ? new URL(url, window.location.origin).toString() : window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <button type="button" onClick={share} className={`inline-flex items-center justify-center gap-2 rounded-full border border-current px-4 py-2.5 text-sm font-semibold transition-colors ${className}`}>
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4"/></svg>
      {copied ? t("copied") : t("share")}
    </button>
  );
}
