import {
  autoformatArrow,
  autoformatLegal,
  autoformatLegalHtml,
  autoformatMath,
  autoformatPunctuation,
  autoformatSmartQuotes,
  type AutoformatRule,
} from "@udecode/plate-autoformat"
import type { AutoformatPlugin } from "@udecode/plate-autoformat"
import type { PlatePlugin } from "@udecode/plate-common"

import { autoformatBlocks } from "./blocks"
import { autoformatIndentLists } from "./indentList"
import { autoformatMarks } from "./marks"

export const autoformatRules: AutoformatRule[] = [
  ...autoformatBlocks,
  ...autoformatMarks,
  ...autoformatSmartQuotes,
  ...autoformatPunctuation,
  ...autoformatLegal,
  ...autoformatLegalHtml,
  ...autoformatArrow,
  ...autoformatMath,
]

export const autoformatPlugin: Partial<PlatePlugin<AutoformatPlugin>> = {
  options: {
    enableUndoOnDelete: true,
    rules: [...autoformatRules, ...autoformatIndentLists] as any,
  },
}
