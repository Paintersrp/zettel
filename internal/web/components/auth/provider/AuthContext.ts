"use client"

import { createContext } from "react"

import type { User } from "@/types/app"

export interface AuthContext {
  user: User | null
  isOnboarding: boolean
}

export const AuthContext = createContext<AuthContext | null>(null)
