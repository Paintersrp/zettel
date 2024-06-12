package vaults

import (
	"context"
	"fmt"

	"github.com/Paintersrp/zettel/internal/db"
	"github.com/jackc/pgx/v5/pgtype"
)

type VaultService struct {
	db *db.Queries
}

func NewVaultService(db *db.Queries) *VaultService {
	return &VaultService{
		db: db,
	}
}

func (s *VaultService) All(
	ctx context.Context,
	id int32,
) ([]db.GetVaultsByUserRow, error) {
	userID := pgtype.Int4{Int32: id, Valid: true}
	return s.db.GetVaultsByUser(ctx, userID)
}

func (s *VaultService) Create(
	ctx context.Context,
	payload VaultCreatePayload,
) (db.Vault, error) {
	id := pgtype.Int4{Int32: int32(payload.UserID), Valid: true}
	commit := pgtype.Text{String: payload.Commit, Valid: true}
	vault := db.CreateVaultParams{
		Name:   payload.Name,
		UserID: id,
		Commit: commit,
	}

	return s.db.CreateVault(ctx, vault)
}

func (s *VaultService) Update(
	ctx context.Context,
	id int32,
	payload VaultUpdatePayload,

) (db.Vault, error) {
	vault := db.UpdateVaultParams{
		ID:     id,
		Name:   payload.Name,
		Commit: pgtype.Text{String: payload.Commit, Valid: true},
	}
	return s.db.UpdateVault(ctx, vault)
}

func (s *VaultService) Get(ctx context.Context, id int32) (db.Vault, error) {
	return s.db.GetVault(ctx, id)
}

func (s *VaultService) PaginateNotes(
	ctx context.Context,
	id int32,
	page, limit int32,
	orphans, untagged bool,
) ([]db.GetPaginatedNotesRow, error) {
	fmt.Println("orphans", orphans)
	fmt.Println("untagged", untagged)
	vaultID := pgtype.Int4{Int32: id, Valid: true}
	return s.db.GetPaginatedNotes(ctx, db.GetPaginatedNotesParams{
		VaultID: vaultID,
		Column2: page,
		Column3: limit,
		Column4: orphans,
		Column5: untagged,
	})
}

func (s *VaultService) Count(
	ctx context.Context,
	vaultID int32,
	orphans, untagged bool,
) (int64, error) {
	vaultID32 := pgtype.Int4{Int32: vaultID, Valid: true}
	return s.db.GetNoteCount(ctx, db.GetNoteCountParams{
		VaultID: vaultID32,
		Column2: orphans,
		Column3: untagged,
	})
}

func (s *VaultService) Delete(ctx context.Context, id int32) error {
	return s.db.DeleteVault(ctx, id)
}
