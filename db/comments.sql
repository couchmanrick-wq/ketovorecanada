-- Comments for News / Videos / Blog items on ketovorecanada.com.
-- Applied against the shared `ketovore-content` D1:
--   npx wrangler d1 execute ketovore-content --remote --file=./db/comments.sql

CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  target_type TEXT NOT NULL,        -- 'video' | 'news' | 'blog'
  target_id TEXT NOT NULL,          -- video_id | article id | blog slug
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'published',  -- 'published' | 'deleted'
  created_at TEXT NOT NULL,         -- ISO 8601
  ip_hash TEXT
);

CREATE INDEX IF NOT EXISTS idx_comments_target
  ON comments(target_type, target_id, created_at);
CREATE INDEX IF NOT EXISTS idx_comments_created ON comments(created_at DESC);

-- Unverified submissions awaiting an email-link click. Row is deleted on verify.
CREATE TABLE IF NOT EXISTS comment_pending (
  token TEXT PRIMARY KEY,
  target_type TEXT NOT NULL,
  target_id TEXT NOT NULL,
  target_path TEXT NOT NULL,        -- where to send the reader back after verifying
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  ip_hash TEXT
);

-- Once an email has confirmed one comment, later comments from it post immediately.
CREATE TABLE IF NOT EXISTS comment_verified_emails (
  email TEXT PRIMARY KEY,
  first_verified_at TEXT NOT NULL
);
