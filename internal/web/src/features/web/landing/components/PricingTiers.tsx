import { useState, type FC } from "react"
import { Check, X } from "lucide-react"

import { cn } from "@/lib/utils"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Switch } from "@/components/ui/Switch"

import { SectionHeader } from "./SectionHeader"

interface PricingFeature {
  name: string
  included: boolean
}

interface PricingTierProps {
  title: string
  monthlyPrice: number
  yearlyPrice: number
  features: PricingFeature[]
  isYearly?: boolean
  recommended?: boolean
}

const PricingTier: FC<PricingTierProps> = ({
  title,
  monthlyPrice,
  yearlyPrice,
  features,
  isYearly = false,
  recommended = false,
}) => {
  const price = isYearly ? yearlyPrice : monthlyPrice

  return (
    <Card
      className={`flex flex-col h-full transition-all duration-300 ${
        recommended ? "border-primary shadow-lg scale-105" : ""
      }`}
    >
      {recommended && (
        <div className="bg-primary text-foreground text-xs font-semibold py-1 px-2 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full">
          Recommended
        </div>
      )}
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold mt-1">{title}</CardTitle>
        <CardDescription className="text-primary text-4xl font-bold">
          ${price.toFixed(2)}
          <span className="text-sm font-normal text-muted-foreground">
            /{isYearly ? "year" : "month"}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-3 text-sm">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              {feature.included ? (
                <Check className="mr-2 h-4 w-4 text-primary" />
              ) : (
                <X className="mr-2 h-4 w-4 text-muted-foreground" />
              )}
              <span className={feature.included ? "" : "text-muted-foreground"}>
                {feature.name}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

const pricingTiers: PricingTierProps[] = [
  {
    title: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      { name: "1 vault", included: true },
      { name: "Unlimited notes", included: true },
      { name: "Web & CLI access", included: true },
      { name: "Basic support", included: true },
      { name: "Advanced search", included: false },
      { name: "AI integrations (WIP)", included: false },
    ],
  },
  {
    title: "Basic",
    monthlyPrice: 2.99,
    yearlyPrice: 29.99,
    features: [
      { name: "Up to 10 vaults", included: true },
      { name: "Unlimited notes", included: true },
      { name: "Web & CLI access", included: true },
      { name: "Priority support", included: true },
      { name: "Advanced search", included: true },
      { name: "AI integrations (WIP)", included: false },
    ],
    recommended: true,
  },
  {
    title: "Advanced",
    monthlyPrice: 6.99,
    yearlyPrice: 69.99,
    features: [
      { name: "Unlimited notes", included: true },
      { name: "Unlimited vaults", included: true },
      { name: "Web & CLI access", included: true },
      { name: "Premium support", included: true },
      { name: "Advanced search", included: true },
      { name: "AI integrations (WIP)", included: true },
    ],
  },
]

export const PricingTiers = () => {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section className="w-full">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Pricing Plans"
          description="Choose the perfect plan for your note-taking needs"
        />

        <div className="flex justify-center items-center space-x-4 mb-12">
          <span className={isYearly ? "text-muted-foreground" : ""}></span>
          <span
            className={cn(
              "flex items-center justify-center flex-col",
              isYearly && "text-muted-foreground"
            )}
          >
            <span>Monthly</span>
            <span>(Reg. Price)</span>
          </span>
          <Switch checked={isYearly} onCheckedChange={setIsYearly} />
          <span
            className={cn(
              "flex items-center justify-center flex-col",
              !isYearly && "text-muted-foreground"
            )}
          >
            <span>Yearly</span>
            <span>(Save 20%)</span>
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier) => (
            <PricingTier key={tier.title} isYearly={isYearly} {...tier} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingTiers
