-- +goose Up
-- +goose StatementBegin
-- Alter the users table
ALTER TABLE users
ADD COLUMN completed_tutorial BOOLEAN NOT NULL DEFAULT FALSE,
ADD COLUMN active_vault INTEGER REFERENCES vaults(id);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE users
DROP COLUMN IF EXISTS completed_tutorial,
DROP COLUMN IF EXISTS active_vault;
-- +goose StatementEnd
