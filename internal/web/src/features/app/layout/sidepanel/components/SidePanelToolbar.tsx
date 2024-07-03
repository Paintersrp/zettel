import { memo, useCallback } from "react"
import {
  ChevronLeft,
  ChevronRight,
  FilePenLine,
  History,
  NotebookTabs,
  Search,
  X,
} from "lucide-react"

import { useSidePanel } from "@/features/app/layout/sidepanel/state/sidePanel"

import { SidePanelToolbarButton } from "./SidePanelToolbarButton"

const leftToolbarItems = [
  {
    icon: ChevronLeft,
    action: "undo",
    tooltip: "Undo",
  },
  {
    icon: ChevronRight,
    action: "redo",
    tooltip: "Redo",
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

const rightToolbarItems = [
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

type ToolbarAction = (
  | (typeof leftToolbarItems)[number]
  | (typeof rightToolbarItems)[number]
)["action"]

export const SidePanelToolbar = memo(() => {
  const {
    currentState,
    closePanel,
    openPanel,
    history,
    undo,
    redo,
    currentIndex,
  } = useSidePanel()

  const handleToolbarAction = useCallback(
    (action: ToolbarAction) => {
      switch (action) {
        case "undo":
          undo()
          break
        case "redo":
          redo()
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
    [undo, redo, openPanel, closePanel]
  )

  return (
    <div className="flex items-center justify-between border-b bg-accent p-1 h-11">
      <div className="flex items-center space-x-1">
        {leftToolbarItems.map((item, index) => {
          const isDisabled =
            item.action === "undo"
              ? currentIndex === history.length - 1
              : item.action === "redo"
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
