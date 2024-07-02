import { useCallback, useMemo } from "react"

import { useIntersection } from "@/hooks/useIntersection"

import { ScrollArea } from "@/components/ui/ScrollArea"
import { useGetNotesInfQuery } from "@/features/app/notes/api/getNotesInf"
import { NoteListMobile } from "@/features/app/notes/components/NoteListMobile"
import { useAuth } from "@/features/auth/providers"

export const NotesPanel = () => {
  const { user } = useAuth()

  if (!user?.active_vault) {
    return null
  }

  const { id: vaultId } = user.active_vault

  const notesInfQuery = useGetNotesInfQuery({
    id: vaultId,
    filter: "all",
    max: 10,
  })

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

  return (
    <div className="flex flex-col w-full py-2 sm:py-0">
      <ScrollArea className="h-[800px] py-2 mb-4 md:py-0 md:mb-0">
        <NoteListMobile
          query={notesInfQuery}
          notes={notes}
          ref={intersection.ref}
        />
      </ScrollArea>
    </div>
  )
}

export default NotesPanel
