import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const chunksPath = join(process.cwd(), ".next/static/chunks");
const paletteChunks = readdirSync(chunksPath).filter(
  (file) =>
    file.endsWith(".js") &&
    readFileSync(join(chunksPath, file), "utf8").includes("cmdk-list-sizer"),
);

test("visible search trigger opens an accessible focused dialog and restores focus", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Search portfolio" });
  if (isMobile) await trigger.tap();
  else await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Go somewhere." });
  const input = dialog.getByRole("combobox", {
    name: "Search projects and pages",
  });
  await expect(dialog).toBeVisible();
  await expect(input).toBeFocused();
  await expect(dialog.getByRole("option")).toHaveCount(15);
  await expect(
    dialog.getByRole("option", { name: /download|résumé|resume/i }),
  ).toHaveCount(0);
  for (let index = 0; index < 4; index++) {
    await page.keyboard.press("Tab");
    expect(
      await dialog.evaluate((element) =>
        element.contains(document.activeElement),
      ),
    ).toBe(true);
  }
  await page.keyboard.press("Shift+Tab");
  expect(
    await dialog.evaluate((element) =>
      element.contains(document.activeElement),
    ),
  ).toBe(true);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await dialog.getByRole("button", { name: "Close search" }).click();
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test("dialog code loads on demand and a failed download offers focused navigation", async ({
  page,
}) => {
  expect(paletteChunks.length).toBeGreaterThan(0);
  const requests: string[] = [];
  page.on("request", (request) => requests.push(request.url()));
  await page.goto("/projects/neonsynth");
  await expect(
    page.getByRole("button", { name: "Search portfolio" }),
  ).toBeVisible();
  expect(
    requests.some((url) => paletteChunks.some((chunk) => url.includes(chunk))),
  ).toBe(false);
  await page.route("**/_next/static/chunks/*.js", (route) =>
    paletteChunks.some((chunk) => route.request().url().includes(chunk))
      ? route.abort()
      : route.continue(),
  );
  await page.getByRole("button", { name: "Search portfolio" }).click();
  await expect(
    page.getByRole("link", { name: "Browse projects" }),
  ).toBeFocused();
  await expect(page.getByRole("status")).toContainText("Search is unavailable");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("link", { name: "Browse projects" }).click();
  await expect(page).toHaveURL(/\/projects$/);
});

test("Ctrl and Command shortcuts open, toggle, reset search, and preserve modified shortcuts", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Search portfolio" });
  await expect(trigger).toBeVisible();
  await trigger.focus();
  for (const key of ["Control+k", "Meta+k"]) {
    await page.keyboard.press(key);
    const input = page.getByRole("combobox", {
      name: "Search projects and pages",
    });
    await expect(input).toBeFocused();
    await input.fill("neon");
    await page.keyboard.press(key);
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(trigger).toBeFocused();
    await page.keyboard.press(key);
    await expect(input).toHaveValue("");
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
  }
  await page.keyboard.press("Control+Shift+k");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.keyboard.press("Control+Alt+k");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("title filtering, empty results, arrows, and Enter navigate to a real project", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Search portfolio" }).click();
  const input = page.getByRole("combobox", {
    name: "Search projects and pages",
  });
  await input.fill("not-a-real-project-xyz");
  await expect(
    page.getByText("No results found. Try a project title or section name."),
  ).toBeVisible();
  await expect(page.getByRole("option")).toHaveCount(0);
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog")).toBeVisible();
  await input.fill("NEON");
  await expect(page.getByRole("option")).toHaveCount(1);
  await expect(page.getByRole("option", { name: /NeonSynth/ })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await input.fill("");
  await expect(
    page.getByRole("option", { name: "Home Introduction", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("ArrowUp");
  await expect(page.getByRole("option", { name: /LinkedIn/ })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await page.keyboard.press("ArrowDown");
  await expect(
    page.getByRole("option", { name: "Home Introduction", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
  await input.fill("Swordbound");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/projects\/swordbound-protocol$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Swordbound: Protocol" }),
  ).toBeVisible();
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("homepage section commands work from case studies and focus their destination", async ({
  page,
}) => {
  await page.goto("/projects/geovis");
  await page.getByRole("button", { name: "Search portfolio" }).click();
  await page
    .getByRole("combobox", { name: "Search projects and pages" })
    .fill("Process");
  await page.getByRole("option", { name: /Process/ }).click();
  await expect(page).toHaveURL(/\/#process$/);
  await expect(page.locator("#process")).toBeFocused();
  await page.getByRole("button", { name: "Search portfolio" }).click();
  await page
    .getByRole("combobox", { name: "Search projects and pages" })
    .fill("Contact");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/#contact$/);
  await expect(page.locator("#contact")).toBeFocused();
});

test("Escape and overlay dismissal restore the actual invoking element", async ({
  page,
}) => {
  await page.goto("/projects/neonsynth");
  const origin = page.getByRole("link", { name: "Back to top" });
  await origin.focus();
  await page.keyboard.press("Control+k");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(origin).toBeFocused();
  await page.keyboard.press("Meta+k");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.mouse.click(2, 2);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(origin).toBeFocused();
});

test("professional profile commands use the confirmed same-tab destinations", async ({
  page,
}) => {
  for (const [label, href] of [
    ["GitHub", "https://github.com/fusion407"],
    ["LinkedIn", "https://www.linkedin.com/in/brady-dorsey-9a582279"],
  ]) {
    await page.route(href!, (route) =>
      route.fulfill({
        contentType: "text/html",
        body: "<html><body>Profile destination intercepted by test</body></html>",
      }),
    );
    await page.goto("/");
    await page.getByRole("button", { name: "Search portfolio" }).click();
    await page
      .getByRole("combobox", { name: "Search projects and pages" })
      .fill(label!);
    await page.getByRole("option", { name: new RegExp(label!) }).click();
    await expect(page).toHaveURL(href!);
  }
});

test("search reflows on narrow screens, enlarged text, and reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/projects");
  for (const width of [320, 360, 390, 768, 1280, 1536]) {
    await page.setViewportSize({ width, height: 800 });
    await page.getByRole("button", { name: "Search portfolio" }).click();
    const box = await page.getByRole("dialog").boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(width);
    await expect(page.getByRole("combobox")).toBeFocused();
    await page.keyboard.press("Escape");
  }
  await page.setViewportSize({ width: 390, height: 800 });
  await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
  await page.getByRole("button", { name: "Search portfolio" }).click();
  await expect(page.getByRole("combobox")).toBeVisible();
  const overflow = await page
    .getByRole("dialog")
    .evaluate((element) => element.scrollWidth > element.clientWidth + 1);
  expect(overflow).toBe(false);
  await page.getByRole("button", { name: "Close search" }).click();
});

test("without JavaScript the search slot offers a working project index link", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${baseURL}/projects/geovis`);
  await expect(
    page.getByRole("button", { name: "Search portfolio" }),
  ).toHaveCount(0);
  await page.getByRole("link", { name: "Browse projects" }).click();
  await expect(page).toHaveURL(`${baseURL}/projects`);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /Built with intent\.\s*Always evolving\./,
    }),
  ).toBeVisible();
  await context.close();
});
