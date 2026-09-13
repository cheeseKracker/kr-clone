/** Shared content types. */

export type Post = {
  slug: string;
  /** `null` for the untitled microposts, which render as date-only entries. */
  title: string | null;
  /** ISO `YYYY-MM-DD`, for sorting and machine-readable `<time>`. */
  date: string;
  /** The date exactly as authored, e.g. "March 29, 2026". */
  displayDate: string;
  readingMinutes: number | null;
  /** True when the original reading time was written as "~N minutes". */
  readingApprox: boolean;
  /**
   * Standing pages (bio, bookshelf, gear, wishlist) live under /blog but are
   * living documents, not dated entries. They are excluded from the feed.
   */
  standing: boolean;
  tags: string[];
  body: string;
};

export type Page = {
  slug: string;
  /** The route this page is served at, e.g. "/now.html". */
  path: string;
  title: string;
  type: string;
  body: string;
};

export type Tag = {
  slug: string;
  /** Display casing as authored, e.g. "NowPlaying". */
  label: string;
  count: number;
};
