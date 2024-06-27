import { useCallback, useEffect, useRef, useState } from "react"

type UseIntersectionOptions = {
  root?: Element | Document | null
  rootMargin?: string
  threshold?: number | number[]
  onIntersect?: (entry: IntersectionObserverEntry) => void
  unobserveOnIntersect?: boolean
}

export const useIntersection = (options?: UseIntersectionOptions) => {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const observer = useRef<IntersectionObserver | null>(null)
  const onIntersectRef = useRef(options?.onIntersect)

  // Update the ref when onIntersect changes
  useEffect(() => {
    onIntersectRef.current = options?.onIntersect
  }, [options?.onIntersect])

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
        if (_entry.isIntersecting && onIntersectRef.current) {
          onIntersectRef.current(_entry)
          if (options?.unobserveOnIntersect && observer.current) {
            observer.current.unobserve(_entry.target)
          }
        }
      }, options)

      observer.current.observe(element)
    },
    [
      options?.rootMargin,
      options?.root,
      options?.threshold,
      options?.unobserveOnIntersect,
    ]
  )

  return { ref, entry }
}

export default useIntersection
