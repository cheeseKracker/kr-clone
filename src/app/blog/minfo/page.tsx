import { cookies } from "next/headers";
import ExifBlogNav from "@/components/exif-blog-nav";
import PageMarkdown from "@/components/page-markdown";
import MinfoCookieSync from "@/components/minfo-cookie-sync";
import SiteShell from "@/components/site-shell";
import { findPageByPath } from "@/lib/content";
import { MINFO_BIO_VARIANTS } from "@/lib/minfo-bio-variants";
import { randomInt } from "node:crypto";

export const dynamic = "force-dynamic";

export const MINFO_COOKIE_NAME = "minfo_last";

function pickDifferentVariant(lastIndex: number): number {
  const total = MINFO_BIO_VARIANTS.length;
  if (total <= 1) return 0;

  let next: number;
  do {
    next = randomInt(total);
  } while (next === lastIndex);
  return next;
}

export default async function MinfoPage() {
  const page = findPageByPath("/blog/minfo");

  if (MINFO_BIO_VARIANTS.length === 0) {
    return (
      <SiteShell variant="blog" showPrimaryNav={false} topContent={<ExifBlogNav />}>
        <PageMarkdown content={page?.markdown ?? "Bio content unavailable."} />
      </SiteShell>
    );
  }

  const cookieStore = await cookies();
  const lastRaw = cookieStore.get(MINFO_COOKIE_NAME)?.value;
  const lastIndex = lastRaw != null ? parseInt(lastRaw, 10) : -1;

  const nextIndex = pickDifferentVariant(
    Number.isFinite(lastIndex) ? lastIndex : -1,
  );

  return (
    <SiteShell
      variant="blog"
      showPrimaryNav={false}
      topContent={<ExifBlogNav />}
      mainClassName="site-main--minfo"
    >
      <MinfoCookieSync variantIndex={nextIndex} />
      <PageMarkdown content={MINFO_BIO_VARIANTS[nextIndex]} />
    </SiteShell>
  );
}
