-- +goose Up
-- +goose StatementBegin
ALTER TABLE vaults
ADD COLUMN description TEXT;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE vaults
DROP COLUMN IF EXISTS description;
-- +goose StatementEnd
