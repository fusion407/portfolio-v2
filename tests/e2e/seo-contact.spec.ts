import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { portfolioPages } from "../../src/content/pages";
import { professional } from "../../src/content/professional";

test("every content page has distinct metadata and a working social card while remaining noindex", async ({
  page,
  request,
}) => {
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  for (const entry of portfolioPages) {
    const response = await page.goto(entry.path);
    expect(response?.status()).toBe(200);
    expect(response?.headers()["x-robots-tag"]).toBe("noindex, nofollow");
    await expect(page).toHaveTitle(entry.title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      entry.description,
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, nofollow",
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      entry.title,
    );
    await expect(
      page.locator('meta[property="og:description"]'),
    ).toHaveAttribute("content", entry.description);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );
    const imageURL = await page
      .locator('meta[property="og:image"]')
      .getAttribute("content");
    const image = await request.get(new URL(imageURL!).pathname);
    expect(image.status()).toBe(200);
    expect(image.headers()["content-type"]).toContain("image/png");
    const bytes = await image.body();
    expect(bytes.subarray(1, 4).toString()).toBe("PNG");
    expect([bytes.readUInt32BE(16), bytes.readUInt32BE(20)]).toEqual([
      1200, 630,
    ]);
    titles.add(entry.title);
    descriptions.add(entry.description);
  }
  expect(titles.size).toBe(portfolioPages.length);
  expect(descriptions.size).toBe(portfolioPages.length);
});

test("preview robots and sitemap exclude all URLs; unknown social images return 404", async ({
  request,
}) => {
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("Disallow: /");
  expect(await robots.text()).not.toContain("Sitemap:");
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain("<urlset");
  expect(await sitemap.text()).not.toContain("<loc>");
  expect((await request.get("/og/unknown-page")).status()).toBe(404);
});

test("homepage Person schema reflects supplied facts without inferred employment dates", async ({
  page,
}) => {
  await page.goto("/");
  const schema = JSON.parse(
    await page.locator('script[type="application/ld+json"]').innerText(),
  );
  expect(schema["@type"]).toBe("Person");
  expect(schema.name).toBe("Brady Dorsey");
  expect(schema.email).toBe("fusion407@gmail.com");
  expect(schema.sameAs).toContain("https://github.com/fusion407");
  expect(schema).not.toHaveProperty("worksFor");
  expect(schema).not.toHaveProperty("birthDate");
});

test("contact and palette use the confirmed public email while résumé remains deferred", async ({
  page,
  request,
}) => {
  await page.goto("/#contact");
  await expect(
    page.getByRole("link", { name: professional.publicEmail }),
  ).toHaveAttribute("href", `mailto:${professional.publicEmail}`);
  await expect(page.locator('a[href="/resume"], a[download]')).toHaveCount(0);
  expect((await request.get("/resume")).status()).toBe(404);
  expect((await request.get("/og/resume")).status()).toBe(404);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.getByRole("button", { name: "Search portfolio" }).click();
  await page.getByRole("combobox").fill("email");
  await expect(
    page.getByRole("option", { name: /Email Brady fusion407@gmail.com/ }),
  ).toBeVisible();
  await page.getByRole("combobox").fill("resume");
  await expect(page.getByRole("option")).toHaveCount(0);
  await page.keyboard.press("Escape");
});

test("public email works without JavaScript and reflows with enlarged text", async ({
  browser,
  baseURL,
  page,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const noJS = await context.newPage();
  await noJS.goto(baseURL!);
  await expect(
    noJS.getByRole("link", { name: professional.publicEmail }),
  ).toHaveAttribute("href", `mailto:${professional.publicEmail}`);
  await expect(noJS.locator('a[href="/resume"], a[download]')).toHaveCount(0);
  await context.close();
  await page.goto("/#contact");
  for (const width of [360, 390, 768, 1280, 1536]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.setViewportSize({ width: 390, height: 900 });
  await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
