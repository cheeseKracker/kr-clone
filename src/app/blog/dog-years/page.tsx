import type { Metadata } from "next";
import ExifBlogNav from "@/components/exif-blog-nav";
import PageMarkdown from "@/components/page-markdown";
import SiteShell from "@/components/site-shell";
import { getPostBySlug } from "@/lib/content";

export const metadata: Metadata = {
  title: "Bookshelf",
  description: "Dog Years: the quantified shelf.",
  alternates: { canonical: "/blog/dog-years" },
};

export default function DogYearsPage() {
  const post = getPostBySlug("dog-years");

  return (
    <SiteShell
      variant="blog"
      showPrimaryNav={false}
      topContent={<ExifBlogNav />}
      mainClassName="site-main--dog-years"
    >
      <PageMarkdown content={post?.body ?? ""} />
    </SiteShell>
  );
}
