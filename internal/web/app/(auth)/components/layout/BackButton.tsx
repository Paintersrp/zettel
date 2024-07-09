"use client"

import { ButtonHTMLAttributes, forwardRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/Button"

export interface BackButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const BackButton = forwardRef<HTMLButtonElement, BackButtonProps>(
  ({ className, ...props }, ref) => {
    const router = useRouter()
    const onBack = () => router.back()

    return (
      <Button
        variant="ghost"
        size="iconSm"
        className="bg-background hover:bg-card"
        ref={ref}
        onClick={onBack}
        {...props}
      >
        <ArrowLeft className="size-6 text-primary" />
      </Button>
    )
  }
)

BackButton.displayName = "Button"

export default BackButton
