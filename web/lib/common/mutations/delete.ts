"use server"

import "server-only"

import { fetch } from "@/utils/fetch"

import { ObjectType, typeMap } from "../typeMap"

export interface DeleteRequest {
  id: number
  type: ObjectType
}

export interface DeleteResponse {
  id: number
  rep: string
}

const deleteMutation = async ({
  id,
  type,
}: DeleteRequest): Promise<DeleteResponse> => {
  const { endpoint, rep } = typeMap[type]
  const response = await fetch(`/v1/api/${endpoint}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (response.status !== 204) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return { id, rep }
}

export { deleteMutation }
