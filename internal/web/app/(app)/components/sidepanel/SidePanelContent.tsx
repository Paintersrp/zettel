"use client"

import { FC } from "react"
import dynamic from "next/dynamic"

import { useSidePanel } from "@/app/(app)/state/sidePanel"

// TODO: Loading Displays
const HistoryPanel = dynamic(() => import("./HistoryPanel"))
const NoteInformationPanel = dynamic(() => import("./NoteInformationPanel"))
const NotesPanel = dynamic(() => import("./NotesPanel"))
const PreviewPanel = dynamic(() => import("./PreviewPanel"))
const ScratchPadPanel = dynamic(() => import("./ScratchPadPanel"))
const SearchPanel = dynamic(() => import("./SearchPanel"))

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
