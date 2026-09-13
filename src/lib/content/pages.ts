import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Page } from "./types";

const PAGES_DIR = path.join(process.cwd(), "content/pages");

let cache: { all: Page[]; byPath: Map<string, Page> } | null = null;

/** Trailing slashes are insignificant, so "/sandbox/" and "/sandbox" are one page. */
function normalize(p: string) {
  if (!p) return "/";
  return p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p;
}

function load() {
  if (cache) return cache;
  const all = fs
    .readdirSync(PAGES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const { data, content } = matter(
        fs.readFileSync(path.join(PAGES_DIR, file), "utf8"),
      );
      return {
        slug: data.slug ?? file.replace(/\.md$/, ""),
        path: data.path,
        title: data.title ?? "",
        type: data.type ?? "page",
        body: content.trim(),
      } as Page;
    });

  cache = { all, byPath: new Map(all.map((p) => [normalize(p.path), p])) };
  return cache;
}

export function getAllPages(): Page[] {
  return load().all;
}

/** O(1) lookup. */
export function getPageByPath(pathname: string): Page | undefined {
  return load().byPath.get(normalize(pathname));
}
