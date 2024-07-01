import { ChevronLeft, FilePenLine, NotebookTabs, Search, X } from "lucide-react"

import { useSidePanel } from "@/features/app/layout/sidepanel/state/sidePanel"

import { SidePanelToolbarButton } from "./SidePanelToolbarButton"

export const SidePanelToolbar = () => {
  const { sidePanel, closePanel, openPanel, goBack } = useSidePanel()

  return (
    <div className="flex items-center justify-between border-b bg-accent p-1 h-11">
      <div className="flex items-center space-x-1">
        <SidePanelToolbarButton
          Icon={ChevronLeft}
          onClick={goBack}
          disabled={sidePanel.history.length === 0}
        />
        <SidePanelToolbarButton
          Icon={Search}
          isActive={sidePanel.contentType === "search"}
          onClick={() => openPanel("search", "global")}
        />
        <SidePanelToolbarButton
          Icon={NotebookTabs}
          isActive={sidePanel.contentType === "notes"}
          onClick={() => openPanel("notes", "list")}
        />
        <SidePanelToolbarButton
          Icon={FilePenLine}
          isActive={sidePanel.contentType === "scratchpad"}
          onClick={() => openPanel("scratchpad", "note")}
        />
      </div>
      <div className="flex items-center space-x-1">
        <SidePanelToolbarButton
          Icon={X}
          isActive={false}
          onClick={closePanel}
        />
      </div>
    </div>
  )
}
