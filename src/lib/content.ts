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

export function getAllPages(): SitePage[] {
  return siteContent.pages as SitePage[];
}

export function getRouteManifest() {
  return routeManifest.routes as Array<{
    pathname: string;
    type: PageType;
    title: string;
  }>;
}

export function findPageByPath(pathname: string): SitePage | undefined {
  return getAllPages().find((page) => page.pathname === pathname);
}

export function getBlogPosts() {
  return getAllPages().filter(
    (page) => page.type === "blog-post" || page.type === "legacy-post",
  );
}
