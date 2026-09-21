import type { MetadataRoute } from "next";
import { env } from "@/config/env";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: env.appName,
    short_name: env.appName,
    description: "A calm place to write, publish and read.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0a0a0a",
    theme_color: "#7c3aed",
    categories: ["news", "productivity", "social"],
    icons: [
      { src: "/icons/192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-192", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icons/maskable-512", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
    shortcuts: [
      { name: "Write a post", url: "/write", description: "Start a new post" },
      { name: "All posts", url: "/posts", description: "Browse everything published" },
    ],
  };
}
