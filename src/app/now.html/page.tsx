import type { Metadata } from "next";
import PageMarkdown from "@/components/page-markdown";
import SiteShell from "@/components/site-shell";
import { getPageByPath } from "@/lib/content";

const page = () => getPageByPath("/now.html");

export function generateMetadata(): Metadata {
  return {
    title: page()?.title ?? "now",
    alternates: { canonical: "/now.html" },
  };
}

export default function NowPage() {
  const now = page();
  return (
    <SiteShell title={now?.title ?? "now"}>
      <PageMarkdown content={now?.body ?? "No /now data available yet."} />
    </SiteShell>
  );
}
