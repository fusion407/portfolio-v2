import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { portfolioPages } from "../../src/content/pages";

const indexable = process.env.PORTFOLIO_EXPECT_INDEXABLE === "true";
const canonicalOrigin = "https://www.bradydorsey.dev";

test.beforeEach(async ({ context, request, baseURL }) => {
  const access = process.env.PORTFOLIO_PREVIEW_ACCESS_URL;
  if (!access) return;
  try {
    // Each isolated context obtains its own cookie; no storage-state file or
    // credential is persisted. Never include access URLs in assertion messages.
    const responses = await Promise.all([
      context.request.get(access),
      request.get(access),
    ]);
    if (
      responses.some(
        (response) =>
          !response.ok() || new URL(response.url()).origin !== baseURL,
      )
    )
      throw new Error("Preview authentication failed");
  } catch {
    throw new Error(
      "Protected preview access failed. Obtain a fresh authorized access link.",
    );
  }
});

test("deployed content routes keep metadata, indexing policy, and security headers", async ({
  page,
  baseURL,
}) => {
  for (const entry of portfolioPages) {
    const response = await page.goto(entry.path);
    expect(response?.status(), entry.path).toBe(200);
    await expect(page).toHaveTitle(entry.title);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      entry.description,
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      indexable ? "index, follow" : "noindex, nofollow",
    );
    if (indexable) {
      const canonical = await page
        .locator('link[rel="canonical"]')
        .getAttribute("href");
      expect(new URL(canonical!).href).toBe(
        new URL(entry.path, canonicalOrigin).href,
      );
    } else await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
    const openGraphURL = await page
      .locator('meta[property="og:url"]')
      .getAttribute("content");
    expect(new URL(openGraphURL!).href).toBe(new URL(entry.path, baseURL).href);
    if (indexable) expect(response?.headers()["x-robots-tag"]).toBeUndefined();
    else expect(response?.headers()["x-robots-tag"]).toContain("noindex");
    expect(response?.headers()["x-content-type-options"]).toBe("nosniff");
    expect(response?.headers()["x-frame-options"]).toBe("DENY");
    expect(response?.headers()["referrer-policy"]).toBe(
      "strict-origin-when-cross-origin",
    );
    expect(response?.headers()["permissions-policy"]).toBe(
      "camera=(), microphone=(), geolocation=()",
    );
    expect(response?.headers()["content-security-policy"]).toContain(
      "frame-ancestors 'none'",
    );
    expect(response?.headers()["content-security-policy"]).not.toContain(
      "unsafe-eval",
    );
    expect(response?.headers()["x-powered-by"]).toBeUndefined();
  }
});

test("all deployed social cards resolve on the deployment origin with correct dimensions", async ({
  page,
  request,
  baseURL,
}) => {
  for (const entry of portfolioPages) {
    await page.goto(entry.path);
    const image = await page
      .locator('meta[property="og:image"]')
      .getAttribute("content");
    expect(new URL(image!).origin).toBe(baseURL);
    const response = await request.get(image!);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
    const bytes = await response.body();
    expect(bytes.subarray(1, 4).toString()).toBe("PNG");
    expect([bytes.readUInt32BE(16), bytes.readUInt32BE(20)]).toEqual([
      1200, 630,
    ]);
  }
});

test("deployed robots, sitemap, and unknown routes preserve indexing and 404 behavior", async ({
  request,
}) => {
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(robots.headers()["content-type"]).toContain("text/plain");
  if (indexable) {
    expect(await robots.text()).toContain("Allow: /");
    expect(await robots.text()).not.toContain("Disallow: /");
    expect(await robots.text()).toContain(`${canonicalOrigin}/sitemap.xml`);
  } else expect(await robots.text()).toContain("Disallow: /");
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(sitemap.headers()["content-type"]).toContain("xml");
  expect(await sitemap.text()).toContain("<urlset");
  if (indexable) {
    const xml = await sitemap.text();
    expect(xml.match(/<loc>/g)).toHaveLength(portfolioPages.length);
    for (const entry of portfolioPages)
      expect(xml).toContain(`<loc>${canonicalOrigin}${entry.path}</loc>`);
  } else expect(await sitemap.text()).not.toContain("<loc>");
  for (const path of [
    "/missing-preview-check",
    "/404",
    "/resume",
    "/projects/not-a-project",
    "/og/missing",
  ]) {
    expect((await request.get(path)).status(), path).toBe(404);
  }
});

test("verified legacy paths redirect without losing queries or breaking section navigation", async ({
  page,
  request,
  baseURL,
}) => {
  for (const [path, fragment] of [
    ["/about", "#about"],
    ["/skills", "#stack"],
    ["/experience", "#experience"],
  ]) {
    const response = await request.get(`${path}?utm_source=preview-check`, {
      maxRedirects: 0,
    });
    expect(response.status()).toBe(301);
    const location = new URL(response.headers().location!, baseURL);
    expect(location.origin).toBe(baseURL);
    expect(location.pathname).toBe("/");
    expect(location.hash).toBe(fragment);
    expect(location.searchParams.get("utm_source")).toBe("preview-check");
    await page.goto(path!);
    await expect(page).toHaveURL(new RegExp(`${fragment}$`));
    await expect(page.locator(fragment!)).toBeInViewport();
  }
});

test("deployed navigation, command palette, contact, and mobile menu work", async ({
  page,
  isMobile,
}) => {
  await page.goto("/projects/geovis");
  await page.getByRole("button", { name: "Search portfolio" }).click();
  await page.getByRole("combobox").fill("NeonSynth");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/projects\/neonsynth$/);
  await page.goto("/");
  if (isMobile) {
    await page.locator(".mobile-navigation > summary").click();
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Contact", exact: true })
      .click();
  } else
    await page
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", { name: "Contact", exact: true })
      .click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(
    page.getByRole("link", { name: "fusion407@gmail.com", exact: true }),
  ).toHaveAttribute("href", "mailto:fusion407@gmail.com");
});

test("both deployed games load, focus, pause, restart, and exit under the browser policy", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    Object.defineProperty(window, "previewViolations", { value: [] });
    document.addEventListener("securitypolicyviolation", (event) =>
      (
        window as Window & { previewViolations?: string[] }
      ).previewViolations?.push(event.effectiveDirective),
    );
  });
  await page.goto("/");
  for (const [game, field] of [
    ["Pong", "Pong court"],
    ["Asteroids", "Asteroids field"],
  ]) {
    const play = page.getByRole("button", {
      name: "Choose a game",
      exact: true,
    });
    await play.click();
    await page.getByRole("button", { name: new RegExp(`^${game}`) }).click();
    await expect(
      page.getByRole("application", { name: field, exact: true }),
    ).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("button", { name: `Resume ${game}`, exact: true }),
    ).toBeFocused();
    await page
      .getByRole("button", { name: `Restart ${game}`, exact: true })
      .click();
    await expect(
      page.getByRole("application", { name: field, exact: true }),
    ).toBeFocused();
    await page.getByRole("button", { name: "Exit game" }).click();
    await expect(play).toBeFocused();
  }
  expect(
    await page.evaluate(
      () =>
        (window as Window & { previewViolations?: string[] }).previewViolations,
    ),
  ).toEqual([]);
  expect(errors).toEqual([]);
});

test("deployed mobile and desktop layout, assets, and accessibility remain usable", async ({
  page,
}) => {
  const failures: string[] = [];
  page.on("response", (response) => {
    if (response.status() >= 400 && /\/_next\/static\//.test(response.url()))
      failures.push(response.url());
  });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page
    .getByRole("button", { name: "Choose a game", exact: true })
    .click();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.setViewportSize({ width: 320, height: 900 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(failures).toEqual([]);
});
