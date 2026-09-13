import type { ReactNode } from "react";

/**
 * The admin UI ships its own styling. This layout deliberately renders the
 * children bare so the site's globals.css does not bleed into it.
 */
export default function KeystaticLayout({ children }: { children: ReactNode }) {
  return children;
}
