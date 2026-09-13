import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ExifBlogNav from "@/components/exif-blog-nav";
import PageMarkdown from "@/components/page-markdown";
import SiteShell from "@/components/site-shell";
import { getAllPosts, getPostBySlug } from "@/lib/content";
import { DEDICATED_POST_ROUTES } from "@/lib/site-config";
import { toEntryMarkdown } from "@/lib/content/render";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

/** Every post is known at build time, so an unknown slug is a real 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts()
    .filter(
      (post) =>
        !DEDICATED_POST_ROUTES.includes(
          post.slug as (typeof DEDICATED_POST_ROUTES)[number],
        ),
    )
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const title = post.title ?? `Note from ${post.displayDate}`;
  // First ~30 words of the body, with markdown syntax stripped, as a summary.
  const description = post.body
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`\\]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 30)
    .join(" ");

  return {
    title,
    description: description || undefined,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title,
      description: description || undefined,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
      url: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <SiteShell variant="blog" showPrimaryNav={false} topContent={<ExifBlogNav />}>
      <PageMarkdown content={toEntryMarkdown(post)} />
    </SiteShell>
  );
}
