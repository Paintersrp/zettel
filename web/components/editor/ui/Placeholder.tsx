import { Children, cloneElement } from "react"
import {
  createNodeHOC,
  createNodesHOC,
  usePlaceholderState,
  type PlaceholderProps,
} from "@udecode/plate-common"
import { ELEMENT_H1 } from "@udecode/plate-heading"
import { ELEMENT_LI, ELEMENT_OL } from "@udecode/plate-list"
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph"

import { cn } from "@/utils/cn"

export const Placeholder = (props: PlaceholderProps) => {
  const { children, nodeProps, placeholder } = props

  const { enabled } = usePlaceholderState(props)

  return Children.map(children, (child) => {
    return cloneElement(child, {
      className: child.props.className,
      nodeProps: {
        ...nodeProps,
        className: cn(
          enabled &&
            "before:absolute before:cursor-text before:opacity-30 before:content-[attr(placeholder)]"
        ),
        placeholder,
      },
    })
  })
}

export const withPlaceholder = createNodeHOC(Placeholder)

export const withPlaceholdersPrimitive = createNodesHOC(Placeholder)

export const withPlaceholders = (components: any) =>
  withPlaceholdersPrimitive(components, [
    {
      hideOnBlur: true,
      key: ELEMENT_PARAGRAPH,
      placeholder: "Type a paragraph",
      query: {
        maxLevel: 1,
      },
    },
    {
      hideOnBlur: true,
      key: ELEMENT_LI,
      placeholder: "Type an item",
    },

    {
      hideOnBlur: false,
      key: ELEMENT_H1,
      placeholder: "Untitled",
    },
  ])
