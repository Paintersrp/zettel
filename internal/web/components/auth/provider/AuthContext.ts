"use client"

import { createContext } from "react"

import type { UserSession } from "@/types/app"

export interface AuthContext {
  user: UserSession | null
  isOnboarding: boolean
}

export const AuthContext = createContext<AuthContext | null>(null)
