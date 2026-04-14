import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type PageMarkdownProps = {
  content: string;
};

export default function PageMarkdown({ content }: PageMarkdownProps) {
  return (
    <article className="page-markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  );
}
