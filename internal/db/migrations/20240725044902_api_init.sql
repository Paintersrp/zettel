-- +goose Up
-- +goose StatementBegin

-- Api Types
CREATE TYPE visibility_type AS ENUM ('private', 'shared', 'public');
CREATE TYPE collaborator_role AS ENUM ('viewer', 'contributor', 'admin');
CREATE TYPE action_priority AS ENUM ('low', 'medium', 'high');
CREATE TYPE action_status AS ENUM ('todo', 'in_progress', 'done', 'canceled');
CREATE TYPE content_type AS ENUM ('hub', 'trail');

-- Api Tables
CREATE TABLE hubs (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    visibility visibility_type NOT NULL DEFAULT 'private',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE users
ADD COLUMN active_vault INT REFERENCES hubs(id);

CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    content_vector tsvector GENERATED ALWAYS AS (to_tsvector('english', title || ' ' || content)) STORED,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hub_notes (
    hub_id INT NOT NULL REFERENCES hubs(id) ON DELETE CASCADE,
    note_id INT NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
    added_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (hub_id, note_id)
);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE note_tags (
    note_id INT REFERENCES notes(id) ON DELETE CASCADE,
    tag_id INT REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (note_id, tag_id)
);

CREATE TABLE note_links (
    id SERIAL PRIMARY KEY,
    source_note_id INT REFERENCES notes(id) ON DELETE CASCADE,
    target_note_id INT REFERENCES notes(id) ON DELETE CASCADE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE actions (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    assignee_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    priority action_priority NOT NULL,
    status action_status NOT NULL DEFAULT 'todo',
    due_date DATE,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE note_actions (
    note_id INT REFERENCES notes(id) ON DELETE CASCADE,
    action_id INT REFERENCES actions(id) ON DELETE CASCADE,
    PRIMARY KEY (note_id, action_id)
);

CREATE TABLE trails (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    visibility visibility_type NOT NULL DEFAULT 'private',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE trail_notes (
    trail_id INT REFERENCES trails(id) ON DELETE CASCADE,
    note_id INT REFERENCES notes(id) ON DELETE CASCADE,
    position INTEGER NOT NULL,
    PRIMARY KEY (trail_id, note_id)
);

CREATE TABLE collaborators (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    resource_type content_type NOT NULL,
    resource_id INT NOT NULL,
    role collaborator_role NOT NULL,
    invited_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    accepted_at TIMESTAMPTZ,
    UNIQUE (user_id, resource_type, resource_id)
);

-- Create triggers
CREATE TRIGGER update_hubs_updated_at
BEFORE UPDATE ON hubs
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notes_updated_at
BEFORE UPDATE ON notes
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_actions_updated_at
BEFORE UPDATE ON actions
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trails_updated_at
BEFORE UPDATE ON trails
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Indexes
CREATE INDEX idx_notes_content_vector ON notes USING gin(content_vector);
CREATE INDEX idx_notes_user_id ON notes(user_id);
CREATE INDEX idx_notes_created_at ON notes(created_at);

CREATE INDEX idx_hubs_user_id ON hubs(user_id);
CREATE INDEX idx_hubs_visibility ON hubs(visibility);

CREATE INDEX idx_tags_name ON tags(name);

CREATE INDEX idx_note_tags_note_id ON note_tags(note_id);
CREATE INDEX idx_note_tags_tag_id ON note_tags(tag_id);

CREATE INDEX idx_note_links_source_note_id ON note_links(source_note_id);
CREATE INDEX idx_note_links_target_note_id ON note_links(target_note_id);

CREATE INDEX idx_actions_user_id ON actions(user_id);
CREATE INDEX idx_actions_assignee_id ON actions(assignee_id);
CREATE INDEX idx_actions_status ON actions(status);
CREATE INDEX idx_actions_due_date ON actions(due_date);

CREATE INDEX idx_collaborators_user ON collaborators(user_id);
CREATE INDEX idx_collaborators_resource ON collaborators(resource_type, resource_id);

CREATE INDEX idx_trails_user_id ON trails(user_id);
CREATE INDEX idx_trails_visibility ON trails(visibility);

CREATE INDEX idx_trail_notes_trail_id ON trail_notes(trail_id);
CREATE INDEX idx_trail_notes_note_id ON trail_notes(note_id);

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin

DROP TABLE IF EXISTS collaborators CASCADE;
DROP TABLE IF EXISTS trail_notes CASCADE;
DROP TABLE IF EXISTS trails CASCADE;
DROP TABLE IF EXISTS note_actions CASCADE;
DROP TABLE IF EXISTS actions CASCADE;
DROP TABLE IF EXISTS note_links CASCADE;
DROP TABLE IF EXISTS note_tags CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS hub_notes CASCADE;
DROP TABLE IF EXISTS notes CASCADE;
DROP TABLE IF EXISTS hubs CASCADE;

DROP TYPE IF EXISTS content_type CASCADE;
DROP TYPE IF EXISTS action_status CASCADE;
DROP TYPE IF EXISTS action_priority CASCADE;
DROP TYPE IF EXISTS collaborator_role CASCADE;
DROP TYPE IF EXISTS visibility_type CASCADE;

-- +goose StatementEnd
