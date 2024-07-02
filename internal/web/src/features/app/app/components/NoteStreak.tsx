import React from "react"
import { Flame } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { useNotes } from "@/features/app/app/api/api"
import { useAuth } from "@/features/auth/providers"

export const NoteStreak: React.FC = () => {
  const { user } = useAuth()
  const { notes } = useNotes(user?.active_vault_id || 0)

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
    <Card className="bg-accent">
      <CardHeader className="!pb-0">
        <CardTitle className="flex items-center">
          <Flame className="size-6 text-primary" />
          <span className="text-center w-full">Note Writing Streak</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <span className="text-3xl font-bold">{streak}</span>
          <p className="text-sm text-muted-foreground">days in a row</p>
        </div>
      </CardContent>
    </Card>
  )
}
