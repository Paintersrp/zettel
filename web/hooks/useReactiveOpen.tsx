"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export const useReactiveOpen = () => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return { open, setOpen }
}
