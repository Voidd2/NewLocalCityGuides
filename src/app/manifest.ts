import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "YourLocalCityGuide Leiden",
    short_name: "CityGuide",
    description: "Wandelroutes, lokale verhalen en GPS-ontdekking in Leiden.",
    start_url: "/nl",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#FEFCF9",
    theme_color: "#1B2A4A",
    categories: ["travel", "navigation", "education"],
    icons: [
      { src: "/pwa/icon/192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/pwa/icon/512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/pwa/icon/512", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
  };
}
