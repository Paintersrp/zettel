import React, { useMemo } from "react"
import { Link } from "@tanstack/react-router"
import {
  BookOpen,
  BookX,
  Clock,
  FileText,
  Hash,
  Loader2,
  Unlink,
} from "lucide-react"

import { formatVaultName } from "@/lib/utils"

import { Badge } from "@/components/ui/Badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { useNotes } from "@/features/app/app/api/api"
import { useAuth } from "@/features/auth/providers"

export const VaultStats: React.FC = () => {
  const { user } = useAuth()
  const { notes, isFetching, isLoading } = useNotes(user?.active_vault_id || 0)

  if (!user || !user.active_vault) {
    return null
  }

  const { description, name, note_count } = user.active_vault
  const formattedName = formatVaultName(name)

  const statistics = useMemo(() => {
    if (notes.length === 0) return null

    const totalWords = notes.reduce(
      (sum, note) => sum + note.content.split(/\s+/).length,
      0
    )
    const averageWords = totalWords / notes.length
    const now = new Date()
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)
    const notesLastTwoWeeks = notes.filter(
      (note) => new Date(note.created_at) >= twoWeeksAgo
    )

    const dailyCreation = Array.from({ length: 14 }, (_, i) => {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      const count = notesLastTwoWeeks.filter(
        (note) =>
          new Date(note.created_at).toDateString() === date.toDateString()
      ).length
      return {
        date: date.toLocaleDateString("en-US", { weekday: "short" }),
        count,
      }
    }).reverse()

    const longestNote = notes.reduce((longest, note) =>
      note.content.length > longest.content.length ? note : longest
    )
    const shortestNote = notes.reduce((shortest, note) =>
      note.content.length < shortest.content.length ? note : shortest
    )
    const orphanedNotesCount = notes.filter(
      (note) => note.linked_notes?.length === 0
    ).length
    const orphanedPercent = Math.round(
      (orphanedNotesCount / notes.length) * 100
    )
    const untaggedNotesCount = notes.filter(
      (note) => note.tags?.length === 0
    ).length
    const untaggedNotesPercent = Math.round(
      (untaggedNotesCount / notes.length) * 100
    )
    const uniqueTagsCount = new Set(notes.flatMap((note) => note.tags)).size

    return {
      totalNotes: note_count,
      averageWords: Math.round(averageWords),
      notesLastTwoWeeks: notesLastTwoWeeks.length,
      dailyCreation,
      longestNote: {
        title: longestNote.title,
        wordCount: longestNote.content.split(/\s+/).length,
      },
      shortestNote: {
        title: shortestNote.title,
        wordCount: shortestNote.content.split(/\s+/).length,
      },
      orphanedNotes: {
        count: orphanedNotesCount,
        percent: orphanedPercent,
      },
      tags: {
        count: uniqueTagsCount,
        unTaggedPercent: untaggedNotesPercent,
      },
      totalWords,
    }
  }, [notes])

  if (isFetching || isLoading) {
    return (
      <Card className="bg-accent">
        <CardHeader>
          <CardTitle>Note Statistics</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <Loader2 className="size-8 text-primary animate-spin" />
        </CardContent>
      </Card>
    )
  }

  if (!statistics) {
    return (
      <Card className="bg-accent">
        <CardHeader>
          <CardTitle>Note Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No notes available for analysis.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-accent">
      <CardHeader>
        <CardTitle>{formattedName} - Vault Stats</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <VaultStatItem
            title="Total Notes"
            value={statistics.totalNotes}
            icon={FileText}
            linkTo="/app/notes"
            subtitle={`${statistics.totalWords} Words`}
          />
          <VaultStatItem
            title="Avg. Words/Note"
            value={statistics.averageWords}
            icon={Hash}
            linkTo="/app/notes"
            subtitle="No activity"
          />
          <VaultStatItem
            title="Unique Tags"
            value={statistics.tags.count}
            icon={Hash}
            linkTo="/app/notes/tags"
            subtitle={`${statistics.tags.unTaggedPercent}% Untagged`}
          />
          <VaultStatItem
            title="Orphaned Notes"
            value={statistics.orphanedNotes.count}
            icon={Unlink}
            linkTo="/app/notes"
            search={{ filter: "orphans" }}
            subtitle={`${statistics.orphanedNotes.percent}% Orphaned`}
          />
          <VaultStatItem
            title="Notes (14 Days)"
            value={statistics.notesLastTwoWeeks}
            icon={Clock}
            linkTo="/app/notes"
            search={{ filter: "recent" }}
            subtitle="No activity" // TODO: Managed activity level
          />
          <VaultStatItem
            title="Longest Note"
            value={`${statistics.longestNote.wordCount} words`}
            icon={BookOpen}
            linkTo="/app/notes"
            subtitle={statistics.longestNote.title}
          />
          <VaultStatItem
            title="Shortest Note"
            value={`${statistics.shortestNote.wordCount} words`}
            icon={BookX}
            linkTo="/app/notes"
            subtitle={statistics.shortestNote.title}
          />
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">
            Daily Note Creation (Last 14 Days)
          </h3>
          <div className="grid grid-cols-7 gap-2">
            {statistics.dailyCreation.map((day) => (
              <div key={day.date} className="text-center">
                <p className="text-xs text-muted-foreground">{day.date}</p>
                <Badge className="mt-1 bg-primary/50 text-foreground hover:bg-primary/50">
                  {day.count}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface VaultStatItemProps {
  title: string
  value: string | number
  icon: React.ElementType
  linkTo: string
  search?: Record<string, string>
  subtitle?: string
}

const VaultStatItem: React.FC<VaultStatItemProps> = ({
  title,
  value,
  icon: Icon,
  linkTo,
  search,
  subtitle,
}) => (
  <Link
    to={linkTo}
    search={search}
    className="bg-primary/30 p-3 rounded hover:bg-primary/20 sine-free duration-200"
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Icon className="mr-2 h-5 w-5 text-primary" />
        <div>
          <p className="text-foreground">{title}</p>
          {subtitle && (
            <p
              className="text-xs text-muted-foreground truncate"
              title={subtitle}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <Badge className="bg-primary/20 text-foreground">{value}</Badge>
    </div>
  </Link>
)
