import { setTimeout as sleep } from "node:timers/promises";

const FIRECRAWL_API = "https://api.firecrawl.dev/v1";

function getApiKey() {
  const key = process.env.FIRECRAWL_API_KEY;
  if (!key) {
    throw new Error("Missing FIRECRAWL_API_KEY environment variable.");
  }
  return key;
}

async function request(path, payload) {
  const response = await fetch(`${FIRECRAWL_API}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getApiKey()}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok || data?.success === false) {
    throw new Error(`Firecrawl error ${response.status}: ${JSON.stringify(data)}`);
  }
  return data;
}

export async function mapSite(url) {
  return request("/map", {
    url,
    limit: 3000,
    includeSubdomains: false,
    ignoreQueryParameters: true,
    sitemap: "include",
  });
}

export async function scrapePage(url) {
  return request("/scrape", {
    url,
    formats: ["markdown", "links"],
    onlyMainContent: false,
    maxAge: 0,
  });
}

export async function scrapePages(urls, onEach) {
  const out = [];
  for (const url of urls) {
    try {
      const page = await scrapePage(url);
      out.push(page);
      onEach?.({ url, ok: true });
    } catch (error) {
      out.push({
        metadata: { url, sourceURL: url, statusCode: 0 },
        markdown: "",
        links: [],
        error: String(error),
      });
      onEach?.({ url, ok: false, error: String(error) });
    }
    await sleep(120);
  }
  return out;
}
