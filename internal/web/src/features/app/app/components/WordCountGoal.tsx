import React, { useState } from "react"
import { Target } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Progress } from "@/components/ui/Progress"
import { useNotes } from "@/features/app/app/api/api"
import { useAuth } from "@/features/auth/providers"

export const WordCountGoal: React.FC = () => {
  const { user } = useAuth()
  const { notes } = useNotes(user?.active_vault_id || 0)
  const [dailyGoal] = useState(500) // This could be user-configurable

  const todayWordCount = notes
    .filter(
      (note) =>
        new Date(note.created_at).toDateString() === new Date().toDateString()
    )
    .reduce((sum, note) => sum + note.content.split(/\s+/).length, 0)

  const progress = Math.min((todayWordCount / dailyGoal) * 100, 100)

  return (
    <Card className="bg-accent">
      <CardHeader className="!pb-4">
        <CardTitle className="flex items-center">
          <Target className="size-6 text-primary" />
          <span className="text-center w-full"> Daily Word Count Goal</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="w-full" />
        <div className="mt-2 flex justify-between text-sm text-muted-foreground">
          <span>{todayWordCount} words</span>
          <span>{dailyGoal} goal</span>
        </div>
      </CardContent>
    </Card>
  )
}
