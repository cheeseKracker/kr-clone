import type { Post } from "./types";
import { getTagLabel } from "./tags";

/**
 * Rebuilds a post's aggregate-listing markdown from its structured fields.
 *
 * The blog index and tag archives originally stored a hand-maintained copy of
 * every entry. They are now generated from this function instead, so the entry
 * format lives in exactly one place and cannot drift from the posts.
 */
export function toEntryMarkdown(post: Post): string {
  const href = `/blog/${post.slug}`;
  const lines: string[] = [];

  if (post.title) lines.push(`[**${post.title}**](${href})`, "");

  const reading =
    post.readingMinutes === null
      ? null
      : `Reading time: ${post.readingApprox ? "~" : ""}${post.readingMinutes} ` +
        `${post.readingMinutes === 1 ? "minute" : "minutes"}`;

  lines.push("→", `${post.displayDate} \\|`);
  lines.push(reading ? `${reading} \\| [Permalink](${href})` : `[Permalink](${href})`);
  lines.push("", post.body);

  if (post.tags.length) {
    const tags = post.tags
      .map((t) => `[${getTagLabel(t)}](/blog/tag/${t})`)
      .join(" ");
    lines.push("", `Tagged: ${tags}`);
  }

  return lines.join("\n");
}

/** Joins many entries into one river, separated the way the original site did. */
export function toRiverMarkdown(posts: Post[]): string {
  return posts.map(toEntryMarkdown).join("\n\n* * *\n\n");
}
