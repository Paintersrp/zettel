export interface User {
  id: number
  username: string
  email: string
  role_name: string
  vaults: Vault[]
}

export interface Vault {
  id: number
  name: string
}

export type PgTypeInt4 = {
  Int32: number
  Valid: boolean
}

export interface VaultWithNotes {
  id: number
  name: string
  commit: string
  created_at: Date
  updated_at: Date
  user_id: number
  notes: NoteWithDetails[]
}

export interface NoteWithDetails {
  id: number
  title: string
  userId: PgTypeInt4
  vaultId: PgTypeInt4
  upstream: number
  content: string
  created_at: Date
  updated_at: Date
  tags: Tag[]
  linkedNotes: LinkedNote[]
}

export type Tag = {
  id: number
  name: string
}

export type LinkedNote = {
  id: number
  title: string
}
