"use client"

import { Plate } from "@udecode/plate-common"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

import { useScrollAreaScrollToTop } from "@/hooks/useScrollAreaScrollToTop"
import { ScrollArea } from "@/components/ui/ScrollArea"
import { AppScrollToTop } from "@/components/AppScrollToTop"
import { plugins } from "@/components/editor/plugins"
import { FixedToolbar } from "@/components/editor/ui/toolbars/FixedToolbar"
import { FixedToolbarButtons } from "@/components/editor/ui/toolbars/FixedToolbarButtons"
import { FloatingToolbar } from "@/components/editor/ui/toolbars/FloatingToolbar"
import { FloatingToolbarButtons } from "@/components/editor/ui/toolbars/FloatingToolbarButtons"

import { BottomButtons } from "./BottomButtons"
import { ContentEditor } from "./ContentEditor"
import { TitleInput } from "./TitleInput"

const initialContentValue = [
  {
    id: "0",
    type: "p",
    children: [{ text: "" }],
  },
]

// TODO: CommentProvider + CommentsPopover

export const CreateNote = () => {
  const { scrollAreaRef, isOverThreshold, scrollToTop } =
    useScrollAreaScrollToTop()
  return (
    <DndProvider backend={HTML5Backend}>
      <Plate id="content" initialValue={initialContentValue} plugins={plugins}>
        <div className="flex flex-col h-full">
          <FixedToolbar>
            <FixedToolbarButtons />
          </FixedToolbar>

          <ScrollArea
            viewportRef={scrollAreaRef}
            className="flex-grow bg-card border-b"
          >
            <TitleInput />
            <ContentEditor />
          </ScrollArea>

          <AppScrollToTop
            classes={{ button: "bottom-14 size-6 bg-primary/70" }}
            visible={isOverThreshold}
            onClick={scrollToTop}
          />

          {/* TODO: Duplicate Placeholder for Submit / Bottom Toolbar */}
          <FixedToolbar>
            <BottomButtons />
          </FixedToolbar>
          <FloatingToolbar>
            <FloatingToolbarButtons />
          </FloatingToolbar>
        </div>
      </Plate>
    </DndProvider>
  )
}

export default CreateNote
