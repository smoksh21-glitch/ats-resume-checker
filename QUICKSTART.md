# 🚀 QUICK START GUIDE - ATS Resume Checker

## ⚡ Get Running in 5 Minutes

### Prerequisites
- Node.js v16+ installed
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Step 1: Install Backend (Terminal 1)
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your OpenAI API key
npm run dev
```

### Step 2: Install Frontend (Terminal 2)
```bash
cd frontend
npm install
npm start
```

### Step 3: Open Browser
Visit `http://localhost:3000`

---

## 📁 What You Got

```
ats-resume-checker/
├── backend/           # Node.js + Express API
├── frontend/          # React + Tailwind UI
├── README.md          # Project overview
├── INSTALLATION.md    # Detailed setup guide
├── API_DOCUMENTATION.md    # API reference
├── DEPLOYMENT.md      # Deploy to production
├── PROJECT_STRUCTURE.md    # File organization
├── CONTRIBUTING.md    # How to contribute
└── CHANGELOG.md       # Version history
```

---

## 🎯 Features

✅ **Upload Resume** - PDF/DOCX support with drag & drop
✅ **AI Analysis** - Powered by OpenAI GPT-4o-mini
✅ **ATS Score** - 0-100 compatibility rating
✅ **Keyword Match** - Industry-specific keyword analysis
✅ **Skills Check** - Found vs. missing skills
✅ **Format Issues** - ATS parsing problems
✅ **Suggestions** - Actionable improvement tips
✅ **Improved Bullets** - AI-rewritten achievements
✅ **PDF Report** - Downloadable analysis
✅ **Dark Mode** - Theme toggle
✅ **Responsive** - Mobile & desktop optimized

---

## 🔧 Configuration

### Backend Environment (.env)
```env
PORT=5000
OPENAI_API_KEY=sk-your-key-here
MONGODB_URI=mongodb://localhost:27017/ats-checker  # Optional
FRONTEND_URL=http://localhost:3000
```

### Supported Industries
- Finance
- IT/Software
- Marketing
- HR
- Operations
- Healthcare
- Education
- Sales
- Engineering
- Custom

---

## 📱 Usage

1. **Upload Resume**: Drag & drop or click to browse
2. **Select Industry**: Choose your target industry
3. **Analyze**: Click "Analyze Resume" button
4. **Review Results**: See score, keywords, skills
5. **Download**: Get PDF report or optimized text
6. **Improve**: Apply suggestions to your resume

---

## 🛠️ Tech Stack

**Backend:**
- Node.js + Express
- OpenAI API
- MongoDB (optional)
- pdf-parse (PDF extraction)
- mammoth (DOCX extraction)

**Frontend:**
- React 18
- Tailwind CSS
- Recharts (visualizations)
- jsPDF (PDF generation)
- Axios (HTTP client)

---

## 📖 Documentation

- **[README.md](README.md)** - Project overview & quick start
- **[INSTALLATION.md](INSTALLATION.md)** - Complete setup guide with troubleshooting
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - Full API reference
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deploy to Heroku, Vercel, etc.
- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - Detailed file descriptions
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to contribute
- **[CHANGELOG.md](CHANGELOG.md)** - Version history

---

## 🔍 Testing

### Test the API
```bash
curl -X POST http://localhost:5000/api/upload-resume \
  -F "file=@sample-resume.pdf" \
  -F "industry=IT/Software"
```

### Health Check
```bash
curl http://localhost:5000/health
```

---

## 🚨 Troubleshooting

**Backend won't start?**
- Check if OpenAI API key is set in `.env`
- Verify Node.js version: `node -v` (should be 16+)
- Check if port 5000 is available

**Frontend won't start?**
- Delete `node_modules` and run `npm install` again
- Clear browser cache
- Check browser console for errors

**File upload not working?**
- Ensure file is PDF or DOCX
- Check file size (max 5MB)
- Verify backend is running

**OpenAI errors?**
- Check API key validity
- Verify you have credits: https://platform.openai.com/account/usage
- Try again (temporary API issues)

---

## 📊 API Endpoints

### POST `/api/upload-resume`
Upload and analyze resume
- **Body**: `file` (PDF/DOCX), `industry` (string)
- **Response**: Complete analysis with score, keywords, skills

### GET `/api/report/:id`
Get saved report (if MongoDB enabled)
- **Params**: `id` (MongoDB ObjectId)
- **Response**: Saved analysis data

### GET `/health`
Health check endpoint
- **Response**: API status

---

## 🎨 Customization

### Add New Industry
Edit `frontend/src/components/HomePage.jsx`:
```javascript
const industries = [
  'Finance',
  'IT/Software',
  'Your New Industry',  // Add here
  // ...
];
```

### Modify AI Prompt
Edit `backend/services/aiService.js`:
```javascript
function createAnalysisPrompt(resumeText, industry) {
  // Customize prompt here
}
```

### Change Colors
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#your-color',
    // ...
  }
}
```

---

## 📦 Deployment

### Quick Deploy Options

**Backend:**
- Heroku: `heroku create && git push heroku main`
- Railway: `railway up`
- Render: Connect GitHub repo

**Frontend:**
- Vercel: `vercel deploy`
- Netlify: `netlify deploy --prod`
- GitHub Pages: `npm run deploy`

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

---

## 💡 Tips

- Start with a real resume for testing
- Try different industries to see variations
- Compare results before/after improvements
- Use suggestions to optimize your resume
- Download PDF for offline reference
- Share results with friends/colleagues

---

## 🤝 Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md)

Areas to help:
- Add features
- Fix bugs
- Improve documentation
- Write tests
- Enhance UI/UX

---

## 📄 License

MIT License - See [LICENSE](LICENSE) file

---

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-repo/discussions)
- **Email**: support@example.com

---

## 🎉 Success!

You now have a fully functional ATS Resume Checker!

**Next Steps:**
1. ✅ Test with your resume
2. ✅ Deploy to production
3. ✅ Share with friends
4. ✅ Star the repo ⭐
5. ✅ Contribute improvements

Happy job hunting! 🚀

---

Built with ❤️ by Senior Full-Stack Developer
