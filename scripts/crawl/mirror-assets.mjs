import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const URL_MAP_INPUT = new URL("../../data/raw/url-map.json", import.meta.url);
const PAGES_INPUT = new URL("../../data/raw/pages.json", import.meta.url);
const MANIFEST_OUT = new URL("../../data/normalized/assets.json", import.meta.url);
const PUBLIC_ROOT = new URL("../../public", import.meta.url);

function isInternalKeyaar(url) {
  try {
    const parsed = new URL(url.replace("http://", "https://"));
    return parsed.hostname === "keyaar.in";
  } catch {
    return false;
  }
}

function isAssetPath(pathname) {
  return /\.(jpg|jpeg|png|gif|webp|svg|pdf|xml|ico|css|js|woff2?|ttf|otf|mp4|webm|mp3|wav)$/i.test(
    pathname,
  );
}

function toCanonicalURL(url) {
  const parsed = new URL(url.replace("http://", "https://"));
  parsed.hash = "";
  return parsed.toString();
}

function collectMarkdownUrls(markdown) {
  const out = [];
  const regex = /\]\((https?:\/\/[^)\s]+)\)/g;
  let match = regex.exec(markdown);
  while (match) {
    out.push(match[1]);
    match = regex.exec(markdown);
  }
  return out;
}

function urlToLocalPath(assetUrl) {
  const parsed = new URL(assetUrl);
  const safePath = decodeURIComponent(parsed.pathname);
  return path.join(PUBLIC_ROOT.pathname, safePath);
}

const urlMap = JSON.parse(await readFile(URL_MAP_INPUT, "utf8"));
const pages = JSON.parse(await readFile(PAGES_INPUT, "utf8"));

const candidates = new Set();

for (const url of urlMap.links ?? []) {
  if (!isInternalKeyaar(url)) continue;
  const canonical = toCanonicalURL(url);
  if (isAssetPath(new URL(canonical).pathname)) {
    candidates.add(canonical);
  }
}

for (const page of pages.pages ?? []) {
  for (const url of page.links ?? []) {
    if (!isInternalKeyaar(url)) continue;
    const canonical = toCanonicalURL(url);
    if (isAssetPath(new URL(canonical).pathname)) {
      candidates.add(canonical);
    }
  }
  for (const url of collectMarkdownUrls(page.markdown ?? "")) {
    if (!isInternalKeyaar(url)) continue;
    const canonical = toCanonicalURL(url);
    if (isAssetPath(new URL(canonical).pathname)) {
      candidates.add(canonical);
    }
  }
}

const assetUrls = [...candidates].sort();
const manifest = {
  generatedAt: new Date().toISOString(),
  total: assetUrls.length,
  downloaded: 0,
  failed: [],
};

for (const assetUrl of assetUrls) {
  const outPath = urlToLocalPath(assetUrl);
  const outDir = path.dirname(outPath);
  await mkdir(outDir, { recursive: true });

  try {
    const response = await fetch(assetUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const bytes = Buffer.from(await response.arrayBuffer());
    await writeFile(outPath, bytes);
    manifest.downloaded += 1;
    console.log(`OK ${assetUrl}`);
  } catch (error) {
    manifest.failed.push({ url: assetUrl, error: String(error) });
    console.log(`ERR ${assetUrl} ${String(error)}`);
  }
}

await writeFile(MANIFEST_OUT, JSON.stringify(manifest, null, 2));
console.log(
  `Mirrored ${manifest.downloaded}/${manifest.total} assets. Failed: ${manifest.failed.length}.`,
);
