import { Loading } from "@/components/Loading"

import { NoteTitleSkeleton } from "../(actual)/components/NoteTitleSkeleton"

const NoteEditLoading = async () => {
  return (
    <div className="w-full max-w-full">
      <NoteTitleSkeleton />
      <div className="w-full flex flex-col md:flex-row gap-4 flex-grow">
        <Loading />
      </div>
    </div>
  )
}

export default NoteEditLoading
