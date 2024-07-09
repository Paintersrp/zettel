import { Database, Globe, Notebook, Terminal } from "lucide-react"

import { UseCaseProps } from "@/app/(web)/(routes)/(root)/components/UseCase"

export const useCases: UseCaseProps[] = [
  {
    title: "Research",
    description:
      "Organize complex research projects and connect ideas across multiple sources.",
    icon: Notebook,
  },
  {
    title: "Software Development",
    description:
      "Keep track of code snippets, project ideas, and technical documentation.",
    icon: Terminal,
  },
  {
    title: "Writing",
    description:
      "Collect inspiration, outline your work, and manage multiple writing projects.",
    icon: Globe,
  },
  {
    title: "Personal Knowledge Management",
    description:
      "Build your second brain by organizing and connecting your personal knowledge.",
    icon: Database,
  },
]
