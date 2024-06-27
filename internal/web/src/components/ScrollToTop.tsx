import { useEffect, useState } from "react"
import { ArrowUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "./ui/Button"

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
      className={cn("fixed bottom-4 right-4 rounded", !isVisible && "hidden")}
      onClick={scrollToTop}
    >
      <ArrowUpIcon className="size-5" />
    </Button>
  )
}

export default ScrollToTop
