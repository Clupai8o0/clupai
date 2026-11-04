import type { MetadataRoute } from "next";
import { cases } from "@/data/cases";

const BASE_URL = "https://clupai.com";

const PAGES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/start", priority: 0.9 },
  { path: "/work", priority: 0.8 },
  { path: "/products", priority: 0.8 },
  { path: "/about", priority: 0.7 },
  { path: "/contact", priority: 0.5 },
  { path: "/privacy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap
{
  const lastModified = new Date();
  return [
    ...PAGES.map(({ path, priority }) => ({ url: `${BASE_URL}${path}`, lastModified, priority })),
    ...cases.map((c) => ({ url: `${BASE_URL}/work/${c.slug}`, lastModified, priority: 0.7 })),
  ];
}
