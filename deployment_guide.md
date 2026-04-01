# 🚀 Production Deployment Guide: AIO-YTDER Official Site

This guide provides a comprehensive, step-by-step walkthrough for deploying the AIO-YTDER React + Vite landing page to a production-grade Linux VPS (Ubuntu/Debian).

## 🛠️ Prerequisites

Before you begin, ensure you have:
- A Linux VPS (e.g., DigitalOcean, Hetzner, AWS, Linode).
- A Domain Name (e.g., `aioytdl.site`) pointing to your server's IP via **A Record**.
- SSH access to your server.

---

## 🏗️ Phase 1: Server Environment Prep

Log in to your server and run these commands to install the necessary stack.

```bash
# 1. Update system packages
sudo apt update && sudo apt upgrade -y

# 2. Install Node.js 22 (LTS)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# 3. Install Nginx and Git
sudo apt install -y nginx git
```

---

## 📦 Phase 2: Project Deployment

We will prepare the project files and generate the production-ready static bundle.

### 1. Clone the Repository
```bash
cd /var/www
# Replace with your repository URL
sudo git clone https://github.com/shibaFoss/AIO-Video-Downloader-Site.git aioytdl
sudo chown -R $USER:$USER /var/www/aioytdl
cd /var/www/aioytdl
```

### 2. Install & Build
```bash
# Install dependencies
npm install

# Generate the 'dist' folder
npm run build
```

The production files are now located in `/var/www/aioytdl/dist`.

---

## 🌐 Phase 3: Nginx Configuration

Nginx will serve your static files and handle routing.

### 1. Create a Server Block
```bash
sudo nano /etc/nginx/sites-available/aioytdl
```

### 2. Paste the following configuration
*Replace `yourdomain.com` with your actual domain.*

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    root /var/www/aioytdl/dist;
    index index.html;

    # Handle SPA routing (important for React)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets for better performance
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }

    # Gzip compression for faster loading
    gzip on;
    gzip_vary on;
    gzip_min_length 10240;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml;
    gzip_disable "MSIE [1-6]\.";
}
```

### 3. Enable the Site
```bash
sudo ln -s /etc/nginx/sites-available/aioytdl /etc/nginx/sites-enabled/
sudo nginx -t  # Test configuration
sudo systemctl restart nginx
```

---

## 🔒 Phase 4: SSL (HTTPS) Encryption

We use **Certbot** to install a free Let's Encrypt SSL certificate.

```bash
sudo apt install -y certbot python3-certbot-nginx

# Obtain and install the certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Certbot will automatically update your Nginx config to support HTTPS and redirect HTTP traffic to HTTPS.

---

## ⚡ Phase 5: Quick Update Script (Optional)

Create a script to deploy updates in one command.

```bash
# Create the script
nano deploy.sh
```

Add these lines:
```bash
#!/bin/bash
git pull origin main
npm install
npm run build
echo "🚀 Deployment Successful!"
```

Change permissions: `chmod +x deploy.sh`

---

## 🧪 Post-Deployment Checklist

- [ ] Check if the site loads at `https://yourdomain.com`.
- [ ] Verify that GitHub Stars are fetching correctly.
- [ ] Test the "Download APK" buttons.
- [ ] Ensure mobile responsiveness is working on a real device.

---

> [!TIP]
> Since this is a static site, you don't need PM2 or background processes. Nginx handles everything!
