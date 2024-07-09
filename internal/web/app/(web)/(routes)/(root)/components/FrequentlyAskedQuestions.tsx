import { Accordion } from "@/components/ui/Accordion"
import { SlideUp } from "@/components/SlideUp"
import { faQuestions } from "@/app/(web)/(routes)/(root)/content/faqs"

import { FrequentlyAskedQuestion } from "./FrequentlyAskedQuestion"
import { SectionHeader } from "./SectionHeader"

export const FrequentlyAskedQuestions = () => {
  return (
    <section className="w-full max-w-6xl">
      <SlideUp>
        <SectionHeader
          title="Frequently Asked Questions"
          description="Find answers to the most common questions about our note-taking system."
        />
        <Accordion type="multiple" className="w-full">
          {faQuestions.map((question, index) => (
            <FrequentlyAskedQuestion
              key={index}
              value={`item-${index}`}
              title={question.title}
              content={question.content}
            />
          ))}
        </Accordion>
      </SlideUp>
    </section>
  )
}
