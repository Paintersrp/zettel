import { useState } from "react"

import { SlideUp } from "@/components/SlideUp"
import { pricingPlans } from "@/features/web/landing/content/pricing-plans"

import { PricingPlan } from "./PricingPlan"
import PricingPlanSwitch from "./PricingPlanSwitch"
import { SectionHeader } from "./SectionHeader"

export const PricingPlans = () => {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section className="w-full max-w-6xl">
      <div className="container mx-auto px-0 sm:px-4">
        <SlideUp>
          <SectionHeader
            title="Pricing Plans"
            description="Choose the perfect plan for your note-taking needs."
          />
          <PricingPlanSwitch isYearly={isYearly} setIsYearly={setIsYearly} />
        </SlideUp>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 max-w-6xl mx-auto">
          {pricingPlans.map((tier) => (
            <PricingPlan key={tier.title} isYearly={isYearly} {...tier} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingPlans
