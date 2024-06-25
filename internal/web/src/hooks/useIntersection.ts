import { useCallback, useRef, useState } from "react"

type IntersectionObserverOptions = {
  root?: Element | Document | null | undefined
  rootMargin?: string
  threshold?: number | number[]
}

export const useIntersection = (options?: IntersectionObserverOptions) => {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const observer = useRef<IntersectionObserver | null>(null)

  const ref = useCallback(
    (element: HTMLElement | null) => {
      if (observer.current) {
        observer.current.disconnect()
        observer.current = null
      }

      if (element === null) {
        setEntry(null)
        return
      }

      observer.current = new IntersectionObserver(([_entry]) => {
        setEntry(_entry)
      }, options)

      observer.current.observe(element)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options?.rootMargin, options?.root, options?.threshold]
  )

  return { ref, entry }
}

export default useIntersection
