import { SlideUp } from "@/components/SlideUp"

import { problemsSolved } from "../content/problems-solved"
import { Problem } from "./Problem"
import { SectionHeader } from "./SectionHeader"

export const ProblemsSolved = () => {
  return (
    <section className="w-full max-w-6xl">
      <div className="container mx-auto px-0 sm:px-4">
        <SlideUp>
          <SectionHeader
            title="Problems Solved"
            description="Discover how our note-taking system addresses common challenges and enhances your productivity."
          />
        </SlideUp>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {problemsSolved.map((problem, index) => (
            <Problem key={index} {...problem} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProblemsSolved
