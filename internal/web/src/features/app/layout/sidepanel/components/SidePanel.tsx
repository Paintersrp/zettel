import { loadingLazy } from "@/lib/lazy"

import SidePanelContent from "./SidePanelContent"
import { SidePanelToolbar } from "./SidePanelToolbar"

const TooltipProvider = loadingLazy(() =>
  import("@/components/ui/Tooltip").then((module) => ({
    default: module.TooltipProvider,
  }))
)

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
