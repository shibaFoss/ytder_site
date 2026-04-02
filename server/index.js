import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import db from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-123';

app.use(cors());
app.use(express.json());

// --- AUTH ROUTES ---

// Seed Admin Users
const seedAdmin = () => {
  // Default admin
  const admin = db.prepare('SELECT * FROM users WHERE username = ?').get('admin');
  if (!admin) {
    const hashedPassword = bcrypt.hashSync('admin123', 10);
    db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run('admin', hashedPassword);
    console.log('Admin user seeded (admin / admin123)');
  }

  // Shiba user
  const shiba = db.prepare('SELECT * FROM users WHERE username = ?').get('shiba');
  if (!shiba) {
    const hashedPassword = bcrypt.hashSync('@#$420Shiba', 10);
    db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run('shiba', hashedPassword);
    console.log('Shiba user seeded (shiba / @#$420Shiba)');
  }
};
seedAdmin();

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });
    req.userId = decoded.id;
    next();
  });
};

// --- BLOG ROUTES ---

// Get all blogs
app.get('/api/blogs', (req, res) => {
  const blogs = db.prepare('SELECT * FROM blogs ORDER BY created_at DESC').all();
  res.json(blogs);
});

// Get a single blog by slug
app.get('/api/blogs/:slug', (req, res) => {
  const blog = db.prepare('SELECT * FROM blogs WHERE slug = ?').get(req.params.slug);
  if (blog) {
    // Increment view count
    db.prepare('UPDATE blogs SET views = views + 1 WHERE id = ?').run(blog.id);
    res.json(blog);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

// Create a new blog (Admin only)
app.post('/api/blogs', verifyToken, (req, res) => {
  const { title, excerpt, content, image, category } = req.body;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  try {
    const info = db.prepare(`
      INSERT INTO blogs (title, slug, excerpt, content, image, category)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(title, slug, excerpt, content, image, category);
    
    res.json({ success: true, id: info.lastInsertRowid });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Title must be unique (slug exists)' });
  }
});

// Delete a blog (Admin only)
app.delete('/api/blogs/:id', verifyToken, (req, res) => {
  db.prepare('DELETE FROM blogs WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
