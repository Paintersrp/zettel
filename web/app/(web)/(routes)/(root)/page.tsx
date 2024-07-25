import { CallToAction } from "./components/CallToAction"
import { FrequentlyAskedQuestions } from "./components/FrequentlyAskedQuestions"
import { Hero } from "./components/Hero"
import { KeyFeatures } from "./components/KeyFeatures"
import { PricingPlans } from "./components/PricingPlans"
import { Steps } from "./components/Steps"
import { UseCases } from "./components/UseCases"

export default function LandingPage() {
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
