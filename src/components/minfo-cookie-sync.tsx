"use client";

import { useEffect } from "react";

export default function MinfoCookieSync({
  variantIndex,
}: {
  variantIndex: number;
}) {
  useEffect(() => {
    const cookieValue = `minfo_last=${variantIndex}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;

    console.log("[minfo] client sync cookie", {
      variantIndex,
      pathname: window.location.pathname,
      hostname: window.location.hostname,
      cookieValue,
    });

    document.cookie = cookieValue;
  }, [variantIndex]);

  useEffect(() => {
    const reloadForHistoryRestore = () => {
      const navigationEntry = performance.getEntriesByType(
        "navigation",
      )[0] as PerformanceNavigationTiming | undefined;

      if (navigationEntry?.type === "back_forward") {
        console.log("[minfo] reloading after history restore", {
          navigationType: navigationEntry.type,
        });
        window.location.reload();
      }
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        console.log("[minfo] reloading after persisted pageshow");
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
