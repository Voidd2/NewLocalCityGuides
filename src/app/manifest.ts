import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CityWalkStories Leiden",
    short_name: "CityWalkStories",
    description: "Wandelroutes, lokale verhalen en GPS-ontdekking in Leiden.",
    start_url: "/nl",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#FAF8F4",
    theme_color: "#1D2F5F",
    categories: ["travel", "navigation", "education"],
    icons: [
      { src: "/pwa/icon/192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/pwa/icon/512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/pwa/icon/512", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
