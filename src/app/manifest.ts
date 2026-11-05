import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest
{
  return {
    name: "Clupai · Software live by the date we agree",
    short_name: "Clupai",
    description: "We build software for Australian founders and launch it by the date we agree, or you stop paying.",
    start_url: "/",
    display: "standalone",
    background_color: "#070707",
    theme_color: "#070707",
    icons: [
      { src: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { src: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
  };
}
