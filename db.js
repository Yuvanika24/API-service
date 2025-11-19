const Database = require("better-sqlite3");

// Create or open database file
const db = new Database("actions.db");

// Initialize table if not exists
db.prepare(`
  CREATE TABLE IF NOT EXISTS actions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    method TEXT NOT NULL,
    status TEXT DEFAULT 'PENDING',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`).run();

module.exports = db;
