import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { localizedUrl } from "@/lib/seo";

const publicPaths = ["", "/routes", "/map", "/ontdek", "/activiteiten/hulp", "/pricing"];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.flatMap((path) =>
    locales.map((locale) => ({
      url: localizedUrl(locale, path),
      changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
      priority: path === "" ? 1 : path === "/routes" || path === "/ontdek" ? 0.8 : 0.6,
      alternates: {
        languages: {
          nl: localizedUrl("nl", path),
          en: localizedUrl("en", path),
          de: localizedUrl("de", path),
          "x-default": localizedUrl("nl", path),
        },
      },
    })),
  );
}
