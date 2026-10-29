import { expect, test, type Locator } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
const chunksPath = join(process.cwd(), ".next/static/chunks");
const gameChunks = readdirSync(chunksPath).filter(
  (file) =>
    file.endsWith(".js") &&
    readFileSync(join(chunksPath, file), "utf8").includes("Pong court"),
);

async function paddleY(canvas: Locator) {
  return canvas.evaluate((element) => {
    const court = element as HTMLCanvasElement;
    const scale = court.width / 800;
    const pixels = court
      .getContext("2d")!
      .getImageData(Math.floor(35 * scale), 0, 1, court.height).data;
    const rows: number[] = [];
    for (let row = 0; row < court.height; row++)
      if (
        pixels[row * 4]! < 100 &&
        pixels[row * 4 + 1]! > 130 &&
        pixels[row * 4 + 2]! > 180
      )
        rows.push(row);
    if (!rows.length) throw new Error("Player paddle should be drawn");
    return rows.reduce((a, b) => a + b, 0) / rows.length / scale;
  });
}

test("Pong is opt-in, deferred, focused, and leaves hero navigation available", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (request) => requests.push(request.url()));
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Play Pong" })).toBeEnabled();
  await expect(page.locator("canvas")).toHaveCount(0);
  expect(gameChunks.length).toBeGreaterThan(0);
  expect(
    requests.some((url) => gameChunks.some((chunk) => url.includes(chunk))),
  ).toBe(false);
  await page.getByRole("button", { name: "Play Pong" }).click();
  await expect(
    page.getByRole("application", { name: "Pong court" }),
  ).toBeFocused();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    /I buildthings\./,
  );
  await expect(
    page.getByRole("link", { name: "Explore my work" }),
  ).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.getByRole("button", { name: "Exit game" }).click();
  await expect(page.getByRole("button", { name: "Play Pong" })).toBeFocused();
  await expect(page.locator("canvas")).toHaveCount(0);
});

test("keyboard controls move the paddle and pause freezes the court", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Play Pong" }).click();
  const court = page.getByRole("application", { name: "Pong court" });
  await expect(court).toBeFocused();
  const initial = await paddleY(court);
  await page.keyboard.down("ArrowUp");
  await page.waitForTimeout(180);
  await page.keyboard.up("ArrowUp");
  expect(await paddleY(court)).toBeLessThan(initial - 25);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Resume Pong" })).toBeFocused();
  const paused = await court.evaluate((element) =>
    (element as HTMLCanvasElement).toDataURL(),
  );
  await page.waitForTimeout(150);
  expect(
    await court.evaluate((element) =>
      (element as HTMLCanvasElement).toDataURL(),
    ),
  ).toBe(paused);
  await page.getByRole("button", { name: "Resume Pong" }).click();
  await expect(court).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Pause Pong" })).toBeFocused();
});

test("pointer or touch controls the paddle, a missed ball scores, and restart resets", async ({
  page,
  isMobile,
}) => {
  test.setTimeout(45000);
  await page.goto("/");
  await page.getByRole("button", { name: "Play Pong" }).click();
  const court = page.getByRole("application", { name: "Pong court" });
  await expect(court).toBeFocused();
  const box = (await court.boundingBox())!;
  if (isMobile)
    await page.touchscreen.tap(
      box.x + box.width * 0.25,
      box.y + box.height * 0.98,
    );
  else
    await page.mouse.move(box.x + box.width * 0.25, box.y + box.height * 0.98);
  await expect.poll(() => paddleY(court)).toBeGreaterThan(350);
  await expect(page.locator(".pong-game").getByRole("status")).toContainText(
    /computer [1-5]/,
    { timeout: 12000 },
  );
  await expect(page.locator(".pong-game").getByRole("status")).toContainText(
    "Computer wins! 0 to 5.",
    { timeout: 25000 },
  );
  await expect(page.locator(".pong-controls button").first()).toBeDisabled();
  await page.getByRole("button", { name: "Restart Pong" }).click();
  await expect(page.locator(".pong-game").getByRole("status")).toContainText(
    "You 0, computer 0",
  );
  await expect(court).toBeFocused();
});

test("focus loss, search, hidden pages, and leaving the hero pause play", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Play Pong" }).click();
  await expect(page.getByRole("application")).toBeFocused();
  await page.keyboard.press("Control+k");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Resume Pong" })).toBeVisible();
  await page.getByRole("button", { name: "Resume Pong" }).click();
  await page.evaluate(() => {
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      value: "hidden",
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(page.getByRole("button", { name: "Resume Pong" })).toBeVisible();
  await page.evaluate(() => {
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      value: "visible",
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await page.getByRole("button", { name: "Resume Pong" }).click();
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(page.locator(".pong-game").getByRole("status")).toContainText(
    "Paused",
  );
});

test("arcade reflows on mobile and enlarged text; reduced motion never starts a game", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("canvas")).toHaveCount(0);
  await page.getByRole("button", { name: "Play Pong" }).click();
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
  await page.getByRole("button", { name: "Exit game" }).click();
  await expect(page.getByRole("button", { name: "Play Pong" })).toBeFocused();
});

test("failed game download and unavailable canvas preserve an exit", async ({
  page,
}) => {
  await page.route("**/_next/static/chunks/*.js", (route) =>
    gameChunks.some((chunk) => route.request().url().includes(chunk))
      ? route.abort()
      : route.continue(),
  );
  await page.goto("/");
  await page.getByRole("button", { name: "Play Pong" }).click();
  await expect(page.locator(".hero-arcade").getByRole("alert")).toContainText(
    "The game couldn’t load",
  );
  await expect(
    page.getByRole("button", { name: "Reload to try again" }),
  ).toBeVisible();
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
  await page.getByRole("button", { name: "Play Pong" }).click();
  await expect(page.locator(".hero-arcade").getByRole("alert")).toContainText(
    "couldn’t open the court",
  );
  await page.getByRole("button", { name: "Exit game" }).click();
  await expect(page.getByRole("button", { name: "Play Pong" })).toBeFocused();
});

test("no-JavaScript visitors retain the portfolio and a clear game availability note", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(baseURL!);
  await expect(page.getByRole("button", { name: "Play Pong" })).toBeDisabled();
  await expect(
    page.getByText(
      "Enable JavaScript to play. The portfolio is ready to explore below.",
    ),
  ).toBeVisible();
  await page.getByRole("link", { name: "Explore my work" }).click();
  await expect(page).toHaveURL(/#work$/);
  await context.close();
});
