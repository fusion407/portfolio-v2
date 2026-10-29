import { spawn } from "node:child_process";
import { createInterface } from "node:readline";
import { fileURLToPath } from "node:url";

// Receive one JSON line through stdin, never CLI arguments or a credential file.
// The caller supplies an explicitly authorized temporary access link.
const input = createInterface({ input: process.stdin, terminal: false });
input.once("line", (line) => {
  input.close();
  process.stdin.pause();
  let payload;
  try {
    payload = JSON.parse(line);
    if (
      typeof payload.origin !== "string" ||
      typeof payload.accessUrl !== "string"
    )
      throw new Error();
  } catch {
    console.error(
      "Expected a preview origin and authorized access URL on stdin.",
    );
    process.exit(1);
  }
  const child = spawn(
    process.execPath,
    [
      fileURLToPath(
        new URL("../node_modules/@playwright/test/cli.js", import.meta.url),
      ),
      "test",
      "--config",
      "playwright.preview.config.ts",
    ],
    {
      stdio: ["ignore", "inherit", "inherit"],
      env: {
        ...process.env,
        PORTFOLIO_PREVIEW_URL: payload.origin,
        PORTFOLIO_PREVIEW_ACCESS_URL: payload.accessUrl,
      },
    },
  );
  child.once("error", () => {
    console.error("Could not start preview verification.");
    process.exit(1);
  });
  child.once("exit", (code) => process.exit(code ?? 1));
});
