import { CallToAction } from "@/features/web/landing/components/CallToAction"
import FrequentlyAskedQuestions from "@/features/web/landing/components/FrequentlyAskedQuestions"
import { Hero } from "@/features/web/landing/components/Hero"
import { HowItWorks } from "@/features/web/landing/components/HowItWorks"
import { KeyFeatures } from "@/features/web/landing/components/KeyFeatures"
import { PricingTiers } from "@/features/web/landing/components/PricingTiers"
import { UseCases } from "@/features/web/landing/components/UseCases"

const Landing = () => {
  return (
    <div className="min-h-full w-full flex flex-col items-center justify-center space-y-24 pt-12">
      <Hero />
      <KeyFeatures />
      <HowItWorks />
      <PricingTiers />
      <UseCases />
      <CallToAction />
      <FrequentlyAskedQuestions />
    </div>
  )
}

export default Landing
