import { lstat, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { execFileSync } from "node:child_process";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const ignored = new Set([".git", ".next", ".npm-cache", "node_modules"]);
const disallowedNames = new Set([".env", ".env.local", ".env.production", ".DS_Store"]);
const textExtensions = new Set([".md", ".js", ".mjs", ".ts", ".tsx", ".json", ".yml", ".yaml", ".css", ".html", ".svg", ".txt", ".prisma"]);
const secretPatterns = [
  new RegExp("gh" + "p_[A-Za-z0-9]{20,}"),
  new RegExp("sk" + "-[A-Za-z0-9]{20,}"),
  new RegExp("AKIA[A-Z0-9]{16}"),
  new RegExp("BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY"),
  new RegExp("OPENAI_API_KEY\\s*=\\s*[^<\\s][^\\s]{8,}")
];
const errors = [];

function isIgnored(relative) {
  try { execFileSync("git", ["check-ignore", "-q", "--", relative], { cwd: root, stdio: "ignore" }); return true; }
  catch { return false; }
}

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const target = path.join(directory, entry.name);
    const relative = path.relative(root, target);
    const metadata = await lstat(target);
    if (metadata.isSymbolicLink()) { errors.push(`Symbolic link is not permitted: ${relative}`); continue; }
    if (disallowedNames.has(entry.name)) {
      if (isIgnored(relative)) continue;
      errors.push(`Disallowed non-ignored local/environment file: ${relative}`);
    }
    if (entry.isDirectory()) { await walk(target); continue; }
    if (textExtensions.has(path.extname(entry.name)) && metadata.size < 2_000_000) {
      const content = await readFile(target, "utf8");
      for (const pattern of secretPatterns) if (pattern.test(content)) errors.push(`Possible secret pattern in ${relative}: ${pattern.source}`);
    }
  }
}
await walk(root);
const license = await readFile(path.join(root, "LICENSE"), "utf8");
if (!license.includes("All rights reserved") || license.includes("Apache License")) errors.push("Existing All Rights Reserved license was not preserved.");

if (errors.length) { console.error("Repository hygiene failed:\n" + errors.map(error => `- ${error}`).join("\n")); process.exit(1); }
console.log("Repository hygiene validated: license, secret patterns, environment files, and symbolic links.");
