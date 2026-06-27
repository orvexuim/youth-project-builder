"""
Youth Project Builder — Database Setup (SQLite)
Run: python database.py to initialize
"""

import sqlite3
import os

DB_PATH = os.environ.get("DB_PATH", "youth_builder.db")

SCHEMA = """
PRAGMA journal_mode=WAL;
PRAGMA foreign_keys=ON;

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL DEFAULT '',
  password_hash TEXT NOT NULL,
  plan TEXT NOT NULL DEFAULT 'free',
  generations_today INTEGER NOT NULL DEFAULT 0,
  last_reset_date TEXT NOT NULL DEFAULT (date('now')),
  avatar_color TEXT DEFAULT '#8B5CF6',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'Untitled Project',
  idea TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  current_step INTEGER NOT NULL DEFAULT 1,
  business_analysis TEXT DEFAULT NULL,
  brand_identity TEXT DEFAULT NULL,
  business_plan TEXT DEFAULT NULL,
  marketing_content TEXT DEFAULT NULL,
  website_copy TEXT DEFAULT NULL,
  pitch_deck TEXT DEFAULT NULL,
  action_roadmap TEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS generations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id),
  project_id INTEGER NOT NULL REFERENCES projects(id),
  step INTEGER NOT NULL,
  step_name TEXT NOT NULL,
  tokens_used INTEGER DEFAULT 0,
  generation_time_ms INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_projects_user ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_generations_project ON generations(project_id);
"""

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys=ON")
    return conn

def init_db():
    conn = get_db()
    conn.executescript(SCHEMA)
    conn.commit()
    conn.close()
    print(f"✓ Database initialized at {DB_PATH}")

if __name__ == "__main__":
    init_db()
