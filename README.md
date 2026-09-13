# keyaar.in — personal site

A Next.js site. All content lives in plain markdown files under `content/`,
so adding a post never means touching code.

## Adding a blog post

Create one file: `content/posts/my-post-slug.md`

```markdown
---
slug: "my-post-slug"
title: "My Post Title"
date: "2026-09-14"
displayDate: "September 14, 2026"
readingMinutes: 3
tags: ["places", "text"]
---

Write the post here, in markdown.

![A photo](/blog/bl-content/uploads/my-photo.jpg)
```

That is the whole job. The following update themselves — you never edit them:

- the blog index at `/blog`
- every tag archive at `/blog/tag/<tag>`
- `sitemap.xml`
- the "older posts" archive list

**The filename becomes the URL.** `my-post-slug.md` is served at `/blog/my-post-slug`.

**Tags** must match an existing slug in `content/tags.json` (or add a new entry
there — `"slug": "Display Label"`). Use the slug in the post's `tags` list, not
the label.

**Photos** go in `public/`, and the path in markdown starts from there:
a file at `public/blog/uploads/cat.jpg` is written as `/blog/uploads/cat.jpg`.

**Standing pages** (bio, bookshelf, gear, wishlist) add `standing: true` to the
frontmatter. They stay reachable at their URL but are kept out of the dated feed.

## Adding a non-blog page

Create `content/pages/<name>.md` with `path: "/the-url"` in the frontmatter.
It is picked up by the catch-all route automatically.

## Project layout

```
content/posts/     one markdown file per blog post  ← add posts here
content/pages/     standalone pages (/sandbox, /humans.txt, …)
content/tags.json  tag slug → display label
public/            images and static files
src/lib/site-config.ts   domain, nav links, site title
src/lib/content/         loads and indexes the markdown; everything derives from here
src/app/                 routes
src/styles/theme-tokens.css   all colours, spacing and type sizes
```

To change a colour, a link in the nav, or the site title, edit
`src/styles/theme-tokens.css` or `src/lib/site-config.ts` — not the components.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Deploying

Pushing to `main` deploys via Vercel.
