import { ButtonHTMLAttributes, forwardRef } from "react"
import { useRouter } from "@tanstack/react-router"

import { cn } from "@/lib/utils"

import { ArrowLeftIcon } from "./icons"

export interface BackButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

const BackButton = forwardRef<HTMLButtonElement, BackButtonProps>(
  ({ className, ...props }, ref) => {
    const router = useRouter()
    const onBack = () => router.history.back()

    return (
      <button
        className={cn(
          "btn-primary bg-page text-primary hover:bg-contrast px-1 py-1 text-sm rounded",
          className
        )}
        ref={ref}
        onClick={onBack}
        {...props}
      >
        <span className="size-6 text-primary">
          <ArrowLeftIcon />
        </span>
      </button>
    )
  }
)

BackButton.displayName = "Button"

export default BackButton
