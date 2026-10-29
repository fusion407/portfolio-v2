import { expect, test, type Locator, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
const chunksPath = join(process.cwd(), ".next/static/chunks");
const asteroidChunks = readdirSync(chunksPath).filter(
  (file) =>
    file.endsWith(".js") &&
    readFileSync(join(chunksPath, file), "utf8").includes("Asteroids field"),
);
async function start(page: Page) {
  await page
    .getByRole("button", { name: "Choose a game", exact: true })
    .click();
  await page.getByRole("button", { name: /^Asteroids/ }).click();
  const field = page.getByRole("application", { name: "Asteroids field" });
  await expect(field).toBeFocused();
  return field;
}
async function shipY(field: Locator) {
  return field.evaluate((element) => {
    const canvas = element as HTMLCanvasElement;
    const pixels = canvas
      .getContext("2d")!
      .getImageData(0, 0, canvas.width, canvas.height).data;
    let total = 0;
    let count = 0;
    for (let index = 0; index < pixels.length; index += 4) {
      if (
        pixels[index]! < 90 &&
        pixels[index + 1]! > 145 &&
        pixels[index + 2]! > 200
      ) {
        total += Math.floor(index / 4 / canvas.width);
        count++;
      }
    }
    if (!count) throw new Error("The cyan ship should be drawn");
    return ((total / count) * 480) / canvas.height;
  });
}
test("minimal cover opens a keyboard picker without loading either game", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (request) => requests.push(request.url()));
  await page.goto("/");
  const arcade = page.locator(".hero-arcade");
  await expect(arcade).toHaveText("A little side quest01 / PONG");
  const play = page.getByRole("button", { name: "Choose a game", exact: true });
  await expect(play).toHaveText("");
  await play.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: /^Pong/ })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: /^Asteroids/ })).toBeFocused();
  await expect(page.locator("canvas")).toHaveCount(0);
  expect(asteroidChunks.length).toBeGreaterThan(0);
  expect(
    requests.some((url) => asteroidChunks.some((chunk) => url.includes(chunk))),
  ).toBe(false);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(play).toBeFocused();
});
test("Asteroids loads on selection, flies, pauses, restarts, and switches to Pong", async ({
  page,
}) => {
  await page.goto("/");
  const field = await start(page);
  await expect(page.locator(".arcade-heading")).toContainText("02 / ASTEROIDS");
  const initial = await shipY(field);
  await page.keyboard.down("ArrowUp");
  try {
    await expect.poll(() => shipY(field)).toBeLessThan(initial - 5);
  } finally {
    await page.keyboard.up("ArrowUp");
  }
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Resume Asteroids" }),
  ).toBeFocused();
  const frozen = await field.evaluate((element) =>
    (element as HTMLCanvasElement).toDataURL(),
  );
  await page.waitForTimeout(180);
  expect(
    await field.evaluate((element) =>
      (element as HTMLCanvasElement).toDataURL(),
    ),
  ).toBe(frozen);
  await page.getByRole("button", { name: "Restart Asteroids" }).click();
  await expect(field).toBeFocused();
  await expect(
    page.locator(".asteroids-game").getByRole("status"),
  ).toContainText("Score 0. 3 lives. Wave 1.");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.getByRole("button", { name: "Exit game" }).click();
  await expect(
    page.getByRole("button", { name: "Choose a game", exact: true }),
  ).toBeFocused();
  await page
    .getByRole("button", { name: "Choose a game", exact: true })
    .click();
  await page.getByRole("button", { name: /^Pong/ }).click();
  await expect(
    page.getByRole("application", { name: "Pong court" }),
  ).toBeFocused();
});
test("Asteroids flight buttons work and focus, visibility, and scroll pause play", async ({
  page,
}) => {
  await page.goto("/");
  const field = await start(page);
  const initial = await shipY(field);
  const thrust = page.getByRole("button", { name: "Thrust", exact: true });
  await thrust.focus();
  await page.keyboard.down("Enter");
  try {
    await expect.poll(() => shipY(field)).toBeLessThan(initial - 5);
  } finally {
    await page.keyboard.up("Enter");
  }
  // Use actual pointer events for the same controls used by touch.
  const fire = page.getByRole("button", { name: "Fire", exact: true });
  await fire.hover();
  await page.mouse.down();
  await page.mouse.up();
  await field.focus();
  await page.keyboard.press("Control+k");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Resume Asteroids" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Resume Asteroids" }).click();
  await page.evaluate(() => {
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      value: "hidden",
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(
    page.getByRole("button", { name: "Resume Asteroids" }),
  ).toBeVisible();
  await page.evaluate(() => {
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      value: "visible",
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await page.getByRole("button", { name: "Resume Asteroids" }).click();
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(
    page.locator(".asteroids-game").getByRole("status"),
  ).toContainText("Paused");
});

test("a short Fire tap launches a visible shot with pointer and touch controls", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  const field = await start(page);
  const fire = page.getByRole("button", { name: "Fire", exact: true });
  if (isMobile) {
    const box = (await fire.boundingBox())!;
    await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
  } else await fire.click();
  await expect
    .poll(
      () =>
        field.evaluate((element) => {
          const canvas = element as HTMLCanvasElement;
          const pixels = canvas
            .getContext("2d")!
            .getImageData(0, 0, canvas.width, canvas.height).data;
          let white = 0;
          for (let index = 0; index < pixels.length; index += 4)
            if (
              pixels[index]! > 220 &&
              pixels[index + 1]! > 220 &&
              pixels[index + 2]! > 220
            )
              white++;
          return white;
        }),
      { intervals: [20, 50, 100] },
    )
    .toBeGreaterThan(2);
});
test("picker and Asteroids reflow at 320 pixels and enlarged text", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page
    .getByRole("button", { name: "Choose a game", exact: true })
    .click();
  for (const active of [false, true]) {
    if (active) {
      await page.getByRole("button", { name: /^Asteroids/ }).click();
      await expect(page.getByRole("application")).toBeFocused();
    }
    for (const width of [320, 390, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
  }
  await page.setViewportSize({ width: 390, height: 900 });
  await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
test("Asteroids download and canvas failures preserve recovery and exit", async ({
  page,
}) => {
  await page.route("**/_next/static/chunks/*.js", (route) =>
    asteroidChunks.some((chunk) => route.request().url().includes(chunk))
      ? route.abort()
      : route.continue(),
  );
  await page.goto("/");
  await page
    .getByRole("button", { name: "Choose a game", exact: true })
    .click();
  await page.getByRole("button", { name: /^Asteroids/ }).click();
  await expect(page.locator(".hero-arcade").getByRole("alert")).toContainText(
    "The game couldn’t load",
  );
  await page.getByRole("button", { name: /^Pong/ }).click();
  await expect(
    page.getByRole("application", { name: "Pong court" }),
  ).toBeFocused();
  await page.unrouteAll();
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      ...args: Parameters<typeof original>
    ) {
      return args[0] === "2d" ? null : original.apply(this, args);
    } as typeof original;
  });
  await page.reload();
  await page
    .getByRole("button", { name: "Choose a game", exact: true })
    .click();
  await page.getByRole("button", { name: /^Asteroids/ }).click();
  await expect(page.locator(".hero-arcade").getByRole("alert")).toContainText(
    "couldn’t open the asteroid field",
  );
  await page.getByRole("button", { name: "Exit game" }).click();
  await expect(
    page.getByRole("button", { name: "Choose a game", exact: true }),
  ).toBeFocused();
});
