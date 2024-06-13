import { type FC } from "react"
import { Settings } from "lucide-react"

interface SourceProps {}

const Source: FC<SourceProps> = () => {
  return (
    <div className="w-full flex h-full">
      <div className="relative flex flex-col justify-center items-center w-full h-full px-8">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-4">
            <Settings className="text-primary animate-spin-slow size-16" />
          </div>
          <h1 className="text-4xl font-bold">Work In Progress</h1>
          <p className="text-lg text-muted text-center">
            This page is currently under construction. Please check back later.
          </p>
          <img className="mt-4" src="/norules.gif" />
        </div>
      </div>
    </div>
  )
}

export default Source
