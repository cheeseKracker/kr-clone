# keyaar.in Clone Implementation

This project implements a framework-based clone of `https://keyaar.in` using Next.js with a Firecrawl-powered content pipeline.

## Stack

- Next.js App Router (`src/app`)
- TypeScript
- React Markdown renderer for scraped markdown content
- Firecrawl API scripts for discovery, scrape, normalization, and route coverage

## Folder Layout

- `scripts/crawl`: content pipeline scripts
- `data/raw`: discovered URL map and raw scrape payload
- `data/normalized`: normalized route manifest
- `content`: page content store consumed by the app
- `src/components`: shell, markdown, and list UI
- `src/lib`: content selectors/helpers
- `src/styles`: theme tokens

## Crawl/Refresh Workflow

1. Add API key:
   - `export FIRECRAWL_API_KEY="your_key_here"`
2. Run the full pipeline:
   - `npm run crawl:all`
3. Start app:
   - `npm run dev`

## Individual Pipeline Commands

- `npm run crawl:discover`: builds `data/raw/url-map.json`
- `npm run crawl:scrape`: builds `data/raw/pages.json`
- `npm run crawl:normalize`: builds `data/normalized/routes.json` and `content/site-content.json`
- `npm run crawl:coverage`: compares discovered routes with generated route manifest

## Route Model

- Home: `/`
- Blog index: `/blog`
- Blog posts: `/blog/[slug]`
- Tag pages: `/blog/tag/[tag]`
- Legacy/static content: generated via catch-all route `src/app/[...slug]/page.tsx`
- HTML style route compatibility: `/now.html`

## Known Gaps

- Full content parity depends on running the crawl scripts with a valid Firecrawl API key.
- Tag pages are scaffolded and generated from manifest but need richer post-index joins after full scrape data is available.
- Media asset mirroring is currently link-based; local asset caching can be added in a follow-up.
