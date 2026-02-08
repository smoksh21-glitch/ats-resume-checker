# ATS Resume Checker

A modern, full-stack web application that analyzes resumes using AI to provide ATS (Applicant Tracking System) compatibility scores and improvement suggestions.

## 🚀 Features

- **Resume Upload**: Drag & drop or click to upload PDF/DOCX files
- **Industry-Specific Analysis**: Tailored scoring for different industries
- **AI-Powered Insights**: Comprehensive resume analysis using OpenAI
- **ATS Score**: Visual gauge showing 0-100 score
- **Keyword Analysis**: Match percentage and missing keywords
- **Skills Assessment**: Found and missing skills identification
- **Improvement Suggestions**: Actionable tips to enhance your resume
- **PDF Report**: Download detailed analysis report
- **Dark/Light Mode**: Toggle between themes
- **Responsive Design**: Works perfectly on mobile and desktop

## 📋 Tech Stack

### Frontend
- React 18
- Tailwind CSS
- React Router
- Recharts (for visualizations)
- Lucide React (icons)
- jsPDF (PDF generation)

### Backend
- Node.js
- Express.js
- MongoDB (optional)
- Multer (file upload)
- PDF-Parse (PDF text extraction)
- Mammoth (DOCX text extraction)
- OpenAI API

## 🛠️ Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (optional, for storing reports)
- OpenAI API Key

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd ats-resume-checker
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### 4. Environment Setup

Create `.env` file in the `backend` folder:
```env
PORT=5000
OPENAI_API_KEY=your_openai_api_key_here
MONGODB_URI=mongodb://localhost:27017/ats-checker
NODE_ENV=development
```

### 5. Start MongoDB (if using database)
```bash
mongod
```

### 6. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

The app will be available at `http://localhost:3000`

## 📁 Project Structure

```
ats-resume-checker/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── resumeController.js
│   ├── models/
│   │   └── Report.js
│   ├── routes/
│   │   └── resume.js
│   ├── services/
│   │   └── aiService.js
│   ├── utils/
│   │   └── fileParser.js
│   ├── uploads/
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── HomePage.jsx
│   │   │   ├── ResultsPage.jsx
│   │   │   ├── FileUpload.jsx
│   │   │   └── ScoreGauge.jsx
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

## 🔑 API Endpoints

### POST `/api/upload-resume`
Upload and analyze resume

**Request:**
- Content-Type: `multipart/form-data`
- Body: `file` (PDF/DOCX), `industry` (string)

**Response:**
```json
{
  "success": true,
  "data": {
    "score": 85,
    "keywordMatch": 78,
    "missingKeywords": ["Python", "AWS"],
    "skillsFound": ["JavaScript", "React"],
    "skillsMissing": ["Docker", "Kubernetes"],
    "formatIssues": ["Use bullet points"],
    "suggestions": ["Add metrics to achievements"],
    "improvedBullets": ["Developed..."],
    "reportId": "abc123"
  }
}
```

### GET `/api/report/:id`
Get saved report by ID (if MongoDB is enabled)

## 🎨 Customization

### Industries
Edit the industries list in `frontend/src/components/HomePage.jsx`:
```javascript
const industries = [
  "Finance",
  "IT/Software",
  "Marketing",
  "HR",
  "Operations",
  "Custom"
];
```

### AI Prompt
Modify the AI prompt in `backend/services/aiService.js` to customize analysis criteria.

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy the `build` folder

### Backend (Heroku/Railway/Render)
1. Set environment variables
2. Deploy from GitHub or directly

## 🔒 Security Notes

- Never commit `.env` files
- Use CORS properly in production
- Implement rate limiting for API endpoints
- Validate file types and sizes
- Sanitize user inputs

## 📝 License

MIT License

## 👥 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📧 Support

For issues and questions, please open a GitHub issue.

---

Built with ❤️ by Senior Full-Stack Developer
