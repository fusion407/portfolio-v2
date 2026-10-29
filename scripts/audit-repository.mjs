import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const git = (args, options = {}) =>
  execFileSync("git", args, { maxBuffer: 64 * 1024 * 1024, ...options });
const findings = new Set();
const forbidden =
  /(?:^|\/)(?:node_modules|\.next|\.netlify|\.vercel|test-results|playwright-report|coverage)\/|(?:^|\/)\.env(?:$|\.(?!example$|sample$))|\.(?:p12|pfx|key|pem)$|(?:^|\/)id_(?:rsa|ed25519)$|(?:^|\/)credentials\.(?:json|toml|ya?ml)$/i;
const patterns = [
  ["private key", /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/],
  [
    "GitHub credential",
    /\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,})\b/,
  ],
  ["AWS access key", /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/],
  ["API credential", /\bsk-(?:proj-)?[A-Za-z0-9_-]{32,}\b/],
  ["Slack credential", /\bxox[baprs]-[A-Za-z0-9-]{24,}\b/],
  [
    "assigned credential",
    /(?:api[_-]?key|client[_-]?secret|password|access[_-]?token)\s*["']?\s*[:=]\s*["'][A-Za-z0-9_+\/-]{24,}["']/i,
  ],
];
function inspect(path, bytes, origin) {
  if (forbidden.test(path))
    findings.add(`${origin}: forbidden artifact path ${path}`);
  if (bytes.includes(0)) return;
  const lines = bytes.toString("utf8").split(/\r?\n/);
  for (let index = 0; index < lines.length; index++) {
    for (const [label, pattern] of patterns)
      if (pattern.test(lines[index]))
        findings.add(`${origin}: ${path}:${index + 1} (${label})`);
  }
}

const files = [
  ...new Set(
    git(["ls-files", "-co", "--exclude-standard", "-z"])
      .toString()
      .split("\0")
      .filter(Boolean),
  ),
];
for (const file of files) inspect(file, readFileSync(file), "working tree");

const objects = git(["rev-list", "--objects", "--all"])
  .toString()
  .trim()
  .split("\n")
  .filter(Boolean)
  .map((line) => {
    const space = line.indexOf(" ");
    return {
      id: space === -1 ? line : line.slice(0, space),
      path: space === -1 ? "(unnamed object)" : line.slice(space + 1),
    };
  });
const objectList = objects.map((object) => object.id).join("\n") + "\n";
const types = git(["cat-file", "--batch-check=%(objecttype)"], {
  input: objectList,
})
  .toString()
  .trim()
  .split("\n");
const blobs = objects.filter((_, index) => types[index] === "blob");
const batch = git(["cat-file", "--batch"], {
  input: blobs.map((blob) => blob.id).join("\n") + "\n",
});
let offset = 0;
for (const blob of blobs) {
  const newline = batch.indexOf(10, offset);
  const size = Number(
    batch.subarray(offset, newline).toString().split(" ").at(-1),
  );
  if (newline < 0 || !Number.isFinite(size))
    throw new Error("Invalid Git object framing");
  inspect(
    blob.path,
    batch.subarray(newline + 1, newline + 1 + size),
    `history ${blob.id.slice(0, 10)}`,
  );
  offset = newline + 1 + size + 1;
}
if (findings.size) {
  // Never print matching credential contents, only location and rule category.
  console.error([...findings].join("\n"));
  process.exitCode = 1;
} else
  console.log(
    `Reviewed ${files.length} current files and ${blobs.length} historical blobs: no recognized credential patterns or forbidden artifacts found.`,
  );
if (git(["rev-parse", "--is-shallow-repository"]).toString().trim() === "true")
  console.warn("History is shallow; only available objects were reviewed.");
