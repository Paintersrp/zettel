import { memo } from "react"

import { SidePanelContentType } from "@/features/app/layout/sidepanel/state/sidePanel"

import { HistoryPanel } from "./HistoryPanel"
import { NotesPanel } from "./NotesPanel"
import { PreviewPanel } from "./PreviewPanel"
import { ScratchPadPanel } from "./ScratchPadPanel"
import { SearchPanel } from "./SearchPanel"
import { VaultEditFormPanel } from "./VaultEditFormPanel"
import { VaultFormPanel } from "./VaultFormPanel"

export const SidePanelContent = memo(
  ({
    type,
    contentKey,
    props,
  }: {
    type: SidePanelContentType
    contentKey: string | null
    props: Record<string, any>
  }) => {
    switch (type) {
      case "preview":
        return <PreviewPanel noteId={contentKey} {...props} />
      case "notes":
        return <NotesPanel {...props} />
      case "search":
        return <SearchPanel {...props} />
      case "scratchpad":
        return <ScratchPadPanel {...props} />
      case "vault":
        return <VaultFormPanel {...props} />
      case "vault-edit":
        return <VaultEditFormPanel {...props} />
      case "history":
        return <HistoryPanel {...props} />
      default:
        return null
    }
  }
)
