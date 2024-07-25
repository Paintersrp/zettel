import { useCallback } from "react"

import { useReactiveOpen } from "@/hooks/useReactiveOpen"

export const useConfirmModal = () => {
  const { open, setOpen } = useReactiveOpen()

  const onOpen = useCallback(() => {
    setOpen(true)
  }, [setOpen])

  const onClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  return { open, setOpen, onOpen, onClose }
}
