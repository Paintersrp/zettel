import { useCallback } from "react"
import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu"
import { ELEMENT_BLOCKQUOTE } from "@udecode/plate-block-quote"
import {
  collapseSelection,
  focusEditor,
  getNodeEntries,
  isBlock,
  toggleNodeType,
  useEditorRef,
  useEditorSelector,
} from "@udecode/plate-common"
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
} from "@udecode/plate-heading"
import { toggleIndentList } from "@udecode/plate-indent-list"
import { unwrapList } from "@udecode/plate-list"
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph"

import { useOpenState } from "@/hooks/useOpenState"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { ToolbarButton } from "@/components/ui/Toolbar"
import { Icons } from "@/components/editor/ui/Icons"

const items = [
  {
    description: "Paragraph",
    icon: Icons.paragraph,
    label: "Paragraph",
    value: ELEMENT_PARAGRAPH,
  },
  {
    description: "Heading 1",
    icon: Icons.h1,
    label: "Heading 1",
    value: ELEMENT_H1,
  },
  {
    description: "Heading 2",
    icon: Icons.h2,
    label: "Heading 2",
    value: ELEMENT_H2,
  },
  {
    description: "Heading 3",
    icon: Icons.h3,
    label: "Heading 3",
    value: ELEMENT_H3,
  },
  {
    description: "Heading 4",
    icon: Icons.h4,
    label: "Heading 4",
    value: ELEMENT_H4,
  },
  {
    description: "Heading 5",
    icon: Icons.h5,
    label: "Heading 5",
    value: ELEMENT_H5,
  },
  {
    description: "Heading 6",
    icon: Icons.h6,
    label: "Heading 6",
    value: ELEMENT_H6,
  },
  {
    description: "Bulleted list",
    icon: Icons.ul,
    label: "Bulleted list",
    value: "ul",
  },
  {
    description: "Numbered list",
    icon: Icons.ol,
    label: "Numbered list",
    value: "ol",
  },
  {
    description: "Quote (⌘+⇧+.)",
    icon: Icons.blockquote,
    label: "Quote",
    value: ELEMENT_BLOCKQUOTE,
  },
]

const defaultItem = items.find((item) => item.value === ELEMENT_PARAGRAPH)!

export function TurnIntoDropdownMenu(props: DropdownMenuProps) {
  const value: string = useEditorSelector((editor) => {
    let initialNodeType: string = ELEMENT_PARAGRAPH
    let allNodesMatchInitialNodeType = false
    const codeBlockEntries = getNodeEntries(editor, {
      match: (n) => isBlock(editor, n),
      mode: "highest",
    })
    const nodes = Array.from(codeBlockEntries)

    if (nodes.length > 0) {
      initialNodeType = nodes[0][0].type as string
      allNodesMatchInitialNodeType = nodes.every(([node]) => {
        const type: string = (node?.type as string) || ELEMENT_PARAGRAPH

        return type === initialNodeType
      })
    }

    return allNodesMatchInitialNodeType ? initialNodeType : ELEMENT_PARAGRAPH
  }, [])

  const editor = useEditorRef()
  const openState = useOpenState()

  const selectedItem = items.find((item) => item.value === value) ?? defaultItem
  const { icon: SelectedItemIcon, label: selectedItemLabel } = selectedItem

  const onCloseAutoFocus = useCallback((e: Event) => {
    focusEditor(editor)

    return e.preventDefault()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          className="lg:min-w-[130px]"
          isDropdown
          pressed={openState.open}
          tooltip="Turn into"
        >
          <SelectedItemIcon className="size-5 lg:hidden" />
          <span className="max-lg:hidden">{selectedItemLabel}</span>
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="min-w-0"
        onCloseAutoFocus={onCloseAutoFocus}
      >
        <DropdownMenuLabel>Turn into</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          className="flex flex-col gap-0.5"
          onValueChange={(type) => {
            if (type === "ul" || type === "ol") {
              toggleIndentList(editor, {
                listStyleType: type === "ul" ? "disc" : "decimal",
              })
            } else {
              unwrapList(editor)
              toggleNodeType(editor, { activeType: type })
            }

            collapseSelection(editor)
            focusEditor(editor)
          }}
          value={value}
        >
          {items.map(({ icon: Icon, label, value: itemValue }) => (
            <DropdownMenuRadioItem
              className="min-w-[180px]"
              key={itemValue}
              value={itemValue}
            >
              <Icon className="mr-2 size-5 text-primary" />
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
