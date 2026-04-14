import { readFile } from "node:fs/promises";

const DISCOVERED = new URL("../../data/raw/url-map.json", import.meta.url);
const ROUTES = new URL("../../data/normalized/routes.json", import.meta.url);

function toPath(url) {
  const parsed = new URL(url.replace("http://", "https://"));
  return parsed.pathname || "/";
}

function shouldCountRoute(path) {
  // Compare navigable page routes only, not direct media/assets.
  return !/\.(jpg|jpeg|png|gif|webp|svg|pdf|xml|ico|css|js)$/i.test(path);
}

const discovered = JSON.parse(await readFile(DISCOVERED, "utf8"));
const routes = JSON.parse(await readFile(ROUTES, "utf8"));

const discoveredPaths = new Set(
  (discovered.links ?? []).map((url) => toPath(url)).filter(shouldCountRoute),
);
const generatedPaths = new Set((routes.routes ?? []).map((route) => route.pathname));

const missing = [...discoveredPaths].filter((path) => !generatedPaths.has(path));

const report = {
  discovered: discoveredPaths.size,
  generated: generatedPaths.size,
  missingCount: missing.length,
  coverage: discoveredPaths.size
    ? (((discoveredPaths.size - missing.length) / discoveredPaths.size) * 100).toFixed(2)
    : "0.00",
  missing: missing.slice(0, 100),
};

console.log(JSON.stringify(report, null, 2));
