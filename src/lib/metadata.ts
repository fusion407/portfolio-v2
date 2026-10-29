import type { Metadata } from "next";
import type { PortfolioPage } from "@/content/pages";
import { site } from "@/content/site";
import { professional } from "@/content/professional";
import { getSitePolicy } from "./site-policy";
export function pageMetadata(page: PortfolioPage): Metadata {
  const policy = getSitePolicy();
  const image = {
    url: `/og/${page.slug}`,
    width: 1200,
    height: 630,
    alt: `${page.socialTitle} — ${site.name}`,
  };
  return {
    metadataBase: new URL(policy.origin),
    title: page.title,
    description: page.description,
    applicationName: `${site.name} — Portfolio`,
    authors: [{ name: site.name }],
    robots: { index: policy.indexable, follow: policy.indexable },
    alternates: policy.canonicalOrigin
      ? { canonical: `${policy.canonicalOrigin}${page.path}` }
      : undefined,
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: `${site.name} — Portfolio`,
      title: page.title,
      description: page.description,
      url: `${policy.origin}${page.path}`,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [image],
    },
  };
}
export function personSchema() {
  const policy = getSitePolicy();
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    email: professional.publicEmail,
    description: site.description,
    ...(policy.canonicalOrigin ? { url: `${policy.canonicalOrigin}/` } : {}),
    sameAs: Object.values(site.profiles),
  };
}
export function serializeSchema(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
