import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const privatePaths = [
    "/api/",
    "/nl/account", "/en/account", "/de/account",
    "/nl/dashboard", "/en/dashboard", "/de/dashboard",
    "/nl/login", "/en/login", "/de/login",
    "/nl/my-routes", "/en/my-routes", "/de/my-routes",
    "/nl/routes/custom", "/en/routes/custom", "/de/routes/custom",
  ];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: privatePaths },
      { userAgent: ["OAI-SearchBot", "ChatGPT-User", "GPTBot"], allow: "/", disallow: privatePaths },
      { userAgent: ["ClaudeBot", "Claude-SearchBot", "Claude-User"], allow: "/", disallow: privatePaths },
      { userAgent: ["PerplexityBot", "Perplexity-User", "Google-Extended"], allow: "/", disallow: privatePaths },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
