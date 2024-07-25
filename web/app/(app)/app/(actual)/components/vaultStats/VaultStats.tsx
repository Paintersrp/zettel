"use client"

import { FC, use, useMemo } from "react"
import { BookOpen, BookX, Clock, FileText, Hash, Unlink } from "lucide-react"

import { VaultAndNotes } from "@/types/app"
import { formatVaultName } from "@/utils/string"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"

import { AppNoContentCard } from "../AppNoContentCard"
import { useVaultStatistics } from "./useVaultStatistics"
import { VaultStatsDaily } from "./VaultStatsDaily"
import { VaultStatItem, VaultStatItemProps } from "./VaultStatsItem"

interface VaultStatsProps {
  data: Promise<VaultAndNotes>
}

export const VaultStats: FC<VaultStatsProps> = ({ data }) => {
  const { vault, notes } = use(data)
  const { description, name } = vault
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
        linkTo: "#",
        subtitle: `${statistics.tags.unTaggedPercent}% Untagged`,
      },
      {
        title: "Orphaned Notes",
        value: statistics.orphanedNotes.count,
        icon: Unlink,
        linkTo: "/app/notes?filter=orphans",
        subtitle: `${statistics.orphanedNotes.percent}% Orphaned`,
      },
      {
        title: "Notes (14 Days)",
        value: statistics.notesLastTwoWeeks,
        icon: Clock,
        linkTo: "/app/notes?sort=createdAt&order=asc",
        subtitle: "No activity", // TODO: Managed activity level
      },
      {
        title: "Longest Note",
        value: `${statistics.longestNote.wordCount} words`,
        icon: BookOpen,
        linkTo: `/app/notes/${statistics.longestNote.id}`,
        subtitle: statistics.longestNote.title,
      },
      {
        title: "Shortest Note",
        value: `${statistics.shortestNote.wordCount} words`,
        icon: BookX,
        linkTo: `/app/notes/${statistics.shortestNote.id}`,
        subtitle: statistics.shortestNote.title,
      },
    ] as VaultStatItemProps[]
  }, [statistics])

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
    <Card>
      <CardHeader>
        <CardTitle>{formattedName} - Vault Stats</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 h-[480px]">
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
