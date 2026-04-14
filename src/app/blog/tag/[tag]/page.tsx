import ExifBlogNav from "@/components/exif-blog-nav";
import PageMarkdown from "@/components/page-markdown";
import SiteShell from "@/components/site-shell";
import { findPageByPath, getRouteManifest } from "@/lib/content";

type TagPageProps = {
  params: Promise<{ tag: string }>;
};

export function generateStaticParams() {
  return getRouteManifest()
    .filter((route) => route.type === "tag")
    .map((route) => ({
      tag: route.pathname.replace("/blog/tag/", ""),
    }));
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const page = findPageByPath(`/blog/tag/${tag}`);

  return (
    <SiteShell variant="blog" showPrimaryNav={false}>
      <ExifBlogNav />
      <PageMarkdown
        content={page?.markdown ?? `Tag archive page for **${tag}** is unavailable.`}
      />
    </SiteShell>
  );
}
