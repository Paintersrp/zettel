import { lazy, Suspense, useEffect, useState } from "react"
import { useRouterState } from "@tanstack/react-router"
import { SendHorizonalIcon } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Loading } from "@/components/Loading"
import { NoteEditMenu } from "@/features/app/note-edit/components/NoteEditMenu"
import { useGetNoteQuery } from "@/features/app/note/api/getNote"
import { NoteTitle } from "@/features/app/note/components/NoteTitle"

import { noteEditRoute } from "."

const SimpleMDE = lazy(() => import("react-simplemde-editor"))

const NoteEdit = () => {
  const { note } = useRouterState({
    select: (s) => s.location.state,
  })

  const { id } = noteEditRoute.useParams()
  const noteQuery = useGetNoteQuery({ id, note })

  const displayNote = note || noteQuery.data
  const [value, setValue] = useState(displayNote?.content ?? "")

  useEffect(() => {
    if (displayNote) {
      setValue(displayNote.content ?? "")
    }
  }, [displayNote])

  const onChange = (value: string) => {
    setValue(value)
  }

  // TODO: Refetch data on Confirm
  const onConfirm = () => {
    console.log("Updated content:", value)
  }

  if (!note && noteQuery.isLoading) {
    return (
      <div className="w-full">
        <Loading />
      </div>
    )
  }

  if (!displayNote) {
    return <div>Note not found</div>
  }

  return (
    <div className="w-full">
      <NoteTitle
        note={displayNote}
        menu={<NoteEditMenu note={displayNote} />}
      />
      <div className="w-full flex flex-col md:flex-row gap-4 rounded">
        <div className="w-full pb-4">
          <div
            id="edit-view"
            className="flex-col opacity-1 relative transition-opacity duration-200"
          >
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col md:w-full">
                <div id="js-editor" className="rounded bg-page w-full dark">
                  <Suspense fallback={<Loading />}>
                    <SimpleMDE value={value} onChange={onChange} />
                  </Suspense>
                </div>
                <div className="flex justify-center">
                  <Button
                    variant="success"
                    size="sm"
                    className="min-w-[70px] gap-2 text-sm"
                    onClick={onConfirm}
                  >
                    Submit
                    <SendHorizonalIcon className="w-[18px] h-[18px]" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteEdit
