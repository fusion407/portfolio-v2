import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// Isolated hosted previews must stay non-indexable even if a parent process or
// dashboard setting supplies a production flag. Do not write environment files.
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
      PORTFOLIO_INDEXING: "disabled",
      NEXT_TELEMETRY_DISABLED: "1",
    },
  },
);
if (result.error) console.error(result.error.message);
process.exitCode = result.status ?? 1;
