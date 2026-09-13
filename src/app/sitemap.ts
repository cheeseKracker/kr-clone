import type { MetadataRoute } from "next";
import { getAllPages, getAllPosts, getAllTags } from "@/lib/content";
import { RESERVED_ROUTES, SITE_URL } from "@/lib/site-config";

/**
 * Generated from the content files, so a new post appears in the sitemap the
 * moment it is added — nothing to maintain by hand.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latest = posts[0]?.date;

  return [
    {
      url: SITE_URL,
      lastModified: latest,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: latest,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...getAllTags().map((tag) => ({
      url: `${SITE_URL}/blog/tag/${tag.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
    ...getAllPages()
      .filter((page) => !RESERVED_ROUTES.includes(page.path as (typeof RESERVED_ROUTES)[number]))
      .map((page) => ({
        url: `${SITE_URL}${page.path}`,
        changeFrequency: "yearly" as const,
        priority: 0.5,
      })),
    { url: `${SITE_URL}/now.html`, changeFrequency: "monthly" as const, priority: 0.6 },
  ];
}
