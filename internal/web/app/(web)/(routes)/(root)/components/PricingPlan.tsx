import { type FC } from "react"
import { Check, X } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { SlideUp } from "@/components/SlideUp"

interface PricingFeature {
  name: string
  included: boolean
}

export interface PricingPlanProps {
  title: string
  monthlyPrice: number
  yearlyPrice: number
  features: PricingFeature[]
  isYearly?: boolean
  recommended?: boolean
}

export const PricingPlan: FC<PricingPlanProps> = ({
  title,
  monthlyPrice,
  yearlyPrice,
  features,
  isYearly = false,
  recommended = false,
}) => {
  const price = isYearly ? yearlyPrice : monthlyPrice

  return (
    <SlideUp>
      <Card
        className={`flex flex-col h-full sine-free duration-500 ${
          recommended ? "border-primary shadow-lg scale-100 md:scale-105" : ""
        }`}
      >
        {recommended && (
          <div className="bg-primary text-foreground text-xs font-semibold py-1 px-2 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full">
            Recommended
          </div>
        )}
        <CardHeader className="text-center">
          <CardTitle className="text-3xl sm:text-3xl md:text-4xl font-bold mt-2">
            {title}
          </CardTitle>
          <CardDescription className="text-primary text-3xl sm:text-3xl md:text-4xl font-bold">
            ${price.toFixed(2)}
            <span className="text-sm font-medium text-muted-foreground">
              /{isYearly ? "year" : "month"}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow mt-2">
          <ul className="space-y-3 text-sm md:text-base">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center">
                {feature.included ? (
                  <Check className="mr-2 size-4 md:size-5 text-green-500" />
                ) : (
                  <X className="mr-2 size-4 md:size-5 text-destructive" />
                )}
                <span
                  className={feature.included ? "" : "text-muted-foreground"}
                >
                  {feature.name}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </SlideUp>
  )
}
