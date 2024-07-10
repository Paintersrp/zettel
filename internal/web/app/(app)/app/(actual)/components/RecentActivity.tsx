"use client"

import { type FC } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { formatDate } from "@/lib/date"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { useAuth } from "@/components/auth/provider"
import { useSidePanel } from "@/app/(app)/state/sidePanel"

import { useNotes } from "../lib/api"
import { AppLoadingCard } from "./AppLoadingCard"
import { AppNoContentCard } from "./AppNoContentCard"

export const RecentActivity: FC = () => {
  const { user } = useAuth()
  const sidePanel = useSidePanel()
  const { notes, isFetching, isLoading } = useNotes(user?.active_vault || 0)

  const recentNotes = notes
    .sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    )
    .slice(0, 5)

  if (isFetching || isLoading) {
    return (
      <AppLoadingCard
        title="Recent Activity"
        description="Pick up where you left off"
        classes={{ content: "h-[200px]" }}
      />
    )
  }

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
