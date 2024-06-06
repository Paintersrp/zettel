export interface User {
  id: number
  username: string
  email: string
  role_name: string
  preferred_name: string
  bio: string
  onboarding: boolean
  onboarding_from: string
  verification_status: string
  verification_email: string
  active_vault_id: number
  vaults: Vault[]
  active_vault?: Vault
}

export interface Vault {
  id: number
  name: string
}

export type PgTypeInt4 = {
  Int32: number
  Valid: boolean
}

export interface VaultAndNotes {
  vault: {
    id: number
    name: string
    commit: string
    created_at: Date
    updated_at: Date
    user_id: number
  }
  notes: NoteWithDetails[]
  has_more: boolean
}

export type VaultResponse = {
  data: VaultAndNotes
  nextPage: number | null
  prevPage: number | null
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
