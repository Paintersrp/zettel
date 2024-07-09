import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Skeleton } from "@/components/ui/Skeleton"

export const WordCountGoalSkeleton = () => {
  return (
    <Card>
      <CardHeader className="!pb-4">
        <CardTitle className="flex items-center">
          <Skeleton className="size-5 h-5 w-5 mr-2 bg-primary/10" />
          <div className="w-full flex justify-center items-center">
            <Skeleton className="h-5 w-2/3" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full bg-primary/10 rounded-full" />
        <div className="mt-2 flex justify-between text-sm text-muted-foreground">
          <Skeleton className="h-4 w-1/6" />
          <Skeleton className="h-4 w-1/6" />
        </div>
      </CardContent>
    </Card>
  )
}

export default WordCountGoalSkeleton
