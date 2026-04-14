import { writeFile } from "node:fs/promises";
import { mapSite } from "./firecrawl-client.mjs";

const TARGET = "https://keyaar.in/";
const OUTPUT = new URL("../../data/raw/url-map.json", import.meta.url);

function normalize(url) {
  const parsed = new URL(url);
  parsed.hash = "";
  if (parsed.pathname.endsWith("/") && parsed.pathname !== "/") {
    parsed.pathname = parsed.pathname.slice(0, -1);
  }
  return parsed.toString().replace("http://", "https://");
}

function isInternal(url) {
  return url.startsWith("https://keyaar.in");
}

const mapped = await mapSite(TARGET);
const links = (mapped.links ?? [])
  .map((entry) => normalize(entry.url ?? entry))
  .filter((url) => isInternal(url));

const unique = [...new Set(links)].sort();

await writeFile(
  OUTPUT,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      source: TARGET,
      total: unique.length,
      links: unique,
    },
    null,
    2,
  ),
);

console.log(`Discovered ${unique.length} keyaar.in URLs.`);
