/**
 * Single source of truth for site-wide identity, routing and navigation.
 *
 * Anything that was previously a magic string duplicated across components
 * (domains, nav links, titles) belongs here so it can be changed in one place.
 */

/** Canonical production origin. Used for metadataBase, sitemap and RSS. */
export const SITE_URL = "https://portofliokarak.vercel.app";

/**
 * Hostnames that should be treated as "this site" when rewriting links found in
 * migrated markdown. `keyaar.in` is the legacy domain the content was authored on;
 * links to it must resolve to local routes rather than leaving the site.
 */
export const INTERNAL_HOSTS = ["keyaar.in", "portofliokarak.vercel.app"] as const;

export const SITE_TITLE = "Keyaar";
export const SITE_DESCRIPTION =
  "Personal site of Keyaar — product design, writing, photographs and old projects.";
export const SITE_AUTHOR = "Keyaar";
export const SITE_LOCALE = "en";

export type NavLink = {
  href: string;
  label: string;
  /** Opens in a new tab and gets rel="noreferrer noopener". */
  external?: boolean;
};

/** Navigation shown on the blog/exif surface. Order is the render order. */
export const BLOG_NAV_LINKS: readonly NavLink[] = [
  { href: "/", label: "Root" },
  { href: "/blog/minfo", label: "Is This Normal?" },
  { href: "/sandbox", label: "Old Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/blog/dog-years", label: "Bookshelf" },
  { href: "/blog/uses", label: "Gear" },
  {
    href: "https://www.yourworldoftext.com/~keyaar/",
    label: "Say Hi!",
    external: true,
  },
];

/** Navigation shown on the default (non-blog) surface. */
export const PRIMARY_NAV_LINKS: readonly NavLink[] = [
  { href: "/", label: "home" },
  { href: "/blog", label: "blog" },
  { href: "/now.html", label: "now" },
];

/**
 * Routes that have a dedicated page file in `src/app` and must therefore be
 * excluded from the `[...slug]` catch-all's generateStaticParams, or Next will
 * generate two pages for the same path.
 *
 * NOTE: this is derived automatically in `lib/content/pages.ts` where possible;
 * this list covers only routes whose file path cannot be inferred from content.
 */
export const RESERVED_ROUTES = ["/", "/blog", "/now.html"] as const;

/**
 * Post slugs that have their own hand-built page file under `src/app/blog/`.
 * They are excluded from the `[slug]` catch-all's generateStaticParams so the
 * same path is not generated twice.
 */
export const DEDICATED_POST_ROUTES = ["dog-years", "minfo"] as const;

/** True when a href points somewhere outside this site. */
export function isExternalHref(href: string): boolean {
  if (!href || href.startsWith("/") || href.startsWith("#")) return false;
  try {
    const host = new URL(href).hostname.replace(/^www\./, "");
    return !INTERNAL_HOSTS.includes(host as (typeof INTERNAL_HOSTS)[number]);
  } catch {
    return false;
  }
}

/**
 * Rewrites an absolute URL pointing at this site (or the legacy domain) into a
 * root-relative path, so migrated content navigates client-side instead of
 * doing a full page load out and back.
 */
export function toLocalHref(href?: string): string | undefined {
  if (!href) return href;
  if (href.startsWith("/") || href.startsWith("#")) return href;
  try {
    const parsed = new URL(href);
    const host = parsed.hostname.replace(/^www\./, "");
    if (INTERNAL_HOSTS.includes(host as (typeof INTERNAL_HOSTS)[number])) {
      return `${parsed.pathname}${parsed.search}${parsed.hash}`;
    }
  } catch {
    return href;
  }
  return href;
}
