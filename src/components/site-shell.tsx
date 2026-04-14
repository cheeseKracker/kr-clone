import Link from "next/link";
import type { ReactNode } from "react";

type SiteShellProps = {
  title?: string;
  children: ReactNode;
};

export default function SiteShell({ title, children }: SiteShellProps) {
  return (
    <div className="site-root">
      <header className="site-header">
        <nav className="site-nav">
          <Link href="/">home</Link>
          <Link href="/blog">blog</Link>
          <Link href="/now.html">now</Link>
        </nav>
      </header>
      <main className="site-main">
        {title ? <h1 className="site-title">{title}</h1> : null}
        {children}
      </main>
    </div>
  );
}
