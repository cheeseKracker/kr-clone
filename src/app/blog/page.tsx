import type { Metadata } from "next";
import ExifBlogNav from "@/components/exif-blog-nav";
import PostRiver from "@/components/post-river";
import SiteShell from "@/components/site-shell";
import { getFeedPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing, photographs and notes.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <SiteShell variant="blog" showPrimaryNav={false} topContent={<ExifBlogNav />}>
      <PostRiver posts={getFeedPosts()} />
    </SiteShell>
  );
}
