import { useMemo } from "react"
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

export const SidePanelToolbar = () => {
  const {
    currentState,
    closePanel,
    openPanel,
    history,
    undo,
    redo,
    currentIndex,
  } = useSidePanel()

  const leftSideItems = useMemo(
    () => [
      {
        icon: ChevronLeft,
        onClick: undo,
        disabled: currentIndex === history.length - 1,
        tooltip: "Undo",
      },
      {
        icon: ChevronRight,
        onClick: redo,
        disabled: currentIndex === 0,
        tooltip: "Redo",
      },
      {
        icon: Search,
        onClick: () => openPanel("search", "global"),
        isActive: currentState.contentType === "search",
        tooltip: "Search",
      },
      {
        icon: NotebookTabs,
        onClick: () => openPanel("notes", "list"),
        isActive: currentState.contentType === "notes",
        tooltip: "Notes",
      },
      {
        icon: FilePenLine,
        onClick: () => openPanel("scratchpad", "note"),
        isActive: currentState.contentType === "scratchpad",
        tooltip: "Scratchpad",
      },
    ],
    [
      currentState.contentType,
      currentIndex,
      history.length,
      openPanel,
      undo,
      redo,
    ]
  )

  const rightSideItems = useMemo(
    () => [
      {
        icon: History,
        onClick: () => openPanel("history", "history"),
        isActive: currentState.contentType === "history",
        tooltip: "History",
      },
      {
        icon: X,
        onClick: closePanel,
        tooltip: "Close",
      },
    ],
    [currentState.contentType, closePanel, openPanel]
  )

  return (
    <div className="flex items-center justify-between border-b bg-accent p-1 h-11">
      <div className="flex items-center space-x-1">
        {leftSideItems.map((item, index) => (
          <SidePanelToolbarButton
            key={`left-${index}`}
            Icon={item.icon}
            onClick={item.onClick}
            isActive={item.isActive}
            disabled={false}
            tooltip={item.tooltip}
          />
        ))}
      </div>
      <div className="flex items-center space-x-1">
        {rightSideItems.map((item, index) => (
          <SidePanelToolbarButton
            key={`right-${index}`}
            Icon={item.icon}
            onClick={item.onClick}
            isActive={item.isActive}
            disabled={false}
            tooltip={item.tooltip}
          />
        ))}
      </div>
    </div>
  )
}
