# 🚀 AioYtdl Official Site - Deployment Guide

This guide explains how to deploy the AioYtdl platform to a Linux server (Ubuntu/Debian) using Nginx and PM2.

## 📋 Prerequisites
1.  **Node.js**: v18+ installed on the server.
2.  **PM2**: Process manager for Node.js (`npm install -g pm2`).
3.  **Nginx**: Web server for reverse proxy.
4.  **Domain**: A pointed domain (e.g., `aioytdl.com`).

---

## 🛠️ Step 1: Prepare the Code
Clone your repository to the server and install dependencies:
```bash
git clone <your-repo-url> site
cd site
npm install
```

## 🏗️ Step 2: Build the Frontend
Compiles the React application into optimized static files:
```bash
npm run build
```
The output will be in the `dist/` folder. The backend is configured to serve this folder automatically.

## ⚙️ Step 3: Environment Configuration
Create a `.env` file in the root directory:
```bash
touch .env
```
Add the following (Replace with a secure random string):
```env
PORT=5000
JWT_SECRET=your_ultra_secure_random_string_here
```

## 🏃 Step 4: Start the Server with PM2
Use PM2 to keep the backend running forever:
```bash
pm2 start server/index.js --name "aioytdl-site"
pm2 save
pm2 startup
```

## 🌐 Step 5: Nginx Reverse Proxy
Configure Nginx to serve the app on your domain. Create a new config:
```bash
sudo nano /etc/nginx/sites-available/aioytdl
```
Paste this configuration:
```nginx
server {
    listen 80;
    server_name aioytdl.com www.aioytdl.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        # Increase upload limit for blog images
        client_max_body_size 10M;
    }
}
```
Enable and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/aioytdl /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 📂 Step 6: File Permissions
Ensure the server can write images to the `server/uploads` folder:
```bash
chmod -R 755 server/uploads
```

---

## ✅ Best Practices
*   **SSL**: Use Certbot (`sudo snap install --classic certbot`) to get a free Let's Encrypt SSL certificate.
*   **Backups**: Regularly backup the `server/database.sqlite` and `server/uploads/` directory.
*   **Updates**: To update the site:
    ```bash
    git pull
    npm install
    npm run build
    pm2 restart aioytdl-site
    ```

**Your site is now LIVE and Production Ready!** 🚀🔥💎
