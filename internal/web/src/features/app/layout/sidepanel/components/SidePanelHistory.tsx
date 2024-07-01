import React from "react"
import {
  FilePenLine,
  NotebookTabs,
  SearchIcon,
  Trash2,
  VaultIcon,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { ScrollArea } from "@/components/ui/ScrollArea"

import {
  PanelState,
  SidePanelContentType,
  useSidePanel,
} from "../state/sidePanel"

const getIconForContentType = (type: SidePanelContentType) => {
  switch (type) {
    case "preview":
    case "notes":
      return <NotebookTabs className="h-5 w-5" />
    case "search":
      return <SearchIcon className="h-5 w-5" />
    case "scratchpad":
      return <FilePenLine className="h-5 w-5" />
    case "vault":
    case "vault-edit":
      return <VaultIcon className="h-5 w-5" />
    default:
      return null
  }
}

const getDescriptionForHistoryItem = (item: PanelState) => {
  switch (item.contentType) {
    case "preview":
    case "notes":
      return `Note: ${item.contentKey}`
    case "search":
      return "Search"
    case "scratchpad":
      return "Scratchpad"
    case "vault":
      return "Vault Info"
    case "vault-edit":
      return "Edit Vault"
    default:
      return item.contentType || item.contentKey
  }
}

export const SidePanelHistory: React.FC = () => {
  const {
    history,
    navigateHistory,
    currentState,
    removeFromHistory,
    clearHistory,
  } = useSidePanel()

  return (
    <Card className="bg-accent">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Side Panel History</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearHistory}
          disabled={history.length === 0}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Clear History</span>
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[700px]">
          <div className="flex flex-col space-y-2">
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
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromHistory(index)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove from history</span>
                  </Button>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
