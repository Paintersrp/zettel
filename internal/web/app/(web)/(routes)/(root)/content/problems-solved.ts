import { Brain, Link, Search, Shield } from "lucide-react"

import { ProblemProps } from "@/app/(web)/(routes)/(root)/components/Problem"

export const problemsSolved: ProblemProps[] = [
  {
    title: "Information Overload",
    description:
      "Our system helps you organize and structure your notes, making it easy to manage large amounts of information without feeling overwhelmed.",
    icon: Brain,
  },
  {
    title: "Difficulty Finding Information",
    description:
      "With powerful search capabilities and tagging systems, you can quickly locate the exact information you need when you need it.",
    icon: Search,
  },
  {
    title: "Disconnected Ideas",
    description:
      "Our Zettelkasten-inspired system allows you to create meaningful connections between your notes, helping you discover new insights and relationships.",
    icon: Link,
  },
  {
    title: "Data Security Concerns",
    description:
      "Rest easy knowing your notes are protected with industry-leading encryption and security practices, ensuring your ideas remain private and secure.",
    icon: Shield,
  },
]
