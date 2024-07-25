import { type FC } from "react"

import { SlideUp } from "@/components/SlideUp"

import { useCases } from "../content/use-cases"
import { SectionHeader } from "./SectionHeader"
import { UseCase } from "./UseCase"

export const UseCases: FC = () => {
  return (
    <section className="w-full max-w-6xl">
      <div className="container mx-auto px-4">
        <SlideUp>
          <SectionHeader
            title="Tailored for Your Needs"
            description="Discover how our versatile note-taking system adapts to various fields, enhancing productivity and organization across different scenarios."
          />
        </SlideUp>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {useCases.map((useCase, index) => (
            <UseCase key={index} {...useCase} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default UseCases
