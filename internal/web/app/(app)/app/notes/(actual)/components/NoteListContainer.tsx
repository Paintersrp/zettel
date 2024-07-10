"use client"

import { useCallback, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import type { NoteWithDetails } from "@/types/app"
import { useIntersection } from "@/hooks/useIntersection"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { useAuth } from "@/components/auth/provider"
import { useGetNotesInfQuery } from "@/app/(app)/lib/useGetNotesInf"
import { useSidePanel } from "@/app/(app)/state/sidePanel"

import NoteList from "./NoteList"
import { NoteListSkeleton } from "./NoteListSkeleton"

const NoteListContainer = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const filter = searchParams.get("filter") ?? "all"
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const sidePanel = useSidePanel()
  const { user } = useAuth()

  if (!user?.active_vault) {
    return null
  }

  const vaultId = user.active_vault
  const notesInfQuery = useGetNotesInfQuery({
    id: vaultId,
    filter,
    max: 10,
  })

  // const handleNoteClick = useCallback(
  //   (note: NoteWithDetails) => {
  //     if (isDesktop) {
  //       sidePanel.openPanel("preview", note.id.toString(), { note })
  //     } else {
  //       router.push(`/app/notes/${note.id}`)
  //     }
  //   },
  //   [sidePanel.openPanel, isDesktop]
  // )

  const handleIntersection = useCallback(() => {
    if (!notesInfQuery.isFetching) {
      notesInfQuery.fetchNextPage()
    }
  }, [notesInfQuery])

  const intersection = useIntersection({
    root: null,
    threshold: 0.2,
    onIntersect: handleIntersection,
  })

  const notes = useMemo(
    () => notesInfQuery.data?.pages.flatMap((page) => page.data.notes) ?? [],
    [notesInfQuery.data?.pages]
  )

  if (
    !notes ||
    notes.length === 0 ||
    notesInfQuery.isLoading ||
    notesInfQuery.isRefetching
  ) {
    return <NoteListSkeleton />
  }

  return (
    <NoteList
      query={notesInfQuery}
      notes={notes}
      filter={filter}
      ref={intersection.ref}
    />
  )
}

export default NoteListContainer
