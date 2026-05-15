import type { MetadataRoute } from "next";
import { profile } from "@/lib/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — ${profile.role}`,
    short_name: profile.shortName,
    description: profile.blurb,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/opengraph-image",
        sizes: "1200x630",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
