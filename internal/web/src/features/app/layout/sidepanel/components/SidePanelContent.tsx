import { useSidePanel } from "@/features/app/layout/sidepanel/state/sidePanel"

import { HistoryPanel } from "./HistoryPanel"
import { NoteInformationPanel } from "./NoteInformationPanel"
import { NotesPanel } from "./NotesPanel"
import { PreviewPanel } from "./PreviewPanel"
import { ScratchPadPanel } from "./ScratchPadPanel"
import { SearchPanel } from "./SearchPanel"

export const SidePanelContent: React.FC = () => {
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
