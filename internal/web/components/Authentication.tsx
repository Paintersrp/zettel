"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { useAuth } from "./auth/provider"

export const Authentication = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user === null) {
      router.push("/login")
    }
  }, [user, router])

  return <>{children}</>
}
