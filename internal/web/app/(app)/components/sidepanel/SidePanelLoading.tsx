import { Loader2 } from "lucide-react"

const SidePanelLoading = () => {
  return (
    <div className="flex w-full justify-center">
      <Loader2 className="mr-2 size-16 mt-4 text-primary animate-spin" />
    </div>
  )
}

export { SidePanelLoading }
