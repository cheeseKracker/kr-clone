"use client";

import { useEffect, useState } from "react";
import PageMarkdown from "@/components/page-markdown";
import { MINFO_BIO_VARIANTS } from "@/lib/minfo-bio-variants";

const STORAGE_KEY = "minfo_last";

function pickDifferentVariant(lastIndex: number): number {
  const total = MINFO_BIO_VARIANTS.length;
  if (total <= 1) return 0;

  let next = 0;
  do {
    next = Math.floor(Math.random() * total);
  } while (next === lastIndex);
  return next;
}

export default function MinfoBioClient() {
  const [variantIndex] = useState(() => {
    const lastRaw = window.localStorage.getItem(STORAGE_KEY);
    const parsedLast = lastRaw != null ? parseInt(lastRaw, 10) : -1;
    const lastIndex = Number.isFinite(parsedLast) ? parsedLast : -1;
    const nextIndex = pickDifferentVariant(lastIndex);

    window.localStorage.setItem(STORAGE_KEY, String(nextIndex));
    return nextIndex;
  });

  useEffect(() => {
    const reloadForHistoryRestore = () => {
      const navigationEntry = performance.getEntriesByType(
        "navigation",
      )[0] as PerformanceNavigationTiming | undefined;

      if (navigationEntry?.type === "back_forward") {
        window.location.reload();
      }
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        window.location.reload();
      }
    };

    reloadForHistoryRestore();
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  return <PageMarkdown content={MINFO_BIO_VARIANTS[variantIndex]} />;
}
