import { FC } from "react"
import { cn } from "@/utils/cn"
import { ChevronUp } from "lucide-react"

import { Button } from "./ui/button/Button"

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
