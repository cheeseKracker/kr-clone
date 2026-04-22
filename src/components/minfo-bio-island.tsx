"use client";

import dynamic from "next/dynamic";
import PageMarkdown from "@/components/page-markdown";
import { MINFO_BIO_VARIANTS } from "@/lib/minfo-bio-variants";

const MinfoBioClient = dynamic(() => import("./minfo-bio-client"), {
  ssr: false,
  loading: () => <PageMarkdown content={MINFO_BIO_VARIANTS[0]} />,
});

export default function MinfoBioIsland() {
  return <MinfoBioClient />;
}
