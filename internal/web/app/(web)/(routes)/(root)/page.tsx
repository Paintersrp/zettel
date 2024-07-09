import { Suspense } from "react"

import { CallToAction } from "./components/CallToAction"
import { FrequentlyAskedQuestions } from "./components/FrequentlyAskedQuestions"
import { Hero } from "./components/Hero"
import { KeyFeatures } from "./components/KeyFeatures"
import { PricingPlans } from "./components/PricingPlans"
import { ProblemsSolved } from "./components/ProblemsSolved"
import { Steps } from "./components/Steps"
import { UseCases } from "./components/UseCases"

export default function LandingPage() {
  return (
    <div className="min-h-full w-full flex flex-col items-center justify-center space-y-24 py-24">
      <Hero />

      <Suspense fallback={null}>
        <KeyFeatures />
      </Suspense>

      <Suspense fallback={null}>
        <PricingPlans />
      </Suspense>

      <Suspense fallback={null}>
        <Steps />
      </Suspense>

      <Suspense fallback={null}>
        <ProblemsSolved />
      </Suspense>

      <Suspense fallback={null}>
        <UseCases />
      </Suspense>

      <Suspense fallback={null}>
        <CallToAction />
      </Suspense>

      <Suspense fallback={null}>
        <FrequentlyAskedQuestions />
      </Suspense>
    </div>
  )
}
