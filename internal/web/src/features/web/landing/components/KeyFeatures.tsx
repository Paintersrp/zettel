import { type FC } from "react"
import { Database, Globe, LucideIcon, Notebook, Terminal } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"

const features: FeatureProps[] = [
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
]

interface FeatureProps {
  Icon: LucideIcon
  title: string
  description: string
}

const Feature: FC<FeatureProps> = ({ Icon, title, description }) => (
  <Card>
    <CardHeader className="!pb-2">
      <div className="flex items-center space-x-2">
        <div className="p-2 bg-primary/10 rounded-full">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent className="!pt-2">
      <CardDescription className="text-muted-foreground">
        {description}
      </CardDescription>
    </CardContent>
  </Card>
)

export const KeyFeatures = () => {
  return (
    <section className="w-full max-w-6xl py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Feature key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default KeyFeatures
