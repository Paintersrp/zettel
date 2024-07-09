"use client"

import { PanelRight } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { useSidePanel } from "@/app/(app)/lib/sidePanel"

export const ToggleSidePanel = () => {
  const { togglePanel } = useSidePanel()

  return (
    <Button
      variant="outline"
      className="px-1.5 py-1.5 h-9 hover:bg-primary/20"
      onClick={togglePanel}
    >
      <PanelRight className="size-5 text-primary" />
      <span className="sr-only">Toggle Side Panel</span>
    </Button>
  )
}

export default ToggleSidePanel
