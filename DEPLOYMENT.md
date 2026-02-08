# Deployment Guide

Complete guide for deploying the ATS Resume Checker to production.

## Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Backend Deployment](#backend-deployment)
3. [Frontend Deployment](#frontend-deployment)
4. [Database Setup](#database-setup)
5. [Environment Configuration](#environment-configuration)
6. [Post-Deployment](#post-deployment)

---

## Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All features tested locally
- [ ] OpenAI API key is valid and has credits
- [ ] Environment variables documented
- [ ] Error handling is robust
- [ ] Security measures implemented
- [ ] CORS configured correctly
- [ ] File upload limits set
- [ ] MongoDB connection tested (if using)
- [ ] Build process works (`npm run build`)
- [ ] Git repository is clean

---

## Backend Deployment

### Option 1: Heroku

**Step 1: Install Heroku CLI**
```bash
brew install heroku/brew/heroku  # macOS
# or
curl https://cli-assets.heroku.com/install.sh | sh  # Linux
```

**Step 2: Login and Create App**
```bash
cd backend
heroku login
heroku create your-app-name
```

**Step 3: Set Environment Variables**
```bash
heroku config:set OPENAI_API_KEY=your_key
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set NODE_ENV=production
heroku config:set FRONTEND_URL=https://your-frontend.vercel.app
```

**Step 4: Add Procfile**
Create `backend/Procfile`:
```
web: node server.js
```

**Step 5: Deploy**
```bash
git add .
git commit -m "Prepare for Heroku deployment"
git push heroku main
```

**Step 6: Verify**
```bash
heroku logs --tail
heroku open
```

### Option 2: Railway

**Step 1: Install Railway CLI**
```bash
npm i -g @railway/cli
```

**Step 2: Login and Initialize**
```bash
cd backend
railway login
railway init
```

**Step 3: Set Environment Variables**
```bash
railway variables set OPENAI_API_KEY=your_key
railway variables set MONGODB_URI=your_mongodb_uri
railway variables set NODE_ENV=production
```

**Step 4: Deploy**
```bash
railway up
```

### Option 3: Render

**Step 1: Create Account**
- Go to https://render.com
- Sign up with GitHub

**Step 2: New Web Service**
- Click "New +" → "Web Service"
- Connect your repository
- Select `backend` directory

**Step 3: Configure**
```yaml
Name: ats-resume-checker-api
Environment: Node
Build Command: npm install
Start Command: node server.js
```

**Step 4: Environment Variables**
Add in Render dashboard:
- `OPENAI_API_KEY`
- `MONGODB_URI`
- `NODE_ENV=production`
- `FRONTEND_URL`

**Step 5: Deploy**
- Click "Create Web Service"
- Wait for deployment

### Option 4: DigitalOcean App Platform

**Step 1: Create Account**
- Sign up at https://digitalocean.com

**Step 2: Create App**
- Apps → Create App
- Connect GitHub repository
- Select `backend` folder

**Step 3: Configure**
```yaml
name: ats-backend
environment_slug: node-js
instance_size_slug: basic-xxs
run_command: node server.js
```

**Step 4: Environment Variables**
Set in app settings:
- `OPENAI_API_KEY`
- `MONGODB_URI`
- `NODE_ENV`
- `FRONTEND_URL`

---

## Frontend Deployment

### Option 1: Vercel (Recommended)

**Step 1: Install Vercel CLI**
```bash
npm i -g vercel
```

**Step 2: Deploy**
```bash
cd frontend
vercel
```

**Step 3: Configure**
Follow prompts:
- Project name: `ats-resume-checker`
- Framework: Create React App
- Build command: `npm run build`
- Output directory: `build`

**Step 4: Set Environment Variables**
```bash
vercel env add REACT_APP_API_URL
# Enter your backend URL when prompted
```

**Step 5: Deploy to Production**
```bash
vercel --prod
```

### Option 2: Netlify

**Step 1: Install Netlify CLI**
```bash
npm i -g netlify-cli
```

**Step 2: Build**
```bash
cd frontend
npm run build
```

**Step 3: Deploy**
```bash
netlify deploy --prod --dir=build
```

**Step 4: Configure**
Create `frontend/netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option 3: GitHub Pages

**Step 1: Update package.json**
```json
{
  "homepage": "https://username.github.io/ats-resume-checker",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

**Step 2: Install gh-pages**
```bash
cd frontend
npm install --save-dev gh-pages
```

**Step 3: Deploy**
```bash
npm run deploy
```

---

## Database Setup

### MongoDB Atlas (Cloud)

**Step 1: Create Account**
- Go to https://mongodb.com/cloud/atlas
- Sign up for free tier

**Step 2: Create Cluster**
- Build a Database → Free tier
- Choose provider and region
- Cluster name: `ats-checker`

**Step 3: Create User**
- Database Access → Add New User
- Username: `ats-admin`
- Password: Generate secure password
- Role: Atlas admin

**Step 4: Network Access**
- Network Access → Add IP Address
- Click "Allow Access from Anywhere" (for testing)
- Or add specific IPs for security

**Step 5: Get Connection String**
- Clusters → Connect → Connect your application
- Copy connection string:
```
mongodb+srv://ats-admin:<password>@cluster0.xxxxx.mongodb.net/ats-checker?retryWrites=true&w=majority
```

**Step 6: Update Environment**
Replace `<password>` with actual password in your deployment platform.

---

## Environment Configuration

### Production Environment Variables

**Backend:**
```env
# Required
NODE_ENV=production
OPENAI_API_KEY=sk-your-production-key
FRONTEND_URL=https://your-frontend.vercel.app

# Optional but recommended
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ats-checker
PORT=5000
```

**Frontend:**
```env
REACT_APP_API_URL=https://your-backend.herokuapp.com
```

### Update CORS in Backend

Edit `backend/server.js`:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

### Update API URL in Frontend

Create `frontend/src/config.js`:
```javascript
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
```

Update API calls in components:
```javascript
import { API_URL } from '../config';

const response = await axios.post(`${API_URL}/api/upload-resume`, formData);
```

---

## Post-Deployment

### 1. Verify Deployment

**Backend Health Check:**
```bash
curl https://your-backend-url.com/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "ATS Resume Checker API is running"
}
```

**Frontend Check:**
- Visit https://your-frontend-url.com
- Should load without errors
- Check browser console for errors

### 2. Test Full Flow

1. Upload a resume
2. Select industry
3. Submit for analysis
4. Verify results display
5. Download PDF report
6. Test dark mode toggle

### 3. Monitor Logs

**Heroku:**
```bash
heroku logs --tail --app your-app-name
```

**Render:**
- Dashboard → Logs tab

**Railway:**
```bash
railway logs
```

### 4. Set Up Monitoring

**Sentry (Error Tracking):**
```bash
npm install @sentry/react @sentry/node
```

**Backend (server.js):**
```javascript
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
});
```

**Frontend (index.js):**
```javascript
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.NODE_ENV
});
```

### 5. Performance Optimization

**Backend:**
- Enable gzip compression
- Implement caching
- Add rate limiting
- Use PM2 for process management

**Frontend:**
- Enable code splitting
- Optimize images
- Add service worker
- Implement lazy loading

### 6. Security Hardening

**Install Helmet (Backend):**
```bash
npm install helmet
```

```javascript
const helmet = require('helmet');
app.use(helmet());
```

**Install CORS properly:**
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST'],
  credentials: true
}));
```

**Rate Limiting:**
```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use('/api/', limiter);
```

### 7. Setup Custom Domain

**Vercel:**
- Settings → Domains → Add Domain
- Follow DNS configuration steps

**Heroku:**
```bash
heroku domains:add www.yourdomain.com
```

**Add SSL Certificate:**
Most platforms (Vercel, Heroku, Netlify) provide free SSL automatically.

---

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "your-app-name"
          heroku_email: "your-email@example.com"
          appdir: "backend"

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID}}
          vercel-project-id: ${{ secrets.PROJECT_ID}}
          working-directory: ./frontend
```

---

## Rollback Strategy

### Heroku Rollback
```bash
heroku releases --app your-app-name
heroku rollback v123 --app your-app-name
```

### Vercel Rollback
- Dashboard → Deployments
- Find previous deployment
- Click "..." → "Promote to Production"

### Manual Rollback
```bash
git revert <commit-hash>
git push origin main
```

---

## Troubleshooting

### Backend Issues

**Problem: Server won't start**
```bash
# Check logs
heroku logs --tail

# Common fixes:
# 1. Verify environment variables
heroku config

# 2. Check Node version
# Ensure package.json has:
"engines": {
  "node": "16.x"
}
```

**Problem: OpenAI API errors**
```bash
# Check API key
echo $OPENAI_API_KEY

# Verify credits at:
# https://platform.openai.com/account/usage
```

**Problem: MongoDB connection failed**
```bash
# Check connection string
# Ensure IP is whitelisted in Atlas
# Verify username/password
```

### Frontend Issues

**Problem: API calls failing**
```javascript
// Check CORS configuration
// Verify API_URL is correct
console.log('API URL:', process.env.REACT_APP_API_URL);
```

**Problem: Build fails**
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## Cost Estimation

### Free Tier Options
- **Backend**: Heroku (Eco plan), Render (Free), Railway (Free $5/month)
- **Frontend**: Vercel (Free), Netlify (Free)
- **Database**: MongoDB Atlas (512MB Free)
- **Total**: $0-5/month for low traffic

### Paid Plans (Recommended for Production)
- **Heroku Eco**: $5/month
- **MongoDB Atlas**: $9/month (M2)
- **Vercel Pro**: $20/month
- **Total**: ~$34/month

### OpenAI API Costs
- GPT-4o-mini: ~$0.15 per 1M input tokens
- Average resume analysis: ~$0.001-0.002 per resume
- 1000 analyses: ~$1.50-2.00

---

## Support

After deployment:
- Monitor error logs daily
- Set up uptime monitoring (UptimeRobot)
- Configure alerts for errors
- Keep dependencies updated
- Regular security audits

---

## Next Steps

1. ✅ Deploy backend
2. ✅ Deploy frontend
3. ✅ Configure MongoDB
4. ✅ Test production
5. ✅ Set up monitoring
6. ✅ Configure custom domain
7. ✅ Enable CI/CD
8. ✅ Document for team

Congratulations! Your ATS Resume Checker is now live! 🚀
