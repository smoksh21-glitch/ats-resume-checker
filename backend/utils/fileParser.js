const fs = require('fs').promises;
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const path = require('path');

/**
 * Extract text from PDF file
 */
async function extractFromPDF(filePath) {
  try {
    const dataBuffer = await fs.readFile(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } catch (error) {
    throw new Error(`PDF parsing error: ${error.message}`);
  }
}

/**
 * Extract text from DOCX file
 */
async function extractFromDOCX(filePath) {
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  } catch (error) {
    throw new Error(`DOCX parsing error: ${error.message}`);
  }
}

/**
 * Main function to extract text from resume
 */
async function extractTextFromResume(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  let text = '';

  if (ext === '.pdf') {
    text = await extractFromPDF(filePath);
  } else if (ext === '.docx' || ext === '.doc') {
    text = await extractFromDOCX(filePath);
  } else {
    throw new Error('Unsupported file format. Please upload PDF or DOCX file.');
  }

  // Clean up the text
  text = text
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  if (!text || text.length < 50) {
    throw new Error('Could not extract sufficient text from the resume. Please ensure the file is not corrupted or password-protected.');
  }

  return text;
}

/**
 * Delete uploaded file after processing
 */
async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath);
  } catch (error) {
    console.error('Error deleting file:', error);
  }
}

module.exports = {
  extractTextFromResume,
  deleteFile
};
