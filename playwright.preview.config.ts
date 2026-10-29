import { defineConfig } from "@playwright/test";
import localConfig from "./playwright.config";

// This command may only target the isolated Vercel preview. Never default to
// the live domain or start a local server when deployment evidence is requested.
const value = process.env.PORTFOLIO_PREVIEW_URL;
if (!value)
  throw new Error(
    "Set PORTFOLIO_PREVIEW_URL to the verified isolated Vercel HTTPS origin.",
  );
const target = new URL(value);
if (
  target.protocol !== "https:" ||
  !/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.vercel\.app$/.test(target.hostname) ||
  target.port ||
  target.username ||
  target.password ||
  target.pathname !== "/" ||
  target.search ||
  target.hash
)
  throw new Error(
    "Preview checks require an isolated HTTPS *.vercel.app origin, without credentials, port, path, query, or fragment.",
  );

const access = process.env.PORTFOLIO_PREVIEW_ACCESS_URL;
if (access) {
  let link: URL;
  try {
    link = new URL(access);
  } catch {
    throw new Error("Invalid protected-preview access link.");
  }
  if (
    link.origin !== target.origin ||
    link.pathname !== "/" ||
    link.username ||
    link.password ||
    link.hash ||
    !link.searchParams.get("_vercel_share") ||
    [...link.searchParams.keys()].some((key) => key !== "_vercel_share")
  )
    throw new Error(
      "The authorized share link must match this preview origin and contain only the expected access parameter.",
    );
}

export default defineConfig({
  ...localConfig,
  testDir: "./tests/preview",
  workers: 2,
  use: {
    ...localConfig.use,
    baseURL: target.origin,
    trace: access ? "off" : "retain-on-failure",
  },
  webServer: undefined,
});
