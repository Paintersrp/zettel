"use server"

import "server-only"

import { fetch } from "@/utils/fetch"

import { ObjectType, typeMap } from "../typeMap"

export interface PostRequest<T> {
  type: ObjectType
  payload: T
}

export interface PostResponse<T> {
  data: T
  rep: string
}

const postMutation = async <T, R>({
  type,
  payload,
}: PostRequest<T>): Promise<PostResponse<R>> => {
  const { endpoint, rep } = typeMap[type]

  const response = await fetch(`/v1/api/${endpoint}`, {
    method: "POST",
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

export { postMutation }
