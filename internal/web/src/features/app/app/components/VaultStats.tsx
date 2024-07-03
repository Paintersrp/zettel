import { FC, useMemo } from "react"
import { BookOpen, BookX, Clock, FileText, Hash, Unlink } from "lucide-react"

import { formatVaultName } from "@/lib/utils"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { useNotes } from "@/features/app/app/api/api"
import { useVaultStatistics } from "@/features/app/app/hooks/useVaultStatistics"
import { useAuth } from "@/features/auth/providers"

import { AppLoadingCard } from "./AppLoadingCard"
import { AppNoContentCard } from "./AppNoContentCard"
import { VaultStatsDaily } from "./VaultStatsDaily"
import { VaultStatItem, VaultStatItemProps } from "./VaultStatsItem"

export const VaultStats: FC = () => {
  const { user } = useAuth()
  const { notes, isFetching, isLoading } = useNotes(user?.active_vault_id || 0)

  if (!user || !user.active_vault) {
    return null
  }

  const { description, name } = user.active_vault
  const formattedName = formatVaultName(name)
  const statistics = useVaultStatistics(notes)

  const statItems = useMemo(() => {
    if (!statistics) return []

    return [
      {
        title: "Total Notes",
        value: statistics.totalNotes,
        icon: FileText,
        linkTo: "/app/notes",
        subtitle: `${statistics.totalWords} Words`,
      },
      {
        title: "Avg. Words/Note",
        value: statistics.averageWords,
        icon: Hash,
        linkTo: "/app/notes",
        subtitle: "No activity",
      },
      {
        title: "Unique Tags",
        value: statistics.tags.count,
        icon: Hash,
        linkTo: "/app/notes/tags",
        subtitle: `${statistics.tags.unTaggedPercent}% Untagged`,
      },
      {
        title: "Orphaned Notes",
        value: statistics.orphanedNotes.count,
        icon: Unlink,
        linkTo: "/app/notes",
        search: { filter: "orphans" },
        subtitle: `${statistics.orphanedNotes.percent}% Orphaned`,
      },
      {
        title: "Notes (14 Days)",
        value: statistics.notesLastTwoWeeks,
        icon: Clock,
        linkTo: "/app/notes",
        search: { filter: "recent" },
        subtitle: "No activity", // TODO: Managed activity level
      },
      {
        title: "Longest Note",
        value: `${statistics.longestNote.wordCount} words`,
        icon: BookOpen,
        linkTo: "/app/notes",
        subtitle: statistics.longestNote.title,
      },
      {
        title: "Shortest Note",
        value: `${statistics.shortestNote.wordCount} words`,
        icon: BookX,
        linkTo: "/app/notes",
        subtitle: statistics.shortestNote.title,
      },
    ] as VaultStatItemProps[]
  }, [statistics])

  if (isFetching || isLoading) {
    return (
      <AppLoadingCard
        title={formattedName}
        description={description}
        classes={{ content: "h-[500px]" }}
      />
    )
  }

  if (!statistics) {
    return (
      <AppNoContentCard
        title={formattedName}
        description={description}
        message="No notes available for analysis."
      />
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
          {statItems.map((item, index) => (
            <VaultStatItem key={index} {...item} />
          ))}
        </div>
        <VaultStatsDaily dailyCreation={statistics.dailyCreation} />
      </CardContent>
    </Card>
  )
}