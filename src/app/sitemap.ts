import type { MetadataRoute } from "next";
import { locales, defaultLocale, type Locale } from "@/i18n/config";
import { locations } from "@/data/locations";
import { routes } from "@/data/routes";
import { SITE_URL } from "@/lib/site";

const STATIC_PATHS = [
  "",
  "/about",
  "/pricing",
  "/map",
  "/ontdek",
  "/routes",
  "/routes/custom",
  "/activiteiten",
  "/activiteiten/hulp",
  "/privacy",
  "/terms",
];

function localizedUrl(locale: Locale, path: string) {
  return `${SITE_URL}/${locale}${path}`;
}

function alternates(path: string) {
  return {
    languages: Object.fromEntries(
      locales.map((locale) => [locale, localizedUrl(locale, path)])
    ),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    entries.push({
      url: localizedUrl(defaultLocale, path),
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.7,
      alternates: alternates(path),
    });
  }

  for (const location of locations) {
    const path = `/locations/${location.slug}`;
    entries.push({
      url: localizedUrl(defaultLocale, path),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: alternates(path),
    });
  }

  for (const route of routes) {
    const path = `/routes/${route.slug}`;
    entries.push({
      url: localizedUrl(defaultLocale, path),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: alternates(path),
    });
  }

  return entries;
}
