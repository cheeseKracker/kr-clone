import fs from "node:fs";
import path from "node:path";
import type { Tag } from "./types";
import { getFeedPosts } from "./posts";

/** slug -> display label, e.g. "nowplaying" -> "NowPlaying". */
const LABELS: Record<string, string> = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "content/tags.json"), "utf8"),
);

/**
 * Derived from the posts themselves, so a tag exists exactly as long as some
 * post carries it. Nothing to keep in sync by hand.
 */
export function getAllTags(): Tag[] {
  const counts = new Map<string, number>();
  for (const post of getFeedPosts()) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([slug, count]) => ({ slug, label: LABELS[slug] ?? slug, count }))
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

export function getTagLabel(slug: string): string {
  return LABELS[slug] ?? slug;
}
