import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ExifBlogNav from "@/components/exif-blog-nav";
import PostRiver from "@/components/post-river";
import SiteShell from "@/components/site-shell";
import { getAllTags, getPostsByTag, getTagLabel } from "@/lib/content";

type TagPageProps = {
  params: Promise<{ tag: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tag.slug }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const label = getTagLabel(tag);
  const count = getPostsByTag(tag).length;
  return {
    title: `Tagged: ${label}`,
    description: `${count} post${count === 1 ? "" : "s"} tagged ${label}.`,
    alternates: { canonical: `/blog/tag/${tag}` },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <SiteShell variant="blog" showPrimaryNav={false} topContent={<ExifBlogNav />}>
      <PostRiver posts={posts} archiveHeading={`More tagged ${getTagLabel(tag)}`} />
    </SiteShell>
  );
}
