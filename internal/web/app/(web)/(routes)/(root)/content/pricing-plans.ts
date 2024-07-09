import { PricingPlanProps } from "@/app/(web)/(routes)/(root)/components/PricingPlan"

export const pricingPlans: PricingPlanProps[] = [
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
