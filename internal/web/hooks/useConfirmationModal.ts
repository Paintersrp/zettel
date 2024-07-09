import { useCallback } from "react"

import { useReactiveOpen } from "./useReactiveOpen"

export const useConfirmationModal = () => {
  const { open, setOpen } = useReactiveOpen()

  const onOpen = useCallback(() => {
    setOpen(true)
  }, [setOpen])

  const onClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  return { open, setOpen, onOpen, onClose }
}
