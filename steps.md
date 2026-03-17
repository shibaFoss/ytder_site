Since you are moving toward a production environment (like a VPS running Ubuntu/Debian/Mint), the process changes slightly. You no longer use `npm run dev` (which is for development); instead, you **build** the project into static files and serve them using a high-performance web server like **Nginx**.

Here is the finalized command sequence for a production Linux server.

### 1. System Preparation
Login to your server and ensure the environment is ready.
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js 22 (LTS) via NodeSource
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs nginx git
```

### 2. Project Setup & Installation
Clone your code or create the folder structure.
```bash
# Create the project using Vite
npm create vite@latest aioytdl -- --template react
cd aioytdl

# Install Core Dependencies
npm install

# Install Tailwind v4 & PostCSS Support
npm install @tailwindcss/postcss postcss autoprefixer lucide-react
```

### 3. Configuration Files
You must ensure these three files are configured correctly for the production build to succeed.


http://googleusercontent.com/immersive_entry_chip/0


http://googleusercontent.com/immersive_entry_chip/1

### Summary of Commands for "Later"
If you just want a "cheat sheet" to run once the files are ready:
1. `npm install`
2. `npm run build`
3. `sudo cp -r dist/* /var/www/html/`

Your site is now live at your server's IP address or domain name!
