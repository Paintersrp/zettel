import { FC, SVGProps } from "react"
import { LucideIcon } from "lucide-react"

import { cn } from "@/utils/cn"
import { Button } from "@/components/ui/button/Button"
import { TooltipWrapper } from "@/components/ui/Tooltip"

interface EditorToolbarButtonProps {
  Icon: LucideIcon | ((props: SVGProps<SVGSVGElement>) => JSX.Element)
  onClick: () => void
  tooltip?: string
  isActive?: boolean
  disabled?: boolean
  className?: string
}

export const EditorToolbarButton: FC<EditorToolbarButtonProps> = ({
  Icon,
  onClick,
  tooltip,
  isActive = false,
  disabled = false,
  className = "",
}) => {
  return (
    <>
      {tooltip ? (
        <TooltipWrapper
          content={tooltip}
          side="top"
          classes={{
            text: "text-xs",
            content: "bg-accent border-primary/20",
          }}
        >
          <Button
            variant="ghost"
            size="iconXs"
            onClick={onClick}
            disabled={disabled}
            className={cn(
              "bg-accent hover:bg-primary/20 text-muted-foreground hover:text-foreground",
              isActive && "bg-primary/20 hover:bg-primary/40 text-foreground",
              className
            )}
          >
            <Icon className="size-5" />
          </Button>
        </TooltipWrapper>
      ) : (
        <Button
          variant="ghost"
          size="iconXs"
          onClick={onClick}
          disabled={disabled}
          className={cn(
            "bg-accent hover:bg-primary/20 text-muted-foreground",
            isActive && "bg-primary/20 hover:bg-primary/40 text-foreground",
            className
          )}
        >
          <Icon className="size-5" />
        </Button>
      )}
    </>
  )
}

export default EditorToolbarButton
