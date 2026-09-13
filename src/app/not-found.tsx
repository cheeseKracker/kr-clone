import Link from "next/link";

import SiteShell from "@/components/site-shell";

/**
 * Root 404 page.
 *
 * `not-found.tsx` is a Server Component and accepts **no props** (Next 16).
 * Next.js injects `<meta name="robots" content="noindex" />` for responses that
 * return a 404 status, so it must not be added here.
 */
export default function NotFound() {
  return (
    <SiteShell title="404">
      <article className="page-markdown">
        <p>
          That page isn&rsquo;t here. It may have moved, or the link may have
          been mistyped.
        </p>
        <p>
          Head back to the <Link href="/">homepage</Link>, or browse the{" "}
          <Link href="/blog">blog</Link>.
        </p>
      </article>
    </SiteShell>
  );
}
