import { type FC } from "react"

import { cn } from "@/lib/utils"

import { SlideUp } from "@/components/SlideUp"

import { StepInfo, type StepInfoProps } from "./StepInfo"

export interface StepProps {
  index: number
  title: string
  description: string
  reverse?: boolean
  info: StepInfoProps
}

export const Step: FC<StepProps> = ({
  index,
  title,
  description,
  info,
  reverse = false,
}) => {
  return (
    <SlideUp>
      <div
        className={cn(
          "flex flex-col-reverse items-start justify-between gap-4 lg:gap-8 xl:gap-12",
          reverse ? "lg:flex-row-reverse" : "lg:flex-row"
        )}
      >
        <div className="w-full lg:w-1/2">
          <StepInfo {...info} />
        </div>
        <div className="w-full lg:w-1/2 space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold text-primary">
            <span>{index}.</span> {title}
          </h3>
          <p className="text-muted-foreground md:text-lg leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </SlideUp>
  )
}
