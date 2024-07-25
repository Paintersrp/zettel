import { FC } from "react"
import { Target } from "lucide-react"

import { VaultAndNotes } from "@/types/app"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

import { WordCountGoalProgress } from "./WordCountGoalProgress"

interface WordCountGoalProps {
  data: Promise<VaultAndNotes>
}

export const WordCountGoal: FC<WordCountGoalProps> = async ({ data }) => {
  const { notes } = await data

  const todayWordCount = notes
    .filter(
      (note) =>
        new Date(note.created_at).toDateString() === new Date().toDateString()
    )
    .reduce((sum, note) => sum + note.content.split(/\s+/).length, 0)

  return (
    <Card>
      <CardHeader className="!pb-4">
        <CardTitle className="flex items-center">
          <Target className="size-5 text-primary" />
          <span className="text-center w-full"> Daily Word Count Goal</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <WordCountGoalProgress todayWordCount={todayWordCount} />
      </CardContent>
    </Card>
  )
}
