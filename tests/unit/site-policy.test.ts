import { afterEach, describe, expect, it, vi } from "vitest";
import { getSitePolicy } from "@/lib/site-policy";
import { pageMetadata, personSchema, serializeSchema } from "@/lib/metadata";
import { portfolioPages } from "@/content/pages";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import nextConfig from "../../next.config";

afterEach(() => vi.unstubAllEnvs());
function production() {
  vi.stubEnv("VERCEL_ENV", "production");
  vi.stubEnv("PORTFOLIO_INDEXING", "enabled");
  vi.stubEnv("CONTEXT", "production");
  vi.stubEnv("SITE_URL", "https://www.bradydorsey.dev");
}

describe("explicit indexing policy", () => {
  it("uses the immutable Vercel preview origin ahead of legacy hosting values", () => {
    expect(
      getSitePolicy({
        VERCEL_ENV: "preview",
        VERCEL_URL: "portfolio-v2-preview-abc-fusion407s-projects.vercel.app",
        VERCEL_BRANCH_URL: "portfolio-v2-preview-git-feature.vercel.app",
        DEPLOY_PRIME_URL: "https://stale.netlify.app",
      }),
    ).toEqual({
      indexable: false,
      canonicalOrigin: null,
      origin: "https://portfolio-v2-preview-abc-fusion407s-projects.vercel.app",
    });
  });
  it("rejects malformed Vercel hosts and uses only a valid fallback", () => {
    for (const host of [
      "https://wrong.vercel.app",
      "user@wrong.vercel.app",
      "wrong.vercel.app/path",
      "wrong.vercel.app.evil.test",
    ]) {
      expect(getSitePolicy({ VERCEL_URL: host }).origin).toBe(
        "http://127.0.0.1:3000",
      );
      expect(
        getSitePolicy({
          VERCEL_URL: host,
          VERCEL_BRANCH_URL: "fallback.vercel.app",
        }).origin,
      ).toBe("https://fallback.vercel.app");
    }
  });
  it("never lets a legacy production context override Vercel preview or development", () => {
    for (const context of ["preview", "development"])
      expect(
        getSitePolicy({
          PORTFOLIO_INDEXING: "enabled",
          CONTEXT: "production",
          VERCEL_ENV: context,
          SITE_URL: "https://www.bradydorsey.dev",
        }).indexable,
      ).toBe(false);
    expect(
      getSitePolicy({
        PORTFOLIO_INDEXING: "enabled",
        VERCEL_ENV: "production",
        SITE_URL: "https://www.bradydorsey.dev",
      }).indexable,
    ).toBe(true);
  });
  it.each([
    {},
    { NODE_ENV: "production" },
    { CONTEXT: "production", SITE_URL: "https://www.bradydorsey.dev" },
    {
      PORTFOLIO_INDEXING: "enabled",
      CONTEXT: "deploy-preview",
      SITE_URL: "https://www.bradydorsey.dev",
    },
    {
      PORTFOLIO_INDEXING: "enabled",
      CONTEXT: "production",
      SITE_URL: "https://preview.netlify.app",
    },
    {
      PORTFOLIO_INDEXING: "enabled",
      CONTEXT: "production",
      SITE_URL: "http://www.bradydorsey.dev",
    },
    {
      PORTFOLIO_INDEXING: "enabled",
      CONTEXT: "production",
      SITE_URL: "https://www.bradydorsey.dev/path",
    },
    {
      PORTFOLIO_INDEXING: "enabled",
      CONTEXT: "production",
      SITE_URL: "https://user@www.bradydorsey.dev",
    },
  ])(
    "keeps incomplete, preview, or invalid configuration non-indexable: %j",
    (env) => {
      expect(getSitePolicy(env).indexable).toBe(false);
      expect(getSitePolicy(env).canonicalOrigin).toBeNull();
    },
  );
  it("uses the preview origin without advertising production canonicals", () => {
    expect(
      getSitePolicy({
        DEPLOY_PRIME_URL: "https://deploy-preview-8--portfolio.netlify.app",
        SITE_URL: "https://www.bradydorsey.dev",
      }),
    ).toEqual({
      indexable: false,
      canonicalOrigin: null,
      origin: "https://deploy-preview-8--portfolio.netlify.app",
    });
  });
  it("rejects malformed preview URLs and falls back to loopback", () => {
    expect(
      getSitePolicy({
        DEPLOY_PRIME_URL: "javascript:alert(1)",
        DEPLOY_URL: "https://wrong.test/path",
      }).origin,
    ).toBe("http://127.0.0.1:3000");
  });
  it("aligns production canonical, OG, sitemap, robots, and headers only after all opt-ins", async () => {
    production();
    for (const page of portfolioPages) {
      const metadata = pageMetadata(page);
      expect(metadata.alternates?.canonical).toBe(
        `https://www.bradydorsey.dev${page.path}`,
      );
      expect(metadata.openGraph).toMatchObject({
        url: `https://www.bradydorsey.dev${page.path}`,
      });
      expect(metadata.robots).toEqual({ index: true, follow: true });
    }
    expect(sitemap().map((entry) => entry.url)).toEqual(
      portfolioPages.map((page) => `https://www.bradydorsey.dev${page.path}`),
    );
    expect(robots()).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://www.bradydorsey.dev/sitemap.xml",
    });
    const headers = await nextConfig.headers!();
    expect(
      headers
        .flatMap((entry) => entry.headers)
        .some((header) => header.key === "X-Robots-Tag"),
    ).toBe(false);
  });
  it("aligns all preview exclusion signals", async () => {
    vi.stubEnv("PORTFOLIO_INDEXING", "disabled");
    expect(sitemap()).toEqual([]);
    expect(robots()).toEqual({ rules: { userAgent: "*", disallow: "/" } });
    const headers = await nextConfig.headers!();
    expect(headers.flatMap((entry) => entry.headers)).toContainEqual({
      key: "X-Robots-Tag",
      value: "noindex, nofollow",
    });
    for (const page of portfolioPages)
      expect(pageMetadata(page).alternates).toBeUndefined();
  });
  it("limits Person data to confirmed identity/profiles and safely serializes script text", () => {
    vi.stubEnv("PORTFOLIO_INDEXING", "disabled");
    expect(personSchema()).toMatchObject({
      "@type": "Person",
      name: "Brady Dorsey",
      sameAs: [
        "https://github.com/fusion407",
        "https://www.linkedin.com/in/brady-dorsey-9a582279",
      ],
    });
    expect(personSchema()).not.toHaveProperty("worksFor");
    expect(personSchema()).not.toHaveProperty("birthDate");
    const serialized = serializeSchema({
      name: "</script><script>test</script>",
    });
    expect(serialized).not.toContain("<");
    expect(JSON.parse(serialized).name).toBe("</script><script>test</script>");
  });
});
