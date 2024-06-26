import { type FC } from "react"
import {
  FileText,
  Folder,
  GitBranch,
  RefreshCw,
  Search,
  Shield,
  Zap,
  type LucideIcon,
} from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/Card"

interface InfoDisplayProps {
  Icon: LucideIcon
  content: string
  features: string[]
}

const InfoDisplay: FC<InfoDisplayProps> = ({ Icon, content, features }) => (
  <Card className="h-full">
    <CardHeader>
      <Icon className="size-10 text-primary mb-2" />
    </CardHeader>
    <CardContent className="space-y-4 !pt-2 ">
      <p className="">{content}</p>
      <ul className="list-disc list-inside text-muted">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </CardContent>
  </Card>
)

interface StepProps extends InfoDisplayProps {
  index: number
  title: string
  description: string
  reverse?: boolean
}

const Step: FC<StepProps> = ({
  Icon,
  index,
  title,
  content,
  description,
  features,
  reverse = false,
}) => (
  <div
    className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-start justify-center gap-12`}
  >
    <div className="w-full lg:w-1/2">
      <InfoDisplay Icon={Icon} content={content} features={features} />
    </div>
    <div className="w-full lg:w-1/2 space-y-6">
      <h3 className="text-3xl font-semibold text-primary">
        {index}. {title}
      </h3>
      <p className="text-muted-foreground text-lg leading-relaxed">
        {description}
      </p>
    </div>
  </div>
)

const steps: Omit<StepProps, "index">[] = [
  {
    Icon: Folder,
    title: "Create Your Vault",
    content:
      "Vaults are secure containers for your notes. Create multiple vaults for different projects or areas of life. Each vault can have its own structure, tags, and access permissions.",
    description:
      "Start by setting up your first vault to organize your notes. Our vault system allows for flexible organization, supporting nested folders, custom metadata, and granular access controls.",
    features: [
      "Create unlimited vaults (Premium plan)",
      "Set custom security and sharing settings",
      "Import existing notes from other platforms",
    ],

    reverse: true,
  },
  {
    Icon: FileText,
    title: "Take Notes",
    content:
      "Our note-taking interface supports rich text, code snippets, LaTeX equations, and file attachments. Use our powerful tagging system and full-text search to quickly find and organize your notes.",
    description:
      "Use our intuitive web interface or CLI to capture your thoughts and ideas. Our system supports various note formats and provides powerful organization tools.",
    features: [
      "Rich text editor with Markdown support",
      "Code syntax highlighting for 100+ languages",
      "Embed images, PDFs, and other file types",
      "Voice-to-text note creation (Premium plan)",
    ],
  },
  {
    Icon: GitBranch,
    title: "Connect Your Ideas",
    content:
      "Our Zettelkasten-inspired system allows you to create bidirectional links between notes, generate visual knowledge graphs, and discover unexpected connections in your personal knowledge base.",
    description:
      "Link related notes together using our Zettelkasten-inspired system. This powerful method allows you to create a web of knowledge, helping you discover new connections between ideas.",
    features: [
      "Create bidirectional links between notes",
      "Automatically suggest relevant connections",
      "Generate visual knowledge graphs",
      "Use AI-powered topic clustering (Premium plan)",
    ],
    reverse: true,
  },
  {
    Icon: RefreshCw,
    title: "Sync and Access Anywhere",
    content:
      "Your notes sync seamlessly across all your devices. Access your knowledge base from our web app, mobile apps, or CLI. Offline mode ensures you can always access and edit your notes, even without an internet connection.",
    description:
      "Your notes automatically sync between all your devices, ensuring seamless access to your knowledge base wherever you are. Work offline and sync when you're back online.",
    features: [
      "Real-time syncing across all devices",
      "Offline mode for uninterrupted work",
      "Version history and conflict resolution",
      "End-to-end encryption for maximum security",
    ],
  },
  {
    Icon: Search,
    title: "Advanced Search and Retrieval",
    content:
      "Utilize our powerful search capabilities to quickly find the information you need. Our advanced search includes full-text search, tag-based filtering, and semantic search options.",
    description:
      "Find exactly what you're looking for with our comprehensive search tools. Our system understands context and relationships between your notes.",
    features: [
      "Full-text search with natural language processing",
      "Tag-based and attribute-based filtering",
      "Semantic search for concept-based retrieval",
      "Search across multiple vaults (Premium plan)",
    ],
    reverse: true,
  },
  {
    Icon: Shield,
    title: "Robust Security",
    content:
      "Keep your ideas safe with our state-of-the-art security measures. We prioritize the privacy and protection of your intellectual property.",
    description:
      "Our platform is built with security at its core. Your data is protected with industry-leading encryption and security practices.",
    features: [
      "End-to-end encryption for all notes",
      "Two-factor authentication",
      "Granular access controls for shared vaults",
      "Regular security audits and updates",
    ],
  },
  {
    Icon: Zap,
    title: "AI-Powered Insights",
    content:
      "Leverage the power of AI to gain new insights from your notes. Our AI assistant can help you analyze, summarize, and even generate new ideas based on your existing knowledge base.",
    description:
      "Unlock the full potential of your notes with our AI-powered tools. Get smart suggestions, automated summaries, and even AI-generated content ideas.",
    features: [
      "AI-powered note summarization",
      "Smart tagging suggestions",
      "Automated content generation based on your notes",
      "Personalized learning recommendations",
    ],
    reverse: true,
  },
]

export const HowItWorks = () => {
  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-semibold text-center mb-16">
          How It Works
        </h2>
        <div className="space-y-24 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <Step key={index} index={index + 1} {...step} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
