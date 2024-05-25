-- +goose Up
-- +goose StatementBegin

-- VAULTS TABLE

CREATE TABLE vaults (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id INT REFERENCES users(id),
    commit VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_vault_name_per_user UNIQUE (name, user_id)
);

CREATE TRIGGER update_vaults_updated_at BEFORE UPDATE ON vaults
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE INDEX idx_vaults_user_id ON vaults(user_id);

-- NOTES TABLE

CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    user_id INT REFERENCES users(id),
    vault_id INT REFERENCES vaults(id),
    upstream INT REFERENCES notes(id),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_notes_updated_at BEFORE UPDATE ON notes
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE INDEX idx_notes_title ON notes(title);
CREATE INDEX idx_notes_user_id ON notes(user_id);
CREATE INDEX idx_notes_vault_id ON notes(vault_id);

-- TAGS TABLE

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

-- NOTE_TAGS TABLE (join table for notes and tags)

CREATE TABLE note_tags (
    note_id INT REFERENCES notes(id) ON DELETE CASCADE,
    tag_id INT REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (note_id, tag_id)
);

CREATE INDEX idx_note_tags_note_id ON note_tags(note_id);
CREATE INDEX idx_note_tags_tag_id ON note_tags(tag_id);

-- NOTE_LINKS TABLE (join table for notes and links)

CREATE TABLE note_links (
    note_id INT REFERENCES notes(id) ON DELETE CASCADE,
    linked_note_id INT REFERENCES notes(id) ON DELETE CASCADE,
    PRIMARY KEY (note_id, linked_note_id)
);

CREATE INDEX idx_note_links_note_id ON note_links(note_id);
CREATE INDEX idx_note_links_linked_note_id ON note_links(linked_note_id);

-- Seeding
INSERT INTO vaults (name, user_id)
VALUES ('Personal Notes', 1);

WITH new_vault AS (
    SELECT id
    FROM vaults
    WHERE user_id = 1
    ORDER BY id DESC
    LIMIT 1
)

INSERT INTO notes (title, user_id, vault_id, content)
SELECT
    title,
    1,
    new_vault.id,
    content
FROM (
    VALUES
        ('Note 1', '# Note 1

This is the content of the first note.'),
        ('Note 2', '## Note 2

This is a longer note with some **bold** and _italic_ text.

### Subheading

- List item 1
- List item 2
- List item 3'),
        ('Note 3', '### Note 3

This is a note with a code block:

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```'),
        ('Note 4', '#### Note 4

This is a shorter note.'),
        ('Note 5', '# Note 5

This is a note with a table:

| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| Value 1 | Value 2 | Value 3 |
| Value 4 | Value 5 | Value 6 |'),
        ('Note 6', '## Note 6

This is a note with a blockquote.

> This is a blockquote.
> It can span multiple lines.'),
        ('Note 7', '### Note 7

This is a note with a link: [Google](https://www.google.com)'),
        ('Note 8', '#### Note 8

This is a shorter note.'),
        ('Note 9', '# Note 9

This is a longer note with some content.'),
        ('Note 10', '## Note 10

This is another note with some content.'),
        ('Note 11', '### Note 11

This is a shorter note.'),
        ('Note 12', '#### Note 12

This is another shorter note.'),
        ('Note 13', '# Note 13

This is a note with longer content:

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, nisl nec ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Sed auctor, nisl nec ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.'),
        ('Note 14', '## Note 14

This is another note with some content.'),
        ('Note 15', '### Note 15

This is a shorter note.'),
        ('Note 16', '#### Note 16

This is another shorter note.'),
        ('Note 17', '# Note 17

This is a longer note with some content.'),
        ('Note 18', '## Note 18

This is another note with some content.'),
        ('Note 19', '### Note 19

This is a shorter note.'),
        ('Note 20', '#### Note 20

This is another shorter note.')
) AS note_data (title, content)
CROSS JOIN new_vault;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin

DROP TABLE IF EXISTS note_links CASCADE;
DROP TABLE IF EXISTS note_tags CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS notes CASCADE;
DROP TABLE IF EXISTS vaults CASCADE;
DROP INDEX IF EXISTS idx_note_links_note_id CASCADE;
DROP INDEX IF EXISTS idx_note_links_linked_note_id CASCADE;
DROP INDEX IF EXISTS idx_note_tags_note_id CASCADE;
DROP INDEX IF EXISTS idx_note_tags_tag_id CASCADE;
DROP INDEX IF EXISTS idx_notes_title CASCADE;
DROP INDEX IF EXISTS idx_notes_user_id CASCADE;
DROP INDEX IF EXISTS idx_notes_vault_id CASCADE;
DROP INDEX IF EXISTS idx_vaults_user_id CASCADE;

-- +goose StatementEnd
