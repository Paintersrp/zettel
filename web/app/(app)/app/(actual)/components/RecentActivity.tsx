"use client"

import { use, type FC } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { VaultAndNotes } from "@/types/app"
import { cn } from "@/utils/cn"
import { formatDate } from "@/utils/date"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { useSidePanel } from "@/app/(app)/components/sidepanel/useSidePanel"

import { AppNoContentCard } from "./AppNoContentCard"

interface RecentActivityProps {
  data: Promise<VaultAndNotes>
}

export const RecentActivity: FC<RecentActivityProps> = ({ data }) => {
  const { notes } = use(data)
  const sidePanel = useSidePanel()

  const recentNotes = notes
    .sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    )
    .slice(0, 5)

  if (!recentNotes || recentNotes.length === 0) {
    return (
      <AppNoContentCard
        title="Recent Activity"
        description="Pick up where you left off"
        message="No notes available."
      />
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Pick up where you left off</CardDescription>
      </CardHeader>
      <CardContent
        className={cn(
          sidePanel.currentState.isOpen
            ? "grid grid-cols-1 xl:grid-cols-2 gap-1.5"
            : "grid grid-cols-1 lg:grid-cols-2 gap-1.5"
        )}
      >
        {recentNotes.map((note) => (
          <Link
            key={note.id}
            href={`/app/notes/${note.id}`}
            className="flex flex-col justify-between bg-accent py-2 hover:bg-primary/30 sine-free duration-200 rounded px-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col font-semibold">
                <span className="text-sm font-medium text-foreground">
                  {note.title}
                </span>
                <span className="text-xs text-primary/80">
                  {formatDate(note.updated_at)}
                </span>
              </div>
              <div className="p-0.5 rounded-full bg-primary/20">
                <ChevronRight className="size-4 text-foreground" />
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
