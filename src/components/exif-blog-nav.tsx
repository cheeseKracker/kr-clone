"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent } from "react";

export default function ExifBlogNav() {
  const pathname = usePathname();
  const router = useRouter();
  const normalizedPath = pathname?.replace(/\/+$/, "") || pathname;

  const handleMinfoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const cacheBustedPath = `/blog/minfo?v=${Date.now()}`;

    if (normalizedPath === "/blog/minfo") {
      router.replace(cacheBustedPath, { scroll: false });
      return;
    }

    router.push(cacheBustedPath);
  };

  return (
    <section className="exif-nav">
      <p className="exif-nav-title">Exif: Blog</p>
      <nav className="exif-nav-links" aria-label="Exif Blog Links">
        <Link href="/">Root</Link>
        <Link href="/blog/minfo" onClick={handleMinfoClick}>
          Is This Normal?
        </Link>
        <Link href="/blog/dog-years">Bookshelf</Link>
        <Link href="/sandbox">Old Projects</Link>
        <Link href="/blog/uses">Gear</Link>
        <Link href="/blog/teaching">Teaching</Link>
        <a href="https://www.yourworldoftext.com/~keyaar/" target="_blank" rel="noreferrer noopener">
          Say Hi!
        </a>
      </nav>
    </section>
  );
}
