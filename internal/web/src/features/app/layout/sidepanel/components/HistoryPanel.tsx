import React from "react"
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
import {
  PanelState,
  SidePanelContentType,
  useSidePanel,
} from "@/features/app/layout/sidepanel/state/sidePanel"

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

const getDescriptionForHistoryItem = (item: PanelState) => {
  switch (item.contentType) {
    case "preview":
    case "notes":
      return `Note List`
    case "note-information":
      return `Note Information: ${item.contentKey}`
    case "search":
      return "Search"
    case "scratchpad":
      return "Scratchpad"
    default:
      return item.contentType || item.contentKey
  }
}
// TODO: History should only add unique items to array

export const HistoryPanel: React.FC = () => {
  const {
    history,
    navigateHistory,
    currentState,
    removeFromHistory,
    clearHistory,
  } = useSidePanel()

  return (
    <Card className="bg-accent border-none">
      <CardHeader className="flex flex-row items-center justify-between !py-2 !space-y-0">
        <CardTitle>Side Panel History</CardTitle>
        <Button
          variant="destructive"
          size="iconXs"
          onClick={clearHistory}
          disabled={history.length === 0}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Clear History</span>
        </Button>
      </CardHeader>
      <ScrollArea className="h-[calc(100vh-9rem)]">
        <div className="flex flex-col space-y-2 px-3 pb-2">
          {history.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No history available
            </p>
          ) : (
            history.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Button
                  variant={item === currentState ? "default" : "outline"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => navigateHistory(index)}
                >
                  {getIconForContentType(item.contentType)}
                  <span className="ml-2 truncate">
                    {getDescriptionForHistoryItem(item)}
                  </span>
                </Button>
                <Button
                  variant="destructive"
                  size="iconXs"
                  onClick={() => removeFromHistory(index)}
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
