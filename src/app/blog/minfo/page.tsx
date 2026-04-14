import ExifBlogNav from "@/components/exif-blog-nav";
import PageMarkdown from "@/components/page-markdown";
import SiteShell from "@/components/site-shell";
import { findPageByPath } from "@/lib/content";
import { MINFO_BIO_VARIANTS } from "@/lib/minfo-bio-variants";
import { randomInt } from "node:crypto";

export const dynamic = "force-dynamic";

export default function MinfoPage() {
  const page = findPageByPath("/blog/minfo");
  const content =
    MINFO_BIO_VARIANTS.length > 0
      ? MINFO_BIO_VARIANTS[randomInt(MINFO_BIO_VARIANTS.length)]
      : (page?.markdown ?? "Bio content unavailable.");

  return (
    <SiteShell variant="blog" showPrimaryNav={false}>
      <ExifBlogNav />
      <PageMarkdown content={content} />
    </SiteShell>
  );
}
