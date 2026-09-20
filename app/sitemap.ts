import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://shabi01.vercel.app/",
      lastModified: new Date(),
    },
  ];
}