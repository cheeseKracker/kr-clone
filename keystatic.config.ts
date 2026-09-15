import { config, collection, fields } from "@keystatic/core";
import tagLabels from "./content/tags.json";

const TAG_OPTIONS = Object.entries(tagLabels).map(([value, label]) => ({
  value,
  label: String(label),
}));

export default config({
  // GitHub storage: edits are committed to the repo, so the CMS works on the
  // deployed site and from a phone, not just on this machine.
  //
  // Requires the GitHub App credentials in .env.local (and in Vercel). Without
  // them Keystatic renders a blank page with no error. It also redirects
  // localhost to 127.0.0.1 when running locally — that is expected.
  storage: { kind: "github", repo: "cheeseKracker/kr-clone" },

  ui: {
    brand: { name: "keyaar" },
    navigation: { Content: ["posts", "pages"] },
  },

  collections: {
    posts: collection({
      label: "Blog posts",
      path: "content/posts/*",
      // The filename is the URL: content/posts/my-post.md -> /blog/my-post
      slugField: "title",
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["title", "date"],
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            description: "Leave blank for an untitled note.",
          },
          slug: {
            label: "URL slug",
            description: "Becomes the web address: /blog/<slug>",
          },
        }),
        date: fields.date({
          label: "Date",
          validation: { isRequired: true },
        }),
        tags: fields.multiselect({
          label: "Tags",
          options: TAG_OPTIONS,
        }),
        // `extension: "md"` keeps the existing .md filenames; Keystatic would
        // otherwise write .mdoc and stop seeing the current posts entirely.
        content: fields.markdoc({
          label: "Post",
          extension: "md",
          options: {
            image: {
              directory: "public/blog/uploads",
              publicPath: "/blog/uploads",
            },
          },
        }),

        // --- Optional. Everything below is derived when left blank. ---
        readingMinutes: fields.integer({
          label: "Reading time (minutes)",
          description: "Leave blank to calculate from the word count.",
        }),
        readingApprox: fields.checkbox({
          label: "Show reading time as approximate (~)",
          defaultValue: false,
        }),
        displayDate: fields.text({
          label: "Display date override",
          description: 'Leave blank to format the date as "March 29, 2026".',
        }),
        standing: fields.checkbox({
          label: "Standing page",
          description:
            "A living page (bio, bookshelf, gear) rather than a dated post. Kept out of the blog feed.",
          defaultValue: false,
        }),
      },
    }),

    pages: collection({
      label: "Pages",
      path: "content/pages/*",
      slugField: "title",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        path: fields.text({
          label: "URL path",
          description: 'The address this page is served at, e.g. "/sandbox".',
          validation: { isRequired: true },
        }),
        type: fields.text({ label: "Type", defaultValue: "page" }),
        content: fields.markdoc({
          label: "Page",
          extension: "md",
          options: {
            image: {
              directory: "public/blog/uploads",
              publicPath: "/blog/uploads",
            },
          },
        }),
      },
    }),
  },
});
