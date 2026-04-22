import ExifBlogNav from "@/components/exif-blog-nav";
import PageMarkdown from "@/components/page-markdown";
import SiteShell from "@/components/site-shell";
import { findPageByPath } from "@/lib/content";
import { MINFO_BIO_VARIANTS } from "@/lib/minfo-bio-variants";
import MinfoBioIsland from "../../../components/minfo-bio-island";

export default async function MinfoPage() {
  const page = findPageByPath("/blog/minfo");

  if (MINFO_BIO_VARIANTS.length === 0) {
    return (
      <SiteShell variant="blog" showPrimaryNav={false} topContent={<ExifBlogNav />}>
        <PageMarkdown content={page?.markdown ?? "Bio content unavailable."} />
      </SiteShell>
    );
  }

  return (
    <SiteShell
      variant="blog"
      showPrimaryNav={false}
      topContent={<ExifBlogNav />}
      mainClassName="site-main--minfo"
    >
      <MinfoBioIsland />
    </SiteShell>
  );
}
