import {
  Database,
  Globe,
  // Link,
  Lock,
  Notebook,
  Search,
  Terminal,
  // Zap,
} from "lucide-react"

import { KeyFeatureProps } from "@/features/web/landing/components/KeyFeature"

export const keyFeatures: KeyFeatureProps[] = [
  {
    Icon: Notebook,
    title: "Zettelkasten System",
    description:
      "Organize your notes using the powerful Zettelkasten method for better knowledge management.",
  },
  {
    Icon: Terminal,
    title: "CLI Integration",
    description:
      "Seamlessly use our tool directly from your terminal for quick note-taking.",
  },
  {
    Icon: Globe,
    title: "Web Access",
    description:
      "Access and edit your notes from anywhere using our web application.",
  },
  {
    Icon: Database,
    title: "Multiple Vaults",
    description:
      "Organize your notes into separate vaults for different projects or areas of your life.",
  },
  {
    Icon: Search,
    title: "Advanced Search",
    description:
      "Quickly find what you need with our powerful full-text search and filtering capabilities.",
  },
  {
    Icon: Lock,
    title: "End-to-End Encryption",
    description:
      "Keep your notes secure with state-of-the-art encryption, ensuring your privacy.",
  },
  // {
  //     Icon: Link,
  //     title: "Bi-directional Linking",
  //     description:
  //       "Create and visualize connections between your notes for a richer knowledge network.",
  //   },
  // {
  //   Icon: Zap,
  //   title: "AI-Powered Insights",
  //   description:
  //     "Gain new perspectives on your notes with our AI-driven analysis and suggestion features.",
  // },
]
