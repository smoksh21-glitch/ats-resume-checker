# Installation Guide - ATS Resume Checker

This guide will help you set up and run the ATS Resume Checker application on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** (optional, for saving reports) - [Download here](https://www.mongodb.com/try/download/community)
- **OpenAI API Key** - [Get one here](https://platform.openai.com/api-keys)

## Quick Start (Automated)

### For Unix/Linux/macOS:

```bash
chmod +x setup.sh
./setup.sh
```

Then follow the on-screen instructions.

## Manual Installation

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd ats-resume-checker
```

### Step 2: Backend Setup

```bash
cd backend
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the `backend` folder:

```bash
cp .env.example .env
```

Edit `backend/.env` and add your credentials:

```env
PORT=5000
NODE_ENV=development
OPENAI_API_KEY=sk-your-actual-openai-api-key-here
MONGODB_URI=mongodb://localhost:27017/ats-checker
FRONTEND_URL=http://localhost:3000
```

**Important:** Replace `sk-your-actual-openai-api-key-here` with your real OpenAI API key.

### Step 4: Frontend Setup

Open a new terminal window:

```bash
cd frontend
npm install
```

### Step 5: Start MongoDB (Optional)

If you want to save analysis reports to a database:

```bash
# Start MongoDB service
mongod

# Or on macOS with Homebrew:
brew services start mongodb-community
```

**Note:** The app works fine without MongoDB. Reports just won't be persisted.

### Step 6: Run the Application

**Terminal 1 - Start Backend:**

```bash
cd backend
npm run dev
```

You should see:
```
🚀 Server running on port 5000
📊 Environment: development
🔗 API URL: http://localhost:5000
✅ MongoDB Connected: localhost (if using MongoDB)
```

**Terminal 2 - Start Frontend:**

```bash
cd frontend
npm start
```

The app will automatically open in your browser at `http://localhost:3000`

## Verification

1. Open `http://localhost:3000` in your browser
2. You should see the ATS Resume Checker homepage
3. Try uploading a sample resume to test

## Troubleshooting

### Backend won't start

**Error: Missing OpenAI API Key**
```
Solution: Ensure OPENAI_API_KEY is set in backend/.env
```

**Error: Port 5000 already in use**
```
Solution: Change PORT in backend/.env to another port (e.g., 5001)
Also update frontend/package.json proxy setting
```

### Frontend won't start

**Error: Port 3000 already in use**
```
Solution: You'll be prompted to use a different port. Type 'Y' to accept
```

**Error: Module not found**
```
Solution: Delete node_modules and package-lock.json, then run npm install again
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### File upload not working

**Error: File size too large**
```
Solution: Ensure your resume is under 5MB
```

**Error: Invalid file type**
```
Solution: Only PDF and DOCX files are supported
```

### OpenAI API errors

**Error: 429 Rate Limit**
```
Solution: You've exceeded your API quota. Check your OpenAI account
```

**Error: 401 Unauthorized**
```
Solution: Your API key is invalid. Get a new one from OpenAI
```

## Testing the Application

### Test with Sample Data

1. Create a sample resume (PDF or DOCX)
2. Upload it through the interface
3. Select an industry (e.g., "IT/Software")
4. Click "Analyze Resume"
5. Wait for AI analysis (usually 10-30 seconds)
6. View results and download reports

### API Testing (Optional)

Test the health endpoint:
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "ATS Resume Checker API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Production Deployment

### Backend Deployment (Heroku Example)

```bash
cd backend
heroku create your-app-name
heroku config:set OPENAI_API_KEY=your_key
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
git push heroku main
```

### Frontend Deployment (Vercel Example)

```bash
cd frontend
npm run build
vercel deploy
```

Update the API URL in frontend to point to your deployed backend.

### Environment Variables for Production

```env
NODE_ENV=production
OPENAI_API_KEY=your_production_key
MONGODB_URI=your_production_mongodb_uri
FRONTEND_URL=https://your-frontend-domain.com
```

## Security Checklist

Before deploying to production:

- [ ] Never commit `.env` files to Git
- [ ] Use environment variables for all secrets
- [ ] Enable CORS only for your frontend domain
- [ ] Implement rate limiting on API endpoints
- [ ] Add file size and type validation
- [ ] Use HTTPS in production
- [ ] Rotate API keys regularly
- [ ] Set up monitoring and logging

## Support

If you encounter issues:

1. Check the console logs in both terminal windows
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Check Node.js and npm versions
5. Review the troubleshooting section above

For additional help, open an issue on GitHub.

## Next Steps

- Customize the industry list in `frontend/src/components/HomePage.jsx`
- Modify AI prompts in `backend/services/aiService.js`
- Add authentication for user accounts
- Implement additional analysis features
- Create custom themes

Enjoy using ATS Resume Checker! 🚀
