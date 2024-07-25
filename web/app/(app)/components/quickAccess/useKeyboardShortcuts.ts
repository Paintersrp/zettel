import { useCallback, useEffect } from "react"

import { type QuickAccessStore } from "./useQuickAccess"

interface UseKeyboardShortcutsProps {
  onNoteCreateNavigate: () => void
  onProfileNavigate: () => void
  onSSHNavigate: () => void
  onNotesNavigate: () => void
  onVaultsNavigate: () => void
  onSelectCreateVault: () => void
  quickAccess: QuickAccessStore
}

export const useKeyboardShortcuts = ({
  onNoteCreateNavigate,
  onProfileNavigate,
  onSSHNavigate,
  onNotesNavigate,
  onVaultsNavigate,
  onSelectCreateVault,
  quickAccess,
}: UseKeyboardShortcutsProps) => {
  const openMenuDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === " " && (e.metaKey || e.altKey)) {
        e.preventDefault()
        quickAccess.setOpen(!quickAccess.open)
      }
    },
    [quickAccess]
  )

  const openCreateVaultDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "y" && (e.metaKey || e.altKey)) {
        e.preventDefault()
        onSelectCreateVault()
      }
    },
    [onSelectCreateVault]
  )

  const openCreateNoteDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "m" && (e.metaKey || e.altKey)) {
        e.preventDefault()
        onNoteCreateNavigate()
      }
    },
    [onNoteCreateNavigate]
  )

  const openProfileDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "p" && (e.metaKey || e.altKey)) {
        e.preventDefault()
        onProfileNavigate()
      }
    },
    [onProfileNavigate]
  )

  const openSSHDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "s" && (e.metaKey || e.altKey)) {
        e.preventDefault()
        onSSHNavigate()
      }
    },
    [onSSHNavigate]
  )

  const openNotesDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "n" && (e.metaKey || e.altKey)) {
        e.preventDefault()
        onNotesNavigate()
      }
    },
    [onNotesNavigate]
  )

  const openVaultsDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "v" && (e.metaKey || e.altKey)) {
        e.preventDefault()
        onVaultsNavigate()
      }
    },
    [onVaultsNavigate]
  )

  useEffect(() => {
    document.addEventListener("keydown", openMenuDown)
    document.addEventListener("keydown", openProfileDown)
    document.addEventListener("keydown", openSSHDown)
    document.addEventListener("keydown", openNotesDown)
    document.addEventListener("keydown", openVaultsDown)
    document.addEventListener("keydown", openCreateVaultDown)
    document.addEventListener("keydown", openCreateNoteDown)

    return () => {
      document.removeEventListener("keydown", openMenuDown)
      document.removeEventListener("keydown", openProfileDown)
      document.removeEventListener("keydown", openSSHDown)
      document.removeEventListener("keydown", openNotesDown)
      document.removeEventListener("keydown", openVaultsDown)
      document.removeEventListener("keydown", openCreateVaultDown)
      document.removeEventListener("keydown", openCreateNoteDown)
    }
  }, [
    openMenuDown,
    openProfileDown,
    openSSHDown,
    openNotesDown,
    openVaultsDown,
    openCreateVaultDown,
    openCreateNoteDown,
  ])
}
