-- +goose Up
-- +goose StatementBegin
-- Alter the users table
ALTER TABLE users
ADD COLUMN onboarding BOOLEAN NOT NULL DEFAULT TRUE,
ADD COLUMN onboarding_from VARCHAR(50) REFERENCES providers(name);

INSERT INTO providers (name)
VALUES ('local');
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE users
DROP COLUMN IF EXISTS onboarding,
DROP COLUMN IF EXISTS onboarding_from;

DELETE FROM providers WHERE name = 'local';
-- +goose StatementEnd
