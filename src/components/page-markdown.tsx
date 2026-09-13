import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { isExternalHref, toLocalHref } from "@/lib/site-config";

type PageMarkdownProps = {
  content: string;
  className?: string;
};

export default function PageMarkdown({ content, className }: PageMarkdownProps) {
  return (
    <article className={className ? `page-markdown ${className}` : "page-markdown"}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children, ...props }) => {
            const nextHref = toLocalHref(href);
            const external = Boolean(nextHref && isExternalHref(nextHref));
            return (
              <a
                href={nextHref}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer noopener" : undefined}
                {...props}
              >
                {children}
              </a>
            );
          },
          img: ({ src, alt, ...props }) => {
            const nextSrc = typeof src === "string" ? toLocalHref(src) : undefined;
            // Migrated markdown carries arbitrary images with no known dimensions,
            // so next/image cannot be used here without guessing a layout.
            // eslint-disable-next-line @next/next/no-img-element
            return <img src={nextSrc} alt={alt ?? ""} loading="lazy" {...props} />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
