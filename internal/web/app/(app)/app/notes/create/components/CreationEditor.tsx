"use client"

import { useCallback, useState } from "react"
import { CommentsProvider } from "@udecode/plate-comments"
import { Plate } from "@udecode/plate-common"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

import { plugins } from "@/components/editor/plugins"
import { CommentsPopover } from "@/components/editor/ui/comments/CommentsPopover"
import { Editor } from "@/components/editor/ui/Editor"
import { FixedToolbar } from "@/components/editor/ui/toolbars/FixedToolbar"
import { FixedToolbarButtons } from "@/components/editor/ui/toolbars/FixedToolbarButtons"
import { FloatingToolbar } from "@/components/editor/ui/toolbars/FloatingToolbar"
import { FloatingToolbarButtons } from "@/components/editor/ui/toolbars/FloatingToolbarButtons"

import "./CreationEditor.css"

const initialValue = [
  {
    id: "0",
    type: "h1",
    children: [{ text: "Untitled" }],
  },
]

export const CreationEditor = () => {
  const [value, setValue] = useState<string>("")

  const onChange = useCallback(
    () => (value: string | undefined) => {
      setValue(value ?? "")
    },
    [setValue]
  )

  return (
    <DndProvider backend={HTML5Backend}>
      <CommentsProvider users={{}} myUserId="1">
        <Plate plugins={plugins} initialValue={initialValue}>
          <div className="flex flex-col h-full">
            <FixedToolbar>
              <FixedToolbarButtons />
            </FixedToolbar>
            <div className="flex-grow overflow-y-auto border-b">
              <Editor
                value={value}
                onChange={onChange}
                focusRing={false}
                placeholder=""
                size="lg"
                variant="ghost"
                className="h-full"
              />
            </div>
            {/* TODO: Duplicate Placeholder for Submit / Bottom Toolbar */}
            <FixedToolbar>
              <FixedToolbarButtons />
            </FixedToolbar>
            <FloatingToolbar>
              <FloatingToolbarButtons />
            </FloatingToolbar>
            <CommentsPopover />
          </div>
        </Plate>
      </CommentsProvider>
    </DndProvider>
  )
}

export default CreationEditor
