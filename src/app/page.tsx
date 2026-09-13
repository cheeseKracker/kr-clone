import PageMarkdown from "@/components/page-markdown";
import SiteShell from "@/components/site-shell";
import { getPageByPath } from "@/lib/content";

export default function Home() {
  const page = getPageByPath("/");

  return (
    <SiteShell pageRole="root">
      <PageMarkdown content={page?.body ?? "Homepage content unavailable."} />
    </SiteShell>
  );
}
