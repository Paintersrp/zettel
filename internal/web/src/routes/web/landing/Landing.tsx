import { nullLazy } from "@/lib/lazy"

import { Hero } from "@/features/web/landing/components/Hero"
import { KeyFeatures } from "@/features/web/landing/components/KeyFeatures"

// 42.68kb 2024-07-04
// 7.20kb 2024-07-04 - Lazy Loading Offscreen components

const PricingPlans = nullLazy(() =>
  import("@/features/web/landing/components/PricingPlans").then((module) => ({
    default: module.PricingPlans,
  }))
)
const Steps = nullLazy(() =>
  import("@/features/web/landing/components/Steps").then((module) => ({
    default: module.Steps,
  }))
)
const ProblemsSolved = nullLazy(() =>
  import("@/features/web/landing/components/ProblemsSolved").then((module) => ({
    default: module.ProblemsSolved,
  }))
)
const UseCases = nullLazy(() =>
  import("@/features/web/landing/components/UseCases").then((module) => ({
    default: module.UseCases,
  }))
)
const CallToAction = nullLazy(() =>
  import("@/features/web/landing/components/CallToAction").then((module) => ({
    default: module.CallToAction,
  }))
)
const FrequentlyAskedQuestions = nullLazy(() =>
  import("@/features/web/landing/components/FrequentlyAskedQuestions").then(
    (module) => ({
      default: module.FrequentlyAskedQuestions,
    })
  )
)

const Landing = () => {
  return (
    <div className="min-h-full w-full flex flex-col items-center justify-center space-y-24 py-24">
      <Hero />
      <KeyFeatures />
      <PricingPlans />
      <Steps />
      <ProblemsSolved />
      <UseCases />
      <CallToAction />
      <FrequentlyAskedQuestions />
    </div>
  )
}

export default Landing
