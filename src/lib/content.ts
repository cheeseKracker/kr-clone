import siteContent from "../../content/site-content.json";
import routeManifest from "../../data/normalized/routes.json";

export type PageType =
  | "home"
  | "blog-index"
  | "blog-post"
  | "tag"
  | "legacy-post"
  | "static-html"
  | "page";

export type SitePage = {
  sourceURL: string;
  pathname: string;
  type: PageType;
  title: string;
  markdown: string;
  links: string[];
};

function normalizePath(pathname: string) {
  if (!pathname) return "/";
  if (pathname !== "/" && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export function getAllPages(): SitePage[] {
  return siteContent.pages as SitePage[];
}

export function getRouteManifest() {
  const routes = routeManifest.routes as Array<{
    pathname: string;
    type: PageType;
    title: string;
  }>;

  const seen = new Set<string>();
  return routes.filter((route) => {
    const key = `${route.type}:${normalizePath(route.pathname)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function findPageByPath(pathname: string): SitePage | undefined {
  const target = normalizePath(pathname);
  return getAllPages().find((page) => normalizePath(page.pathname) === target);
}

export function getBlogPosts() {
  return getAllPages().filter(
    (page) => page.type === "blog-post" || page.type === "legacy-post",
  );
}
