import type { MetadataRoute } from "next";
import { getSitePolicy } from "@/lib/site-policy";
export default function robots(): MetadataRoute.Robots {
  const policy = getSitePolicy();
  return policy.indexable
    ? {
        rules: { userAgent: "*", allow: "/" },
        sitemap: `${policy.origin}/sitemap.xml`,
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
