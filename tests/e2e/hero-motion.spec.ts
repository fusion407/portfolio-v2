import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const chunkDirectory = join(process.cwd(), ".next/static/chunks");
const rendererChunks = readdirSync(chunkDirectory).filter(
  (file) =>
    file.endsWith(".js") &&
    readFileSync(join(chunkDirectory, file), "utf8").includes(
      "THREE.WebGLRenderer",
    ),
);

test("hero preserves content and static artwork on touch devices", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "Touch fallback");
  await page.goto("/");
  await expect(page.locator(".hero-network-fallback svg")).toBeVisible();
  await page.waitForTimeout(2000);
  await expect(page.locator(".hero-network canvas")).toHaveCount(0);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByRole("link", { name: "Explore my work" }).click();
  await expect(page).toHaveURL(/#work$/);
});

test("reduced motion avoids 3D downloads and keeps scroll content visible", async ({
  page,
}) => {
  const downloads: string[] = [];
  page.on("request", (request) => downloads.push(request.url()));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator("#process").scrollIntoViewIfNeeded();
  await expect(page.locator("#process .section-heading")).toBeVisible();
  expect(
    await page
      .locator("#process .section-heading")
      .evaluate((element) => element.getAnimations().length),
  ).toBe(0);
  await page.locator(".hero-section").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1800);
  await expect(page.locator(".hero-network")).toHaveAttribute(
    "data-scene",
    "static",
  );
  await expect(page.locator(".hero-network canvas")).toHaveCount(0);
  expect(rendererChunks.length).toBeGreaterThan(0);
  expect(
    downloads.some((url) =>
      rendererChunks.some((chunk) => url.includes(chunk)),
    ),
  ).toBe(false);
});

test("eligible desktop renders, pauses, resumes, and falls back after context loss", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "Desktop WebGL enhancement");
  await page.goto("/");
  await expect(page.locator(".hero-network")).toHaveAttribute(
    "data-scene",
    "active",
    { timeout: 20000 },
  );
  const canvas = page.locator(".hero-network canvas");
  await expect(canvas).toBeVisible();
  const dimensions = await canvas.evaluate((element) => ({
    width: (element as HTMLCanvasElement).width,
    client: element.clientWidth,
  }));
  expect(dimensions.width).toBeGreaterThan(0);
  expect(dimensions.width).toBeLessThanOrEqual(
    Math.ceil(dimensions.client * 1.5),
  );
  await page.getByRole("button", { name: "Pause animation" }).click();
  await expect(page.locator(".hero-network")).toHaveAttribute(
    "data-scene",
    "paused",
  );
  await page.getByRole("button", { name: "Resume animation" }).click();
  await expect(page.locator(".hero-network")).toHaveAttribute(
    "data-scene",
    "active",
  );
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(page.locator(".hero-network")).toHaveAttribute(
    "data-scene",
    "paused",
  );
  await page.locator(".hero-section").scrollIntoViewIfNeeded();
  await expect(page.locator(".hero-network")).toHaveAttribute(
    "data-scene",
    "active",
  );
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await canvas.evaluate((element) => {
    const gl = (element as HTMLCanvasElement).getContext("webgl2");
    if (!gl) throw new Error("Expected WebGL2 context");
    gl.getExtension("WEBGL_lose_context")!.loseContext();
  });
  await expect(page.locator(".hero-network")).toHaveAttribute(
    "data-scene",
    "fallback",
  );
  await expect(canvas).toHaveCount(0);
  await expect(page.locator(".hero-network-fallback svg")).toHaveCSS(
    "opacity",
    "1",
  );
  await expect(
    page.getByRole("link", { name: "How I build", exact: true }),
  ).toBeVisible();
});

test("unsupported WebGL and constrained devices retain the static hero", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "Desktop fallback paths");
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      ...args: Parameters<typeof original>
    ) {
      if (String(args[0]).startsWith("webgl")) return null;
      return original.apply(this, args);
    } as typeof original;
  });
  await page.goto("/");
  await expect(page.locator(".hero-network")).toHaveAttribute(
    "data-scene",
    "fallback",
    { timeout: 20000 },
  );
  await expect(page.locator(".hero-network-fallback svg")).toHaveCSS(
    "opacity",
    "1",
  );
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("low-power hints skip the scene", async ({ page, isMobile }) => {
  test.skip(isMobile, "Desktop preference changes");
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "hardwareConcurrency", {
      value: 2,
      configurable: true,
    }),
  );
  await page.goto("/");
  await page.waitForTimeout(1800);
  await expect(page.locator(".hero-network")).toHaveAttribute(
    "data-scene",
    "static",
  );
  await expect(page.locator("canvas")).toHaveCount(0);
});

test("JavaScript-free hero remains complete and project routes do not request the scene", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const noJS = await context.newPage();
  await noJS.goto(baseURL!);
  await expect(noJS.locator(".hero-network-fallback svg")).toBeVisible();
  await expect(
    noJS.getByRole("link", { name: "Explore my work" }),
  ).toBeVisible();
  await context.close();
  const other = await browser.newPage();
  const downloads: string[] = [];
  other.on("request", (request) => downloads.push(request.url()));
  await other.goto(`${baseURL}/projects/neonsynth`);
  await expect(other.locator(".hero-network")).toHaveCount(0);
  await expect(other.locator("canvas")).toHaveCount(0);
  expect(rendererChunks.length).toBeGreaterThan(0);
  expect(
    downloads.some((url) =>
      rendererChunks.some((chunk) => url.includes(chunk)),
    ),
  ).toBe(false);
  await other.close();
});

test("live motion preferences and page visibility pause or remove rendering", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "Desktop live preferences");
  await page.goto("/");
  const hero = page.locator(".hero-network");
  await expect(hero).toHaveAttribute("data-scene", "active", {
    timeout: 20000,
  });
  await page.evaluate(() => {
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      value: "hidden",
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(hero).toHaveAttribute("data-scene", "paused");
  await page.evaluate(() => {
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      value: "visible",
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(hero).toHaveAttribute("data-scene", "active");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(hero).toHaveAttribute("data-scene", "static");
  await expect(hero.locator("canvas")).toHaveCount(0);
  await expect(hero.locator("svg")).toHaveCSS("opacity", "1");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(hero).toHaveAttribute("data-scene", "active", {
    timeout: 20000,
  });
});

test("failed renderer download restores the static network", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "Desktop download failure");
  expect(rendererChunks.length).toBeGreaterThan(0);
  await page.route("**/_next/static/chunks/*.js", (route) =>
    rendererChunks.some((chunk) => route.request().url().includes(chunk))
      ? route.abort()
      : route.continue(),
  );
  await page.goto("/");
  await expect(page.locator(".hero-network")).toHaveAttribute(
    "data-scene",
    "fallback",
    { timeout: 20000 },
  );
  await expect(page.locator(".hero-network-fallback svg")).toHaveCSS(
    "opacity",
    "1",
  );
  await expect(
    page.getByRole("link", { name: "Explore my work" }),
  ).toBeVisible();
});

test("data-saving preference avoids the renderer", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "Desktop data-saving fallback");
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "connection", {
      configurable: true,
      value: Object.assign(new EventTarget(), { saveData: true }),
    }),
  );
  await page.goto("/");
  await page.waitForTimeout(1800);
  await expect(page.locator(".hero-network")).toHaveAttribute(
    "data-scene",
    "static",
  );
  await expect(page.locator("canvas")).toHaveCount(0);
});

test("sustained slow rendering returns to the static network", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "Desktop simulated slow frame delivery");
  await page.addInitScript(() => {
    const interval = window.setInterval.bind(window);
    window.setInterval = ((
      handler: TimerHandler,
      delay?: number,
      ...args: unknown[]
    ) =>
      interval(
        handler,
        delay && delay >= 30 && delay <= 34 ? 120 : delay,
        ...args,
      )) as typeof window.setInterval;
  });
  await page.goto("/");
  await expect(page.locator(".hero-network")).toHaveAttribute(
    "data-scene",
    "active",
    { timeout: 10000 },
  );
  await expect(page.locator(".hero-network")).toHaveAttribute(
    "data-scene",
    "fallback",
    { timeout: 20000 },
  );
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.locator(".hero-network-fallback svg")).toHaveCSS(
    "opacity",
    "1",
  );
});
