import { type FC } from "react"
import { type LucideIcon } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { SlideUp } from "@/components/SlideUp"

export interface KeyFeatureProps {
  Icon: LucideIcon
  title: string
  description: string
}

export const KeyFeature: FC<KeyFeatureProps> = ({
  Icon,
  title,
  description,
}) => (
  <SlideUp>
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <div className="p-1.5 sm:p-2 bg-primary/10 rounded-full">
            <Icon className="size-4 sm:size-5 text-primary" />
          </div>
          <CardTitle className="font-semibold">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  </SlideUp>
)
