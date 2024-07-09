import { Dispatch, FC, SetStateAction } from "react"

import { cn } from "@/lib/utils"

import { Switch } from "@/components/ui/Switch"

interface PricingPlanSwitchProps {
  isYearly: boolean
  setIsYearly: Dispatch<SetStateAction<boolean>>
}

export const PricingPlanSwitch: FC<PricingPlanSwitchProps> = ({
  isYearly,
  setIsYearly,
}) => {
  return (
    <div className="flex justify-center items-center gap-4 mb-8 sm:mb-12">
      <span className={isYearly ? "text-muted-foreground" : ""}></span>
      <span
        className={cn(
          "flex items-center justify-center flex-col text-sm md:text-base min-w-20 md:min-w-30",
          isYearly && "text-muted-foreground"
        )}
      >
        <span>Monthly</span>
        <span>(Reg. Price)</span>
      </span>
      <Switch checked={isYearly} onCheckedChange={setIsYearly} />
      <span
        className={cn(
          "flex items-center justify-center flex-col text-sm md:text-base min-w-20 md:min-w-30",
          !isYearly && "text-muted-foreground"
        )}
      >
        <span>Yearly</span>
        <span>(Save 20%)</span>
      </span>
    </div>
  )
}

export default PricingPlanSwitch
