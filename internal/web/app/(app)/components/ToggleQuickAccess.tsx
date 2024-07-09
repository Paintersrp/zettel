"use client"

import { Command } from "lucide-react"

import { useQuickAccess } from "@/lib/stores/quick-access"
import { Button } from "@/components/ui/Button"

export const ToggleQuickAccess = () => {
  const { setOpen } = useQuickAccess()

  return (
    <Button
      onClick={() => setOpen(true)}
      variant="outline"
      className="px-1.5 py-1.5 h-9 hover:bg-primary/20"
    >
      <Command className="size-5 text-primary" />
      <span className="sr-only">Toggle Settings Menu</span>
    </Button>
  )
}

export default ToggleQuickAccess
