import { FC } from "react"
import { ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "./ui/Button"

interface AppScrollToTopProps {
  visible: boolean
  onClick: () => void
  classes?: { button?: string; icon?: string }
}

export const AppScrollToTop: FC<AppScrollToTopProps> = ({
  visible,
  onClick,
  classes,
}) => {
  if (!visible) {
    return null
  }
  return (
    <Button
      variant="primary"
      size="iconXs"
      className={cn(
        "absolute bottom-4 right-4 rounded shadow-lg",
        classes?.button
      )}
      onClick={onClick}
    >
      <ChevronUp className={cn("size-5", classes?.icon)} />
    </Button>
  )
}
