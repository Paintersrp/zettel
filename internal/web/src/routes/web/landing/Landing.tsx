import { CallToAction } from "@/features/web/landing/components/CallToAction"
import { FrequentlyAskedQuestions } from "@/features/web/landing/components/FrequentlyAskedQuestions"
import { Hero } from "@/features/web/landing/components/Hero"
import { KeyFeatures } from "@/features/web/landing/components/KeyFeatures"
import { PricingPlans } from "@/features/web/landing/components/PricingPlans"
import { Steps } from "@/features/web/landing/components/Steps"
import { UseCases } from "@/features/web/landing/components/UseCases"

const Landing = () => {
  return (
    <div className="min-h-full w-full flex flex-col items-center justify-center space-y-24 py-24">
      <Hero />
      <KeyFeatures />
      <PricingPlans />
      <Steps />
      <UseCases />
      <CallToAction />
      <FrequentlyAskedQuestions />
    </div>
  )
}

export default Landing
