import { memo, useCallback } from "react"
import {
  ChevronLeft,
  ChevronRight,
  FilePenLine,
  History,
  LucideIcon,
  NotebookTabs,
  Search,
  X,
} from "lucide-react"

import { SidePanelToolbarButton } from "./SidePanelToolbarButton"
import { useSidePanel } from "./useSidePanel"

type PanelItem = {
  icon: LucideIcon
  action: ToolbarAction
  tooltip: string
}

const leftToolbarItems: PanelItem[] = [
  {
    icon: ChevronLeft,
    action: "back",
    tooltip: "Go Back",
  },
  {
    icon: ChevronRight,
    action: "forward",
    tooltip: "Go Forward",
  },
  {
    icon: Search,
    action: "search",
    tooltip: "Search",
  },
  {
    icon: NotebookTabs,
    action: "notes",
    tooltip: "Notes",
  },
  {
    icon: FilePenLine,
    action: "scratchpad",
    tooltip: "Scratchpad",
  },
]

const rightToolbarItems: PanelItem[] = [
  {
    icon: History,
    action: "history",
    tooltip: "History",
  },
  {
    icon: X,
    action: "close",
    tooltip: "Close",
  },
]

type ToolbarAction =
  | "back"
  | "forward"
  | "search"
  | "notes"
  | "scratchpad"
  | "history"
  | "close"

export const SidePanelToolbar = memo(() => {
  const {
    currentState,
    closePanel,
    openPanel,
    history,
    goBack,
    goForward,
    currentIndex,
  } = useSidePanel()

  const handleToolbarAction = useCallback(
    (action: ToolbarAction) => {
      switch (action) {
        case "back":
          goBack()
          break
        case "forward":
          goForward()
          break
        case "search":
          openPanel("search", "global")
          break
        case "notes":
          openPanel("notes", "list")
          break
        case "scratchpad":
          openPanel("scratchpad", "note")
          break
        case "history":
          openPanel("history", "history")
          break
        case "close":
          closePanel()
          break
        default:
          break
      }
    },
    [goBack, goForward, openPanel, closePanel]
  )

  return (
    <div className="flex items-center justify-between border-b bg-accent p-1 h-11">
      <div className="flex items-center space-x-1">
        {leftToolbarItems.map((item, index) => {
          const isDisabled =
            item.action === "back"
              ? currentIndex === history.length - 1
              : item.action === "forward"
                ? currentIndex === 0
                : false

          return (
            <SidePanelToolbarButton
              key={`left-${index}`}
              Icon={item.icon}
              onClick={() => handleToolbarAction(item.action)}
              isActive={currentState.contentType === item.action}
              disabled={isDisabled}
              tooltip={item.tooltip}
            />
          )
        })}
      </div>
      <div className="flex items-center space-x-1">
        {rightToolbarItems.map((item, index) => (
          <SidePanelToolbarButton
            key={`right-${index}`}
            Icon={item.icon}
            onClick={() => handleToolbarAction(item.action)}
            isActive={currentState.contentType === item.action}
            tooltip={item.tooltip}
          />
        ))}
      </div>
    </div>
  )
})

export default SidePanelToolbar
