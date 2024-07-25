"use client"

import { useEffect, useState } from "react"
import { cn } from "@/utils/cn"
import { ChevronUp } from "lucide-react"

import { Button } from "./ui/button/Button"

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <Button
      id="back-to-top"
      size="iconXs"
      className={cn(
        "fixed bottom-4 right-4 rounded z-50",
        !isVisible && "hidden"
      )}
      onClick={scrollToTop}
    >
      <ChevronUp className="size-5" />
    </Button>
  )
}

export default ScrollToTop
