import Link from "next/link";
import type { ReactNode } from "react";
import { PRIMARY_NAV_LINKS } from "@/lib/site-config";

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

  return (
    <div className={rootClassName}>
      {showPrimaryNav ? (
        <header className="site-header">
          <nav className="site-nav">
            {PRIMARY_NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </header>
      ) : null}
      {topContent}
      <main className={mainClassName ? `site-main ${mainClassName}` : "site-main"}>
        {title ? <h1 className="site-title">{title}</h1> : null}
        {children}
      </main>
    </div>
  );
}
