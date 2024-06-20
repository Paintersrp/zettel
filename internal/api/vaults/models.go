package vaults

import "github.com/Paintersrp/zettel/internal/db"

type VaultCreatePayload struct {
	Name        string `json:"name"        validate:"required"`
	Commit      string `json:"commit"`
	Description string `json:"description"`
	MakeActive  bool   `json:"makeActive"`
}

type VaultUpdatePayload struct {
	Name        string `json:"name"        validate:"required"`
	Description string `json:"description"`
	Commit      string `json:"commit"`
}

type VaultWithNotesResponse struct {
	Vault   db.Vault                  `json:"vault"`
	Notes   []db.GetPaginatedNotesRow `json:"notes"`
	HasMore bool                      `json:"has_more"`
	Count   int64                     `json:"count"`
}
