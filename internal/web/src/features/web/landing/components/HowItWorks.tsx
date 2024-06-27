import { type FC } from "react"
import {
  FileText,
  Folder,
  GitBranch,
  RefreshCw,
  Search,
  Shield,
  // Zap,
  type LucideIcon,
} from "lucide-react"

import useIntersection from "@/hooks/useIntersection"
import { cn } from "@/lib/utils"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

import { SectionHeader } from "./SectionHeader"

interface InfoDisplayProps {
  Icon: LucideIcon
  title: string
  content: string
  features: string[]
}

const InfoDisplay: FC<InfoDisplayProps> = ({
  Icon,
  title,
  content,
  features,
}) => (
  <Card className="h-full bg-card shadow-lg hover:shadow-xl transition-shadow duration-300">
    <CardHeader className="pb-2">
      <CardTitle className="flex items-center gap-3 text-3xl text-primary">
        <Icon className="size-9 " />
        <span>{title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <p className="text-muted-foreground">{content}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-2">
            <div className="bg-primary/10 text-primary inline-flex items-center justify-center rounded-full border size-7 text-xs font-semibold transition-colors">
              {index + 1}
            </div>
            <span className="text-sm text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
)

interface StepProps {
  index: number
  title: string
  description: string
  reverse?: boolean
  info: InfoDisplayProps
}

const Step: React.FC<StepProps> = ({
  index,
  title,
  description,
  info,
  reverse = false,
}) => {
  const { ref } = useIntersection({
    threshold: 0.2,
    onIntersect: (entry) => handleIntersection(entry),
  })

  const handleIntersection = (entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("opacity-0")
      entry.target.classList.remove("translate-y-8")
    }
  }

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-start justify-between gap-12 transition-all !duration-700 sine opacity-0 translate-y-8",
        reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      )}
    >
      <div className="w-full lg:w-1/2">
        <InfoDisplay {...info} />
      </div>
      <div className="w-full lg:w-1/2 space-y-6">
        <h3 className="text-3xl font-bold text-primary">
          <span className="text-3xl">{index}.</span> {title}
        </h3>
        <p className="text-muted-foreground text-lg leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}

const steps: Omit<StepProps, "index">[] = [
  {
    title: "Create Your Vault",
    description:
      "Start by setting up your first vault to organize your notes. Our vault system allows for flexible organization, supporting nested folders, custom metadata, and granular access controls.",
    info: {
      Icon: Folder,
      title: "Vaults",
      content:
        "Vaults are secure containers for your notes. Create multiple vaults for different projects or areas of life. Each vault can have its own structure, tags, and access permissions.",
      features: [
        "Create unlimited vaults (Premium plan)",
        "Set custom security and sharing settings",
        "Import existing notes from other platforms",
      ],
    },
    reverse: true,
  },
  {
    title: "Take Notes",
    description:
      "Use our intuitive web interface or CLI to capture your thoughts and ideas. Our system supports various note formats and provides powerful organization tools.",
    info: {
      Icon: FileText,
      title: "Notes",
      content:
        "Our note-taking interface supports rich text, code snippets, LaTeX equations, and file attachments. Use our powerful tagging system and full-text search to quickly find and organize your notes.",
      features: [
        "Rich text editor with Markdown support",
        "Code syntax highlighting for 100+ languages",
        "Embed images, PDFs, and other file types",
        "Voice-to-text note creation (Premium plan)",
      ],
    },
  },
  {
    title: "Connect Your Ideas",
    description:
      "Link related notes together using our Zettelkasten-inspired system. This powerful method allows you to create a web of knowledge, helping you discover new connections between ideas.",
    info: {
      Icon: GitBranch,
      title: "Link",
      content:
        "Our Zettelkasten-inspired system allows you to create bidirectional links between notes, generate visual knowledge graphs, and discover unexpected connections in your personal knowledge base.",

      features: [
        "Create bidirectional links between notes",
        "Automatically suggest relevant connections",
        "Generate visual knowledge graphs",
        "Use AI-powered topic clustering (Premium plan)",
      ],
    },
    reverse: true,
  },
  {
    title: "Sync and Access Anywhere",
    description:
      "Your notes automatically sync between all your devices, ensuring seamless access to your knowledge base wherever you are. Work offline and sync when you're back online.",
    info: {
      Icon: RefreshCw,
      title: "Sync",
      content:
        "Your notes sync seamlessly across all your devices. Access your knowledge base from our web app, mobile apps, or CLI. Offline mode ensures you can always access and edit your notes, even without an internet connection.",
      features: [
        "Real-time syncing across all devices",
        "Offline mode for uninterrupted work",
        "Version history and conflict resolution",
        "End-to-end encryption for maximum security",
      ],
    },
  },
  {
    title: "Advanced Search and Retrieval",
    description:
      "Find exactly what you're looking for with our comprehensive search tools. Our system understands context and relationships between your notes.",
    info: {
      Icon: Search,
      title: "Search",
      content:
        "Utilize our powerful search capabilities to quickly find the information you need. Our advanced search includes full-text search, tag-based filtering, and semantic search options.",
      features: [
        "Full-text search with natural language processing",
        "Tag-based and attribute-based filtering",
        "Semantic search for concept-based retrieval",
        "Search across multiple vaults (Premium plan)",
      ],
    },

    reverse: true,
  },
  {
    title: "Robust Security",
    description:
      "Our platform is built with security at its core. Your data is protected with industry-leading encryption and security practices.",
    info: {
      Icon: Shield,
      title: "Rest easy",
      content:
        "Keep your ideas safe with our state-of-the-art security measures. We prioritize the privacy and protection of your intellectual property.",

      features: [
        "End-to-end encryption for all notes",
        "Two-factor authentication",
        "Granular access controls for shared vaults",
        "Regular security audits and updates",
      ],
    },
  },
  // {
  //   title: "AI-Powered Insights",
  //   description:
  //     "Unlock the full potential of your notes with our AI-powered tools. Get smart suggestions, automated summaries, and even AI-generated content ideas.",
  //   info: {
  //      Icon: Zap,
  //      title: "AI"
  //      content:
  //       "Leverage the power of AI to gain new insights from your notes. Our AI assistant can help you analyze, summarize, and even generate new ideas based on your existing knowledge base.",
  //      features: [
  //        "AI-powered note summarization",
  //        "Smart tagging suggestions",
  //        "Automated content generation based on your notes",
  //        "Personalized learning recommendations",
  //      ],
  //    },
  //   reverse: true,
  // },
]

export const HowItWorks = () => {
  return (
    <section className="w-full">
      <div className="container mx-auto px-4">
        {/* TODO: Description? */}
        <SectionHeader title="How It Works" />

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
