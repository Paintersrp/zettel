import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion"
import { SlideUp } from "@/components/Slide"

import { SectionHeader } from "./SectionHeader"

export const FrequentlyAskedQuestions = () => {
  return (
    <section className="w-full max-w-6xl">
      <SlideUp>
        {/* TODO: Description? */}
        <SectionHeader title="Frequently Asked Questions" />

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              What is the Zettelkasten method?
            </AccordionTrigger>
            <AccordionContent>
              The Zettelkasten method is a note-taking and knowledge management
              system that emphasizes creating connections between individual
              notes. It helps you organize your thoughts and discover new
              relationships between ideas.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Can I use the app offline?</AccordionTrigger>
            <AccordionContent>
              Yes, you can use our CLI application offline on your desktop. Your
              notes will sync automatically when you're back online.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How secure are my notes?</AccordionTrigger>
            <AccordionContent>
              We take security seriously. All your notes are encrypted in
              transit and at rest. We use industry-standard security practices
              to ensure your data remains private.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Can I collaborate with others?</AccordionTrigger>
            <AccordionContent>
              Currently, our app is designed for individual use. However, we're
              exploring collaboration features for future updates.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </SlideUp>
    </section>
  )
}
