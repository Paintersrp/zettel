import { FC } from "react"

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion"
import Underline from "@/components/Underline"

export interface FrequentlyAskedQuestionProps {
  value: string
  title: string
  content: string
}

export const FrequentlyAskedQuestion: FC<FrequentlyAskedQuestionProps> = ({
  value,
  title,
  content,
}) => {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="relative group font-semibold transition-colors duration-300 [&>svg]:hover:text-primary">
        <Underline>{title}</Underline>
      </AccordionTrigger>
      <AccordionContent className="text-muted-foreground">
        {content}
      </AccordionContent>
    </AccordionItem>
  )
}
