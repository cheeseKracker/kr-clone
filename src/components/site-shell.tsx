import Link from "next/link";
import type { ReactNode } from "react";

type SiteShellProps = {
  title?: string;
  variant?: "default" | "blog";
  showPrimaryNav?: boolean;
  mainClassName?: string;
  children: ReactNode;
};

export default function SiteShell({
  title,
  variant = "default",
  showPrimaryNav = false,
  mainClassName,
  children,
}: SiteShellProps) {
  const rootClassName = variant === "blog" ? "site-root site-root--blog" : "site-root";
  const resolvedMainClassName = mainClassName
    ? `site-main ${mainClassName}`
    : "site-main";

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
      <main className={resolvedMainClassName}>
        {title ? <h1 className="site-title">{title}</h1> : null}
        {children}
      </main>
    </div>
  );
}
