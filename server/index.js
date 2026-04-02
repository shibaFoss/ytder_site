import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import db from './db.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import helmet from 'helmet';
import compression from 'compression';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-123';

// --- PRODUCTION MIDDLEWARE ---
app.use(helmet({
  contentSecurityPolicy: false, // Turn off if it breaks image loads from unsplash/external
}));
app.use(compression());
app.use(cors());
app.use(express.json());

// Create uploads directory if not exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Serve static files from uploads
app.use('/uploads', express.static(uploadDir));

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// --- AUTH ROUTES ---
const seedAdmin = () => {
  const admin = db.prepare('SELECT * FROM users WHERE username = ?').get('admin');
  if (!admin) {
    const hashedPassword = bcrypt.hashSync('admin123', 10);
    db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run('admin', hashedPassword);
    console.log('Admin user seeded (admin / admin123)');
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

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided' });
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });
    req.userId = decoded.id;
    next();
  });
};

// --- API ROUTES ---
app.post('/api/upload', verifyToken, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ url });
});

app.get('/api/user/profile', verifyToken, (req, res) => {
  const user = db.prepare('SELECT id, username, display_name, email, bio, profile_pic FROM users WHERE id = ?').get(req.userId);
  res.json(user);
});

app.put('/api/user/profile', verifyToken, (req, res) => {
  const { display_name, email, bio, profile_pic } = req.body;
  db.prepare('UPDATE users SET display_name = ?, email = ?, bio = ?, profile_pic = ? WHERE id = ?').run(display_name, email, bio, profile_pic, req.userId);
  res.json({ success: true });
});

app.put('/api/user/password', verifyToken, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.userId);
  if (user && bcrypt.compareSync(currentPassword, user.password)) {
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    db.prepare('UPDATE users SET password = ? WHERE id = ?').run(hashedPassword, req.userId);
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Current password incorrect' });
  }
});

app.get('/api/blogs', (req, res) => {
  const blogs = db.prepare('SELECT blogs.*, users.display_name as author_name FROM blogs LEFT JOIN users ON blogs.author_id = users.id ORDER BY created_at DESC').all();
  res.json(blogs);
});

app.get('/api/blogs/:slug', (req, res) => {
  const blog = db.prepare('SELECT blogs.*, users.display_name as author_name, users.bio as author_bio, users.profile_pic as author_image FROM blogs LEFT JOIN users ON blogs.author_id = users.id WHERE blogs.slug = ?').get(req.params.slug);
  if (blog) {
    db.prepare('UPDATE blogs SET views = views + 1 WHERE id = ?').run(blog.id);
    res.json(blog);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

app.post('/api/blogs', verifyToken, (req, res) => {
  const { title, excerpt, content, image, category } = req.body;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  try {
    const info = db.prepare('INSERT INTO blogs (author_id, title, slug, excerpt, content, image, category) VALUES (?, ?, ?, ?, ?, ?, ?)').run(req.userId, title, slug, excerpt, content, image, category);
    res.json({ success: true, id: info.lastInsertRowid });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Title/Slug already exists' });
  }
});

app.delete('/api/blogs/:id', verifyToken, (req, res) => {
  db.prepare('DELETE FROM blogs WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

app.put('/api/blogs/:id', verifyToken, (req, res) => {
  const { title, excerpt, content, image, category } = req.body;
  const id = parseInt(req.params.id);
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  try {
    db.prepare('UPDATE blogs SET title = ?, slug = ?, excerpt = ?, content = ?, image = ?, category = ? WHERE id = ?').run(title, slug, excerpt, content, image, category, id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Title/Slug already exists' });
  }
});

// --- SERVE FRONTEND (PRODUCTION) ---
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  // SPA Fallback for client-side routing
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(distPath, 'index.html'));
    }
  });
}

app.listen(PORT, () => {
  console.log(`Production-ready server running on port ${PORT}`);
});
