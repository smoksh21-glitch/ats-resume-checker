# API Documentation

## Base URL
```
Development: http://localhost:5000
Production: https://your-api-domain.com
```

## Authentication
Currently, no authentication is required. In production, consider implementing:
- API keys
- JWT tokens
- OAuth 2.0

---

## Endpoints

### 1. Health Check

Check if the API is running.

**Endpoint:** `GET /health`

**Request:**
```bash
curl http://localhost:5000/health
```

**Response:**
```json
{
  "status": "OK",
  "message": "ATS Resume Checker API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Status Codes:**
- `200 OK`: API is healthy

---

### 2. Upload and Analyze Resume

Upload a resume file and get AI-powered ATS analysis.

**Endpoint:** `POST /api/upload-resume`

**Content-Type:** `multipart/form-data`

**Request Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| file | File | Yes | Resume file (PDF or DOCX, max 5MB) |
| industry | String | Yes | Target industry for analysis |

**Supported Industries:**
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

**Example Request (cURL):**
```bash
curl -X POST http://localhost:5000/api/upload-resume \
  -F "file=@/path/to/resume.pdf" \
  -F "industry=IT/Software"
```

**Example Request (JavaScript):**
```javascript
const formData = new FormData();
formData.append('file', fileObject);
formData.append('industry', 'IT/Software');

const response = await fetch('http://localhost:5000/api/upload-resume', {
  method: 'POST',
  body: formData
});

const data = await response.json();
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "score": 85,
    "keywordMatch": 78,
    "missingKeywords": [
      "Python",
      "AWS",
      "Docker",
      "Kubernetes",
      "CI/CD"
    ],
    "skillsFound": [
      "JavaScript",
      "React",
      "Node.js",
      "MongoDB",
      "Git"
    ],
    "skillsMissing": [
      "TypeScript",
      "GraphQL",
      "Redis",
      "Microservices"
    ],
    "formatIssues": [
      "Use bullet points consistently",
      "Add quantifiable metrics to achievements",
      "Include contact information in header"
    ],
    "suggestions": [
      "Add specific metrics to your achievements (e.g., 'Increased performance by 40%')",
      "Include cloud technologies like AWS or Azure",
      "Highlight leadership and collaboration skills",
      "Add certifications if any",
      "Use action verbs at the start of bullet points"
    ],
    "improvedBullets": [
      "Led development of e-commerce platform serving 50,000+ users, increasing conversion rate by 35%",
      "Architected and implemented microservices architecture, reducing deployment time from 2 hours to 15 minutes",
      "Mentored team of 5 junior developers, improving code quality scores by 40% through peer reviews"
    ],
    "fileName": "John_Doe_Resume.pdf",
    "industry": "IT/Software",
    "reportId": "507f1f77bcf86cd799439011"
  }
}
```

**Error Responses:**

**400 Bad Request - No File:**
```json
{
  "success": false,
  "error": "No file uploaded. Please upload a PDF or DOCX file."
}
```

**400 Bad Request - No Industry:**
```json
{
  "success": false,
  "error": "Industry is required."
}
```

**400 Bad Request - Invalid File Type:**
```json
{
  "success": false,
  "error": "Invalid file type. Only PDF and DOCX files are allowed."
}
```

**400 Bad Request - File Too Large:**
```json
{
  "success": false,
  "error": "File size too large. Maximum size is 5MB."
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "error": "Failed to process resume. Please try again."
}
```

---

### 3. Get Report by ID

Retrieve a previously saved report (requires MongoDB).

**Endpoint:** `GET /api/report/:id`

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | String | MongoDB ObjectId of the report |

**Example Request:**
```bash
curl http://localhost:5000/api/report/507f1f77bcf86cd799439011
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "fileName": "John_Doe_Resume.pdf",
    "industry": "IT/Software",
    "score": 85,
    "keywordMatch": 78,
    "missingKeywords": ["Python", "AWS"],
    "skillsFound": ["JavaScript", "React"],
    "skillsMissing": ["TypeScript"],
    "formatIssues": ["Use bullet points"],
    "suggestions": ["Add metrics"],
    "improvedBullets": ["Led team..."],
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**

**400 Bad Request - Invalid ID:**
```json
{
  "success": false,
  "error": "Invalid report ID."
}
```

**404 Not Found:**
```json
{
  "success": false,
  "error": "Report not found."
}
```

**503 Service Unavailable - Database Not Connected:**
```json
{
  "success": false,
  "error": "Database not available. Reports are not persisted."
}
```

---

## Response Fields

### Analysis Data Object

| Field | Type | Description |
|-------|------|-------------|
| score | Number | ATS compatibility score (0-100) |
| keywordMatch | Number | Percentage of industry keywords found (0-100) |
| missingKeywords | Array[String] | Important keywords not found in resume |
| skillsFound | Array[String] | Technical and soft skills identified |
| skillsMissing | Array[String] | Important skills missing for the industry |
| formatIssues | Array[String] | Formatting problems that affect ATS parsing |
| suggestions | Array[String] | Actionable improvement recommendations |
| improvedBullets | Array[String] | AI-rewritten achievement bullet points |
| fileName | String | Original uploaded file name |
| industry | String | Selected industry for analysis |
| reportId | String | MongoDB ObjectId (only if database is enabled) |

---

## Rate Limiting

**Current:** No rate limiting implemented

**Recommended for Production:**
- 10 requests per minute per IP
- 100 requests per hour per IP
- Implement using `express-rate-limit`

**Example Implementation:**
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.'
});

app.use('/api/', limiter);
```

---

## Error Handling

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

In development mode, stack traces are included:

```json
{
  "success": false,
  "error": "Error message",
  "stack": "Error stack trace..."
}
```

---

## File Upload Specifications

### Supported Formats
- PDF (.pdf)
- Microsoft Word (.doc, .docx)

### Size Limits
- Maximum: 5MB
- Minimum: 1KB (effective minimum for text extraction)

### Validation
- MIME type checking
- File extension validation
- Size validation
- Content extraction verification

---

## OpenAI Integration

### Model Used
- **Model:** gpt-4o-mini
- **Max Tokens:** 2000
- **Temperature:** 0.7

### Prompt Structure
The AI receives:
1. System context (ATS analyzer role)
2. Resume text
3. Target industry
4. Structured output format (JSON)

### Response Parsing
- JSON extraction and validation
- Fallback error handling
- Data normalization

---

## CORS Configuration

**Allowed Origins:**
- Development: `http://localhost:3000`
- Production: Set via `FRONTEND_URL` environment variable

**Allowed Methods:**
- GET
- POST
- OPTIONS

**Allowed Headers:**
- Content-Type
- Authorization (future use)

---

## Best Practices

### Client Implementation

1. **File Validation (Client-Side):**
```javascript
function validateFile(file) {
  const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    throw new Error('Invalid file type');
  }
  
  if (file.size > maxSize) {
    throw new Error('File too large');
  }
  
  return true;
}
```

2. **Error Handling:**
```javascript
try {
  const response = await fetch('/api/upload-resume', {
    method: 'POST',
    body: formData
  });
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error);
  }
  
  // Handle success
} catch (error) {
  console.error('Upload failed:', error);
  // Show user-friendly error message
}
```

3. **Loading States:**
```javascript
setLoading(true);
try {
  // API call
} finally {
  setLoading(false);
}
```

---

## Testing

### Manual Testing

**Test 1: Valid Upload**
```bash
curl -X POST http://localhost:5000/api/upload-resume \
  -F "file=@sample-resume.pdf" \
  -F "industry=IT/Software"
```

**Test 2: Invalid File Type**
```bash
curl -X POST http://localhost:5000/api/upload-resume \
  -F "file=@document.txt" \
  -F "industry=IT/Software"
```

**Test 3: Missing Industry**
```bash
curl -X POST http://localhost:5000/api/upload-resume \
  -F "file=@sample-resume.pdf"
```

### Automated Testing

Use tools like:
- Postman
- Insomnia
- Jest + Supertest (for integration tests)

---

## Changelog

### v1.0.0 (Initial Release)
- Resume upload endpoint
- AI analysis integration
- Report retrieval endpoint
- Health check endpoint

---

## Support

For API issues or questions:
- GitHub Issues: [Repository URL]
- Email: support@example.com
- Documentation: [Docs URL]

---

## License

MIT License - See LICENSE file for details
