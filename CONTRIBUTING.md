# Contributing to ATS Resume Checker

First off, thank you for considering contributing to ATS Resume Checker! It's people like you that make this tool better for everyone.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [How Can I Contribute?](#how-can-i-contribute)
4. [Development Workflow](#development-workflow)
5. [Coding Standards](#coding-standards)
6. [Commit Guidelines](#commit-guidelines)
7. [Pull Request Process](#pull-request-process)

## Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code. Please be respectful and constructive in all interactions.

## Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/ats-resume-checker.git
   cd ats-resume-checker
   ```

3. **Set up the development environment**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

4. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected behavior**
- **Actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (OS, Node version, browser)

**Bug Report Template:**
```markdown
## Bug Description
A clear description of the bug.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen.

## Actual Behavior
What actually happens.

## Environment
- OS: [e.g., macOS 14.0]
- Node: [e.g., v18.17.0]
- Browser: [e.g., Chrome 120]

## Screenshots
Add screenshots if applicable.
```

### Suggesting Features

Feature requests are welcome! Please provide:

- **Clear use case**
- **Expected behavior**
- **Why this would be useful**
- **Possible implementation** (optional)

**Feature Request Template:**
```markdown
## Feature Description
Clear description of the feature.

## Use Case
Why this feature would be useful.

## Proposed Solution
How you envision this working.

## Alternatives Considered
Other solutions you've thought about.
```

### Code Contributions

We love code contributions! Here are areas where you can help:

#### Backend
- Add new analysis features
- Improve AI prompts
- Optimize file parsing
- Add new file format support
- Enhance error handling
- Write tests
- Improve documentation

#### Frontend
- Add new UI components
- Improve accessibility
- Enhance visualizations
- Add animations
- Improve mobile responsiveness
- Write tests
- Update documentation

#### Infrastructure
- CI/CD improvements
- Docker support
- Testing framework
- Monitoring and logging
- Performance optimization

## Development Workflow

### 1. Set Up Local Environment

```bash
# Backend
cd backend
npm install
cp .env.example .env
# Add your OpenAI API key to .env

# Frontend
cd frontend
npm install
```

### 2. Run Development Servers

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

### 3. Make Your Changes

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update documentation if needed

### 4. Test Your Changes

```bash
# Backend
cd backend
npm test  # (if tests exist)

# Frontend
cd frontend
npm test  # (if tests exist)

# Manual testing
# Test all affected features
# Check responsive design
# Test in multiple browsers
```

### 5. Commit Your Changes

```bash
git add .
git commit -m "feat: add new feature"
```

See [Commit Guidelines](#commit-guidelines) below.

### 6. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## Coding Standards

### JavaScript/React

**Style Guide:**
- Use ES6+ features
- Use functional components with hooks
- Use const/let, not var
- Use arrow functions
- Use template literals
- Use destructuring
- Avoid nested ternaries
- Keep functions small and focused

**Example:**
```javascript
// Good ✅
const handleSubmit = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await api.upload(formData);
    return response.data;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};

// Bad ❌
var handleSubmit = function(file) {
  var formData = new FormData();
  formData.append('file', file);
  // Missing error handling
  return api.upload(formData);
}
```

### File Naming

- Components: PascalCase (e.g., `HomePage.jsx`)
- Utilities: camelCase (e.g., `fileParser.js`)
- Styles: kebab-case (e.g., `custom-styles.css`)
- Tests: `*.test.js` or `*.spec.js`

### Project Structure

```
src/
├── components/        # React components
├── services/          # API and external services
├── utils/             # Utility functions
├── hooks/             # Custom React hooks
├── contexts/          # React contexts
└── assets/            # Images, fonts, etc.
```

### Comments

```javascript
// Good ✅
/**
 * Analyzes resume text using OpenAI API
 * @param {string} resumeText - Extracted resume text
 * @param {string} industry - Target industry
 * @returns {Promise<Object>} Analysis results
 */
async function analyzeResume(resumeText, industry) {
  // Implementation
}

// Bad ❌
// This function analyzes resume
function analyzeResume(text, ind) {
  // Code
}
```

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/).

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, semicolons)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples

```bash
# Feature
git commit -m "feat(upload): add drag and drop support"

# Bug fix
git commit -m "fix(api): handle empty file uploads"

# Documentation
git commit -m "docs(readme): update installation steps"

# Multiple lines
git commit -m "feat(analysis): add keyword extraction

- Implement keyword matching algorithm
- Add industry-specific keyword lists
- Update AI prompt for better results

Closes #123"
```

### Scope

Common scopes:
- `upload`: File upload features
- `analysis`: Resume analysis
- `ui`: User interface
- `api`: Backend API
- `db`: Database
- `auth`: Authentication
- `docs`: Documentation

## Pull Request Process

### Before Submitting

1. **Test thoroughly**
   - All features work as expected
   - No console errors
   - No broken functionality

2. **Update documentation**
   - README if needed
   - API docs if endpoints changed
   - Code comments

3. **Clean commit history**
   ```bash
   # Rebase if needed
   git rebase -i HEAD~n
   ```

4. **Ensure code quality**
   - No linting errors
   - Follows style guide
   - Well-commented

### PR Template

```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## How Has This Been Tested?
Describe testing performed.

## Screenshots (if applicable)
Add screenshots.

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests added (if applicable)
- [ ] All tests pass
```

### Review Process

1. **Automated checks**
   - CI/CD pipeline passes
   - No conflicts with main

2. **Code review**
   - At least one approval required
   - Address review comments
   - Make requested changes

3. **Merge**
   - Squash and merge (preferred)
   - Rebase and merge
   - Create merge commit

### After Merge

- Delete your branch
- Close related issues
- Update changelog

## Development Tips

### Debugging

**Backend:**
```javascript
// Add console logs
console.log('📄 Processing file:', fileName);
console.log('✅ Analysis complete:', result);

// Use debugger
debugger;
```

**Frontend:**
```javascript
// React DevTools
// Chrome/Firefox extension

// Console logs
console.log('State:', state);
console.log('Props:', props);
```

### Testing Locally

```bash
# Test file upload
curl -X POST http://localhost:5000/api/upload-resume \
  -F "file=@sample.pdf" \
  -F "industry=IT/Software"

# Test health endpoint
curl http://localhost:5000/health
```

### Common Issues

**Port already in use:**
```bash
# Find process
lsof -i :5000
# Kill process
kill -9 <PID>
```

**Module not found:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**CORS errors:**
```javascript
// Check CORS configuration in server.js
app.use(cors({
  origin: 'http://localhost:3000'
}));
```

## Getting Help

- **Questions?** Open a discussion
- **Stuck?** Ask in issues
- **Ideas?** Start a discussion

## Recognition

Contributors will be:
- Listed in README
- Mentioned in release notes
- Given credit in changelog

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
