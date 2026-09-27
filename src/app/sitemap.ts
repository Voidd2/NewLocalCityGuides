import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { localizedUrl } from "@/lib/seo";
import { blogPosts } from "@/data/seo-content";
import { publicRoutePreviews } from "@/data/public-route-seo";
import { publicEntities, publicEntityPath } from "@/data/public-entities";

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
  "/leiden/places",
  "/leiden/schaapsvishandel",
  "/blog",
  ...publicRoutePreviews.map((route) => `/routes/${route.slug}`),
  ...publicEntities.map(publicEntityPath),
  ...blogPosts.map((post) => `/blog/${post.slug}`),
];

const blogModifiedDates = new Map(blogPosts.map((post) => [`/blog/${post.slug}`, post.updatedAt]));

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.flatMap((path) =>
    locales.map((locale) => ({
      url: localizedUrl(locale, path),
      lastModified: blogModifiedDates.has(path) ? new Date(blogModifiedDates.get(path)!) : undefined,
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
