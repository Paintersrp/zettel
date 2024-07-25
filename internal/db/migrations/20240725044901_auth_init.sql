-- +goose Up
-- +goose StatementBegin

-- Auth Types
CREATE TYPE user_role_permissions AS ENUM ('create', 'read', 'update', 'delete', 'user');
CREATE TYPE user_role AS ENUM ('admin', 'editor', 'user');

-- Auth Tables
CREATE TABLE permissions (
    id SERIAL PRIMARY KEY,
    name user_role_permissions NOT NULL
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name user_role NOT NULL
);

CREATE TABLE role_permissions (
    role_id INT REFERENCES roles(id),
    permission_id INT REFERENCES permissions(id),
    PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE providers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role_id INT REFERENCES roles(id),
    verification_id INT REFERENCES roles(id),
    bio TEXT,
    preferred_name VARCHAR(255),
    onboarding BOOLEAN NOT NULL DEFAULT TRUE,
    onboarding_from VARCHAR(50) REFERENCES providers(name),
    completed_tutorial BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_providers (
    user_provider_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider_id INTEGER NOT NULL REFERENCES providers(id),
    provider_user_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, provider_id)
);

CREATE TABLE verifications (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    email TEXT NOT NULL,
    token TEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) NOT NULL DEFAULT 'pending'
);

CREATE TABLE ssh_keys (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    public_key TEXT NOT NULL,
    name VARCHAR(255) NOT NULL,
    fingerprint TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_permissions_updated_at BEFORE UPDATE ON permissions FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_roles_updated_at BEFORE UPDATE ON roles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_role_permissions_updated_at BEFORE UPDATE ON role_permissions FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_verifications_updated_at BEFORE UPDATE ON verifications FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_ssh_keys_updated_at BEFORE UPDATE ON ssh_keys FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_providers_updated_at BEFORE UPDATE ON providers FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_user_providers_updated_at BEFORE UPDATE ON user_providers FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Indexes
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE UNIQUE INDEX ssh_keys_user_id_name_idx ON ssh_keys (user_id, name);

-- Initial Data
INSERT INTO permissions (name) VALUES
('create'), ('read'), ('update'), ('delete'), ('user');

INSERT INTO roles (name) VALUES
('admin'), ('editor'), ('user');

INSERT INTO role_permissions (role_id, permission_id) VALUES
((SELECT id FROM roles WHERE name = 'admin'), (SELECT id FROM permissions WHERE name = 'create')),
((SELECT id FROM roles WHERE name = 'admin'), (SELECT id FROM permissions WHERE name = 'read')),
((SELECT id FROM roles WHERE name = 'admin'), (SELECT id FROM permissions WHERE name = 'update')),
((SELECT id FROM roles WHERE name = 'admin'), (SELECT id FROM permissions WHERE name = 'delete')),
((SELECT id FROM roles WHERE name = 'admin'), (SELECT id FROM permissions WHERE name = 'user')),
((SELECT id FROM roles WHERE name = 'editor'), (SELECT id FROM permissions WHERE name = 'create')),
((SELECT id FROM roles WHERE name = 'editor'), (SELECT id FROM permissions WHERE name = 'read')),
((SELECT id FROM roles WHERE name = 'editor'), (SELECT id FROM permissions WHERE name = 'update')),
((SELECT id FROM roles WHERE name = 'user'), (SELECT id FROM permissions WHERE name = 'read'));

INSERT INTO providers (name)
VALUES ('github'), ('google'), ('facebook'), ('local');

INSERT INTO users (username, hashed_password, email, role_id) VALUES
('admin', 'admin', 'admin@example.com', (SELECT id FROM roles WHERE name = 'admin'));

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin

DROP TABLE IF EXISTS user_providers CASCADE;
DROP TABLE IF EXISTS providers CASCADE;
DROP TABLE IF EXISTS ssh_keys CASCADE;
DROP TABLE IF EXISTS verifications CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS role_permissions CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS permissions CASCADE;

DROP TYPE IF EXISTS user_role_permissions CASCADE;
DROP TYPE IF EXISTS user_role CASCADE;

-- +goose StatementEnd
