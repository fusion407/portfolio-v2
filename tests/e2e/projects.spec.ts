import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const caseStudies = [
  { slug: "geovis", title: "GeoVis", status: "In development" },
  { slug: "neonsynth", title: "NeonSynth", status: "In development" },
  {
    slug: "titanforge-studio",
    title: "TitanForge Studio",
    status: "Early prototype",
  },
  {
    slug: "swordbound-protocol",
    title: "Swordbound: Protocol",
    status: "Unreleased",
  },
] as const;

for (const project of caseStudies) {
  test(`${project.title} has an accessible, accurate static case study`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto(`/projects/${project.slug}`);
    expect(response?.status()).toBe(200);
    expect(response?.headers()["x-robots-tag"]).toBe("noindex, nofollow");
    await expect(page).toHaveTitle(`${project.title} — Brady Dorsey`);
    await expect(
      page.getByRole("heading", { level: 1, name: project.title, exact: true }),
    ).toHaveCount(1);
    await expect(page.getByRole("banner")).toHaveCount(1);
    await expect(page.getByRole("main")).toHaveCount(1);
    await expect(page.getByRole("contentinfo")).toHaveCount(1);
    if (project.slug === "neonsynth")
      await expect(
        page.locator(".case-facts").getByText("Status", { exact: true }),
      ).toHaveCount(0);
    else
      await expect(
        page.locator(".case-facts").getByText(project.status, { exact: true }),
      ).toBeVisible();
    await expect(
      page.getByText("Conceptual artwork · not a product screenshot", {
        exact: true,
      }),
    ).toHaveCount(0);
    await expect(page.locator(".case-cover img")).toHaveCount(1);
    await page.locator(".case-cover img").scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        page
          .locator(".case-cover img")
          .evaluate(
            (image: HTMLImageElement) =>
              image.complete && image.naturalWidth > 0,
          ),
      )
      .toBe(true);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test("project index and next-project navigation form a complete route loop", async ({
  page,
}) => {
  await page.goto("/projects");
  await expect(page).toHaveTitle("Projects — Brady Dorsey");
  await expect(page.locator(".project-card")).toHaveCount(4);
  for (const project of caseStudies) {
    await expect(
      page.getByRole("heading", { level: 2, name: project.title, exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", {
        name: `Explore project: ${project.title}`,
        exact: true,
      }),
    ).toHaveAttribute("href", `/projects/${project.slug}`);
  }
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page
    .getByRole("link", { name: "Explore project: GeoVis", exact: true })
    .click();
  for (const slug of [
    "geovis",
    "neonsynth",
    "titanforge-studio",
    "swordbound-protocol",
  ]) {
    await expect(page).toHaveURL(new RegExp(`/projects/${slug}$`));
    await page
      .getByRole("navigation", { name: "Project navigation", exact: true })
      .locator(".next-project")
      .click();
  }
  await expect(page).toHaveURL(/\/projects\/geovis$/);
  await page.getByRole("link", { name: "All projects", exact: true }).click();
  await expect(page).toHaveURL(/\/projects$/);
});

test("project content uses actual media and removes superseded status panels", async ({
  page,
}) => {
  await page.goto("/projects/geovis");
  await expect(
    page
      .locator("#overview")
      .getByText(/existing architecture developed by others/),
  ).toBeVisible();
  await expect(
    page
      .locator("#migration")
      .getByRole("heading", { name: "Existing cloud application" }),
  ).toBeVisible();
  await expect(
    page
      .locator("#migration")
      .getByText("In development / target", { exact: true }),
  ).toBeVisible();
  await expect(
    page.locator("#status").getByText(/not a completed delivery/),
  ).toBeVisible();

  await page.goto("/projects/neonsynth");
  await expect(page.locator("#playground, #status")).toHaveCount(0);
  await expect(
    page.getByRole("img", { name: /NeonSynth synthesizer interface/ }),
  ).toBeVisible();

  await page.goto("/projects/titanforge-studio");
  await expect(
    page
      .locator("#status")
      .getByText(/planned capabilities are not presented as implemented/),
  ).toBeVisible();

  const thirdPartyRequests: string[] = [];
  page.on("request", (request) => {
    if (/youtube\.com|ytimg\.com/.test(request.url()))
      thirdPartyRequests.push(request.url());
  });
  await page.goto("/projects/swordbound-protocol");
  await expect(page.locator("#contributions li")).toHaveCount(9);
  await expect(page.locator("#status")).toHaveCount(0);
  await expect(
    page.getByText(/produced by a third party|individual cinematic work/),
  ).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "Watch on YouTube" }),
  ).toHaveAttribute("href", "https://www.youtube.com/watch?v=lIJIB93M_BQ");
  await expect(page.locator("iframe, video, audio")).toHaveCount(0);
  expect(thirdPartyRequests).toEqual([]);
});

test("shared mobile navigation returns from a case study to homepage sections", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/projects/neonsynth");
  await page.locator(".mobile-navigation summary").click();
  await page
    .getByRole("navigation", { name: "Mobile navigation", exact: true })
    .getByRole("link", { name: "Work", exact: true })
    .click();
  await expect(page).toHaveURL(/\/#work$/);
  await expect(
    page.locator("#work").getByRole("heading", { level: 2 }),
  ).toBeInViewport();
  await page.locator(".mobile-navigation summary").click();
  await page
    .getByRole("navigation", { name: "Mobile navigation", exact: true })
    .getByRole("link", { name: "Projects", exact: true })
    .click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.locator(".mobile-navigation")).not.toHaveAttribute("open");
});

test("case studies and the trailer fallback remain usable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("/projects/swordbound-protocol");
  await expect(
    page.getByRole("heading", { level: 1, name: "Swordbound: Protocol" }),
  ).toBeVisible();
  await page
    .getByRole("navigation", { name: "In this project", exact: true })
    .getByRole("link", { name: "Official trailer", exact: true })
    .click();
  await expect(page.locator("#trailer")).toBeInViewport();
  await expect(
    page.locator("#trailer").getByRole("link", { name: "Watch on YouTube" }),
  ).toBeVisible();
  await context.close();
});

test("unknown routes and /404 show the brand with genuine HTTP 404 responses", async ({
  page,
}) => {
  for (const path of [
    "/404",
    "/this-route-does-not-exist",
    "/projects/not-a-project",
    "/projects/geovis/extra",
  ]) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(404);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "This path is still unbuilt.",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Back to home" }),
    ).toHaveAttribute("href", "/");
  }
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page
    .getByRole("link", { name: "Explore projects", exact: true })
    .click();
  await expect(page).toHaveURL(/\/projects$/);
});

test("project layouts reflow across screen sizes and enlarged text", async ({
  page,
}) => {
  for (const path of [
    "/projects",
    ...caseStudies.map(({ slug }) => `/projects/${slug}`),
    "/404",
  ]) {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    for (const width of [320, 360, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${path} at ${width}px`,
      ).toBe(true);
    }
  }
  await page.goto("/projects/neonsynth");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator("html").evaluate((element) => {
    element.style.fontSize = "200%";
  });
  const overflowingElements = await page.evaluate(() =>
    Array.from(document.querySelectorAll("body *"))
      .filter(
        (element) => element.getBoundingClientRect().right > window.innerWidth,
      )
      .slice(0, 12)
      .map((element) => ({
        tag: element.tagName,
        text: element.textContent?.slice(0, 80),
        parentClass: element.parentElement?.className,
        className: element.getAttribute("class"),
        right: element.getBoundingClientRect().right,
      })),
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
    JSON.stringify(overflowingElements),
  ).toBe(true);
});

test("trailer loads inline only after play on homepage, index and case study", async ({
  page,
}) => {
  // Provider-independent contract fixture; actual YouTube playback is reviewed separately.
  await page.route("https://www.youtube-nocookie.com/**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<!doctype html><html lang='en'><title>Trailer fixture</title><body>Trailer player fixture</body></html>",
    }),
  );
  for (const path of ["/", "/projects", "/projects/swordbound-protocol"]) {
    const response = await page.goto(path);
    expect(response?.headers()["content-security-policy"]).toContain(
      "frame-src https://www.youtube-nocookie.com/embed/lIJIB93M_BQ",
    );
    await expect(page.locator("iframe")).toHaveCount(0);
    await page
      .getByRole("button", { name: "Play trailer: Swordbound: Protocol" })
      .click();
    const player = page.getByTitle("Swordbound: Protocol official trailer", {
      exact: true,
    });
    await expect(player).toHaveAttribute(
      "src",
      "https://www.youtube-nocookie.com/embed/lIJIB93M_BQ?autoplay=1&playsinline=1&rel=0",
    );
    await expect(player).toBeFocused();
    await expect(
      page.getByRole("link", { name: "Watch on YouTube" }),
    ).toBeVisible();
  }
});
