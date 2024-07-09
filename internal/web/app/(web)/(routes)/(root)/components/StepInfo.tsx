import { type FC } from "react"
import { Info } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

export interface StepInfoProps {
  content: string
  features: string[]
}

export const StepInfo: FC<StepInfoProps> = ({ content, features }) => (
  <Card className="bg-blue-500/10 border-blue-500/10">
    <CardHeader>
      <CardTitle>
        <Info className="size-7 sm:size-8 md:size-9 text-blue-500" />
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <p className="text-muted-foreground md:text-base text-sm leading-relaxed">
        {content}
      </p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-2">
            <div className="bg-primary/10 text-primary inline-flex items-center justify-center rounded-full border size-6 md:size-7 text-xs font-semibold transition-colors">
              {index + 1}
            </div>
            <span className="text-sm text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
)
