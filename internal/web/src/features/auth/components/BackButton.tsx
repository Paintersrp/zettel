import { ButtonHTMLAttributes, forwardRef } from "react"
import { useRouter } from "@tanstack/react-router"
import { ArrowLeft } from "lucide-react"

import { cn } from "@/lib/utils"

export interface BackButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const BackButton = forwardRef<HTMLButtonElement, BackButtonProps>(
  ({ className, ...props }, ref) => {
    const router = useRouter()
    const onBack = () => router.history.back()

    return (
      <button
        className={cn(
          "btn-primary bg-background text-primary hover:bg-card px-1 py-1 text-sm rounded",
          className
        )}
        ref={ref}
        onClick={onBack}
        {...props}
      >
        <ArrowLeft className="size-6 text-primary" />
      </button>
    )
  }
)

BackButton.displayName = "Button"

export default BackButton
