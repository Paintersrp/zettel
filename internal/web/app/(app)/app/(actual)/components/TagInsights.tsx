"use client"

import { FC } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { useAuth } from "@/components/auth/provider"

import { useNotes } from "../lib/api"
import { useTagInsights } from "../lib/useTagInsights"
import { AppNoContentCard } from "./AppNoContentCard"
import { TagInsightList } from "./TagInsightList"
import { TagInsightsSkeleton } from "./TagInsightsSkeleton"

export const TagInsights: FC = () => {
  const { user } = useAuth()
  const { notes, isFetching, isLoading } = useNotes(user?.active_vault || 0)
  const { tagInsights, mostUsedTags, recentlyActiveTags } =
    useTagInsights(notes)

  if (isFetching || isLoading) {
    return <TagInsightsSkeleton />
  }

  if (!tagInsights || tagInsights.length === 0) {
    return (
      <AppNoContentCard
        title="Tag Insights"
        description="Analyze your tag usage"
        message="No note tags available for insights."
      />
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tag Insights</CardTitle>
        <CardDescription>Analyze your tag usage</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="mostUsed">
          <TabsList className="grid w-full grid-cols-2 gap-1">
            <TabsTrigger
              value="mostUsed"
              className="data-[state=active]:bg-primary/30 hover:bg-primary/30 hover:text-foreground sine-free duration-200"
            >
              Most Used
            </TabsTrigger>
            <TabsTrigger
              value="recentlyActive"
              className="data-[state=active]:bg-primary/30 hover:bg-primary/30 hover:text-foreground sine-free duration-200"
            >
              Recently Active
            </TabsTrigger>
          </TabsList>
          <TabsContent value="mostUsed">
            <TagInsightList tags={mostUsedTags} />
          </TabsContent>
          <TabsContent value="recentlyActive">
            <TagInsightList tags={recentlyActiveTags} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
