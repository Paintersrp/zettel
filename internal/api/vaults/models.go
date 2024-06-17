package vaults

import "github.com/Paintersrp/zettel/internal/db"

type VaultCreatePayload struct {
	Name   string `json:"name"    validate:"required"`
	UserID int32  `json:"user_id" validate:"required"`
	Commit string `json:"commit"`
}

type VaultUpdatePayload struct {
	Name   string `json:"name"   validate:"required"`
	Commit string `json:"commit" validate:"required"`
}

type VaultWithNotesResponse struct {
	Vault   db.Vault                  `json:"vault"`
	Notes   []db.GetPaginatedNotesRow `json:"notes"`
	HasMore bool                      `json:"has_more"`
	Count   int64                     `json:"count"`
}
