-- +goose Up
-- +goose StatementBegin

-- Alter the users table
ALTER TABLE users
ADD COLUMN verification_id UUID,
ADD COLUMN bio TEXT,
ADD COLUMN preferred_name VARCHAR(255);

-- Create the verifications table
CREATE TABLE verifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id INT REFERENCES users(id),
    email TEXT NOT NULL,
    token TEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) NOT NULL DEFAULT 'pending'
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_verifications_updated_at
BEFORE UPDATE ON verifications
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin

-- Drop the verifications table
DROP TABLE IF EXISTS verifications CASCADE;

-- Remove the added columns from the users table
ALTER TABLE users
DROP COLUMN IF EXISTS verification_id,
DROP COLUMN IF EXISTS bio,
DROP COLUMN IF EXISTS preferred_name;

-- +goose StatementEnd
