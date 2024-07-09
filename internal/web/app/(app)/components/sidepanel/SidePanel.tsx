import { TooltipProvider } from "@/components/ui/Tooltip"

import SidePanelContent from "./SidePanelContent"
import { SidePanelToolbar } from "./SidePanelToolbar"

export const SidePanel = () => {
  return (
    <TooltipProvider>
      <aside className="w-full min-h-screen h-screen flex flex-col">
        <SidePanelToolbar />
        <div className="flex-grow overflow-auto">
          <SidePanelContent />
        </div>
      </aside>
    </TooltipProvider>
  )
}

export default SidePanel
