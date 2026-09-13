import { cookies } from "next/headers";
import ExifBlogNav from "@/components/exif-blog-nav";
import PageMarkdown from "@/components/page-markdown";
import SiteShell from "@/components/site-shell";
import { getPostBySlug } from "@/lib/content";
import {
  MINFO_BIO_VARIANTS,
  pickDifferentMinfoBioVariant,
} from "@/lib/minfo-bio-variants";
import MinfoBioClient from "@/components/minfo-bio-client";

const MINFO_LAST_COOKIE = "minfo_last";

export default async function MinfoPage() {
  const post = getPostBySlug("minfo");

  if (MINFO_BIO_VARIANTS.length === 0) {
    return (
      <SiteShell variant="blog" showPrimaryNav={false} topContent={<ExifBlogNav />}>
        <PageMarkdown content={post?.body ?? "Bio content unavailable."} />
      </SiteShell>
    );
  }

  const cookieStore = await cookies();
  const lastRaw = cookieStore.get(MINFO_LAST_COOKIE)?.value;
  const parsedLast = lastRaw != null ? parseInt(lastRaw, 10) : -1;
  const lastIndex = Number.isFinite(parsedLast) ? parsedLast : -1;
  const initialVariantIndex = pickDifferentMinfoBioVariant(lastIndex);

  return (
    <SiteShell
      variant="blog"
      showPrimaryNav={false}
      topContent={<ExifBlogNav />}
      mainClassName="site-main--minfo"
    >
      <MinfoBioClient initialVariantIndex={initialVariantIndex} />
    </SiteShell>
  );
}
