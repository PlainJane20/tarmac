import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const required = [
  "README.md", "LICENSE", "CHANGELOG.md", "CODE_OF_CONDUCT.md", "CONTRIBUTING.md", "SECURITY.md",
  "flight-deck/README.md", "flight-deck/00-executive-summary.md", "flight-deck/01-product-vision.md",
  "flight-deck/02-why-tarmac.md", "flight-deck/03-operating-model.md", "flight-deck/04-modern-itpmo.md",
  "flight-deck/05-brand-system.md", "flight-deck/06-enterprise-architecture.md",
  "flight-deck/07-governance-and-compliance.md", "flight-deck/08-metrics-and-value.md",
  "flight-deck/09-roadmap.md", "flight-deck/10-engineering-standards.md", "flight-deck/11-open-decisions.md",
  "architecture/README.md", "architecture/diagrams.md", "architecture/integration-map.md",
  "architecture/adr/0001-control-plane-boundary.md", "architecture/adr/0002-cross-cutting-automation-compliance.md",
  "brand/README.md", "brand/social-preview-spec.md", "docs/metrics/catalog.md",
  "docs/governance/nist-ssdf.md", "docs/product/glossary.md", "site/README.md"
];
const errors = [];

async function exists(target) { try { await access(target); return true; } catch { return false; } }
for (const file of required) if (!(await exists(path.join(root, file)))) errors.push(`Missing required document: ${file}`);

async function markdownFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if ([".git", ".next", ".npm-cache", "node_modules"].includes(entry.name)) continue;
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await markdownFiles(target));
    else if (entry.name.endsWith(".md")) files.push(target);
  }
  return files;
}

function localTarget(raw) {
  if (!raw || raw.startsWith("#") || /^(?:https?:|mailto:)/.test(raw)) return null;
  return decodeURIComponent(raw.split("#")[0].split("?")[0]);
}

for (const file of await markdownFiles(root)) {
  const content = await readFile(file, "utf8");
  if (!content.startsWith("# ")) errors.push(`Document must begin with a level-one heading: ${path.relative(root, file)}`);
  const links = [...content.matchAll(/\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)].map(match => match[1]);
  for (const link of links) {
    const target = localTarget(link);
    if (!target) continue;
    if (!(await exists(path.resolve(path.dirname(file), target)))) errors.push(`Broken link in ${path.relative(root, file)}: ${link}`);
  }
}

const valueBrief = await readFile(path.join(root, "flight-deck/08-metrics-and-value.md"), "utf8");
for (const term of ["Capacity released", "Cost avoided", "Spend redirected", "Cost-of-delay reduction", "Risk-adjusted loss reduction", "Realized business benefits", "Cashable savings"]) {
  if (!valueBrief.includes(term)) errors.push(`Value brief is missing category: ${term}`);
}
const openDecisions = await readFile(path.join(root, "flight-deck/11-open-decisions.md"), "utf8");
if (!openDecisions.includes("All Rights Reserved") || !openDecisions.includes("OD-001")) errors.push("Open decisions must preserve the licensing decision explicitly.");

if (errors.length) { console.error("Documentation validation failed:\n" + errors.map(error => `- ${error}`).join("\n")); process.exit(1); }
console.log(`Documentation validated: ${required.length} required artifacts and all local Markdown links.`);
