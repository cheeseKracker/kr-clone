import Link from "next/link";

export default function ExifBlogNav() {
  return (
    <section className="exif-nav">
      <p className="exif-nav-title">Exif: Blog</p>
      <nav className="exif-nav-links" aria-label="Exif Blog Links">
        <Link href="/">Root</Link>
        <Link href="/blog/minfo">Is This Normal?</Link>
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
