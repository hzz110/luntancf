-- D1 Schema for meeting_records
CREATE TABLE IF NOT EXISTS meeting_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  summary TEXT,
  content TEXT,
  publish_date TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Index for pagination
CREATE INDEX IF NOT EXISTS idx_publish_date ON meeting_records(publish_date DESC);
