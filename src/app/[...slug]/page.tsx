import { notFound } from "next/navigation";
import PageMarkdown from "@/components/page-markdown";
import SiteShell from "@/components/site-shell";
import { findPageByPath, getRouteManifest } from "@/lib/content";

type CatchAllPageProps = {
  params: Promise<{ slug: string[] }>;
};

export function generateStaticParams() {
  return getRouteManifest()
    .filter(
      (route) =>
        ![
          "/",
          "/blog",
          "/now.html",
        ].includes(route.pathname) &&
        !route.pathname.startsWith("/blog/"),
    )
    .map((route) => ({
      slug: route.pathname.slice(1).split("/"),
    }));
}

export default async function CatchAllPage({ params }: CatchAllPageProps) {
  const { slug } = await params;
  const pathname = `/${slug.join("/")}`;
  const page = findPageByPath(pathname);

  if (!page) {
    notFound();
  }

  return (
    <SiteShell>
      <PageMarkdown content={page.markdown} />
    </SiteShell>
  );
}
