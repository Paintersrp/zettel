import { FC } from "react"
import { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/Button"
import { TooltipWrapper } from "@/components/ui/Tooltip"

interface SidePanelToolbarButtonProps {
  Icon: LucideIcon
  onClick: () => void
  tooltip: string
  isActive?: boolean
  disabled?: boolean
  className?: string
}

export const SidePanelToolbarButton: FC<SidePanelToolbarButtonProps> = ({
  Icon,
  onClick,
  tooltip,
  isActive = false,
  disabled = false,
  className = "",
}) => {
  return (
    <TooltipWrapper content={tooltip}>
      <Button
        variant="ghost"
        size="iconXs"
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "bg-accent hover:bg-primary/20",
          isActive && "bg-primary/20 hover:bg-primary/40",
          className
        )}
      >
        <Icon className="size-5" />
      </Button>
    </TooltipWrapper>
  )
}
