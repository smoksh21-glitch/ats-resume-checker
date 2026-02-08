import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ScoreGauge from './ScoreGauge';
import jsPDF from 'jspdf';
import {
  ArrowLeft,
  Download,
  Copy,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  FileText,
  Lightbulb,
  Target
} from 'lucide-react';

function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const analysisData = location.state?.analysisData;

  if (!analysisData) {
    navigate('/');
    return null;
  }

  const {
    score,
    keywordMatch,
    missingKeywords,
    skillsFound,
    skillsMissing,
    formatIssues,
    suggestions,
    improvedBullets,
    fileName,
    industry
  } = analysisData;

  const handleCopySuggestions = () => {
    const text = suggestions.join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadReport = () => {
    const doc = new jsPDF();
    let yPosition = 20;

    // Title
    doc.setFontSize(20);
    doc.text('ATS Resume Analysis Report', 20, yPosition);
    yPosition += 15;

    // File info
    doc.setFontSize(12);
    doc.text(`File: ${fileName}`, 20, yPosition);
    yPosition += 7;
    doc.text(`Industry: ${industry}`, 20, yPosition);
    yPosition += 7;
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, yPosition);
    yPosition += 15;

    // Score
    doc.setFontSize(16);
    doc.text(`ATS Score: ${score}/100`, 20, yPosition);
    yPosition += 10;
    doc.text(`Keyword Match: ${keywordMatch}%`, 20, yPosition);
    yPosition += 15;

    // Missing Keywords
    doc.setFontSize(14);
    doc.text('Missing Keywords:', 20, yPosition);
    yPosition += 7;
    doc.setFontSize(10);
    missingKeywords.forEach((keyword, idx) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(`- ${keyword}`, 25, yPosition);
      yPosition += 5;
    });
    yPosition += 10;

    // Skills Missing
    doc.setFontSize(14);
    doc.text('Skills to Add:', 20, yPosition);
    yPosition += 7;
    doc.setFontSize(10);
    skillsMissing.forEach((skill, idx) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(`- ${skill}`, 25, yPosition);
      yPosition += 5;
    });
    yPosition += 10;

    // Suggestions
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    doc.setFontSize(14);
    doc.text('Improvement Suggestions:', 20, yPosition);
    yPosition += 7;
    doc.setFontSize(10);
    suggestions.forEach((suggestion, idx) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      const lines = doc.splitTextToSize(`${idx + 1}. ${suggestion}`, 170);
      lines.forEach(line => {
        doc.text(line, 25, yPosition);
        yPosition += 5;
      });
      yPosition += 2;
    });

    doc.save(`ATS_Report_${fileName.replace(/\.[^/.]+$/, '')}.pdf`);
  };

  const handleDownloadOptimizedText = () => {
    let content = `OPTIMIZED RESUME SUGGESTIONS\n\n`;
    content += `Original File: ${fileName}\n`;
    content += `Industry: ${industry}\n`;
    content += `ATS Score: ${score}/100\n\n`;
    content += `=== IMPROVED BULLET POINTS ===\n\n`;
    improvedBullets.forEach((bullet, idx) => {
      content += `${idx + 1}. ${bullet}\n\n`;
    });
    content += `\n=== MISSING KEYWORDS TO ADD ===\n\n`;
    missingKeywords.forEach(keyword => {
      content += `- ${keyword}\n`;
    });
    content += `\n=== SKILLS TO ADD ===\n\n`;
    skillsMissing.forEach(skill => {
      content += `- ${skill}\n`;
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Optimized_Resume_${fileName.replace(/\.[^/.]+$/, '')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Analyze Another Resume</span>
          </button>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Resume Analysis Results
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {fileName} • {industry}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={handleDownloadReport}
            className="btn-primary flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF Report</span>
          </button>
          <button
            onClick={handleDownloadOptimizedText}
            className="btn-secondary flex items-center space-x-2"
          >
            <FileText className="w-4 h-4" />
            <span>Download Optimized Text</span>
          </button>
          <button
            onClick={handleCopySuggestions}
            className="btn-secondary flex items-center space-x-2"
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Suggestions</span>
              </>
            )}
          </button>
        </div>

        {/* Score Overview */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* ATS Score */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <Target className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              <span>ATS Score</span>
            </h2>
            <ScoreGauge score={score} />
            <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
              Your resume scores <strong>{score}/100</strong> for ATS compatibility
            </p>
          </div>

          {/* Keyword Match */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <TrendingUp className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              <span>Keyword Match</span>
            </h2>
            <div className="py-8">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-5xl font-bold text-primary-600 dark:text-primary-400">
                      {keywordMatch}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    style={{ width: `${keywordMatch}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-600 transition-all duration-500"
                  ></div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                Your resume matches <strong>{keywordMatch}%</strong> of industry keywords
              </p>
            </div>
          </div>
        </div>

        {/* Skills Analysis */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Skills Found */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              <span>Skills Found ({skillsFound.length})</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {skillsFound.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Skills Missing */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              <span>Skills to Add ({skillsMissing.length})</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {skillsMissing.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Missing Keywords */}
        <div className="card mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
            <AlertCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            <span>Missing Keywords</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {missingKeywords.map((keyword, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Format Issues */}
        {formatIssues.length > 0 && (
          <div className="card mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              <span>Format Issues</span>
            </h2>
            <ul className="space-y-2">
              {formatIssues.map((issue, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-yellow-600 dark:text-yellow-400 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">{issue}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Suggestions */}
        <div className="card mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
            <Lightbulb className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            <span>Improvement Suggestions</span>
          </h2>
          <div className="space-y-4">
            {suggestions.map((suggestion, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {idx + 1}
                </div>
                <p className="text-gray-700 dark:text-gray-300 flex-1">{suggestion}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Improved Bullets */}
        {improvedBullets.length > 0 && (
          <div className="card">
            <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <FileText className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              <span>Improved Bullet Points</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Use these rewritten bullet points to enhance your resume:
            </p>
            <div className="space-y-3">
              {improvedBullets.map((bullet, idx) => (
                <div key={idx} className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border-l-4 border-primary-600">
                  <p className="text-gray-800 dark:text-gray-200">{bullet}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultsPage;
