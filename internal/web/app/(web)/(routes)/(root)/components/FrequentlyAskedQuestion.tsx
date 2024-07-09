import { FC } from "react"

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion"

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
        <div className="relative">
          {title}
          <span className="absolute bottom-0 left-0 w-0 group-hover:w-full ease-out duration-300 h-0.5 bg-primary"></span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="text-muted-foreground">
        {content}
      </AccordionContent>
    </AccordionItem>
  )
}
