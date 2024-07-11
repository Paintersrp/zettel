import "server-only"

export const typeMap = {
  notes: { endpoint: "notes", rep: "Note" },
  vaults: { endpoint: "vaults", rep: "Vault" },
  keys: { endpoint: "keys", rep: "Key" },
  providers: { endpoint: "providers", rep: "Provider" },
} as const

type TypeMap = typeof typeMap
export type ObjectType = (typeof typeMap)[keyof TypeMap]["endpoint"]
