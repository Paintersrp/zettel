import { FC } from "react"

import { cn } from "@/utils/cn"

interface SectionHeaderProps {
  title: string
  description?: string
  classes?: {
    title?: string
    description?: string
  }
}

export const SectionHeader: FC<SectionHeaderProps> = ({
  title,
  description,
  classes,
}) => {
  return (
    <div className="mb-8 text-center">
      <h2 className={cn("text-3xl sm:text-4xl font-bold", classes?.title)}>
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-center text-muted-foreground",
            classes?.description
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
