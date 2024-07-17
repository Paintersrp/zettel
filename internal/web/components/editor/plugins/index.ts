import { withProps } from "@udecode/cn"
import { createAlignPlugin } from "@udecode/plate-alignment"
import { createAutoformatPlugin } from "@udecode/plate-autoformat"
import {
  createBoldPlugin,
  createCodePlugin,
  createItalicPlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createUnderlinePlugin,
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  MARK_UNDERLINE,
} from "@udecode/plate-basic-marks"
import {
  createBlockquotePlugin,
  ELEMENT_BLOCKQUOTE,
} from "@udecode/plate-block-quote"
import {
  createExitBreakPlugin,
  createSoftBreakPlugin,
} from "@udecode/plate-break"
import { createCaptionPlugin } from "@udecode/plate-caption"
import {
  createCodeBlockPlugin,
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
  ELEMENT_CODE_SYNTAX,
} from "@udecode/plate-code-block"
import { createCommentsPlugin, MARK_COMMENT } from "@udecode/plate-comments"
import {
  createPlugins,
  PlateLeaf,
  RenderAfterEditable,
} from "@udecode/plate-common"
import { createDndPlugin } from "@udecode/plate-dnd"
import { createEmojiPlugin } from "@udecode/plate-emoji"
import {
  createExcalidrawPlugin,
  ELEMENT_EXCALIDRAW,
} from "@udecode/plate-excalidraw"
import {
  createFontBackgroundColorPlugin,
  createFontColorPlugin,
  createFontSizePlugin,
} from "@udecode/plate-font"
import {
  createHeadingPlugin,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
} from "@udecode/plate-heading"
import { createHighlightPlugin, MARK_HIGHLIGHT } from "@udecode/plate-highlight"
import {
  createHorizontalRulePlugin,
  ELEMENT_HR,
} from "@udecode/plate-horizontal-rule"
import { createIndentPlugin } from "@udecode/plate-indent"
import { createIndentListPlugin } from "@udecode/plate-indent-list"
import { createJuicePlugin } from "@udecode/plate-juice"
import { createKbdPlugin, MARK_KBD } from "@udecode/plate-kbd"
import {
  createColumnPlugin,
  ELEMENT_COLUMN,
  ELEMENT_COLUMN_GROUP,
} from "@udecode/plate-layout"
import { createLineHeightPlugin } from "@udecode/plate-line-height"
import { createLinkPlugin, ELEMENT_LINK } from "@udecode/plate-link"
import { createTodoListPlugin, ELEMENT_TODO_LI } from "@udecode/plate-list"
import {
  createImagePlugin,
  createMediaEmbedPlugin,
  ELEMENT_IMAGE,
  ELEMENT_MEDIA_EMBED,
} from "@udecode/plate-media"
import { createNodeIdPlugin } from "@udecode/plate-node-id"
import {
  createParagraphPlugin,
  ELEMENT_PARAGRAPH,
} from "@udecode/plate-paragraph"
import { createResetNodePlugin } from "@udecode/plate-reset-node"
import { createDeletePlugin } from "@udecode/plate-select"
import { createBlockSelectionPlugin } from "@udecode/plate-selection"
import { createDeserializeCsvPlugin } from "@udecode/plate-serializer-csv"
import { createDeserializeDocxPlugin } from "@udecode/plate-serializer-docx"
import { createDeserializeMdPlugin } from "@udecode/plate-serializer-md"
import { createTabbablePlugin } from "@udecode/plate-tabbable"
import {
  createTablePlugin,
  ELEMENT_TABLE,
  ELEMENT_TD,
  ELEMENT_TH,
  ELEMENT_TR,
} from "@udecode/plate-table"
import { createTogglePlugin, ELEMENT_TOGGLE } from "@udecode/plate-toggle"
import { createTrailingBlockPlugin } from "@udecode/plate-trailing-block"

import { BlockquoteElement } from "@/components/editor/ui/BlockquoteElement"
import { Prism } from "@/components/editor/ui/code/CodeBlockCombobox"
import { CodeBlockElement } from "@/components/editor/ui/code/CodeBlockElement"
import { CodeLeaf } from "@/components/editor/ui/code/CodeLeaf"
import { CodeLineElement } from "@/components/editor/ui/code/CodeLineElement"
import { CodeSyntaxLeaf } from "@/components/editor/ui/code/CodeSyntaxLeaf"
import { CommentLeaf } from "@/components/editor/ui/comments/CommentLeaf"
import { withDraggables } from "@/components/editor/ui/drag/withDraggables"
import { ExcalidrawElement } from "@/components/editor/ui/ExcalidrawElement"
import { HeadingElement } from "@/components/editor/ui/HeadingElement"
import { HighlightLeaf } from "@/components/editor/ui/HighlightLeaf"
import { HrElement } from "@/components/editor/ui/HrElement"
import { ImageElement } from "@/components/editor/ui/ImageElement"
import { KbdLeaf } from "@/components/editor/ui/KbdLeaf"
import { LinkElement } from "@/components/editor/ui/LinkElement"
import { MediaEmbedElement } from "@/components/editor/ui/MediaEmbedElement"
import { ParagraphElement } from "@/components/editor/ui/ParagraphElement"
import { withPlaceholders } from "@/components/editor/ui/Placeholder"
import { ColumnElement } from "@/components/editor/ui/tables/ColumnElement"
import { ColumnGroupElement } from "@/components/editor/ui/tables/ColumnGroupElement"
import {
  TableCellElement,
  TableCellHeaderElement,
} from "@/components/editor/ui/tables/TableCellElement"
import { TableElement } from "@/components/editor/ui/tables/TableElement"
import { TableRowElement } from "@/components/editor/ui/tables/TableRowElement"
import { TodoListElement } from "@/components/editor/ui/TodoListElement"
import { ToggleElement } from "@/components/editor/ui/ToggleElement"

import { autoformatPlugin } from "../rules"
import { LinkFloatingToolbar } from "../ui/toolbars/LinkFloatingToolbar"
import { alignPlugin } from "./align"
import { captionPlugin } from "./caption"
import { exitBreakPlugin } from "./exitBreak"
import { indentPlugin } from "./indent"
import { indentListPlugin } from "./indentList"
import { lineHeightPlugin } from "./lineHeight"
import { softBreakPlugin } from "./softBreak"

export const plugins = createPlugins(
  [
    createBlockquotePlugin(),
    createCodeBlockPlugin({
      options: {
        prism: Prism,
      },
    }),
    createHorizontalRulePlugin(),
    createLinkPlugin({
      renderAfterEditable: LinkFloatingToolbar as RenderAfterEditable,
    }),
    createImagePlugin(),
    createCaptionPlugin(captionPlugin),
    createExcalidrawPlugin(),
    createTogglePlugin(),
    createColumnPlugin(),
    createParagraphPlugin(),
    createHeadingPlugin(),
    createMediaEmbedPlugin(),
    createTablePlugin(),
    createTodoListPlugin(),
    createBoldPlugin(),
    createItalicPlugin(),
    createUnderlinePlugin(),
    createStrikethroughPlugin(),
    createCodePlugin(),
    createSubscriptPlugin(),
    createSuperscriptPlugin(),
    createFontColorPlugin(),
    createFontBackgroundColorPlugin(),
    createFontSizePlugin(),
    createHighlightPlugin(),
    createKbdPlugin(),
    createAlignPlugin(alignPlugin),
    createIndentPlugin(indentPlugin),
    createIndentListPlugin(indentListPlugin),
    createLineHeightPlugin(lineHeightPlugin),
    createBlockSelectionPlugin({
      options: {
        sizes: {
          top: 0,
          bottom: 0,
        },
      },
    }),
    createDndPlugin({
      options: { enableScroller: true },
    }),
    createEmojiPlugin(),
    createExitBreakPlugin(exitBreakPlugin),
    createNodeIdPlugin(),
    createResetNodePlugin({
      options: {
        rules: [
          // Usage: https://platejs.org/docs/reset-node
        ],
      },
    }),
    createDeletePlugin(),
    createSoftBreakPlugin(softBreakPlugin),
    createTabbablePlugin(),
    createTrailingBlockPlugin({
      options: { type: ELEMENT_PARAGRAPH },
    }),
    createCommentsPlugin(),
    createAutoformatPlugin(autoformatPlugin),
    createDeserializeDocxPlugin(),
    createDeserializeCsvPlugin(),
    createDeserializeMdPlugin(),
    createJuicePlugin(),
  ],
  {
    components: withDraggables(
      withPlaceholders({
        [ELEMENT_BLOCKQUOTE]: BlockquoteElement,
        [ELEMENT_CODE_BLOCK]: CodeBlockElement,
        [ELEMENT_CODE_LINE]: CodeLineElement,
        [ELEMENT_CODE_SYNTAX]: CodeSyntaxLeaf,
        [ELEMENT_EXCALIDRAW]: ExcalidrawElement,
        [ELEMENT_HR]: HrElement,
        [ELEMENT_IMAGE]: ImageElement,
        [ELEMENT_LINK]: LinkElement,
        [ELEMENT_TOGGLE]: ToggleElement,
        [ELEMENT_COLUMN_GROUP]: ColumnGroupElement,
        [ELEMENT_COLUMN]: ColumnElement,
        [ELEMENT_H1]: withProps(HeadingElement, { variant: "h1" }),
        [ELEMENT_H2]: withProps(HeadingElement, { variant: "h2" }),
        [ELEMENT_H3]: withProps(HeadingElement, { variant: "h3" }),
        [ELEMENT_H4]: withProps(HeadingElement, { variant: "h4" }),
        [ELEMENT_H5]: withProps(HeadingElement, { variant: "h5" }),
        [ELEMENT_H6]: withProps(HeadingElement, { variant: "h6" }),
        [ELEMENT_MEDIA_EMBED]: MediaEmbedElement,
        [ELEMENT_PARAGRAPH]: ParagraphElement,
        [ELEMENT_TABLE]: TableElement,
        [ELEMENT_TR]: TableRowElement,
        [ELEMENT_TD]: TableCellElement,
        [ELEMENT_TH]: TableCellHeaderElement,
        [ELEMENT_TODO_LI]: TodoListElement,
        [MARK_BOLD]: withProps(PlateLeaf, { as: "strong" }),
        [MARK_CODE]: CodeLeaf,
        [MARK_COMMENT]: CommentLeaf,
        [MARK_HIGHLIGHT]: HighlightLeaf,
        [MARK_ITALIC]: withProps(PlateLeaf, { as: "em" }),
        [MARK_KBD]: KbdLeaf,
        [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: "s" }),
        [MARK_SUBSCRIPT]: withProps(PlateLeaf, { as: "sub" }),
        [MARK_SUPERSCRIPT]: withProps(PlateLeaf, { as: "sup" }),
        [MARK_UNDERLINE]: withProps(PlateLeaf, { as: "u" }),
      })
    ),
  }
)
