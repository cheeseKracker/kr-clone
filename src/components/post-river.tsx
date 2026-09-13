import Link from "next/link";
import PageMarkdown from "@/components/page-markdown";
import type { Post } from "@/lib/content";
import { toRiverMarkdown } from "@/lib/content/render";

type PostRiverProps = {
  posts: Post[];
  /** How many entries render in full before the archive list takes over. */
  riverLength?: number;
  archiveHeading?: string;
};

/**
 * The blog index and every tag archive render the same way: the most recent
 * entries in full, then the remainder as a compact list so nothing becomes
 * unreachable. Keeping both on this component stops the two drifting apart,
 * and caps page weight however many posts a tag accumulates.
 */
export default function PostRiver({
  posts,
  riverLength = 10,
  archiveHeading = "Older posts",
}: PostRiverProps) {
  const river = posts.slice(0, riverLength);
  const archive = posts.slice(riverLength);

  return (
    <>
      <PageMarkdown content={toRiverMarkdown(river)} />
      {archive.length > 0 ? (
        <section className="page-markdown">
          <h2>{archiveHeading}</h2>
          <ul className="post-list">
            {archive.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`}>
                  {post.title ?? post.displayDate}
                </Link>
                {post.title ? (
                  <span className="meta-note">{post.displayDate}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}
