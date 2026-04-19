import PageMarkdown from "@/components/page-markdown";
import SiteShell from "@/components/site-shell";
import { findPageByPath } from "@/lib/content";

export default function Home() {
  const page = findPageByPath("/");

  return (
    <SiteShell pageRole="root">
      <PageMarkdown content={page?.markdown ?? "Homepage content unavailable."} />
    </SiteShell>
  );
}
