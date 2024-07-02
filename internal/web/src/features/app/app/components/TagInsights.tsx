import React, { useMemo } from "react"
import { Link } from "@tanstack/react-router"
import { Loader2 } from "lucide-react"

import { formatDate } from "@/lib/utils"

import { Badge } from "@/components/ui/Badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { ScrollArea } from "@/components/ui/ScrollArea"
import { Separator } from "@/components/ui/Separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { useNotes } from "@/features/app/app/api/api"
import { useAuth } from "@/features/auth/providers"

interface TagInsight {
  name: string
  count: number
  lastUsed: Date
}

export const TagInsights: React.FC = () => {
  const { user } = useAuth()
  const { notes, isFetching, isLoading } = useNotes(user?.active_vault_id || 0)

  const tagInsights = useMemo(() => {
    const insights: Record<string, TagInsight> = {}

    notes.forEach((note) => {
      note.tags.forEach((tag) => {
        if (!insights[tag.name]) {
          insights[tag.name] = {
            name: tag.name,
            count: 0,
            lastUsed: new Date(0),
          }
        }
        insights[tag.name].count++
        const noteDate = new Date(note.updated_at)
        if (noteDate > insights[tag.name].lastUsed) {
          insights[tag.name].lastUsed = noteDate
        }
      })
    })

    return Object.values(insights)
  }, [notes])

  const mostUsedTags = useMemo(
    () => [...tagInsights].sort((a, b) => b.count - a.count).slice(0, 10),
    [tagInsights]
  )

  const recentlyAddedTags = useMemo(
    () =>
      [...tagInsights]
        .sort((a, b) => b.lastUsed.getTime() - a.lastUsed.getTime())
        .slice(0, 10),
    [tagInsights]
  )

  const renderTagList = (tags: TagInsight[]) => (
    <ScrollArea className="h-[200px]">
      {tags.map((tag) => (
        <div
          key={tag.name}
          className="flex justify-between items-center py-2 border-b last:border-b-0"
        >
          {/* TODO: Link Logic */}
          <Link
            to="/app/notes"
            search={{ filter: tag.name }}
            className="hover:underline"
          >
            <div className="flex space-x-3">
              <span className="text-sm text-muted-foreground">
                {tag.count} notes
              </span>
              <Separator orientation="vertical" className="h-6" />
              <Badge className="bg-primary/20 text-primary">{tag.name}</Badge>
            </div>
          </Link>
          <span className="text-xs text-muted-foreground">
            Last Used:
            <span className="font-semibold"> {formatDate(tag.lastUsed)}</span>
          </span>
        </div>
      ))}
    </ScrollArea>
  )

  if (isFetching || isLoading) {
    return (
      <Card className="bg-accent min-h-[320px]">
        <CardHeader>
          <CardTitle>Tag Insights</CardTitle>
          <CardDescription>Analyze your tag usage</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center min-h-full">
          <Loader2 className="size-24 text-primary animate-spin" />
        </CardContent>
      </Card>
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
          <TabsList className="grid w-full grid-cols-2 bg-primary/20">
            <TabsTrigger
              value="mostUsed"
              className="data-[state=active]:bg-primary/30"
            >
              Most Used
            </TabsTrigger>
            <TabsTrigger
              value="recentlyAdded"
              className="data-[state=active]:bg-primary/30"
            >
              Recently Active
            </TabsTrigger>
          </TabsList>
          <TabsContent value="mostUsed">
            {renderTagList(mostUsedTags)}
          </TabsContent>
          <TabsContent value="recentlyAdded">
            {renderTagList(recentlyAddedTags)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
