import { memo } from "react"
import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
} from "@udecode/plate-basic-marks"
import { useEditorReadOnly } from "@udecode/plate-common"
import { MARK_BG_COLOR, MARK_COLOR } from "@udecode/plate-font"
import { ListStyleType } from "@udecode/plate-indent-list"
import { ELEMENT_IMAGE } from "@udecode/plate-media"

import { ToolbarGroup } from "@/components/ui/Toolbar"
import { Icons, iconVariants } from "@/components/editor/ui/Icons"

import { ColorDropdownMenu } from "../colors/ColorDropdownMenu"
import { AlignDropdownMenu } from "./AlignDropdownMenu"
// import { CommentToolbarButton } from "./CommentToolbarButton"
import { IndentListToolbarButton } from "./IndentListToolbarButton"
import { IndentTodoToolbarButton } from "./IndentTodoToolbarButton"
import { IndentToolbarButton } from "./IndentToolbarButton"
import { InsertDropdownMenu } from "./InsertDropdownMenu"
import { LineHeightDropdownMenu } from "./LineHeightDropdownMenu"
import { LinkToolbarButton } from "./LinkToolbarButton"
import { MarkToolbarButton } from "./MarkToolbarButton"
import { MediaToolbarButton } from "./MediaToolbarButton"
import { ModeDropdownMenu } from "./ModeDropdownMenu"
import { MoreDropdownMenu } from "./MoreDropdownMenu"
import { OutdentToolbarButton } from "./OutdentToolbarButton"
import { TableDropdownMenu } from "./TableDropdownMenu"
import { ToggleToolbarButton } from "./ToggleToolbarButton"
import { TurnIntoDropdownMenu } from "./TurnIntoDropdownMenu"

export const FixedToolbarButtons = memo(() => {
  const readOnly = useEditorReadOnly()

  return (
    <div className="w-full">
      <div
        className="flex"
        style={{
          // Conceal the first separator on each line using overflow
          transform: "translateX(calc(-1px))",
        }}
      >
        {!readOnly && (
          <>
            <ToolbarGroup noSeparator>
              <InsertDropdownMenu />
              <TurnIntoDropdownMenu />
            </ToolbarGroup>

            <ToolbarGroup>
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

              <ColorDropdownMenu nodeType={MARK_COLOR} tooltip="Text Color">
                <Icons.color className={iconVariants({ variant: "toolbar" })} />
              </ColorDropdownMenu>
              <ColorDropdownMenu
                nodeType={MARK_BG_COLOR}
                tooltip="Highlight Color"
              >
                <Icons.bg className={iconVariants({ variant: "toolbar" })} />
              </ColorDropdownMenu>
            </ToolbarGroup>

            <ToolbarGroup>
              <AlignDropdownMenu />
              <LineHeightDropdownMenu />
              <IndentListToolbarButton nodeType={ListStyleType.Disc} />
              <IndentListToolbarButton nodeType={ListStyleType.Decimal} />
              <IndentTodoToolbarButton />
              <OutdentToolbarButton />
              <IndentToolbarButton />
            </ToolbarGroup>

            <ToolbarGroup>
              <LinkToolbarButton />
              <ToggleToolbarButton />
              <MediaToolbarButton nodeType={ELEMENT_IMAGE} />
              <TableDropdownMenu />
              <MoreDropdownMenu />
            </ToolbarGroup>
          </>
        )}

        <div className="grow" />

        <ToolbarGroup noSeparator>
          {/* <CommentToolbarButton /> */}
          <ModeDropdownMenu />
        </ToolbarGroup>
      </div>
    </div>
  )
})
