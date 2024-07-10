import { FC } from "react"

import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { ScrollArea } from "@/components/ui/ScrollArea"
import { Skeleton } from "@/components/ui/Skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"

export const TagInsightsSkeleton: FC = () => {
  return (
    <Card>
      <CardHeader className="mb-2">
        <Skeleton className="h-5 w-40 mb-2 bg-accent" />
        <Skeleton className="h-4 w-48 bg-accent" />
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="mostUsed">
          <TabsList className="grid w-full grid-cols-2 gap-1">
            <TabsTrigger
              value="mostUsed"
              className="data-[state=active]:bg-primary/30 hover:bg-primary/30 hover:text-foreground sine-free duration-200"
            >
              <Skeleton className="h-4 w-20 bg-card" />
            </TabsTrigger>
            <TabsTrigger
              value="recentlyActive"
              className="data-[state=active]:bg-primary/30 hover:bg-primary/30 hover:text-foreground sine-free duration-200"
            >
              <Skeleton className="h-4 w-20 bg-card" />
            </TabsTrigger>
          </TabsList>
          <TabsContent value="mostUsed">
            <TagInsightListSkeleton />
          </TabsContent>
          <TabsContent value="recentlyActive">
            <TagInsightListSkeleton />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

const TagInsightListSkeleton: FC = () => (
  <ScrollArea className="h-[315px] bg-accent">
    {Array(10)
      .fill(0)
      .map((_, index) => (
        <div
          key={index}
          className="flex justify-between items-center py-2 border-b last:border-b-0 bg-accent px-4 rounded"
        >
          <div className="flex space-x-3 items-center">
            <Skeleton className="h-4 w-16 bg-card" />
            <Skeleton className="h-6 w-px bg-border" />
            <Skeleton className="h-6 w-20 bg-primary/20 !rounded-full" />
          </div>
          <Skeleton className="h-4 w-32 bg-card" />
        </div>
      ))}
  </ScrollArea>
)

export default TagInsightsSkeleton
