import { defineConfig } from "@playwright/test";
import localConfig from "./playwright.config";

// The production verification command is explicitly scoped to the approved
// canonical domain. It performs read-only checks and starts no local server.
process.env.PORTFOLIO_EXPECT_INDEXABLE = "true";
delete process.env.PORTFOLIO_PREVIEW_ACCESS_URL;

export default defineConfig({
  ...localConfig,
  testDir: "./tests/preview",
  workers: 2,
  use: {
    ...localConfig.use,
    baseURL: "https://www.bradydorsey.dev",
    trace: "off",
  },
  webServer: undefined,
});
