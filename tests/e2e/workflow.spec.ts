import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const stageTitles = [
  "Brainstorm with AI",
  "Refine the design",
  "Architect the system",
  "Plan milestones",
  "Build master context",
  "Implement with agents",
  "Test personally",
  "Give feedback. Repeat.",
];

test("all eight stages expose purpose, inputs, and outputs using pointer or touch", async ({
  page,
  isMobile,
}) => {
  await page.goto("/#process");
  const stages = page.getByRole("list", {
    name: "Development stages",
    exact: true,
  });
  await expect(stages.getByRole("button")).toHaveCount(8);
  const panel = page.locator("#workflow-detail-panel");
  for (const title of stageTitles) {
    const control = stages.getByRole("button", {
      name: new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    });
    if (isMobile) await control.tap();
    else await control.click();
    await expect(control).toHaveAttribute("aria-pressed", "true");
    await expect(stages.locator('button[aria-pressed="true"]')).toHaveCount(1);
    await expect(
      panel.getByRole("heading", { name: title, exact: true }),
    ).toBeVisible();
    await expect(panel.locator("dt")).toHaveText([
      "Purpose",
      "Inputs",
      "Outputs",
    ]);
    const values = await panel.locator("dd").allTextContents();
    expect(values.length).toBe(3);
    expect(values.every((value) => value.trim().length > 0)).toBe(true);
  }
  expect(
    (await new AxeBuilder({ page }).include("#process").analyze()).violations,
  ).toEqual([]);
});

test("keyboard navigation supports normal activation, arrows, Home/End, and exit", async ({
  page,
}) => {
  await page.goto("/#process");
  const stages = page.getByRole("list", {
    name: "Development stages",
    exact: true,
  });
  const first = stages.getByRole("button", { name: /Brainstorm with AI/ });
  const second = stages.getByRole("button", { name: /Refine the design/ });
  const third = stages.getByRole("button", { name: /Architect the system/ });
  const last = stages.getByRole("button", { name: /Give feedback/ });
  await first.focus();
  await page.keyboard.press("Tab");
  await expect(second).toBeFocused();
  await expect(first).toHaveAttribute("aria-pressed", "true");
  await page.keyboard.press("Space");
  await expect(second).toHaveAttribute("aria-pressed", "true");
  await page.keyboard.press("Tab");
  await expect(third).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(third).toHaveAttribute("aria-pressed", "true");
  await page.keyboard.press("End");
  await expect(last).toBeFocused();
  await expect(last).toHaveAttribute("aria-pressed", "true");
  await page.keyboard.press("Control+Home");
  await expect(last).toHaveAttribute("aria-pressed", "true");
  await last.focus();
  await page.keyboard.press("ArrowRight");
  await expect(first).toBeFocused();
  await page.keyboard.press("ArrowLeft");
  await expect(last).toBeFocused();
  await page.keyboard.press("Home");
  await expect(first).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(second).toBeFocused();
  await page.keyboard.press("ArrowUp");
  await expect(first).toBeFocused();
  await page.keyboard.press("End");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: /Return to implementation/ }),
  ).toBeFocused();
});

test("testing and feedback lead back to implementation with focus", async ({
  page,
}) => {
  await page.goto("/#process");
  const stages = page.getByRole("list", {
    name: "Development stages",
    exact: true,
  });
  await stages.getByRole("button", { name: /Test personally/ }).click();
  await expect(
    page.getByRole("region", { name: "Selected stage: Test personally" }),
  ).toBeVisible();
  await stages.getByRole("button", { name: /Give feedback/ }).click();
  await page.getByRole("button", { name: /Return to implementation/ }).click();
  const implement = stages.getByRole("button", {
    name: /Implement with agents/,
  });
  await expect(implement).toBeFocused();
  await expect(implement).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.getByRole("region", { name: "Selected stage: Implement with agents" }),
  ).toBeVisible();
  await expect(page.getByRole("status")).toHaveText(/Showing stage 6 of 8/);
});

test("the complete readable view exposes all stages and stays accessible", async ({
  page,
}) => {
  await page.goto("/#process");
  const reference = page.locator(".workflow-reference");
  await reference.locator("summary").click();
  await expect(reference).toHaveAttribute("open", "");
  for (const title of stageTitles) {
    await expect(
      reference.getByRole("heading", { name: title, exact: true }),
    ).toBeVisible();
  }
  await expect(reference.locator("dt")).toHaveCount(24);
  expect(
    (await new AxeBuilder({ page }).include("#process").analyze()).violations,
  ).toEqual([]);
  await reference.locator("summary").click();
  await expect(reference).not.toHaveAttribute("open");
});

test("without JavaScript, stage and feedback links reveal native full descriptions", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("/#process");
  const stages = page.getByRole("list", {
    name: "Development stages",
    exact: true,
  });
  await expect(stages.getByRole("link")).toHaveCount(8);
  await expect(stages.getByRole("button")).toHaveCount(0);
  await stages.getByRole("link", { name: /Test personally/ }).click();
  await expect(page).toHaveURL(/#workflow-reference-test$/);
  await expect(page.locator(".workflow-reference")).toHaveAttribute("open", "");
  await expect(
    page
      .locator("#workflow-reference-test")
      .getByText("Outputs", { exact: true }),
  ).toBeVisible();
  await expect(page.locator("#workflow-reference-test")).toBeFocused();
  await page.getByRole("link", { name: /Return to implementation/ }).click();
  await expect(page).toHaveURL(/#workflow-reference-implement$/);
  await expect(page.locator("#workflow-reference-implement")).toBeFocused();
  await expect(
    page
      .locator("#workflow-reference-implement")
      .getByText("Inputs", { exact: true }),
  ).toBeVisible();
  await context.close();
});

test("reduced-motion selection and enlarged layouts remain usable", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#process");
  const control = page
    .getByRole("list", { name: "Development stages", exact: true })
    .getByRole("button", { name: /Test personally/ });
  await control.click();
  expect(
    await control.evaluate(
      (element) => getComputedStyle(element).transitionDuration,
    ),
  ).toBe("0s");
  for (const width of [360, 390, 768, 1280, 1536]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      `workflow overflow at ${width}px`,
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
  ).toBe(true);
  await expect(
    page.getByRole("region", { name: "Selected stage: Test personally" }),
  ).toBeVisible();
});
