import React from "react"

import { useMediaQuery } from "@/hooks/useMediaQuery"

interface ReactiveMenuProps {
  dropdown: React.ReactNode
  drawer: React.ReactNode
}

const ReactiveMenu: React.FC<ReactiveMenuProps> = ({ dropdown, drawer }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return dropdown
  }

  return drawer
}

export default ReactiveMenu
