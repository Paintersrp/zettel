import { type FC } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

export const UpcomingTasks: FC = () => {
  return (
    <Card className="bg-accent">
      <CardHeader>
        <CardTitle>Upcoming Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">No upcoming tasks</p>
      </CardContent>
    </Card>
  )
}
