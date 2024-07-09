"use client"

import { FC, useState } from "react"
import {
  Copy,
  Download,
  FileUp,
  History,
  ListRestart,
  MoreHorizontal,
  Save,
  Trash,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { Input } from "@/components/ui/Input"
import { TooltipWrapper } from "@/components/ui/Tooltip"
import { VimIcon } from "@/components/icons/Vim"
import { useScratchpadStore } from "@/app/(app)/state/scratchPad"

interface ScratchPadToolbarProps {}

export const ScratchPadToolbar: FC<ScratchPadToolbarProps> = () => {
  const [saveName, setSaveName] = useState("")
  const vimEnabled = useScratchpadStore((state) => state.vimEnabled)
  const savedScratchpads = useScratchpadStore((state) => state.savedScratchpads)

  // Get actions from the store without subscribing to state changes,
  // avoiding rerenders as side-effects of changing the editor content
  const {
    saveScratchpad,
    toggleVim,
    clearContent,
    loadScratchpad,
    deleteScratchpad,
    getContent,
  } = useScratchpadStore.getState()

  const handleSave = () => {
    if (saveName) {
      saveScratchpad(saveName)
      setSaveName("")
    }
  }

  const handleCopyToClipboard = () => {
    const content = getContent()
    navigator.clipboard.writeText(content)
  }

  const handleDownload = () => {
    const content = getContent()
    const blob = new Blob([content], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "scratchpad.md"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleExportToNote = () => {
    const content = getContent()
    console.log("Exporting note:", content)
  }

  return (
    <div className="flex flex-col border-b">
      <div className="py-1 px-2 flex justify-between items-center gap-2 sm:gap-6 border-b">
        <h3 className="font-semibold">Scratchpad</h3>
        <Input
          type="text"
          name="name"
          value={saveName}
          onChange={(e) => setSaveName(e.target.value)}
          placeholder="Enter scratchpad name"
          className="px-2 text-xs h-8 max-w-[240px] focus:ring-1 focus:ring-primary/40 focus:ring-offset-0"
        />
      </div>
      <div className="flex justify-between items-center space-x-1 p-1">
        <div className="flex items-center space-x-1">
          <TooltipWrapper
            content="Save Scratchpad"
            side="top"
            classes={{
              text: "text-xs",
              content: "bg-accent border-primary/20 p-1.5",
            }}
          >
            <Button
              variant="ghost"
              size="iconXs"
              className="bg-accent hover:bg-primary/20 text-muted-foreground hover:text-foreground"
              onClick={handleSave}
            >
              <Save className="size-5" />
            </Button>
          </TooltipWrapper>
          <TooltipWrapper
            content="Clear Scratchpad"
            side="top"
            classes={{
              text: "text-xs",
              content: "bg-accent border-primary/20 p-1.5",
            }}
          >
            <Button
              variant="ghost"
              size="iconXs"
              className="bg-accent hover:bg-primary/20 text-muted-foreground hover:text-foreground"
              onClick={clearContent}
            >
              <ListRestart className="size-5" />
            </Button>
          </TooltipWrapper>
          <TooltipWrapper
            content="Toggle Vim Mode"
            side="top"
            classes={{
              text: "text-xs",
              content: "bg-accent border-primary/20 p-1.5",
            }}
          >
            <Button
              variant="ghost"
              size="iconXs"
              onClick={toggleVim}
              className={cn(
                "bg-accent hover:bg-primary/20 text-muted-foreground hover:text-foreground",
                vimEnabled &&
                  "bg-primary/20 hover:bg-primary/40 text-foreground"
              )}
            >
              <VimIcon className="size-5" />
            </Button>
          </TooltipWrapper>
        </div>

        <div className="flex items-center space-x-1">
          <DropdownMenu>
            <TooltipWrapper
              content="Sidepanel History"
              side="top"
              classes={{
                text: "text-xs",
                content: "bg-accent border-primary/20 p-1.5",
              }}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="iconXs"
                  className="bg-accent hover:bg-primary/20 data-[state=open]:bg-primary/20 data-[state=open]hover:bg-primary/40 text-muted-foreground hover:text-foreground"
                >
                  <History className="size-5" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipWrapper>
            <DropdownMenuContent>
              {savedScratchpads.map((scratchpad) => (
                <DropdownMenuItem
                  key={scratchpad.id}
                  onClick={() => loadScratchpad(scratchpad.id)}
                >
                  {scratchpad.name}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteScratchpad(scratchpad.id)
                    }}
                  >
                    <Trash className="size-5" />
                  </Button>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <TooltipWrapper
              content="More"
              side="top"
              classes={{
                text: "text-xs",
                content: "bg-accent border-primary/20 p-1.5",
              }}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="iconXs"
                  className="bg-accent hover:bg-primary/20 data-[state=open]:bg-primary/20 data-[state=open]hover:bg-primary/40 text-muted-foreground hover:text-foreground"
                >
                  <MoreHorizontal className="size-5" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipWrapper>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleExportToNote}>
                <FileUp className="size-5 mr-2" />
                Export to Note
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopyToClipboard}>
                <Copy className="size-5 mr-2" />
                Copy to Clipboard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDownload}>
                <Download className="size-5 mr-2" />
                Download as Markdown
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default ScratchPadToolbar
