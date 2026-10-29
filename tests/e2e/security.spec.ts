import { expect, test } from "@playwright/test";

test("production security policy permits the portfolio and its opt-in interactions", async ({
  page,
  request,
}) => {
  await page.addInitScript(() => {
    const violations: string[] = [];
    Object.defineProperty(window, "qaPolicyViolations", { value: violations });
    document.addEventListener("securitypolicyviolation", (event) =>
      violations.push(event.effectiveDirective),
    );
  });
  const response = await page.goto("/");
  const csp = response?.headers()["content-security-policy"];
  expect(csp).toContain("default-src 'self'");
  for (const directive of [
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'none'",
    "frame-ancestors 'none'",
    "connect-src 'self'",
  ])
    expect(csp).toContain(directive);
  expect(csp).not.toContain("unsafe-eval");
  expect(response?.headers()["x-powered-by"]).toBeUndefined();
  expect(response?.headers()["permissions-policy"]).toBe(
    "camera=(), microphone=(), geolocation=()",
  );
  await page.getByRole("button", { name: "Search portfolio" }).click();
  await page.getByRole("combobox").fill("Pong");
  await page.keyboard.press("Escape");
  await page
    .getByRole("button", { name: "Choose a game", exact: true })
    .click();
  await page.getByRole("button", { name: /^Pong/ }).click();
  await expect(
    page.getByRole("application", { name: "Pong court" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Exit game" }).click();
  await page
    .getByRole("button", { name: "Choose a game", exact: true })
    .click();
  await page.getByRole("button", { name: /^Asteroids/ }).click();
  await expect(
    page.getByRole("application", { name: "Asteroids field" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Exit game" }).click();
  expect(
    await page.evaluate(
      () =>
        (window as Window & { qaPolicyViolations?: string[] })
          .qaPolicyViolations,
    ),
  ).toEqual([]);
  for (const path of [
    "/projects",
    "/projects/swordbound-protocol",
    "/og/home",
    "/robots.txt",
    "/sitemap.xml",
    "/not-a-route",
  ]) {
    const result = await request.get(path);
    expect(result.headers()["content-security-policy"]).toBe(csp);
    expect(result.headers()["x-content-type-options"]).toBe("nosniff");
  }
});
