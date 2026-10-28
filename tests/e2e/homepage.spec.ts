import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("all homepage sections and internal destinations are available", async ({
  page,
  request,
}) => {
  await page.goto("/");
  for (const id of [
    "work",
    "process",
    "experience",
    "stack",
    "about",
    "contact",
  ]) {
    await expect(page.locator(`#${id}`)).toBeAttached();
    await expect(
      page.locator(`#${id}`).getByRole("heading", { level: 2 }),
    ).toBeVisible();
  }
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  const missingDestinations = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll<HTMLAnchorElement>(
        'a[href^="/"], a[href^="#"]',
      ),
    )
      .map((link) => new URL(link.href))
      .filter(
        (url) =>
          url.pathname === "/" &&
          url.hash &&
          !document.getElementById(url.hash.slice(1)),
      )
      .map((url) => url.pathname + url.hash),
  );
  expect(missingDestinations).toEqual([]);
  const routePaths = await page
    .locator('a[href^="/"]')
    .evaluateAll((links) => [
      ...new Set(
        links.map((link) => new URL((link as HTMLAnchorElement).href).pathname),
      ),
    ]);
  for (const path of routePaths) {
    expect(
      (await request.get(path)).status(),
      `broken homepage route: ${path}`,
    ).toBe(200);
  }
});

test("project summaries disclose accurate work without navigating to unfinished routes", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".project-card")).toHaveCount(4);
  await expect(
    page.getByText("Conceptual artwork · not a product screenshot", {
      exact: true,
    }),
  ).toHaveCount(4);
  const project = page.getByRole("article", { name: "GeoVis", exact: true });
  await project.locator("summary").click();
  await expect(
    project.getByText(/existing architecture developed by others/),
  ).toBeVisible();
  await expect(project.getByText(/not a completed delivery/)).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await project.locator("summary").click();
  await expect(
    project.getByText(/existing architecture developed by others/),
  ).not.toBeVisible();
});

test("mobile disclosure supports navigation, Escape, and focus restoration", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menu = page.locator(".mobile-navigation");
  const trigger = menu.locator("summary");
  await trigger.click();
  await expect(menu).toHaveAttribute("open", "");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await menu.getByRole("link", { name: "Work", exact: true }).focus();
  await page.keyboard.press("Escape");
  await expect(menu).not.toHaveAttribute("open");
  await expect(trigger).toBeFocused();
  await page.keyboard.press("Enter");
  await menu.getByRole("link", { name: "Contact", exact: true }).click();
  await expect(page).toHaveURL(/\/#contact$/);
  await expect(menu).not.toHaveAttribute("open");
  await expect(
    page.getByRole("heading", { name: /Let’s build/ }),
  ).toBeInViewport();
  await expect(page.locator("#contact")).toBeFocused();
});

test("native navigation and project disclosure work without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("/");
  await page.locator(".mobile-navigation summary").click();
  await page
    .getByRole("navigation", { name: "Mobile navigation", exact: true })
    .getByRole("link", { name: "Work", exact: true })
    .click();
  await expect(page).toHaveURL(/\/#work$/);
  // With no JavaScript, the native disclosure remains open and can be closed by its summary.
  await page.locator(".mobile-navigation summary").click();
  const synth = page.getByRole("article", { name: "NeonSynth", exact: true });
  await synth.locator("summary").click();
  await expect(
    synth.getByText(/no browser synthesizer in this release/),
  ).toBeVisible();
  await context.close();
});

test("responsive and enlarged text layouts do not overflow", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  for (const width of [360, 390, 768, 1280, 1536]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      `horizontal overflow at ${width}px`,
    ).toBe(true);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator("html").evaluate((element) => {
    element.style.fontSize = "200%";
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
    "horizontal overflow with enlarged text",
  ).toBe(true);
});

test("reduced motion keeps the page and its controls usable", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("link", { name: "Explore my work" }).click();
  await expect(page).toHaveURL(/\/#work$/);
  const project = page.getByRole("article", {
    name: "TitanForge Studio",
    exact: true,
  });
  await project.locator("summary").click();
  await expect(project.getByText(/early prototype/)).toBeVisible();
});
