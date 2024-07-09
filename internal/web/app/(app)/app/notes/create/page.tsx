import { Suspense } from "react"

import { Heading } from "@/components/Heading"
import { Loading } from "@/components/Loading"

import EditorContainer from "./components/EditorContainer"

const CreateNote = () => {
  return (
    <div className="flex flex-col h-full w-full bg-accent">
      <div>
        <Heading
          title="Create Note"
          description="Add a new note to your vault"
          className="px-4 py-2 border-b"
        />
      </div>
      {/* TODO Separate Toolbar Skeleton / Editor Skeleton */}
      <Suspense fallback={<Loading />}>
        <EditorContainer />
      </Suspense>
    </div>
  )
}

export default CreateNote
