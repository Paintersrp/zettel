import { ChangeEventHandler, useCallback } from "react"

import { Input } from "@/components/ui/form/Input"

import { useTitle } from "./useTitle"

export const TitleInput = () => {
  const { title, setTitle } = useTitle()

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setTitle(event.target.value ?? "Untitled")
    },
    [setTitle]
  )

  return (
    <div className="w-full pt-2 pb-0 px-3 bg-card">
      <Input
        variant="ghost"
        placeholder="Untitled"
        className="text-4xl font-bold bg-card text-foreground placeholder:text-foreground"
        value={title}
        onChange={onChange}
      />
    </div>
  )
}

export default TitleInput
