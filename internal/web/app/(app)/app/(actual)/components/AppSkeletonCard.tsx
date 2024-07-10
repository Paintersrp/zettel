import { FC } from "react"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { Skeleton } from "@/components/ui/Skeleton"

interface AppSkeletonCardProps {
  classes?: {
    card?: string
    content?: string
  }
}

export const AppSkeletonCard: FC<AppSkeletonCardProps> = ({ classes = {} }) => {
  return (
    <Card className={classes.card}>
      <CardHeader className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent
        className={cn("flex items-center justify-center py-8", classes.content)}
      >
        <Loader2 className="size-20 text-primary animate-spin" />
      </CardContent>
    </Card>
  )
}
