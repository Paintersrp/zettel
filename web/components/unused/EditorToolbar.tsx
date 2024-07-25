import { FC } from "react"
import {
  AArrowDown,
  AArrowUp,
  ALargeSmall,
  Archive,
  Download,
  EyeIcon,
  Redo,
  Save,
  Settings,
  Undo,
} from "lucide-react"

import { Separator } from "@/components/ui/Separator"
import { VimIcon } from "@/components/icons/Vim"

import EditorToolbarButton from "./EditorToolbarButton"

interface EditorToolbarProps {
  vim: boolean
  toggleVim: () => void
  incrementFontSize: (type: "up" | "down" | "reset") => void
}

export const EditorToolbar: FC<EditorToolbarProps> = ({
  vim,
  toggleVim,
  incrementFontSize,
}) => {
  return (
    <div className="flex justify-between items-center bg-accent px-2 py-1 h-11">
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1 rounded-md p-1">
          <EditorToolbarButton
            Icon={Save}
            tooltip="Save"
            onClick={() => console.log("Save")}
          />
          <EditorToolbarButton
            Icon={Download}
            tooltip="Download"
            onClick={() => console.log("Download")}
          />
          <EditorToolbarButton
            Icon={Archive}
            tooltip="Archive"
            onClick={() => console.log("Archive")}
          />
        </div>
        <Separator orientation="vertical" className="h-6" />
        <div className="flex items-center space-x-1 rounded-md p-1">
          <EditorToolbarButton
            Icon={Undo}
            tooltip="Undo"
            onClick={() => console.log("Undo")}
          />
          <EditorToolbarButton
            Icon={Redo}
            tooltip="Redo"
            onClick={() => console.log("Redo")}
          />
        </div>
        <Separator orientation="vertical" className="h-6" />
        <div className="flex items-center space-x-1 rounded-md p-1">
          <EditorToolbarButton
            Icon={AArrowUp}
            tooltip="Increase font size"
            onClick={() => incrementFontSize("up")}
          />
          <EditorToolbarButton
            Icon={AArrowDown}
            tooltip="Decrease font size"
            onClick={() => incrementFontSize("down")}
          />
          <EditorToolbarButton
            Icon={ALargeSmall}
            tooltip="Reset font size"
            onClick={() => incrementFontSize("reset")}
          />
        </div>
        <Separator orientation="vertical" className="h-6" />
        <div className="flex items-center space-x-1 rounded-md p-1">
          <EditorToolbarButton
            Icon={VimIcon}
            tooltip="Vim Mode"
            onClick={toggleVim}
            isActive={vim}
          />
          <EditorToolbarButton
            Icon={EyeIcon}
            tooltip="Preview"
            onClick={() => console.log("Preview")}
          />
          <EditorToolbarButton
            Icon={Settings}
            tooltip="Settings"
            onClick={() => console.log("Settings")}
          />
        </div>
      </div>
      <code id="status" className="text-sm rounded-md font-sans"></code>
    </div>
  )
}

export default EditorToolbar
