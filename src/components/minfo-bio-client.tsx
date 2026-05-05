"use client";

import { useEffect, useState } from "react";
import PageMarkdown from "@/components/page-markdown";
import {
  MINFO_BIO_VARIANTS,
  pickDifferentMinfoBioVariant,
} from "@/lib/minfo-bio-variants";

const STORAGE_KEY = "minfo_last";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

type MinfoBioClientProps = {
  initialVariantIndex: number;
};

function rememberVariant(index: number) {
  window.localStorage.setItem(STORAGE_KEY, String(index));
  document.cookie = `${STORAGE_KEY}=${index}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

export default function MinfoBioClient({
  initialVariantIndex,
}: MinfoBioClientProps) {
  const [variantIndex, setVariantIndex] = useState(initialVariantIndex);

  useEffect(() => {
    rememberVariant(variantIndex);

    const logBioLinkClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const anchor = target?.closest("a");

      if (!(anchor instanceof HTMLAnchorElement)) return;

      const samePath =
        anchor.pathname === window.location.pathname &&
        anchor.search === window.location.search;
      const plainLeftClick =
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey;

      if (!samePath || !plainLeftClick) return;

      event.preventDefault();
      setVariantIndex((currentIndex) => {
        const nextIndex = pickDifferentMinfoBioVariant(currentIndex);

        rememberVariant(nextIndex);

        return nextIndex;
      });
    };

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
    document.addEventListener("click", logBioLinkClick, true);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      document.removeEventListener("click", logBioLinkClick, true);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  return <PageMarkdown content={MINFO_BIO_VARIANTS[variantIndex]} />;
}
