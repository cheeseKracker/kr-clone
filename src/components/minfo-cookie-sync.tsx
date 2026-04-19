"use client";

import { useEffect } from "react";

export default function MinfoCookieSync({
  variantIndex,
}: {
  variantIndex: number;
}) {
  useEffect(() => {
    document.cookie = `minfo_last=${variantIndex}; path=/blog/minfo; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
  }, [variantIndex]);

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

  return null;
}
