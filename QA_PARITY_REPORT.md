# QA Parity Report

## Automated Checks Run

- `npm run lint`: passed
- `npm run build`: passed
- `npm run crawl:normalize`: passed
- `npm run crawl:coverage`: passed

## Route Coverage

- Discovered paths: `8`
- Generated paths: `8`
- Missing routes: `0`
- Coverage: `100.00%`

## Generated Route Set

- `/`
- `/blog`
- `/blog/adulting`
- `/blog/tag/text`
- `/exif/adulting`
- `/now.html`
- `/sandbox`
- `/files/10Rules.html`

## Notes

- The current normalized content is produced from local raw crawl snapshots in `data/raw`.
- For full-site parity against the live source, rerun `npm run crawl:all` with `FIRECRAWL_API_KEY` set.
- Visual screenshot diffing against production is not yet automated in this repo and is a documented follow-up.
