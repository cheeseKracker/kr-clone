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

  return null;
}
