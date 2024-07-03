import { type FC } from "react"
import { ListTodo } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

export const UpcomingTasks: FC = () => {
  return (
    <Card className="bg-accent">
      <CardHeader>
        <CardTitle className="flex items-center">
          <ListTodo className="size-5 text-primary" />
          <span className="text-center w-full">Upcoming Tasks</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">No upcoming tasks</p>
      </CardContent>
    </Card>
  )
}
