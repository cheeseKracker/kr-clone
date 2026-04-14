import Link from "next/link";
import type { SitePage } from "@/lib/content";

type PostListProps = {
  posts: SitePage[];
};

export default function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <p className="empty-state">
        No posts are available in the local snapshot yet. Run the crawl pipeline to
        populate this list.
      </p>
    );
  }

  return (
    <ul className="post-list">
      {posts.map((post) => (
        <li key={post.pathname}>
          <Link href={post.pathname}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
}
