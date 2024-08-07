import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface MarkdownProps {
  content: string
}

const Markdown = ({ content }: MarkdownProps) => (
  <ReactMarkdown
    children={content}
    remarkPlugins={[remarkGfm]}
    className="flex flex-col w-full"
  />
)

export { Markdown }
