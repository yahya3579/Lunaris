---
description: How to deploy Lunaris on a fresh Contabo Ubuntu VPS with Nginx, PM2, and SSL
---

# 🚀 Deploying Lunaris on Contabo Ubuntu VPS — Complete Guide (as Root)

## Project Summary
- **Backend**: Node.js (Express 5) on port 5000, ES Modules, MongoDB Atlas
- **Frontend**: React (CRA) — builds to static files served by Nginx
- **Domain**: lunarismanagement.com
- **Running as**: root user

---

## PHASE 1: INITIAL SERVER SETUP

### Step 1 — SSH into Your VPS
```bash
ssh root@YOUR_SERVER_IP
```

### Step 2 — Update the System
```bash
apt update && apt upgrade -y
```

### Step 3 — Enable Firewall (UFW)
```bash
ufw allow OpenSSH
ufw allow 80
ufw allow 443
ufw enable
ufw status
```

---

## PHASE 2: INSTALL REQUIRED SOFTWARE

### Step 4 — Install Node.js (v20 LTS)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
```
Verify:
```bash
node -v
npm -v
```

### Step 5 — Install Git
```bash
apt install -y git
```

### Step 6 — Install PM2 (Process Manager for Node.js)
```bash
npm install -g pm2
```

### Step 7 — Install Nginx
```bash
apt install -y nginx
systemctl start nginx
systemctl enable nginx
```
Verify by visiting `http://YOUR_SERVER_IP` in browser — you should see the Nginx welcome page.

---

## PHASE 3: CLONE AND SETUP YOUR PROJECT

### Step 8 — Clone the Repository
```bash
cd /root
git clone https://github.com/YOUR_USERNAME/Lunaris.git
cd Lunaris
```

### Step 9 — Setup Backend
```bash
cd /root/Lunaris/backend
npm install
```

### Step 10 — Create Backend Environment File
Since `config.env` is gitignored, you need to create it on the server:
```bash
nano config.env
```
Paste the following (update values as needed):
```env
NODE_ENV=production
PORT=5000

DB_URI=mongodb+srv://ninjab330:6x8euQnVlqTm848q@cluster1.szovkww.mongodb.net/?appName=Cluster1

#JWT
JWT_SECRET_KEY=Createdmy001ProjectforLunarisbkd
JWT_EXPIRES_IN=1d
JWT_TOKEN_EXPIRES_IN=1
```
Save: `Ctrl+O` → `Enter` → `Ctrl+X`

### Step 11 — Setup Frontend
```bash
cd /root/Lunaris/client
npm install
```

### Step 12 — Create Frontend Environment File
Since `.env` is gitignored, create it on the server:
```bash
nano .env
```
Paste (replace with your actual domain):
```env
REACT_APP_API_URL=https://api.lunarismanagement.com
REACT_APP_APP_NAME=Lunaris
```
Save: `Ctrl+O` → `Enter` → `Ctrl+X`

### Step 13 — Build the React App
```bash
npm run build
```
This creates a `build/` folder with static files.

---

## PHASE 4: START THE BACKEND WITH PM2

### Step 14 — Start Backend with PM2
```bash
cd /root/Lunaris/backend
pm2 start server.js --name "lunaris-backend"
```

### Step 15 — Verify It's Running
```bash
pm2 status
pm2 logs lunaris-backend
```

### Step 16 — Set PM2 to Auto-Start on Reboot
```bash
pm2 startup
pm2 save
```

---

## PHASE 5: CONFIGURE NGINX

### Step 17 — Point Your Domain to Server IP

Go to your domain registrar (e.g., Namecheap, GoDaddy, Cloudflare) and create:

| Type  | Name      | Value            |
|-------|-----------|------------------|
| A     | @         | YOUR_SERVER_IP   |
| A     | www       | YOUR_SERVER_IP   |
| A     | api       | YOUR_SERVER_IP   |

Wait 5-30 minutes for DNS propagation.

### Step 18 — Create Nginx Config for Frontend (Main Domain)
```bash
nano /etc/nginx/sites-available/lunarismanagement.com
```
Paste:
```nginx
server {
    listen 80;
    server_name lunarismanagement.com www.lunarismanagement.com;

    root /root/Lunaris/client/build;
    index index.html;

    # Gzip compression for better performance
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # React Router — serve index.html for all routes
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```
Save: `Ctrl+O` → `Enter` → `Ctrl+X`

### Step 19 — Create Nginx Config for Backend API (Subdomain)
```bash
nano /etc/nginx/sites-available/api.lunarismanagement.com
```
Paste:
```nginx
server {
    listen 80;
    server_name api.lunarismanagement.com;

    # Max upload size (match your Express limit)
    client_max_body_size 100M;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeouts for large uploads
        proxy_connect_timeout 600;
        proxy_send_timeout 600;
        proxy_read_timeout 600;
        send_timeout 600;
    }
}
```
Save: `Ctrl+O` → `Enter` → `Ctrl+X`

### Step 20 — Enable the Sites
```bash
ln -s /etc/nginx/sites-available/lunarismanagement.com /etc/nginx/sites-enabled/
ln -s /etc/nginx/sites-available/api.lunarismanagement.com /etc/nginx/sites-enabled/
```

### Step 21 — Remove Default Nginx Config
```bash
rm /etc/nginx/sites-enabled/default
```

### Step 22 — Fix Nginx Permission for /root
Nginx runs as the `www-data` user, which by default cannot access `/root`. Fix this:
```bash
chmod 755 /root
```

### Step 23 — Test & Restart Nginx
```bash
nginx -t
systemctl restart nginx
```

---

## PHASE 6: SSL CERTIFICATES (HTTPS) with Let's Encrypt

### Step 24 — Install Certbot
```bash
apt install -y certbot python3-certbot-nginx
```

### Step 25 — Get SSL Certificates
```bash
certbot --nginx -d lunarismanagement.com -d www.lunarismanagement.com -d api.lunarismanagement.com
```
Follow the prompts:
- Enter your email
- Agree to terms
- Choose to redirect HTTP to HTTPS (option 2)

### Step 26 — Verify Auto-Renewal
```bash
certbot renew --dry-run
```

---

## PHASE 7: UPDATE YOUR CODE FOR PRODUCTION

### Step 27 — Update Backend CORS
Your `server.js` already has `https://lunarismanagement.com` in `allowedOrigins`.
But you should also add the `www` variant. On the server, edit:
```bash
cd /root/Lunaris/backend
nano server.js
```
Update the `allowedOrigins` array to:
```javascript
const allowedOrigins = [
  "http://localhost:3000",
  "https://lunarismanagement.com",
  "https://www.lunarismanagement.com"
];
```
Save and restart:
```bash
pm2 restart lunaris-backend
```

---

## PHASE 8: VERIFY EVERYTHING WORKS

### Step 28 — Test Your Deployment
1. Visit `https://lunarismanagement.com` — should show your React app
2. Visit `https://api.lunarismanagement.com` — should show "Lunaris Management"
3. Test login/signup functionality
4. Test property CRUD operations
5. Test image uploads

### Step 29 — Useful Commands Reference
```bash
# View backend logs
pm2 logs lunaris-backend

# Restart backend
pm2 restart lunaris-backend

# View Nginx error logs
tail -f /var/log/nginx/error.log

# View Nginx access logs
tail -f /var/log/nginx/access.log

# Check disk space
df -h

# Check memory usage
free -m

# Check running processes
htop
```

---

## ONGOING: HOW TO DEPLOY UPDATES

Every time you push new code to GitHub:

```bash
cd /root/Lunaris

# Pull latest code
git pull origin main

# If backend changed:
cd backend
npm install
pm2 restart lunaris-backend

# If frontend changed:
cd ../client
npm install
npm run build
# No need to restart Nginx — it serves static files
```

---

## TROUBLESHOOTING

### MongoDB Connection Issues
- Make sure your MongoDB Atlas Network Access allows `0.0.0.0/0` (all IPs) or specifically your VPS IP.
- Go to MongoDB Atlas → Network Access → Add IP Address → Add your Contabo VPS IP.

### 502 Bad Gateway
- Backend is not running. Check: `pm2 status` and `pm2 logs lunaris-backend`

### 403 Forbidden on Frontend
- Nginx can't read /root. Make sure you ran: `chmod 755 /root`

### 413 Request Entity Too Large
- Nginx is blocking large uploads. The config above sets `client_max_body_size 100M`.

### React Routes Show 404
- The `try_files $uri $uri/ /index.html;` directive in Nginx handles this. Make sure it's there.

### SSL Certificate Renewal
- Certbot auto-renews via a systemd timer. Verify: `systemctl status certbot.timer`
