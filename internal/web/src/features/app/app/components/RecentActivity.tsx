import { type FC } from "react"
import { Link } from "@tanstack/react-router"
import { ChevronRight, Loader2 } from "lucide-react"

import { cn, formatDate } from "@/lib/utils"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { useNotes } from "@/features/app/app/api/api"
import { useSidePanel } from "@/features/app/layout/sidepanel/state/sidePanel"
import { useAuth } from "@/features/auth/providers"

export const RecentActivity: FC = () => {
  const { user } = useAuth()
  const sidePanel = useSidePanel()
  const { notes, isFetching, isLoading } = useNotes(user?.active_vault_id || 0)

  const recentNotes = notes
    .sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    )
    .slice(0, 5)

  if (isFetching || isLoading) {
    return (
      <Card className="bg-accent min-h-[300px]">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Pick up where you left off</CardDescription>
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
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Pick up where you left off</CardDescription>
      </CardHeader>
      <CardContent
        className={cn(
          sidePanel.currentState.isOpen
            ? "grid grid-cols-1 xl:grid-cols-2 gap-1"
            : "grid grid-cols-1 lg:grid-cols-2 gap-1"
        )}
      >
        {recentNotes.map((note) => (
          <Link
            key={note.id}
            to="/app/notes/$id"
            params={{ id: note.id.toString() }}
            className="flex flex-col justify-between bg-primary/30 py-2 hover:bg-primary/20 sine-free duration-200 rounded px-2"
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
                <ChevronRight className="size-5 text-foreground" />
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
