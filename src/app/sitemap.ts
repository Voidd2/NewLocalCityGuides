import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { localizedUrl } from "@/lib/seo";
import { blogPosts } from "@/data/seo-content";

const publicPaths = [
  "",
  "/routes",
  "/map",
  "/ontdek",
  "/activiteiten/hulp",
  "/pricing",
  "/city-guide-leiden",
  "/leiden-tours",
  "/leiden",
  "/leiden/things-to-do",
  "/leiden/schaapsvishandel",
  "/blog",
  ...blogPosts.map((post) => `/blog/${post.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.flatMap((path) =>
    locales.map((locale) => ({
      url: localizedUrl(locale, path),
      lastModified: path.startsWith("/blog/") ? new Date("2026-09-24") : undefined,
      changeFrequency: path === "" || path === "/blog" ? "weekly" as const : "monthly" as const,
      priority: path === "" ? 1 : path === "/leiden" ? 0.9 : path === "/routes" || path === "/ontdek" || path === "/city-guide-leiden" || path === "/leiden-tours" || path === "/leiden/things-to-do" ? 0.8 : path.startsWith("/blog/") || path === "/leiden/schaapsvishandel" ? 0.7 : 0.6,
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
