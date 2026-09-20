import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { routes } from "@/data/routes";
import { locations } from "@/data/locations";
import { siteUrl } from "@/lib/site";

function localizedEntries(
  path: string,
  options: { changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }
): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${siteUrl}/${locale}${path}`,
    lastModified: new Date(),
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates: {
      languages: Object.fromEntries(
        locales.map((altLocale) => [altLocale, `${siteUrl}/${altLocale}${path}`])
      ),
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    ...localizedEntries("", { changeFrequency: "weekly", priority: 1 }),
    ...localizedEntries("/routes", { changeFrequency: "weekly", priority: 0.9 }),
    ...localizedEntries("/routes/custom", { changeFrequency: "monthly", priority: 0.5 }),
    ...localizedEntries("/map", { changeFrequency: "weekly", priority: 0.7 }),
    ...localizedEntries("/about", { changeFrequency: "monthly", priority: 0.6 }),
    ...localizedEntries("/pricing", { changeFrequency: "monthly", priority: 0.8 }),
  ];

  const routePages = routes.flatMap((route) =>
    localizedEntries(`/routes/${route.slug}`, { changeFrequency: "weekly", priority: 0.9 })
  );

  const locationPages = locations.flatMap((location) =>
    localizedEntries(`/locations/${location.slug}`, { changeFrequency: "monthly", priority: 0.7 })
  );

  return [...staticPages, ...routePages, ...locationPages];
}
