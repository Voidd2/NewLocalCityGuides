import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n/config";
import { routes } from "@/data/routes";
import { locations } from "@/data/locations";
import { SITE_URL } from "@/lib/site";

function localizedEntry(
  path: string,
  options: { changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }
): MetadataRoute.Sitemap[number] {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, `${SITE_URL}/${locale}${path}`])
  );
  return {
    url: `${SITE_URL}/${defaultLocale}${path}`,
    lastModified: new Date(),
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates: { languages },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    localizedEntry("", { changeFrequency: "weekly", priority: 1 }),
    localizedEntry("/routes", { changeFrequency: "weekly", priority: 0.9 }),
    localizedEntry("/routes/custom", { changeFrequency: "monthly", priority: 0.6 }),
    localizedEntry("/map", { changeFrequency: "weekly", priority: 0.7 }),
    localizedEntry("/about", { changeFrequency: "monthly", priority: 0.6 }),
    localizedEntry("/pricing", { changeFrequency: "monthly", priority: 0.8 }),
  ];

  const routePages = routes.map((route) =>
    localizedEntry(`/routes/${route.slug}`, {
      changeFrequency: "weekly",
      priority: 0.8,
    })
  );

  const locationPages = locations.map((location) =>
    localizedEntry(`/locations/${location.slug}`, {
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  return [...staticPages, ...routePages, ...locationPages];
}
