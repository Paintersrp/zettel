import SimpleMDE from "react-simplemde-editor"

interface NoteEditProps {
  value: string
  onChange: any
}

const NoteEdit: React.FC<NoteEditProps> = ({ value, onChange }) => (
  <div
    id="edit-view"
    className="flex-col opacity-1 relative transition-opacity duration-200"
  >
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col md:w-full">
        <div id="js-editor" className="rounded bg-page w-full dark">
          <SimpleMDE value={value} onChange={onChange} />
        </div>
      </div>
    </div>
  </div>
)

export { NoteEdit }
