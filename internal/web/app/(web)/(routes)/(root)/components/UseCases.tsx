import { SlideUp } from "@/components/SlideUp"

import { useCases } from "../content/use-cases"
import { SectionHeader } from "./SectionHeader"
import { UseCase } from "./UseCase"

export const UseCases = () => {
  return (
    <section className="w-full max-w-6xl">
      <div className="container mx-auto px-0 sm:px-4">
        <SlideUp>
          <SectionHeader
            title="Use Cases"
            description="Discover various scenarios where our note-taking system can enhance your productivity and organization."
          />
        </SlideUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {useCases.map((useCase, index) => (
            <UseCase key={index} {...useCase} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default UseCases
