"use server"

import "server-only"

import type { Vault } from "@/types/app"
import { fetch } from "@/utils/fetch"

const getVaults = async (): Promise<Vault[]> => {
  try {
    const response = await fetch(`/v1/api/vaults`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data: Vault[] = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching vault:", error)
    throw new Error("Failed to fetch vault")
  }
}

export { getVaults }
