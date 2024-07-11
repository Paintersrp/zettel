import { FC, memo } from "react"
import Link from "next/link"

import { formatDate } from "@/utils/date"
import { Badge } from "@/components/ui/badge/Badge"
import { ScrollArea } from "@/components/ui/ScrollArea"
import { Separator } from "@/components/ui/Separator"

import { TagInsight } from "./useTagInsights"

interface TagInsightListProps {
  tags: TagInsight[]
}

export const TagInsightList: FC<TagInsightListProps> = memo(({ tags }) => (
  <ScrollArea className="h-[300px]">
    {tags.map((tag) => (
      <TagInsightListItem key={tag.name} tag={tag} />
    ))}
  </ScrollArea>
))

interface TagInsightListItemProps {
  tag: TagInsight
}

export const TagInsightListItem: FC<TagInsightListItemProps> = memo(
  ({ tag }) => (
    <div className="flex justify-between items-center py-2 border-b last:border-b-0 bg-accent px-4 rounded">
      <Link href={`/app/notes?filter=${tag.name}`} className="hover:underline">
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
  )
)
