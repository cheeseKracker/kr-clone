import ExifBlogNav from "@/components/exif-blog-nav";
import SiteShell from "@/components/site-shell";
import { getRouteManifest } from "@/lib/content";

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
  return (
    <SiteShell variant="blog" showPrimaryNav={false}>
      <ExifBlogNav />
      <p>
        Tag archive page for <strong>{tag}</strong>.
      </p>
      <small className="meta-note">
        This route is generated from normalized route manifests.
      </small>
    </SiteShell>
  );
}
