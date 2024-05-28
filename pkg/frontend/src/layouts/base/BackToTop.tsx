import { useEffect, useState } from "react"

import { ArrowUpIcon } from "@/components/icons"

const BackToTop = () => {
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
    <button
      id="back-to-top"
      className={`fixed bottom-4 right-4 btn-primary px-1 py-1 rounded ${
        isVisible ? "" : "hidden"
      }`}
      onClick={scrollToTop}
    >
      <span className="size-6 flex">
        <ArrowUpIcon />
      </span>
    </button>
  )
}

export default BackToTop
