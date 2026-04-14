import { readFile, writeFile } from "node:fs/promises";

const INPUT = new URL("../../data/raw/pages.json", import.meta.url);
const ROUTES_OUT = new URL("../../data/normalized/routes.json", import.meta.url);
const CONTENT_OUT = new URL("../../content/site-content.json", import.meta.url);

function toPath(url) {
  const parsed = new URL(url.replace("http://", "https://"));
  const pathname = parsed.pathname || "/";
  if (pathname !== "/" && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function classify(pathname) {
  if (pathname === "/") return "home";
  if (pathname === "/blog") return "blog-index";
  if (pathname.startsWith("/blog/tag/")) return "tag";
  if (pathname.startsWith("/blog/")) return "blog-post";
  if (pathname.startsWith("/exif/")) return "legacy-post";
  if (pathname.endsWith(".html")) return "static-html";
  return "page";
}

function plainTitle(markdown, fallbackPath) {
  const first = (markdown || "")
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.length > 0);
  const cleaned = (first || "")
    .replace(/^#+\s*/, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*!`_]/g, "")
    .trim();
  return cleaned || fallbackPath;
}

const raw = JSON.parse(await readFile(INPUT, "utf8"));
const pages = raw.pages ?? [];

const normalized = pages.map((entry) => {
  const sourceURL = entry?.metadata?.sourceURL || entry?.metadata?.url || "";
  const pathname = toPath(sourceURL);
  const markdown = entry?.markdown || "";
  const links = Array.isArray(entry?.links) ? entry.links : [];
  return {
    sourceURL,
    pathname,
    type: classify(pathname),
    title: plainTitle(markdown, pathname),
    markdown,
    links,
  };
});

const routes = normalized.map((p) => ({
  pathname: p.pathname,
  type: p.type,
  title: p.title,
}));

await writeFile(
  ROUTES_OUT,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      total: routes.length,
      routes,
    },
    null,
    2,
  ),
);

await writeFile(
  CONTENT_OUT,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      total: normalized.length,
      pages: normalized,
    },
    null,
    2,
  ),
);

console.log(`Normalized ${normalized.length} pages.`);
