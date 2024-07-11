"use client"

import { FC } from "react"
import dynamic from "next/dynamic"

import { SidePanelLoading } from "./SidePanelLoading"
import { useSidePanel } from "./useSidePanel"

// TODO: Loading Displays
const HistoryPanel = dynamic(() => import("./history/HistoryPanel"), {
  loading: () => <SidePanelLoading />,
})
const NoteInformationPanel = dynamic(
  () => import("./noteInfo/NoteInformationPanel"),
  {
    loading: () => <SidePanelLoading />,
  }
)
const NotesPanel = dynamic(() => import("./notes/NotesPanel"), {
  loading: () => <SidePanelLoading />,
})
const PreviewPanel = dynamic(() => import("./notePreview/PreviewPanel"), {
  loading: () => <SidePanelLoading />,
})
const ScratchPadPanel = dynamic(() => import("./scratchPad/ScratchPadPanel"), {
  loading: () => <SidePanelLoading />,
})
const SearchPanel = dynamic(() => import("./search/SearchPanel"), {
  loading: () => <SidePanelLoading />,
})

export const SidePanelContent: FC = () => {
  const { currentState } = useSidePanel()

  if (!currentState) return null

  const { contentType, contentProps } = currentState

  switch (contentType) {
    case "preview":
      return <PreviewPanel {...contentProps} />
    case "notes":
      return <NotesPanel {...contentProps} />
    case "search":
      return <SearchPanel {...contentProps} />
    case "scratchpad":
      return <ScratchPadPanel {...contentProps} />
    case "history":
      return <HistoryPanel {...contentProps} />
    case "note-information":
      return <NoteInformationPanel {...contentProps} />
    default:
      return null
  }
}

export default SidePanelContent
