import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageMarkdown from "@/components/page-markdown";
import SiteShell from "@/components/site-shell";
import { getAllPages, getPageByPath } from "@/lib/content";
import { RESERVED_ROUTES } from "@/lib/site-config";

type CatchAllPageProps = {
  params: Promise<{ slug: string[] }>;
};

function standalonePages() {
  return getAllPages().filter(
    (page) =>
      !RESERVED_ROUTES.includes(page.path as (typeof RESERVED_ROUTES)[number]) &&
      !page.path.startsWith("/blog/"),
  );
}

export function generateStaticParams() {
  // Catch-all params are arrays, one element per path segment.
  return standalonePages().map((page) => ({ slug: page.path.slice(1).split("/") }));
}

export async function generateMetadata({
  params,
}: CatchAllPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageByPath(`/${slug.join("/")}`);
  if (!page) return {};
  return {
    title: page.title,
    alternates: { canonical: page.path },
  };
}

export default async function CatchAllPage({ params }: CatchAllPageProps) {
  const { slug } = await params;
  const page = getPageByPath(`/${slug.join("/")}`);

  // A catch-all can still match paths outside generateStaticParams, so the
  // explicit guard is what actually produces the 404.
  if (!page) {
    notFound();
  }

  return (
    <SiteShell>
      <PageMarkdown content={page.body} />
    </SiteShell>
  );
}
