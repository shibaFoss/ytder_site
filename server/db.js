import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database(path.join(__dirname, 'database.sqlite'));

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    display_name TEXT DEFAULT 'Admin',
    email TEXT,
    bio TEXT,
    profile_pic TEXT
  );

  CREATE TABLE IF NOT EXISTS blogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author_id INTEGER REFERENCES users(id),
    slug TEXT UNIQUE,
    title TEXT,
    excerpt TEXT,
    content TEXT,
    image TEXT,
    category TEXT,
    views INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Migrations (Ensure new columns exist in older DBs)
try { db.exec("ALTER TABLE users ADD COLUMN display_name TEXT DEFAULT 'Admin'"); } catch(e){}
try { db.exec("ALTER TABLE users ADD COLUMN email TEXT"); } catch(e){}
try { db.exec("ALTER TABLE users ADD COLUMN bio TEXT"); } catch(e){}
try { db.exec("ALTER TABLE users ADD COLUMN profile_pic TEXT"); } catch(e){}
try { db.exec("ALTER TABLE blogs ADD COLUMN author_id INTEGER REFERENCES users(id)"); } catch(e){}

export default db;
