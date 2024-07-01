import { type FC } from "react"
import { Loader2 } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { useNotes } from "@/features/app/app/api/api"
import { useAuth } from "@/features/auth/providers"

export const QuickStats: FC = () => {
  const { user } = useAuth()
  const { notes, isFetching, isLoading } = useNotes(user?.active_vault_id || 0)

  const totalNotes = notes.length
  const recentNotes = notes.filter(
    (note) =>
      new Date(note.created_at).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
  ).length
  const orphanedNotes = notes.filter(
    (note) => note.linkedNotes?.length === 0
  ).length
  const uniqueTags = new Set(notes.flatMap((note) => note.tags)).size

  return (
    <Card className="bg-accent">
      <CardHeader>
        <CardTitle>Quick Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <QuickStatItem
            title="Total Notes"
            value={totalNotes}
            isLoading={isFetching || isLoading}
          />
          <QuickStatItem
            title="Notes This Week"
            value={recentNotes}
            isLoading={isFetching || isLoading}
          />
          <QuickStatItem
            title="Orphaned Notes"
            value={orphanedNotes}
            isLoading={isFetching || isLoading}
          />
          <QuickStatItem
            title="Unique Tags"
            value={uniqueTags}
            isLoading={isFetching || isLoading}
          />
        </div>
      </CardContent>
    </Card>
  )
}

interface QuickStatItemProps {
  title: string
  value: number
  isLoading: boolean
}

const QuickStatItem: React.FC<QuickStatItemProps> = ({
  title,
  value,
  isLoading,
}) => {
  return (
    <div className="bg-background p-4 rounded-lg">
      <p className="text-sm text-muted-foreground">{title}</p>
      {isLoading ? (
        <Loader2 className="size-8 text-primary animate-spin" />
      ) : (
        <p className="text-2xl font-bold">{value}</p>
      )}
    </div>
  )
}
