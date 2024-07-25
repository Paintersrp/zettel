import React, { ReactNode, useCallback, useMemo } from "react"
import { BulletedListElement } from "@/app"
import {
  createEditor,
  Descendant,
  Editor,
  Point,
  Range,
  Element as SlateElement,
  Node as SlateNode,
  Transforms,
} from "slate"
import { withHistory } from "slate-history"
import { Editable, ReactEditor, Slate, withReact } from "slate-react"

import { SHORTCUTS } from "./shortcuts"

export const SlateEditor = () => {
  const renderElement = useCallback((props: any) => <Element {...props} />, [])
  const editor = useMemo(
    () => withShortcuts(withReact(withHistory(createEditor()))),
    []
  )

  const handleDOMBeforeInput = useCallback(
    (_: InputEvent) => {
      queueMicrotask(() => {
        const pendingDiffs = ReactEditor.androidPendingDiffs(editor)

        const scheduleFlush = pendingDiffs?.some(({ diff, path }) => {
          if (!diff.text.endsWith(" ")) {
            return false
          }

          const { text } = SlateNode.leaf(editor, path)
          const beforeText = text.slice(0, diff.start) + diff.text.slice(0, -1)
          if (!(beforeText in SHORTCUTS)) {
            return
          }

          const blockEntry = Editor.above(editor, {
            at: path,
            match: (n) =>
              SlateElement.isElement(n) && Editor.isBlock(editor, n),
          })
          if (!blockEntry) {
            return false
          }

          const [, blockPath] = blockEntry
          return Editor.isStart(editor, Editor.start(editor, path), blockPath)
        })

        if (scheduleFlush) {
          ReactEditor.androidScheduleFlush(editor)
        }
      })
    },
    [editor]
  )

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Editable
        onDOMBeforeInput={handleDOMBeforeInput}
        renderElement={renderElement}
        placeholder="Write some markdown..."
        spellCheck
        autoFocus
        style={{ minHeight: "100%" }}
        className="focus:focus-ring-0 focus:outline-none focus:ring-0 focus:ring-primary-500 focus:ring-opacity-50"
      />
    </Slate>
  )
}

const withShortcuts = (editor: Editor) => {
  const { deleteBackward, insertText } = editor

  editor.insertText = (text) => {
    const { selection } = editor

    if (text.endsWith(" ") && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection
      const block = Editor.above(editor, {
        match: (n) => SlateElement.isElement(n) && Editor.isBlock(editor, n),
      })
      const path = block ? block[1] : []
      const start = Editor.start(editor, path)
      const range = { anchor, focus: start }
      const beforeText = Editor.string(editor, range) + text.slice(0, -1)
      const type = SHORTCUTS[beforeText]

      if (type) {
        Transforms.select(editor, range)

        if (!Range.isCollapsed(range)) {
          Transforms.delete(editor)
        }

        const newProperties: Partial<SlateElement> = {
          type,
        }
        Transforms.setNodes<SlateElement>(editor, newProperties, {
          match: (n) => SlateElement.isElement(n) && Editor.isBlock(editor, n),
        })

        if (type === "list-item") {
          const list: BulletedListElement = {
            type: "bulleted-list",
            children: [],
          }
          Transforms.wrapNodes(editor, list, {
            match: (n) =>
              !Editor.isEditor(n) &&
              SlateElement.isElement(n) &&
              n.type === "list-item",
          })
        }

        return
      }
    }

    insertText(text)
  }

  editor.deleteBackward = (...args) => {
    const { selection } = editor

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: (n) => SlateElement.isElement(n) && Editor.isBlock(editor, n),
      })

      if (match) {
        const [block, path] = match
        const start = Editor.start(editor, path)

        if (
          !Editor.isEditor(block) &&
          SlateElement.isElement(block) &&
          block.type !== "paragraph" &&
          Point.equals(selection.anchor, start)
        ) {
          const newProperties: Partial<SlateElement> = {
            type: "paragraph",
          }
          Transforms.setNodes(editor, newProperties)

          if (block.type === "list-item") {
            Transforms.unwrapNodes(editor, {
              match: (n) =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                n.type === "bulleted-list",
              split: true,
            })
          }

          return
        }
      }

      deleteBackward(...args)
    }
  }

  return editor
}

const Element = ({
  attributes,
  children,
  element,
}: {
  attributes: any
  children: ReactNode
  element: any
}) => {
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote
          {...attributes}
          className="border-l-4 border-muted-foregorund pl-4 py-1 my-1 italic text-muted-foreground text-lg"
        >
          {children}
        </blockquote>
      )
    case "bulleted-list":
      return (
        <ul {...attributes} className="list-disc list-outside pl-5 space-y-1">
          {children}
        </ul>
      )
    case "heading-one":
      return (
        <h1
          {...attributes}
          className="text-4xl font-bold leading-tight mt-6 mb-4"
        >
          {children}
        </h1>
      )
    case "heading-two":
      return (
        <h2
          {...attributes}
          className="text-2xl font-semibold leading-tight mt-6 mb-3"
        >
          {children}
        </h2>
      )
    case "heading-three":
      return (
        <h3
          {...attributes}
          className="text-xl font-medium leading-snug mt-4 mb-2"
        >
          {children}
        </h3>
      )
    case "heading-four":
      return (
        <h4
          {...attributes}
          className="text-lg font-medium leading-snug mt-4 mb-2"
        >
          {children}
        </h4>
      )
    case "heading-five":
      return (
        <h5
          {...attributes}
          className="text-base font-medium leading-snug mt-4 mb-2"
        >
          {children}
        </h5>
      )
    case "heading-six":
      return (
        <h6 {...attributes} className="font-medium leading-snug mt-4 mb-2">
          {children}
        </h6>
      )
    case "list-item":
      return (
        <li {...attributes} className="mb-1">
          {children}
        </li>
      )
    default:
      return (
        <p {...attributes} className="leading-relaxed mb-2">
          {children}
        </p>
      )
  }
}
const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [
      {
        text: 'The editor gives you full control over the logic you can add. For example, it\'s fairly common to want to add markdown-like shortcuts to editors. So that, when you start a line with "> " you get a blockquote that looks like this:',
      },
    ],
  },
  {
    type: "block-quote",
    children: [{ text: "A wise quote." }],
  },
  {
    type: "paragraph",
    children: [
      {
        text: 'Order when you start a line with "## " you get a level-two heading, like this:',
      },
    ],
  },
  {
    type: "heading-two",
    children: [{ text: "Try it out!" }],
  },
  {
    type: "paragraph",
    children: [
      {
        text: 'Try it out for yourself! Try starting a new line with ">", "-", or "#"s.',
      },
    ],
  },
]

export default SlateEditor
