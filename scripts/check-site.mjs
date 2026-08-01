import { access, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const site = path.join(root, "site");
const errors = [];
async function exists(target) { try { await access(target); return true; } catch { return false; } }
for (const relative of ["index.html", "styles.css", "app.js", "value-model.mjs", "README.md"]) {
  if (!(await exists(path.join(site, relative)))) errors.push(`Missing site artifact: ${relative}`);
}
const html = await readFile(path.join(site, "index.html"), "utf8");
const css = await readFile(path.join(site, "styles.css"), "utf8");
const app = await readFile(path.join(site, "app.js"), "utf8");
const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]));
for (const reference of [...html.matchAll(/\s(?:href|src)="([^"]+)"/g)].map(match => match[1])) {
  if (reference.startsWith("#")) { if (!ids.has(reference.slice(1))) errors.push(`Missing HTML anchor target: ${reference}`); continue; }
  if (/^(?:https?:|mailto:)/.test(reference)) continue;
  const target = decodeURIComponent(reference.split("#")[0].split("?")[0]);
  if (!(await exists(path.resolve(site, target)))) errors.push(`Broken site reference: ${reference}`);
}
for (const required of ["<!doctype html>", "<main id=\"main\">", "role=\"tablist\"", "MODELED SCENARIO · NOT A GUARANTEE", "Cashable savings", "All Rights Reserved", "social-preview.png"]) {
  if (!html.includes(required)) errors.push(`Site is missing required content: ${required}`);
}
if (!css.includes("prefers-reduced-motion") || !css.includes(":focus-visible")) errors.push("Site CSS must include reduced-motion and visible-focus behavior.");
if ((css.match(/{/g) || []).length !== (css.match(/}/g) || []).length) errors.push("Site CSS has unbalanced braces.");
if (!app.includes('from "./value-model.mjs"')) errors.push("Site must consume the tested shared value model.");

if (errors.length) { console.error("Site validation failed:\n" + errors.map(error => `- ${error}`).join("\n")); process.exit(1); }
console.log("Static site validated: structure, references, interactions, accessibility signals, and modeled-claim labeling.");
