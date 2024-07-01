import { FC, useState } from "react"
import {
  Copy,
  Download,
  FileUp,
  History,
  ListRestart,
  Save,
  Trash,
} from "lucide-react"

import { Button } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
// import { Input } from "@/components/ui/Input"
import { TooltipWrapper } from "@/components/ui/Tooltip"
import { VimIcon } from "@/components/icons/Vim"
import { useScratchpadStore } from "@/features/app/layout/sidepanel/state/scratchPad"

// TODO: Clean Toolbar Styles
// TODO: Undo/Redo (Editor)
// TODO: Vim Status
// TODO: Vim State
// TODO: Scratchpad History Tree / Display
// TODO: More Prominent Copy Scratchpad
// TODO: Consistent Tooltips
// TODO: Better Export / Download
// TODO: Create Note Logic

interface ScratchPadToolbarProps {}

export const ScratchPadToolbar: FC<ScratchPadToolbarProps> = ({}) => {
  const {
    content,
    saveScratchpad,
    vimEnabled,
    toggleVim,
    clearContent,
    savedScratchpads,
    loadScratchpad,
    deleteScratchpad,
  } = useScratchpadStore()
  const [saveName, setSaveName] = useState("")

  const handleSave = () => {
    if (saveName) {
      saveScratchpad(saveName)
      setSaveName("")
    }
  }

  const handleExportToNote = () => {
    console.log("export")
    // Implement export to note functionality
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(content)
  }

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "scratchpad.md"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex items-center space-x-1">
      {/* <Input */}
      {/*   value={saveName} */}
      {/*   onChange={(e) => setSaveName(e.target.value)} */}
      {/*   placeholder="Scratchpad name" */}
      {/*   className="w-32" */}
      {/* /> */}
      <TooltipWrapper content="Save Scratchpad" side="bottom">
        <Button variant="ghost" size="icon" onClick={handleSave}>
          <Save className="h-4 w-4" />
        </Button>
      </TooltipWrapper>
      <TooltipWrapper content="Clear Scratchpad" side="bottom">
        <Button variant="ghost" size="icon" onClick={clearContent}>
          <ListRestart className="h-4 w-4" />
        </Button>
      </TooltipWrapper>
      <TooltipWrapper content="Toggle Vim Mode" side="bottom">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleVim}
          className={vimEnabled ? "bg-primary text-primary-foreground" : ""}
        >
          <VimIcon className="h-4 w-4" />
        </Button>
      </TooltipWrapper>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" size="icon">
            <FileUp className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleExportToNote}>
            <FileUp className="h-4 w-4 mr-2" />
            Export to Note
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopyToClipboard}>
            <Copy className="h-4 w-4 mr-2" />
            Copy to Clipboard
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download as Markdown
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" size="icon">
            <History className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
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
                onClick={() => deleteScratchpad(scratchpad.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default ScratchPadToolbar
