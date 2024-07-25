import { FC } from "react"

import { cn } from "@/utils/cn"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"

interface AppNoContentCardProps {
  title: string
  description?: string
  message: string
  classes?: {
    card?: string
    content?: string
  }
}

export const AppNoContentCard: FC<AppNoContentCardProps> = ({
  title,
  description,
  message,
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
        <p className="text-sm text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  )
}
