-- +goose Up
-- +goose StatementBegin
-- Add a new table for storing SSH keys
CREATE TABLE ssh_keys (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    public_key TEXT NOT NULL,
    name VARCHAR(255) NOT NULL,
    fingerprint TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_ssh_keys_updated_at BEFORE UPDATE ON ssh_keys
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Add a constraint to ensure a user can have only one key with the same name
CREATE UNIQUE INDEX ssh_keys_user_id_name_idx ON ssh_keys (user_id, name);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE ssh_keys CASCADE;
-- +goose StatementEnd
