const { extractTextFromResume, deleteFile } = require('../utils/fileParser');
const { analyzeResume } = require('../services/aiService');
const Report = require('../models/Report');
const mongoose = require('mongoose');

/**
 * Upload and analyze resume
 */
async function uploadAndAnalyze(req, res) {
  let filePath = null;

  try {
    // Validate file upload
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded. Please upload a PDF or DOCX file.'
      });
    }

    filePath = req.file.path;

    // Validate industry
    const industry = req.body.industry;
    if (!industry) {
      return res.status(400).json({
        success: false,
        error: 'Industry is required.'
      });
    }

    console.log(`📄 Processing resume: ${req.file.originalname} for ${industry}`);

    // Extract text from resume
    const resumeText = await extractTextFromResume(filePath);
    console.log(`✅ Extracted ${resumeText.length} characters from resume`);

    // Analyze with AI
    console.log('🤖 Analyzing resume with AI...');
    const analysis = await analyzeResume(resumeText, industry);
    console.log(`✅ Analysis complete. Score: ${analysis.score}`);

    // Prepare response data
    const responseData = {
      ...analysis,
      fileName: req.file.originalname,
      industry: industry
    };

    // Save to database if MongoDB is connected
    let reportId = null;
    if (mongoose.connection.readyState === 1) {
      try {
        const report = new Report(responseData);
        await report.save();
        reportId = report._id.toString();
        console.log(`💾 Report saved to database: ${reportId}`);
      } catch (dbError) {
        console.error('Database save error:', dbError);
        // Continue without saving to database
      }
    }

    // Clean up uploaded file
    await deleteFile(filePath);

    // Send response
    res.status(200).json({
      success: true,
      data: {
        ...responseData,
        reportId: reportId
      }
    });

  } catch (error) {
    console.error('Upload and analyze error:', error);

    // Clean up file if it exists
    if (filePath) {
      await deleteFile(filePath);
    }

    res.status(500).json({
      success: false,
      error: error.message || 'Failed to process resume. Please try again.'
    });
  }
}

/**
 * Get saved report by ID
 */
async function getReport(req, res) {
  try {
    const reportId = req.params.id;

    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        error: 'Database not available. Reports are not persisted.'
      });
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(reportId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid report ID.'
      });
    }

    // Find report
    const report = await Report.findById(reportId);

    if (!report) {
      return res.status(404).json({
        success: false,
        error: 'Report not found.'
      });
    }

    res.status(200).json({
      success: true,
      data: report
    });

  } catch (error) {
    console.error('Get report error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve report.'
    });
  }
}

module.exports = {
  uploadAndAnalyze,
  getReport
};
