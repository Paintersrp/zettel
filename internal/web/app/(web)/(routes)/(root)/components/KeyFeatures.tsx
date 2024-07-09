import { SlideUp } from "@/components/SlideUp"
import { keyFeatures } from "@/app/(web)/(routes)/(root)/content/key-features"

import { KeyFeature } from "./KeyFeature"
import { SectionHeader } from "./SectionHeader"

export const KeyFeatures = () => {
  return (
    <section className="w-full max-w-6xl">
      <div className="container mx-auto px-0 sm:px-4">
        <SlideUp>
          <SectionHeader
            title="Key Features"
            description="Explore the powerful features that make our note-taking system stand out and help you achieve more."
          />
        </SlideUp>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {keyFeatures.map((feature) => (
            <KeyFeature key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default KeyFeatures
