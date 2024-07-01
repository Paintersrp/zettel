import { type FC } from "react"
import { Link } from "@tanstack/react-router"
import { ChevronRight, Loader2 } from "lucide-react"

import { formatDate } from "@/lib/utils"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { ScrollArea } from "@/components/ui/ScrollArea"
import { useNotes } from "@/features/app/app/api/api"
import { useAuth } from "@/features/auth/providers"

export const RecentActivity: FC = () => {
  const { user } = useAuth()
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
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          {recentNotes.map((note) => (
            <Link
              key={note.id}
              to="/app/notes/$id"
              params={{ id: note.id.toString() }}
              className="flex items-center justify-between py-2 hover:bg-background rounded px-2 transition-colors"
            >
              <span className="text-sm font-medium">{note.title}</span>
              <div className="flex items-center">
                <span className="text-xs text-muted-foreground mr-2">
                  {formatDate(note.updated_at)}
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
