import { notFound } from "next/navigation";
import PageMarkdown from "@/components/page-markdown";
import SiteShell from "@/components/site-shell";
import { findPageByPath, getRouteManifest } from "@/lib/content";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getRouteManifest()
    .filter((route) => route.type === "blog-post")
    .map((route) => ({
      slug: route.pathname.replace("/blog/", ""),
    }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const page = findPageByPath(`/blog/${slug}`);

  if (!page) {
    notFound();
  }

  return (
    <SiteShell title={page.title}>
      <PageMarkdown content={page.markdown} />
    </SiteShell>
  );
}
