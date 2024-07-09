"use client"

import { FC, useState } from "react"
import { Target } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Progress } from "@/components/ui/Progress"
import { useAuth } from "@/components/auth/provider"

import { useNotes } from "../lib/api"
import WordCountGoalSkeleton from "./WordCountGoalSkeleton"

export const WordCountGoal: FC = () => {
  const { user } = useAuth()

  if (!user) {
    return <WordCountGoalSkeleton />
  }

  const { notes } = useNotes(user?.active_vault_id || 0)
  const [dailyGoal] = useState(500) // TODO: user-configurable

  const todayWordCount = notes
    .filter(
      (note) =>
        new Date(note.created_at).toDateString() === new Date().toDateString()
    )
    .reduce((sum, note) => sum + note.content.split(/\s+/).length, 0)

  const progress = Math.min((todayWordCount / dailyGoal) * 100, 100)

  return (
    <Card>
      <CardHeader className="!pb-4">
        <CardTitle className="flex items-center">
          <Target className="size-5 text-primary" />
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
