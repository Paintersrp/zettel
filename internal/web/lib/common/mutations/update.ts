"use server"

import "server-only"

import { fetch } from "@/utils/fetch"

import { ObjectType, typeMap } from "../typeMap"

export interface UpdateRequest<T> {
  id: number
  type: ObjectType
  payload: Partial<T>
}

export interface UpdateResponse<T> {
  data: T
  rep: string
}

const updateMutation = async <T, R>({
  id,
  type,
  payload,
}: UpdateRequest<T>): Promise<UpdateResponse<R>> => {
  const { endpoint, rep } = typeMap[type]

  const response = await fetch(`/v1/api/${endpoint}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data: R = await response.json()
  return { data, rep }
}

export { updateMutation }
