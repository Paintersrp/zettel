import { FC } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { useNotes } from "@/features/app/app/api/api"
import { useTagInsights } from "@/features/app/app/hooks/useTagInsights"
import { useAuth } from "@/features/auth/providers"

import { AppLoadingCard } from "./AppLoadingCard"
import { AppNoContentCard } from "./AppNoContentCard"
import { TagInsightList } from "./TagInsightList"

export const TagInsights: FC = () => {
  const { user } = useAuth()
  const { notes, isFetching, isLoading } = useNotes(user?.active_vault_id || 0)
  const { tagInsights, mostUsedTags, recentlyActiveTags } =
    useTagInsights(notes)

  if (isFetching || isLoading) {
    return (
      <AppLoadingCard
        title="Tag Insights"
        description="Analyze your tag usage"
        classes={{ content: "h-[300px]" }}
      />
    )
  }

  if (!tagInsights) {
    return (
      <AppNoContentCard
        title="Tag Insights"
        description="Analyze your tag usage"
        message="No note tags available for insights."
      />
    )
  }

  return (
    <Card className="bg-accent">
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
