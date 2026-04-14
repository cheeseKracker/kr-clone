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

function hasQueryOrHash(url) {
  const parsed = new URL(url.replace("http://", "https://"));
  return Boolean(parsed.search || parsed.hash);
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

function isAssetPath(pathname) {
  return /\.(jpg|jpeg|png|gif|webp|svg|pdf|xml|ico|css|js|woff2?|ttf|otf|mp4|webm|mp3|wav)$/i.test(
    pathname,
  );
}

function plainTitle(markdown, fallbackPath) {
  const first = (markdown || "")
    .split("\n")
    .map((line) => line.trim())
    .find(
      (line) =>
        line.length > 0 &&
        !line.startsWith("- ") &&
        !line.startsWith("* ") &&
        !line.startsWith("[**Exif: Blog**]"),
    );
  const cleaned = (first || "")
    .replace(/^#+\s*/, "")
    .replace(/^-+\s*/, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*!`_]/g, "")
    .trim();
  return cleaned || fallbackPath;
}

function cleanMarkdown(markdown, type) {
  const source = (markdown || "").replace(/\r\n/g, "\n").trim();
  if (!source) return source;

  let cleaned = source;

  if (
    type === "blog-post" ||
    type === "legacy-post" ||
    type === "tag" ||
    type === "blog-index"
  ) {
    cleaned = cleaned.replace(/\n### Topics[\s\S]*$/m, "").trim();
    cleaned = cleaned.replace(/\n### Links[\s\S]*$/m, "").trim();

    if (cleaned.startsWith("[**Exif: Blog**]")) {
      const secondHeading = cleaned.indexOf("\n[**", 1);
      if (secondHeading !== -1) {
        cleaned = cleaned.slice(secondHeading + 1).trim();
      }
    }
  }

  return cleaned;
}

const raw = JSON.parse(await readFile(INPUT, "utf8"));
const pages = raw.pages ?? [];

const candidates = pages.map((entry) => {
  const sourceURL = entry?.metadata?.sourceURL || entry?.metadata?.url || "";
  const pathname = toPath(sourceURL);
  const type = classify(pathname);
  const markdown = cleanMarkdown(entry?.markdown || "", type);
  const links = Array.isArray(entry?.links) ? entry.links : [];
  return {
    sourceURL,
    pathname,
    type,
    title: plainTitle(markdown, pathname),
    markdown,
    links,
    _hasQueryOrHash: hasQueryOrHash(sourceURL),
  };
});

const byPath = new Map();
for (const page of candidates) {
  const current = byPath.get(page.pathname);
  if (!current) {
    byPath.set(page.pathname, page);
    continue;
  }

  const score = (p) =>
    (p._hasQueryOrHash ? 0 : 1000) +
    Math.min((p.markdown || "").length, 100000) +
    (p.sourceURL.startsWith("https://") ? 100 : 0);

  if (score(page) > score(current)) {
    byPath.set(page.pathname, page);
  }
}

const normalized = [...byPath.values()]
  .filter((page) => !isAssetPath(page.pathname))
  .map((page) => {
    const cleanPage = { ...page };
    delete cleanPage._hasQueryOrHash;
    return cleanPage;
  })
  .sort((a, b) => a.pathname.localeCompare(b.pathname));

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
