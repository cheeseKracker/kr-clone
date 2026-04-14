import { readFile, writeFile } from "node:fs/promises";
import { scrapePages } from "./firecrawl-client.mjs";

const INPUT = new URL("../../data/raw/url-map.json", import.meta.url);
const OUTPUT = new URL("../../data/raw/pages.json", import.meta.url);

const mapData = JSON.parse(await readFile(INPUT, "utf8"));
const urls = mapData.links ?? [];

console.log(`Scraping ${urls.length} pages...`);
const pages = await scrapePages(urls, ({ url, ok }) => {
  const marker = ok ? "OK" : "ERR";
  console.log(`[${marker}] ${url}`);
});

await writeFile(
  OUTPUT,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      total: pages.length,
      pages,
    },
    null,
    2,
  ),
);

console.log(`Saved scrape payload for ${pages.length} pages.`);
