import type { DefaultOptions } from "@tanstack/react-query"

export const defaultQueryConfig = {
  queries: {
    staleTime: 1000 * 60,
  },
} satisfies DefaultOptions
