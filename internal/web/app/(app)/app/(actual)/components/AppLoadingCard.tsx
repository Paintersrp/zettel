import { FC } from "react"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"

interface AppLoadingCardProps {
  title: string
  description?: string
  classes?: {
    card?: string
    content?: string
  }
}

// TODO: Skeleton Loading

export const AppLoadingCard: FC<AppLoadingCardProps> = ({
  title,
  description,
  classes = {},
}) => {
  return (
    <Card className={classes.card}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent
        className={cn("flex items-center justify-center", classes.content)}
      >
        <Loader2 className="size-20 text-primary animate-spin" />
      </CardContent>
    </Card>
  )
}
