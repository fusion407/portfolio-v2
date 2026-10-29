import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { getSitePolicy } from "../src/lib/site-policy.ts";

// Only the separately configured production project may build indexable pages.
// Preview/development and incomplete configuration retain the forced exclusion.
if (!getSitePolicy().indexable) {
  await import("./build-preview.mjs");
} else {
  const result = spawnSync(
    process.execPath,
    [
      fileURLToPath(
        new URL("../node_modules/next/dist/bin/next", import.meta.url),
      ),
      "build",
    ],
    {
      stdio: "inherit",
      env: {
        ...process.env,
        NODE_ENV: "production",
        NEXT_TELEMETRY_DISABLED: "1",
      },
    },
  );
  if (result.error) console.error(result.error.message);
  process.exitCode = result.status ?? 1;
}
