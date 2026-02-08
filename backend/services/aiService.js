const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Analyze resume using OpenAI
 */
async function analyzeResume(resumeText, industry) {
  try {
    const prompt = createAnalysisPrompt(resumeText, industry);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert ATS (Applicant Tracking System) analyzer. You analyze resumes and provide detailed, actionable feedback. Always respond with valid JSON only, no additional text."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const responseText = completion.choices[0].message.content.trim();
    
    // Remove markdown code blocks if present
    let jsonText = responseText;
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/g, '');
    }

    const analysis = JSON.parse(jsonText);

    // Validate and normalize the response
    return normalizeAnalysis(analysis);

  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    if (error.response) {
      throw new Error(`OpenAI API error: ${error.response.data?.error?.message || error.message}`);
    }
    
    if (error instanceof SyntaxError) {
      throw new Error('Failed to parse AI response. Please try again.');
    }
    
    throw new Error(`AI analysis failed: ${error.message}`);
  }
}

/**
 * Create detailed analysis prompt
 */
function createAnalysisPrompt(resumeText, industry) {
  return `You are an ATS (Applicant Tracking System) analyzer. Analyze this resume for the ${industry} industry.

Resume Text:
${resumeText}

Provide a comprehensive ATS analysis and return ONLY a valid JSON object with this exact structure:

{
  "score": <number 0-100>,
  "keywordMatch": <number 0-100>,
  "missingKeywords": [<array of important missing keywords for ${industry}>],
  "skillsFound": [<array of technical and soft skills found in resume>],
  "skillsMissing": [<array of important skills missing for ${industry}>],
  "formatIssues": [<array of formatting problems like "No bullet points", "Missing contact info", "Poor section organization">],
  "suggestions": [<array of 5-8 specific, actionable improvement suggestions>],
  "improvedBullets": [<array of 3-5 rewritten achievement bullet points with metrics and impact>]
}

Analysis criteria:
1. ATS Score (0-100): Based on keyword optimization, formatting, and completeness
2. Keyword Match %: Percentage of industry-relevant keywords found
3. Missing Keywords: Critical industry-specific terms not found
4. Skills Found: Technical and soft skills identified in the resume
5. Skills Missing: Important skills for ${industry} not mentioned
6. Format Issues: Problems that would cause ATS parsing errors
7. Suggestions: Specific improvements to increase ATS score
8. Improved Bullets: Rewrite 3-5 bullet points using strong action verbs, quantifiable metrics, and clear impact

Be specific, actionable, and focus on ${industry} requirements.
Return ONLY the JSON object, no additional text or formatting.`;
}

/**
 * Normalize and validate AI response
 */
function normalizeAnalysis(analysis) {
  return {
    score: Math.min(100, Math.max(0, parseInt(analysis.score) || 0)),
    keywordMatch: Math.min(100, Math.max(0, parseInt(analysis.keywordMatch) || 0)),
    missingKeywords: Array.isArray(analysis.missingKeywords) ? analysis.missingKeywords : [],
    skillsFound: Array.isArray(analysis.skillsFound) ? analysis.skillsFound : [],
    skillsMissing: Array.isArray(analysis.skillsMissing) ? analysis.skillsMissing : [],
    formatIssues: Array.isArray(analysis.formatIssues) ? analysis.formatIssues : [],
    suggestions: Array.isArray(analysis.suggestions) ? analysis.suggestions : [],
    improvedBullets: Array.isArray(analysis.improvedBullets) ? analysis.improvedBullets : []
  };
}

module.exports = {
  analyzeResume
};
