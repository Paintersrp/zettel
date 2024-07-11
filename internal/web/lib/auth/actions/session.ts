"use server"

import "server-only"

import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

import { UserSession } from "@/types/app"

export const getSession = async (): Promise<UserSession | null> => {
  const requestCookies = cookies()
  const jwtToken = requestCookies.get("jwt")

  if (!jwtToken) {
    return null
  }

  try {
    const decodedToken = jwt.verify(
      jwtToken.value,
      process.env.JWT_SECRET!
    ) as jwt.JwtPayload & UserSession

    return decodedToken
  } catch (error) {
    console.error("Error decoding user token:", error)
    return null
  }
}
