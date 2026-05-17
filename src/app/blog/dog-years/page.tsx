import ExifBlogNav from "@/components/exif-blog-nav";
import PageMarkdown from "@/components/page-markdown";
import SiteShell from "@/components/site-shell";
import { findPageByPath } from "@/lib/content";

export default function DogYearsPage() {
  const page = findPageByPath("/blog/dog-years");

  return (
    <SiteShell
      variant="blog"
      showPrimaryNav={false}
      topContent={<ExifBlogNav />}
      mainClassName="site-main--dog-years"
    >
      <PageMarkdown content={page?.markdown ?? ""} />
    </SiteShell>
  );
}
