import { FC, useMemo } from "react"
import {
  BookType,
  FilePenLine,
  NotebookTabs,
  SearchIcon,
  Trash2,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Card, CardHeader, CardTitle } from "@/components/ui/Card"
import { ScrollArea } from "@/components/ui/ScrollArea"
import { TooltipWrapper } from "@/components/ui/Tooltip"
import {
  PanelState,
  SidePanelContentType,
  useSidePanel,
} from "@/app/(app)/lib/sidePanel"

const getIconForContentType = (type: SidePanelContentType) => {
  switch (type) {
    case "preview":
    case "notes":
      return <NotebookTabs className="size-5" />
    case "note-information":
      return <BookType className="size-5" />
    case "search":
      return <SearchIcon className="size-5" />
    case "scratchpad":
      return <FilePenLine className="size-5" />
    default:
      return null
  }
}

const truncateString = (str: string, maxLength: number) => {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength - 3) + "..."
}

const getDescriptionForHistoryItem = (item: PanelState) => {
  switch (item.contentType) {
    case "preview":
    case "notes":
      return `Note List`
    case "note-information":
      return `Note Information: ${truncateString(item.contentKey || "", 20)}`
    case "search":
      return item.searchInput
        ? `Search: "${truncateString(item.searchInput, 15)}"`
        : "Search"
    case "scratchpad":
      return "Scratchpad"
    default:
      return item.contentType || item.contentKey
  }
}

const getFullDescription = (item: PanelState) => {
  switch (item.contentType) {
    case "note-information":
      return `Note Information: ${item.contentKey}`
    case "search":
      return item.searchInput ? `Search: "${item.searchInput}"` : "Search"
    default:
      return getDescriptionForHistoryItem(item)
  }
}

export const HistoryPanel: FC = () => {
  const {
    history,
    navigateHistory,
    currentState,
    removeFromHistory,
    clearHistory,
  } = useSidePanel()

  const uniqueHistory = useMemo(() => {
    const seen = new Set()
    return history.filter((item) => {
      const key = `${item.contentType}-${item.contentKey}-${item.searchInput}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  }, [history])

  return (
    <Card className="bg-accent border-none">
      <CardHeader className="flex flex-row items-center justify-between !py-2 !space-y-0">
        <CardTitle>Side Panel History</CardTitle>
        <Button
          variant="destructive"
          size="iconXs"
          onClick={clearHistory}
          disabled={uniqueHistory.length === 0}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Clear History</span>
        </Button>
      </CardHeader>
      <ScrollArea className="h-[calc(100vh-9rem)] w-full">
        <div className="flex flex-col space-y-2 px-3 pb-2">
          {uniqueHistory.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No history available
            </p>
          ) : (
            uniqueHistory.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <TooltipWrapper content={getFullDescription(item)} side="right">
                  <Button
                    variant={item === currentState ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => navigateHistory(history.indexOf(item))}
                  >
                    {getIconForContentType(item.contentType)}
                    <span className="ml-2 truncate">
                      {getDescriptionForHistoryItem(item)}
                    </span>
                  </Button>
                </TooltipWrapper>
                <Button
                  variant="destructive"
                  size="iconXs"
                  onClick={() => removeFromHistory(history.indexOf(item))}
                  className="size-6"
                >
                  <X className="size-3" />
                  <span className="sr-only">Remove from history</span>
                </Button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </Card>
  )
}

export default HistoryPanel
