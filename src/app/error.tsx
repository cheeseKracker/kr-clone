"use client";

import Link from "next/link";

import SiteShell from "@/components/site-shell";

type RouteErrorProps = {
  error: Error & { digest?: string };
  /**
   * Stable as `retry` since Next 16.3.0 (it was `unstable_retry` in 16.2.x).
   * Prefer it over `reset()`: `reset()` only clears the error boundary state,
   * while `retry()` re-fetches and re-renders the segment's contents.
   */
  retry: () => void;
};

/**
 * Route-level error boundary. Error boundaries must be Client Components.
 *
 * The error is deliberately not reported to any external service; the `digest`
 * below is enough to match the failure against the server logs.
 */
export default function RouteError({ error, retry }: RouteErrorProps) {
  return (
    <SiteShell title="Something broke">
      <article className="page-markdown">
        <p>
          This page failed to render. It is usually temporary &mdash; trying
          again often works.
        </p>
        <p>
          <button className="button" type="button" onClick={() => retry()}>
            Try again
          </button>
        </p>
        <p>
          Otherwise, go back to the <Link href="/">homepage</Link> or the{" "}
          <Link href="/blog">blog</Link>.
        </p>
        {error.digest ? (
          <p className="meta-note">Error reference: {error.digest}</p>
        ) : null}
      </article>
    </SiteShell>
  );
}
