import Link from "next/link";
import type { ReactNode } from "react";

type SiteShellProps = {
  title?: string;
  variant?: "default" | "blog";
  pageRole?: "root" | "default";
  showPrimaryNav?: boolean;
  topContent?: ReactNode;
  mainClassName?: string;
  children: ReactNode;
};

export default function SiteShell({
  title,
  variant = "default",
  pageRole = "default",
  showPrimaryNav = false,
  topContent,
  mainClassName,
  children,
}: SiteShellProps) {
  const rootClassName = [
    "site-root",
    variant === "blog" ? "site-root--blog" : null,
    pageRole === "root" ? "site-root--root" : null,
  ]
    .filter(Boolean)
    .join(" ");
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
      {topContent}
      <main className={resolvedMainClassName}>
        {title ? <h1 className="site-title">{title}</h1> : null}
        {children}
      </main>
    </div>
  );
}
