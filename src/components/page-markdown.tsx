import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type PageMarkdownProps = {
  content: string;
};

function toLocalHref(href?: string) {
  if (!href) return href;
  if (href.startsWith("/")) return href;

  try {
    const parsed = new URL(href);
    const host = parsed.hostname.replace(/^www\./, "");
    if (host === "keyaar.in" || host === "portofliokarak.vercel.app") {
      return `${parsed.pathname}${parsed.search}${parsed.hash}`;
    }
  } catch {
    return href;
  }
  return href;
}

export default function PageMarkdown({ content }: PageMarkdownProps) {
  return (
    <article className="page-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children, ...props }) => {
            const nextHref = toLocalHref(href);
            const external = Boolean(
              nextHref && /^https?:\/\//i.test(nextHref) && !nextHref.includes("keyaar.in") && !nextHref.includes("portofliokarak.vercel.app"),
            );
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
            return <img src={nextSrc} alt={alt ?? ""} loading="lazy" {...props} />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
