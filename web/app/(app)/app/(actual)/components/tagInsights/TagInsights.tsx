import { FC } from "react"

import { VaultAndNotes } from "@/types/app"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"

import { AppNoContentCard } from "../AppNoContentCard"
import { TagInsightList } from "./TagInsightList"
import { getTagInsights } from "./useTagInsights"

interface TagInsightsProps {
  data: Promise<VaultAndNotes>
}

// TODO: Preload ?
export const TagInsights: FC<TagInsightsProps> = async ({ data }) => {
  const { notes } = await data

  const { tagInsights, mostUsedTags, recentlyActiveTags } =
    getTagInsights(notes)

  if (!tagInsights || tagInsights.length === 0) {
    return (
      // TODO: Min Height?
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
