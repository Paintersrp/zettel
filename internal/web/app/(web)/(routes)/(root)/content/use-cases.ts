import { Book, Brain, Code, Feather } from "lucide-react"

import { UseCaseProps } from "../components/UseCase"

export const useCases: UseCaseProps[] = [
  {
    title: "Academic Research",
    description:
      "Streamline your research process and connect ideas across multiple sources.",
    icon: Book,
    problem: "Information Overload",
    benefits: [
      "Effortlessly link related concepts and sources",
      "Retrieve relevant information in seconds",
      "Collaborate seamlessly with research peers",
    ],
  },
  {
    title: "Software Development",
    description:
      "Efficiently manage code snippets, project ideas, and technical documentation.",
    icon: Code,
    problem: "Knowledge Fragmentation",
    benefits: [
      "Integrate code snippets with detailed explanations",
      "Track project progress and innovative ideas",
      "Facilitate knowledge sharing within dev teams",
    ],
  },
  {
    title: "Creative Writing",
    description:
      "Nurture your ideas, outline your work, and juggle multiple writing projects with ease.",
    icon: Feather,
    problem: "Disconnected Ideas",
    benefits: [
      "Organize characters, plots, and settings intuitively",
      "Develop non-linear narratives with ease",
      "Track revisions and writing milestones effortlessly",
    ],
  },
  {
    title: "Personal Knowledge Management",
    description:
      "Construct your digital second brain by organizing and linking your personal knowledge securely.",
    icon: Brain,
    problem: "Information Scatter",
    benefits: [
      "Build a personalized, interconnected knowledge hub",
      "Quickly surface and connect past insights",
      "Ensure your personal data remains private and secure",
    ],
  },
]
