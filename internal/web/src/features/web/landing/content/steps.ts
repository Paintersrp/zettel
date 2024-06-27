import { StepProps } from "@/features/web/landing/components/Step"

export const steps: Omit<StepProps, "index">[] = [
  {
    title: "Create Your Vault",
    description:
      "Start by setting up your first vault to organize your notes. Our vault system allows for flexible organization, supporting nested folders, custom metadata, and granular access controls.",
    info: {
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
