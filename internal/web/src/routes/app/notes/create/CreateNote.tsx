import { loadingLazy } from "@/lib/lazy"

const Editor = loadingLazy(() =>
  import("@/components/Editor").then((module) => ({
    default: module.Editor,
  }))
)

const CreateNote = () => {
  return (
    <div className="flex w-full">
      <Editor />
    </div>
  )
}

export default CreateNote
