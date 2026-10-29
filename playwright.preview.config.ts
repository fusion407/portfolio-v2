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

export default defineConfig({
  ...localConfig,
  testDir: "./tests/preview",
  workers: 2,
  use: { ...localConfig.use, baseURL: target.origin },
  webServer: undefined,
});
