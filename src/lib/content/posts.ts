import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Post } from "./types";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

/** Average adult reading speed, used when a post does not state its own. */
const WORDS_PER_MINUTE = 200;

/** "2026-03-29" -> "March 29, 2026", matching how posts were originally dated. */
function formatDisplayDate(iso: string): string {
  const parsed = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return iso;
  return parsed.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Word count of the body with markdown syntax and image URLs discounted. */
function estimateReadingMinutes(body: string): number {
  const words = body
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/**
 * Parsed once per process and reused. Content is read from disk at build time,
 * so this cache lives for the whole static generation run.
 */
let cache: { all: Post[]; bySlug: Map<string, Post> } | null = null;

function parse(file: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const body = content.trim();
  // YAML parses an unquoted `date: 2026-09-15` into a Date, which is what
  // Keystatic writes; hand-written posts quote it and stay strings. Normalise
  // both to an ISO day — String(someDate) would otherwise yield "Tue Sep 15".
  const date =
    data.date instanceof Date
      ? data.date.toISOString().slice(0, 10)
      : String(data.date).slice(0, 10);
  return {
    slug: data.slug ?? file.replace(/\.md$/, ""),
    title: data.title ?? null,
    date,
    // Both of these are derived when absent, so a new post only has to supply
    // a title, a date and its tags.
    displayDate: data.displayDate ?? formatDisplayDate(date),
    readingMinutes: data.readingMinutes ?? estimateReadingMinutes(body),
    readingApprox: data.readingApprox === true,
    standing: data.standing === true,
    tags: Array.isArray(data.tags) ? data.tags : [],
    body,
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
