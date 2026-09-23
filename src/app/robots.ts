import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/nl/account",
        "/en/account",
        "/de/account",
        "/nl/dashboard",
        "/en/dashboard",
        "/de/dashboard",
        "/nl/my-routes",
        "/en/my-routes",
        "/de/my-routes",
        "/nl/routes/custom",
        "/en/routes/custom",
        "/de/routes/custom",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
