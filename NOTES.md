# Project notes

State of the site as of 15 September 2026, and the things worth knowing before
changing it.

## How content works

Everything on the site is generated from plain markdown files in `content/`.
**Nothing about the blog is hand-maintained.** Adding one file to
`content/posts/` is enough — the blog index, all 26 tag archives, the "older
posts" list and `sitemap.xml` are all derived from the posts and update
themselves.

The previous version of this site kept all 153 pages inside a single 1.2MB
`content/site-content.json` (a crawl snapshot of the old keyaar.in). Adding a
post meant hand-editing that file in three places: the post, the blog index,
and every tag list it belonged to. That file is gone; it remains in git history
if anything needs recovering from it.

See `README.md` for the practical "how do I add a post" instructions.

## Writing posts

Two ways, both equivalent — they write the same files:

- **CMS:** `portofliokarak.vercel.app/keystatic` (or `127.0.0.1:3000/keystatic`
  locally — *not* `localhost`, see gotchas). Saves become GitHub commits.
- **By hand:** add a `.md` file to `content/posts/`.

## Known gotchas

These each cost real debugging time. If the admin UI is ever blank, it is
almost certainly one of the first three — none of them logs an error anywhere.

1. **The Keystatic page must be a Client Component.** Its react-server build is
   hardcoded to `return null`, so rendering it from a Server Component produces
   a silent blank page.
2. **GitHub storage force-redirects `localhost` to `127.0.0.1`.** Next 16 then
   treats that as a foreign origin and blocks its own dev resources, so the
   admin UI never hydrates. Handled by `allowedDevOrigins` in `next.config.ts`.
   Use the `127.0.0.1` URL locally.
3. **Storage kind cannot come from a secret env var.** `keystatic.config.ts` is
   imported by a Client Component, so anything not prefixed `NEXT_PUBLIC_` is
   undefined in the browser and the config silently falls back to local.
4. **`fields.markdoc` needs `extension: "md"`.** It writes `.mdoc` by default,
   which would make Keystatic see none of the existing posts.
5. **Keystatic writes `date:` unquoted**, which YAML parses as a Date rather
   than a string. `src/lib/content/posts.ts` normalises both shapes — don't
   remove that.
6. **"Expected branch to point to ..."** in the CMS just means the branch moved
   since the page loaded. Reload and save again.

## Credentials

The CMS needs four environment variables, in `.env.local` locally (gitignored)
and in Vercel for production:

    KEYSTATIC_GITHUB_CLIENT_ID
    KEYSTATIC_GITHUB_CLIENT_SECRET
    NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG
    KEYSTATIC_SECRET

They are stored in Vercel as **Secret** type, which is write-only — they cannot
be read back from the dashboard. Keep a backup of `.env.local`. If the client
secret is ever lost, generate a new one on the GitHub App page and update Vercel;
nothing else breaks.

The GitHub App (`keyaar-cms`) needs Contents: read and write, Metadata: read,
Pull requests: read — and it must be *installed* on the repository, not just
created.

## Open items

- **~85MB of photos in `public/`**, unoptimised, including one 7.8MB JPEG.
  Markdown images render as plain `<img>` (there is a deliberate
  `eslint-disable @next/next/no-img-element` in `page-markdown.tsx`) because
  migrated content carries no dimensions. Deferred deliberately: at the current
  posting rate this is years away from causing a real problem. Images uploaded
  through the CMS are **not** shrunk either.
- **One broken image reference:** `/blog/bl-content/uploads/missk-napster-dscf2018.jpg`.
- **Two orphaned images** (~2.1MB) referenced by nothing.
- **`.site-main--minfo`** is passed as a class by `src/app/blog/minfo/page.tsx`
  but no CSS rule for it exists. Inert; original intent unknown.
- **Accessibility:** `#0088ff` links on the cream background are 3.49:1, below
  WCAG AA. Affects `/now.html` and the catch-all pages. Left as-is because the
  styling work was scoped as a no-visual-change refactor.
- **`/blog/minfo` is the one dynamically-rendered route** — it calls `cookies()`
  to pick a random bio. Left alone deliberately; a previous "bio flickering" bug
  was fixed this way.

## Custom domain

When one is set up, four things change:

1. Add the domain in Vercel and set the DNS records it asks for.
2. Update `SITE_URL` in `src/lib/site-config.ts` — drives canonical URLs, the
   sitemap and social previews.
3. Add the domain to `INTERNAL_HOSTS` in the same file, so legacy absolute links
   inside old posts keep resolving locally.
4. Add `https://<domain>/api/keystatic/github/oauth/callback` to the GitHub
   App's callback URLs, or CMS login breaks on the new domain.
