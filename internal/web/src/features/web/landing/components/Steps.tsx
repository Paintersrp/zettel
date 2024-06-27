import { SlideUp } from "@/components/SlideUp"
import { steps } from "@/features/web/landing/content/steps"

import { SectionHeader } from "./SectionHeader"
import { Step } from "./Step"

export const Steps = () => {
  return (
    <section className="w-full max-w-6xl">
      <div className="container mx-auto px-0 sm:px-4">
        <SlideUp>
          <SectionHeader
            title="How It Works"
            description="Follow these simple steps to get started and make the most out of our platform."
          />
        </SlideUp>

        <div className="space-y-12 md:space-y-24 mx-auto">
          {steps.map((step, index) => (
            <Step key={index} index={index + 1} {...step} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Steps
