const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  keywordMatch: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  missingKeywords: [String],
  skillsFound: [String],
  skillsMissing: [String],
  formatIssues: [String],
  suggestions: [String],
  improvedBullets: [String],
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 2592000 // Auto-delete after 30 days
  }
}, {
  timestamps: true
});

// Index for faster queries
reportSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Report', reportSchema);
