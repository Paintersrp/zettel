"use client"

import { FC, useState } from "react"

import { Progress } from "@/components/ui/Progress"

interface WordCountGoalProgressProps {
  todayWordCount: number
}

export const WordCountGoalProgress: FC<WordCountGoalProgressProps> = ({
  todayWordCount,
}) => {
  const [dailyGoal] = useState(500) // TODO: user-configurable
  const progress = Math.min((todayWordCount / dailyGoal) * 100, 100)

  return (
    <>
      <Progress value={progress} className="w-full" />
      <div className="mt-2 flex justify-between text-sm text-muted-foreground">
        <span>{todayWordCount} words</span>
        <span>{dailyGoal} goal</span>
      </div>
    </>
  )
}
