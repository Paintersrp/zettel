import { FC } from "react"
import { Flame } from "lucide-react"

import { VaultAndNotes } from "@/types/app"
import { Badge } from "@/components/ui/badge/Badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

interface NoteStreakProps {
  data: Promise<VaultAndNotes>
}

export const NoteStreak: FC<NoteStreakProps> = async ({ data }) => {
  const { notes } = await data

  const calculateStreak = () => {
    const sortedDates = notes
      .map((note) => new Date(note.created_at).toDateString())
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

    let streak = 0
    let currentDate = new Date()

    for (const date of new Set(sortedDates)) {
      if (new Date(date).toDateString() === currentDate.toDateString()) {
        streak++
        currentDate.setDate(currentDate.getDate() - 1)
      } else {
        break
      }
    }

    return streak
  }

  const streak = calculateStreak()

  return (
    <Card>
      <CardHeader className="!pb-2">
        <CardTitle className="flex items-center">
          <Flame className="size-5 text-primary" />
          <span className="text-center w-full">Note Writing Streak</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <Badge className="mt-1 bg-primary/30 hover:bg-primary/30 text-primary/90 text-lg font-bold">
            {streak}
          </Badge>
          <p className="text-sm text-muted-foreground">days in a row</p>
        </div>
      </CardContent>
    </Card>
  )
}
