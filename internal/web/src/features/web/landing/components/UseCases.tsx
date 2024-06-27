import { type FC } from "react"
import {
  Database,
  Globe,
  Notebook,
  Terminal,
  type LucideIcon,
} from "lucide-react"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"

import { SectionHeader } from "./SectionHeader"

interface UseCase {
  title: string
  description: string
  icon: LucideIcon
}

const useCases: UseCase[] = [
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

const UseCase: FC<UseCase> = ({ title, description, icon: Icon }) => {
  return (
    <Card className="flex">
      <div className="pl-3 pt-3 md:pl-4 md:pt-4">
        <div className="p-2.5 rounded-full block bg-primary/10">
          <Icon className="size-6 text-primary" />
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}

export const UseCases = () => {
  return (
    <section className="w-full py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* TODO: Description? */}
        <SectionHeader title="Use Cases" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {useCases.map((useCase, index) => (
            <UseCase key={index} {...useCase} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default UseCases
