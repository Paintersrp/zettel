"use client"

import { FC } from "react"
import Link from "next/link"
import { SquareArrowUpRight } from "lucide-react"

import { cn } from "@/utils/cn"
import { buttonVariants } from "@/components/ui/button/variants"
import { useAuth } from "@/components/auth/provider"

interface WebHeaderAppButtonProps {}

export const WebHeaderAppButton: FC<WebHeaderAppButtonProps> = () => {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  return (
    <Link
      href="/app"
      className={cn(
        buttonVariants({
          variant: "ghost",
          size: "xs",
        }),
        "bg-card hover:bg-background/20 border"
      )}
    >
      <span className="text-xs">Go to App</span>
      <SquareArrowUpRight className="size-4 text-primary ml-2" />
    </Link>
  )
}

export default WebHeaderAppButton
