import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
} from "@udecode/plate-basic-marks"
import { useEditorReadOnly } from "@udecode/plate-common"

import { ToolbarSeparator } from "@/components/ui/Toolbar"
import { Icons } from "@/components/editor/ui/Icons"

// import { CommentTolbarButton } from "./CommentToolbarButton"
import { LinkToolbarButton } from "./LinkToolbarButton"
import { MarkToolbarButton } from "./MarkToolbarButton"
import { MoreDropdownMenu } from "./MoreDropdownMenu"
import { TurnIntoDropdownMenu } from "./TurnIntoDropdownMenu"

export function FloatingToolbarButtons() {
  const readOnly = useEditorReadOnly()

  return (
    <>
      {!readOnly && (
        <>
          <TurnIntoDropdownMenu />

          <MarkToolbarButton nodeType={MARK_BOLD} tooltip="Bold (⌘+B)">
            <Icons.bold />
          </MarkToolbarButton>
          <MarkToolbarButton nodeType={MARK_ITALIC} tooltip="Italic (⌘+I)">
            <Icons.italic />
          </MarkToolbarButton>
          <MarkToolbarButton
            nodeType={MARK_UNDERLINE}
            tooltip="Underline (⌘+U)"
          >
            <Icons.underline />
          </MarkToolbarButton>
          <MarkToolbarButton
            nodeType={MARK_STRIKETHROUGH}
            tooltip="Strikethrough (⌘+⇧+M)"
          >
            <Icons.strikethrough />
          </MarkToolbarButton>
          <MarkToolbarButton nodeType={MARK_CODE} tooltip="Code (⌘+E)">
            <Icons.code />
          </MarkToolbarButton>

          <ToolbarSeparator />

          <LinkToolbarButton />
        </>
      )}

      {/* <CommentToolbarButton /> */}
      <MoreDropdownMenu />
    </>
  )
}
