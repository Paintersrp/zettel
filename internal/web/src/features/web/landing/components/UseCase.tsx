import { type FC } from "react"
import { type LucideIcon } from "lucide-react"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { SlideUp } from "@/components/SlideUp"

export interface UseCaseProps {
  title: string
  description: string
  icon: LucideIcon
}

export const UseCase: FC<UseCaseProps> = ({
  title,
  description,
  icon: Icon,
}) => {
  return (
    <SlideUp className="flex">
      <Card className="flex w-full h-full bg-primary/10 border-primary/5">
        <div className="pl-3 pt-3 md:pl-4 md:pt-4">
          <div className="p-1.5 md:p-2.5 rounded-full block bg-primary/70">
            <Icon className="size-5 md:size-6" />
          </div>
        </div>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </SlideUp>
  )
}
