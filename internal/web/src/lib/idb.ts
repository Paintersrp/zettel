import { del, get, set } from "idb-keyval"

export const IDBStorage = {
  getItem: async (name: string) => {
    if (typeof indexedDB === "undefined") {
      return null
    }

    const value = await get(name)

    return value || null
  },
  setItem: async (name: string, value: any) => {
    if (typeof indexedDB === "undefined") {
      return
    }

    set(name, value)
  },
  removeItem: async (name: string) => {
    if (typeof indexedDB === "undefined") {
      return
    }

    del(name)
  },
}
