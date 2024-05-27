-- +goose Up
-- +goose StatementBegin

-- REMOTE_CHANGES TABLE
CREATE TABLE remote_changes (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) NOT NULL,
    note_id INT REFERENCES notes(id),
    action VARCHAR(10) NOT NULL, -- 'create', 'update', 'delete'
    title VARCHAR(255),
    content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    processed BOOLEAN DEFAULT FALSE,
    CONSTRAINT valid_action CHECK (action IN ('create', 'update', 'delete'))
);

CREATE INDEX idx_remote_changes_user_id ON remote_changes(user_id);
CREATE INDEX idx_remote_changes_note_id ON remote_changes(note_id);

-- REMOTE_TAG_CHANGES TABLE
CREATE TABLE remote_tag_changes (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) NOT NULL,
    note_id INT REFERENCES notes(id) NOT NULL,
    tag_id INT REFERENCES tags(id),
    action VARCHAR(10) NOT NULL, -- 'add', 'remove'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    processed BOOLEAN DEFAULT FALSE,
    CONSTRAINT valid_action CHECK (action IN ('add', 'remove'))
);

CREATE INDEX idx_remote_tag_changes_user_id ON remote_tag_changes(user_id);
CREATE INDEX idx_remote_tag_changes_note_id ON remote_tag_changes(note_id);
CREATE INDEX idx_remote_tag_changes_tag_id ON remote_tag_changes(tag_id);

-- REMOTE_LINK_CHANGES TABLE
CREATE TABLE remote_link_changes (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) NOT NULL,
    note_id INT REFERENCES notes(id) NOT NULL,
    linked_note_id INT REFERENCES notes(id),
    action VARCHAR(10) NOT NULL, -- 'add', 'remove'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    processed BOOLEAN DEFAULT FALSE,
    CONSTRAINT valid_action CHECK (action IN ('add', 'remove'))
);

CREATE INDEX idx_remote_link_changes_user_id ON remote_link_changes(user_id);
CREATE INDEX idx_remote_link_changes_note_id ON remote_link_changes(note_id);
CREATE INDEX idx_remote_link_changes_linked_note_id ON remote_link_changes(linked_note_id);

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin

DROP TABLE IF EXISTS remote_link_changes CASCADE;
DROP INDEX IF EXISTS idx_remote_link_changes_user_id CASCADE;
DROP INDEX IF EXISTS idx_remote_link_changes_note_id CASCADE;
DROP INDEX IF EXISTS idx_remote_link_changes_linked_note_id CASCADE;

DROP TABLE IF EXISTS remote_tag_changes CASCADE;
DROP INDEX IF EXISTS idx_remote_tag_changes_user_id CASCADE;
DROP INDEX IF EXISTS idx_remote_tag_changes_note_id CASCADE;
DROP INDEX IF EXISTS idx_remote_tag_changes_tag_id CASCADE;

DROP TABLE IF EXISTS remote_changes CASCADE;
DROP INDEX IF EXISTS idx_remote_changes_user_id CASCADE;
DROP INDEX IF EXISTS idx_remote_changes_note_id CASCADE;

-- +goose StatementEnd
