import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Post } from "./types";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

/**
 * Parsed once per process and reused. Content is read from disk at build time,
 * so this cache lives for the whole static generation run.
 */
let cache: { all: Post[]; bySlug: Map<string, Post> } | null = null;

function parse(file: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  return {
    slug: data.slug ?? file.replace(/\.md$/, ""),
    title: data.title ?? null,
    date: String(data.date),
    displayDate: data.displayDate ?? String(data.date),
    readingMinutes: data.readingMinutes ?? null,
    readingApprox: data.readingApprox === true,
    standing: data.standing === true,
    tags: Array.isArray(data.tags) ? data.tags : [],
    body: content.trim(),
  };
}

function load() {
  if (cache) return cache;
  const all = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parse)
    // Newest first. Slug is the tiebreaker so ordering is stable across builds
    // for the three dates that carry two posts each.
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));

  cache = { all, bySlug: new Map(all.map((p) => [p.slug, p])) };
  return cache;
}

/** Every post, including standing pages. Newest first. */
export function getAllPosts(): Post[] {
  return load().all;
}

/** Dated entries only — what the blog index and tag archives list. */
export function getFeedPosts(): Post[] {
  return load().all.filter((p) => !p.standing);
}

/** O(1) lookup. */
export function getPostBySlug(slug: string): Post | undefined {
  return load().bySlug.get(slug);
}

export function getPostsByTag(tag: string): Post[] {
  return getFeedPosts().filter((p) => p.tags.includes(tag));
}
