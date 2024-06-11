import { useEffect, useState } from "react"
import { useRouter } from "@tanstack/react-router"

export const useReactiveOpen = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [router.state.location])

  return { open, setOpen }
}
