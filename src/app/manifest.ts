import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/business";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BUSINESS.name,
    short_name: "Jana Vogel",
    description: BUSINESS.slogan,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#c7a485",
    lang: "de-DE",
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
