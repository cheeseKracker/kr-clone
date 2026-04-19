import ExifBlogNav from "@/components/exif-blog-nav";
import PageMarkdown from "@/components/page-markdown";
import SiteShell from "@/components/site-shell";
import { findPageByPath } from "@/lib/content";

export default function BlogIndexPage() {
  const page = findPageByPath("/blog");

  return (
    <SiteShell variant="blog" showPrimaryNav={false} topContent={<ExifBlogNav />}>
      <PageMarkdown content={page?.markdown ?? "Blog content unavailable."} />
    </SiteShell>
  );
}
