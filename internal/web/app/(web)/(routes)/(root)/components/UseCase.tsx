import { type FC } from "react"
import Link from "next/link"
import { ArrowRight, type LucideIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge/Badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { SlideUp } from "@/components/SlideUp"

export interface UseCaseProps {
  title: string
  description: string
  icon: LucideIcon
  problem: string
  benefits: string[]
}

const UseCase: FC<UseCaseProps> = ({
  title,
  description,
  icon: Icon,
  problem,
  benefits,
}) => {
  return (
    <SlideUp>
      <Card className="group overflow-hidden border relative bg-gradient-to-br from-card to-accent shadow-md hover:shadow-xl transition-all duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full transition-all duration-300 group-hover:scale-150" />
        <CardHeader className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <Icon className="size-6 text-primary" />
            </div>
            <Badge className="text-xs bg-blue-500/20 text-foreground font-medium">
              {problem}
            </Badge>
          </div>
          <CardTitle className="text-xl mb-2 text-foreground">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          <ul className="space-y-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <ArrowRight className="size-4 text-primary mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm">{benefit}</span>
              </li>
            ))}
          </ul>
          <Link
            href="#"
            className="flex items-center flex-shrink mt-4 group text-primary text-sm font-medium"
          >
            <div className={`relative group`}>
              Learn more
              <span className="absolute bottom-0 left-0 w-0 group-hover:w-full ease-out duration-300 h-0.5 bg-primary"></span>
            </div>
            <ArrowRight className="ml-1 size-3 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </CardContent>
      </Card>
    </SlideUp>
  )
}

export { UseCase }
