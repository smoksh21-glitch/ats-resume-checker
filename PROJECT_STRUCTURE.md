# Project Structure

```
ats-resume-checker/
│
├── backend/                          # Node.js + Express Backend
│   ├── config/
│   │   └── database.js              # MongoDB connection configuration
│   │
│   ├── controllers/
│   │   └── resumeController.js      # Resume upload and analysis logic
│   │
│   ├── models/
│   │   └── Report.js                # MongoDB schema for reports
│   │
│   ├── routes/
│   │   └── resume.js                # API routes definition
│   │
│   ├── services/
│   │   └── aiService.js             # OpenAI integration service
│   │
│   ├── utils/
│   │   └── fileParser.js            # PDF/DOCX text extraction
│   │
│   ├── uploads/                     # Temporary file storage (gitignored)
│   │
│   ├── .env.example                 # Environment variables template
│   ├── .env                         # Your actual environment variables (create this)
│   ├── package.json                 # Backend dependencies
│   └── server.js                    # Express server entry point
│
├── frontend/                         # React Frontend
│   ├── public/
│   │   └── index.html               # HTML template
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── HomePage.jsx         # Landing page with upload form
│   │   │   ├── ResultsPage.jsx      # Analysis results display
│   │   │   ├── FileUpload.jsx       # Drag & drop file upload component
│   │   │   └── ScoreGauge.jsx       # Circular score gauge visualization
│   │   │
│   │   ├── App.js                   # Main app component with routing
│   │   ├── index.js                 # React entry point
│   │   └── index.css                # Global styles with Tailwind
│   │
│   ├── package.json                 # Frontend dependencies
│   ├── tailwind.config.js           # Tailwind CSS configuration
│   └── postcss.config.js            # PostCSS configuration
│
├── .gitignore                       # Git ignore rules
├── README.md                        # Project overview and quick start
├── INSTALLATION.md                  # Detailed installation guide
└── setup.sh                         # Automated setup script (Unix/Linux/macOS)
```

## File Descriptions

### Backend Files

#### `server.js`
- Main entry point for the backend
- Sets up Express server
- Configures middleware (CORS, body parser)
- Connects to MongoDB (optional)
- Defines routes and error handling

#### `config/database.js`
- MongoDB connection logic
- Handles connection errors gracefully
- Allows app to run without database

#### `controllers/resumeController.js`
- **uploadAndAnalyze**: Handles file upload, text extraction, and AI analysis
- **getReport**: Retrieves saved reports from database

#### `models/Report.js`
- MongoDB schema for storing analysis reports
- Includes TTL index for auto-deletion after 30 days
- Fields: fileName, industry, score, keywords, skills, etc.

#### `routes/resume.js`
- Defines API endpoints
- Configures Multer for file uploads
- File validation (type, size)
- Error handling for upload issues

#### `services/aiService.js`
- OpenAI API integration
- Creates analysis prompts
- Parses and validates AI responses
- Handles API errors

#### `utils/fileParser.js`
- PDF text extraction using pdf-parse
- DOCX text extraction using mammoth
- Text cleaning and validation
- File deletion after processing

### Frontend Files

#### `App.js`
- Main React component
- React Router setup
- Dark mode toggle functionality
- Theme persistence in localStorage

#### `components/HomePage.jsx`
- Landing page UI
- Industry selection dropdown
- File upload integration
- Form validation and submission
- Loading states

#### `components/FileUpload.jsx`
- Drag and drop file upload
- File type and size validation
- Visual feedback for selected files
- File removal functionality

#### `components/ResultsPage.jsx`
- Displays all analysis results
- Score gauge, keyword match
- Skills found/missing
- Format issues and suggestions
- PDF report generation
- Download optimized text
- Copy to clipboard functionality

#### `components/ScoreGauge.jsx`
- Circular gauge using Recharts
- Color-coded score (red, orange, yellow, green)
- Score labels (Needs Improvement, Fair, Good, Excellent)

#### `index.css`
- Tailwind CSS directives
- Custom component styles
- Button and card utilities
- Dark mode styles
- Custom scrollbar
- Loading animations

## Data Flow

```
User uploads resume (PDF/DOCX)
         ↓
FileUpload component validates file
         ↓
HomePage sends to backend API
         ↓
Backend extracts text (fileParser)
         ↓
Text sent to OpenAI (aiService)
         ↓
AI analyzes and returns JSON
         ↓
Backend saves to MongoDB (optional)
         ↓
Response sent to frontend
         ↓
ResultsPage displays analysis
         ↓
User can download reports
```

## API Endpoints

### POST `/api/upload-resume`
**Purpose:** Upload and analyze resume

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body:
  - `file`: Resume file (PDF/DOCX)
  - `industry`: Selected industry (string)

**Response:**
```json
{
  "success": true,
  "data": {
    "score": 85,
    "keywordMatch": 78,
    "missingKeywords": ["Python", "AWS"],
    "skillsFound": ["JavaScript", "React"],
    "skillsMissing": ["Docker"],
    "formatIssues": ["Use bullet points"],
    "suggestions": ["Add metrics"],
    "improvedBullets": ["Led team of 5..."],
    "fileName": "resume.pdf",
    "industry": "IT/Software",
    "reportId": "abc123"
  }
}
```

### GET `/api/report/:id`
**Purpose:** Retrieve saved report

**Request:**
- Method: GET
- Params: `id` (MongoDB ObjectId)

**Response:**
```json
{
  "success": true,
  "data": {
    "score": 85,
    "keywordMatch": 78,
    ...
  }
}
```

### GET `/health`
**Purpose:** Health check endpoint

**Response:**
```json
{
  "status": "OK",
  "message": "ATS Resume Checker API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **OpenAI**: AI analysis
- **pdf-parse**: PDF text extraction
- **mammoth**: DOCX text extraction
- **Multer**: File upload handling
- **Mongoose**: MongoDB ODM
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variables

### Frontend
- **React 18**: UI library
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS
- **Axios**: HTTP client
- **Recharts**: Data visualization
- **Lucide React**: Icon library
- **jsPDF**: PDF generation

## Environment Variables

### Backend (.env)
```env
PORT=5000                             # Server port
NODE_ENV=development                  # Environment (development/production)
OPENAI_API_KEY=sk-xxx                # OpenAI API key (required)
MONGODB_URI=mongodb://localhost:27017/ats-checker  # MongoDB connection (optional)
FRONTEND_URL=http://localhost:3000    # Frontend URL for CORS
```

### Frontend
```json
// In package.json
"proxy": "http://localhost:5000"      // Backend API proxy
```

## Key Features Implementation

### 1. File Upload (Drag & Drop)
- **Component**: `FileUpload.jsx`
- **Technology**: HTML5 File API
- **Features**: Drag and drop, click to browse, file validation

### 2. Resume Parsing
- **Files**: `utils/fileParser.js`
- **Libraries**: pdf-parse, mammoth
- **Supports**: PDF, DOC, DOCX

### 3. AI Analysis
- **File**: `services/aiService.js`
- **Model**: GPT-4o-mini
- **Features**: Industry-specific analysis, JSON response parsing

### 4. Score Visualization
- **Component**: `ScoreGauge.jsx`
- **Library**: Recharts
- **Type**: Pie chart (semi-circle gauge)

### 5. Dark Mode
- **Implementation**: Tailwind CSS dark mode
- **Persistence**: localStorage
- **Toggle**: Global theme toggle button

### 6. PDF Report Generation
- **Library**: jsPDF
- **Features**: Multi-page support, formatted output

### 7. Responsive Design
- **Framework**: Tailwind CSS
- **Breakpoints**: Mobile-first approach
- **Features**: Grid layouts, responsive text

## Database Schema

### Report Collection (MongoDB)
```javascript
{
  _id: ObjectId,
  fileName: String,
  industry: String,
  score: Number (0-100),
  keywordMatch: Number (0-100),
  missingKeywords: [String],
  skillsFound: [String],
  skillsMissing: [String],
  formatIssues: [String],
  suggestions: [String],
  improvedBullets: [String],
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `createdAt` (descending) - for efficient queries
- TTL index on `createdAt` - auto-delete after 30 days

## Security Considerations

1. **File Upload**: Size limit (5MB), type validation
2. **API Key**: Stored in .env, never committed
3. **CORS**: Restricted to frontend URL
4. **Input Validation**: File type, size, industry selection
5. **Error Handling**: No sensitive data in error messages
6. **File Cleanup**: Uploaded files deleted after processing
7. **Rate Limiting**: Should be added for production

## Performance Optimization

1. **File Processing**: Async operations
2. **API Calls**: Single OpenAI request per analysis
3. **Database**: Optional (app works without it)
4. **Frontend**: React lazy loading (can be added)
5. **Caching**: Browser caching for static assets

## Future Enhancements

- [ ] User authentication
- [ ] Multiple resume comparison
- [ ] Resume builder integration
- [ ] Email report delivery
- [ ] LinkedIn profile import
- [ ] Job description matching
- [ ] Resume templates
- [ ] Analytics dashboard
- [ ] Batch processing
- [ ] Premium features
