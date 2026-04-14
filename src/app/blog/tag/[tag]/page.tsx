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
  const title = `Tag: ${tag}`;
  return (
    <SiteShell title={title}>
      <p>
        Tag archive page for <strong>{tag}</strong>.
      </p>
      <small className="meta-note">
        This route is generated from normalized route manifests.
      </small>
    </SiteShell>
  );
}
