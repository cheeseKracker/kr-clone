import ExifBlogNav from "@/components/exif-blog-nav";
import PostList from "@/components/post-list";
import SiteShell from "@/components/site-shell";
import { findPageByPath, getBlogPosts } from "@/lib/content";

export default function BlogIndexPage() {
  const page = findPageByPath("/blog");
  const posts = getBlogPosts();

  return (
    <SiteShell title={page?.title ?? "Blog"}>
      <ExifBlogNav />
      <PostList posts={posts} />
      <small className="meta-note">
        Route source: <a href={page?.sourceURL ?? "https://keyaar.in/blog"}>{page?.sourceURL ?? "https://keyaar.in/blog"}</a>
      </small>
    </SiteShell>
  );
}
