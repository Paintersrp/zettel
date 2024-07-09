"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export const useScrollAreaScrollToTop = (threshold: number = 200) => {
  const [isOverThreshold, setIsOverThreshold] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback(() => {
    if (scrollAreaRef.current) {
      const { scrollTop } = scrollAreaRef.current
      setIsOverThreshold(scrollTop > threshold)
    }
  }, [])

  useEffect(() => {
    const viewport = scrollAreaRef.current
    if (viewport) {
      viewport.addEventListener("scroll", handleScroll)
      return () => viewport.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  const scrollToTop = () => {
    scrollAreaRef.current?.scrollTo({ top: 0, behavior: "smooth" })
  }

  return { scrollToTop, isOverThreshold, scrollAreaRef }
}
