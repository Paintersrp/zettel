"use client"

import { FC } from "react"
import dynamic from "next/dynamic"

import { useSidePanel } from "@/app/(app)/state/sidePanel"

import { SidePanelLoading } from "./SidePanelLoading"

// TODO: Loading Displays
const HistoryPanel = dynamic(() => import("./HistoryPanel"), {
  loading: () => <SidePanelLoading />,
})
const NoteInformationPanel = dynamic(() => import("./NoteInformationPanel"), {
  loading: () => <SidePanelLoading />,
})
const NotesPanel = dynamic(() => import("./NotesPanel"), {
  loading: () => <SidePanelLoading />,
})
const PreviewPanel = dynamic(() => import("./PreviewPanel"), {
  loading: () => <SidePanelLoading />,
})
const ScratchPadPanel = dynamic(() => import("./ScratchPadPanel"), {
  loading: () => <SidePanelLoading />,
})
const SearchPanel = dynamic(() => import("./SearchPanel"), {
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
