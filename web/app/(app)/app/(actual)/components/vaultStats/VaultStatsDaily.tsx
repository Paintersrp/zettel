import { FC } from "react"

import { Badge } from "@/components/ui/badge/Badge"

interface DailyCreation {
  date: string
  count: number
}

interface VaultStatsDailyProps {
  dailyCreation: DailyCreation[]
}

export const VaultStatsDaily: FC<VaultStatsDailyProps> = ({
  dailyCreation,
}) => (
  <div>
    <h3 className="text-sm font-medium mb-2">
      Daily Note Creation (Last 14 Days)
    </h3>
    <div className="grid grid-cols-7 gap-2">
      {dailyCreation.map((day) => (
        <div key={day.date} className="text-center">
          <p className="text-xs text-muted-foreground">{day.date}</p>
          <Badge className="mt-1 bg-primary/30 text-foreground hover:bg-primary/50">
            {day.count}
          </Badge>
        </div>
      ))}
    </div>
  </div>
)
