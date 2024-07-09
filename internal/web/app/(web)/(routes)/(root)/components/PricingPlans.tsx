"use client"

import { useState } from "react"
import dynamic from "next/dynamic"

import { pricingPlans } from "../content/pricing-plans"
import { SectionHeader } from "./SectionHeader"

const PricingPlanSwitch = dynamic(() => import("./PricingPlanSwitch"))
const PricingPlan = dynamic(() =>
  import("./PricingPlan").then((module) => ({
    default: module.PricingPlan,
  }))
)

const SlideUp = dynamic(() =>
  import("@/components/SlideUp").then((module) => ({
    default: module.SlideUp,
  }))
)

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
