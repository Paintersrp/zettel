import { lazy, Suspense } from "react"

import "easymde/dist/easymde.min.css"

interface EditProps {
  value: string
  onChange: any
}

const Edit: React.FC<EditProps> = ({ value, onChange }) => (
  <div
    id="edit-view"
    className="flex-col opacity-1 relative transition-opacity duration-200"
  >
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col md:w-full">
        <div id="js-editor" className="rounded bg-page w-full dark">
          <SimpleMDELoader value={value} onChange={onChange} />{" "}
        </div>
      </div>
    </div>
  </div>
)

const SimpleMDELazy = lazy(() => import("react-simplemde-editor"))

const SimpleMDELoader: React.FC<any> = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <SimpleMDELazy {...props} />
  </Suspense>
)

export default SimpleMDELoader

export { Edit }
