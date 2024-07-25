-- +goose Up
-- +goose StatementBegin

CREATE TABLE sources (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    url TEXT,
    author VARCHAR(255),
    publication_date DATE,
    content TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE note_sources (
    note_id INT REFERENCES notes(id) ON DELETE CASCADE,
    source_id INT REFERENCES sources(id) ON DELETE CASCADE,
    PRIMARY KEY (note_id, source_id)
);

-- Triggers
CREATE TRIGGER update_sources_updated_at
BEFORE UPDATE ON sources
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Indexes
CREATE INDEX idx_sources_user_id ON sources(user_id);
CREATE INDEX idx_note_sources_note_id ON note_sources(note_id);
CREATE INDEX idx_note_sources_source_id ON note_sources(source_id);

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin

DROP TABLE IF EXISTS sources CASCADE;
DROP TABLE IF EXISTS note_sources CASCADE;

-- +goose StatementEnd
