import type { MetadataRoute } from "next";
import { portfolioPages } from "@/content/pages";
import { getSitePolicy } from "@/lib/site-policy";
export default function sitemap(): MetadataRoute.Sitemap {
  const policy = getSitePolicy();
  return policy.indexable
    ? portfolioPages.map((page) => ({ url: `${policy.origin}${page.path}` }))
    : [];
}
