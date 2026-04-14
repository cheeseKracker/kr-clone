import PageMarkdown from "@/components/page-markdown";
import SiteShell from "@/components/site-shell";
import { findPageByPath } from "@/lib/content";

export default function NowPage() {
  const page = findPageByPath("/now.html");
  return (
    <SiteShell title={page?.title ?? "now"}>
      <PageMarkdown content={page?.markdown ?? "No /now data available yet."} />
    </SiteShell>
  );
}
