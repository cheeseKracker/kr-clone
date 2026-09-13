import Link from "next/link";
import { BLOG_NAV_LINKS } from "@/lib/site-config";

/**
 * Server component — it renders static links and has no interactivity, so it
 * ships no JavaScript.
 */
export default function ExifBlogNav() {
  return (
    <section className="exif-nav">
      <p className="exif-nav-title">XML: Blog</p>
      <nav className="exif-nav-links" aria-label="Exif Blog Links">
        {BLOG_NAV_LINKS.map((link) =>
          link.external ? (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
            >
              {link.label}
            </a>
          ) : (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ),
        )}
      </nav>
    </section>
  );
}
