import { FC, SVGProps } from "react"
import {
  AArrowDown,
  AArrowUp,
  ALargeSmall,
  Archive,
  Download,
  EyeIcon,
  LucideIcon,
  Redo,
  Save,
  Settings,
  Undo,
} from "lucide-react"

import { cn } from "@/lib/utils"

import { VimIcon } from "./icons/Vim"
import { Button } from "./ui/Button"
import { Separator } from "./ui/Separator"
import { TooltipWrapper } from "./ui/Tooltip"

interface EditorToolbarProps {
  vim: boolean
  toggleVim: () => void
  incrementFontSize: (type: "up" | "down" | "reset") => void
}

export const EditorToolbar: FC<EditorToolbarProps> = ({
  vim,
  toggleVim,
  incrementFontSize,
}) => {
  return (
    <div className="flex justify-between items-center bg-accent px-2 py-1 h-11">
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1 rounded-md p-1">
          <EditorToolbarButton
            Icon={Save}
            tooltip="Save"
            onClick={() => console.log("Save")}
          />
          <EditorToolbarButton
            Icon={Download}
            tooltip="Download"
            onClick={() => console.log("Download")}
          />
          <EditorToolbarButton
            Icon={Archive}
            tooltip="Archive"
            onClick={() => console.log("Archive")}
          />
        </div>
        <Separator orientation="vertical" className="h-6" />
        <div className="flex items-center space-x-1 rounded-md p-1">
          <EditorToolbarButton
            Icon={Undo}
            tooltip="Undo"
            onClick={() => console.log("Undo")}
          />
          <EditorToolbarButton
            Icon={Redo}
            tooltip="Redo"
            onClick={() => console.log("Redo")}
          />
        </div>
        <Separator orientation="vertical" className="h-6" />
        <div className="flex items-center space-x-1 rounded-md p-1">
          <EditorToolbarButton
            Icon={AArrowUp}
            tooltip="Increase font size"
            onClick={() => incrementFontSize("up")}
          />
          <EditorToolbarButton
            Icon={AArrowDown}
            tooltip="Decrease font size"
            onClick={() => incrementFontSize("down")}
          />
          <EditorToolbarButton
            Icon={ALargeSmall}
            tooltip="Reset font size"
            onClick={() => incrementFontSize("reset")}
          />
        </div>
        <Separator orientation="vertical" className="h-6" />
        <div className="flex items-center space-x-1 rounded-md p-1">
          <EditorToolbarButton
            Icon={VimIcon}
            tooltip="Vim Mode"
            onClick={toggleVim}
            isActive={vim}
          />
          <EditorToolbarButton
            Icon={EyeIcon}
            tooltip="Preview"
            onClick={() => console.log("Preview")}
          />
          <EditorToolbarButton
            Icon={Settings}
            tooltip="Settings"
            onClick={() => console.log("Settings")}
          />
        </div>
      </div>
      <code id="status" className="text-sm rounded-md font-sans"></code>
    </div>
  )
}

interface EditorToolbarButtonProps {
  Icon: LucideIcon | ((props: SVGProps<SVGSVGElement>) => JSX.Element)
  onClick: () => void
  tooltip?: string
  isActive?: boolean
  disabled?: boolean
  className?: string
}

const EditorToolbarButton: FC<EditorToolbarButtonProps> = ({
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

export default EditorToolbar
