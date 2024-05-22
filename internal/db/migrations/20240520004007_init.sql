-- +goose Up
-- +goose StatementBegin

-- AUTH SERVICE TABLES

CREATE TYPE user_role_permissions AS ENUM ('create', 'read', 'update', 'delete', 'user');
CREATE TYPE user_role AS ENUM ('admin', 'editor', 'user');

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

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role_id INT REFERENCES roles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON permissions FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON roles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON role_permissions FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);

INSERT INTO permissions (name) VALUES
('create'),
('read'),
('update'),
('delete'),
('user');

-- Insert data into roles
INSERT INTO roles (name) VALUES
('admin'),
('editor'),
('user');

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


INSERT INTO users (username, hashed_password, email, role_id) VALUES
('admin', 'admin', 'admin@example.com', (SELECT id FROM roles WHERE name = 'admin'));

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin

DROP TABLE permissions CASCADE;
DROP TABLE roles CASCADE;
DROP TABLE role_permissions CASCADE;
DROP TABLE users CASCADE;

DROP INDEX IF EXISTS idx_users_username CASCADE;
DROP INDEX IF EXISTS idx_users_email CASCADE;
DROP TYPE IF EXISTS user_role_permissions CASCADE;
DROP TYPE IF EXISTS user_role CASCADE;

DELETE FROM roles;
DELETE FROM permissions;
DELETE FROM role_permissions;
DELETE FROM users;
-- +goose StatementEnd
