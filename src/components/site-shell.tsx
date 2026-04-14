import Link from "next/link";
import type { ReactNode } from "react";

type SiteShellProps = {
  title?: string;
  variant?: "default" | "blog";
  showPrimaryNav?: boolean;
  children: ReactNode;
};

export default function SiteShell({
  title,
  variant = "default",
  showPrimaryNav = false,
  children,
}: SiteShellProps) {
  const rootClassName = variant === "blog" ? "site-root site-root--blog" : "site-root";

  return (
    <div className={rootClassName}>
      {showPrimaryNav ? (
        <header className="site-header">
          <nav className="site-nav">
            <Link href="/">home</Link>
            <Link href="/blog">blog</Link>
            <Link href="/now.html">now</Link>
          </nav>
        </header>
      ) : null}
      <main className="site-main">
        {title ? <h1 className="site-title">{title}</h1> : null}
        {children}
      </main>
    </div>
  );
}
