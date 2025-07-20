"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ExamConfig {
  duration: number;
  allowDocuments: boolean;
  allowCalculator: boolean;
  documents: File[];
}

export default function ExamConfigurePage() {
  const router = useRouter();
  const [config, setConfig] = useState<ExamConfig>({
    duration: 60,
    allowDocuments: false,
    allowCalculator: false,
    documents: []
  });

  const [uploadedFile, setUploadedFile] = useState<{
    filename: string;
    pages: number;
    contentType?: {
      examType: string;
      hasQuestions: boolean;
      hasMath: boolean;
      hasMultipleChoice: boolean;
    };
    extractedText?: string;
  } | null>(null);

  // Load uploaded file data
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const uploadedFileData = localStorage.getItem('uploadedFileData');
      if (uploadedFileData) {
        try {
          const fileData = JSON.parse(uploadedFileData);
          setUploadedFile(fileData);
        } catch (error) {
          console.error('Error parsing uploaded file data:', error);
        }
      }
    }
  }, []);

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newDocuments = Array.from(e.target.files);
      setConfig(prev => ({
        ...prev,
        documents: [...prev.documents, ...newDocuments]
      }));
    }
  };

  const removeDocument = (index: number) => {
    setConfig(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const handleGenerateExam = async () => {
    try {
      console.log('Generating exam with config:', config);
      
      // Get extracted text from localStorage (from main page)
      let extractedText = "Exam document with questions and exercises.";
      
      if (typeof window !== 'undefined') {
        const uploadedFileData = localStorage.getItem('uploadedFileData');
        if (uploadedFileData) {
          const fileData = JSON.parse(uploadedFileData);
          extractedText = fileData.extractedText || extractedText;
        }
      }
      
      const response = await fetch('/api/generate-exam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          duration: config.duration,
          allowDocuments: config.allowDocuments,
          allowCalculator: config.allowCalculator,
          extractedText: extractedText
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Exam generated:', data);
        // Store generated exam data
        if (typeof window !== 'undefined') {
          localStorage.setItem('generatedExam', JSON.stringify(data.exam));
        }
        router.push('/exam-mode/generate');
      } else {
        const errorData = await response.json();
        console.error('Failed to generate exam:', errorData);
        alert('Error generating exam: ' + (errorData.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error generating exam:', error);
      alert('Error generating exam. Please check your internet connection.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex flex-col items-center py-12 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Configure Your Exam</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Set up your exam parameters and upload any allowed documents for reference during the exam.
        </p>
      </div>

      {/* Uploaded File Info */}
      {uploadedFile && (
        <div className="w-full max-w-4xl bg-blue-50 rounded-2xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Uploaded Document</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-blue-700 font-medium">File:</span>
              <span className="ml-2 text-blue-800">{uploadedFile.filename}</span>
            </div>
            <div>
              <span className="text-blue-700 font-medium">Pages:</span>
              <span className="ml-2 text-blue-800">{uploadedFile.pages}</span>
            </div>
            <div>
              <span className="text-blue-700 font-medium">Detected Type:</span>
              <span className="ml-2 text-blue-800 capitalize">{uploadedFile.contentType?.examType || 'mixed'}</span>
            </div>
          </div>
          {uploadedFile.contentType && (
            <div className="mt-3 text-xs text-blue-600">
              {uploadedFile.contentType.hasQuestions && "✓ Contains questions "}
              {uploadedFile.contentType.hasMath && "✓ Contains calculations "}
              {uploadedFile.contentType.hasMultipleChoice && "✓ Multiple choice questions "}
            </div>
          )}
        </div>
      )}

      {/* Configuration Form */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Basic Settings */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Exam Settings</h2>
            
            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Exam Duration (minutes)
              </label>
              <select
                value={config.duration}
                onChange={(e) => setConfig(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2B2BC] focus:border-transparent"
              >
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={90}>1.5 hours</option>
                <option value={120}>2 hours</option>
                <option value={180}>3 hours</option>
              </select>
            </div>


          </div>

          {/* Right Column - Allowed Resources */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Allowed Resources</h2>
            
            {/* Allow Documents */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="allowDocuments"
                checked={config.allowDocuments}
                onChange={(e) => setConfig(prev => ({ ...prev, allowDocuments: e.target.checked }))}
                className="h-4 w-4 text-[#F2B2BC] focus:ring-[#F2B2BC] border-gray-300 rounded"
              />
              <label htmlFor="allowDocuments" className="text-sm font-medium text-gray-700">
                Allow reference documents during exam
              </label>
            </div>

            {/* Allow Calculator */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="allowCalculator"
                checked={config.allowCalculator}
                onChange={(e) => setConfig(prev => ({ ...prev, allowCalculator: e.target.checked }))}
                className="h-4 w-4 text-[#F2B2BC] focus:ring-[#F2B2BC] border-gray-300 rounded"
              />
              <label htmlFor="allowCalculator" className="text-sm font-medium text-gray-700">
                Allow calculator during exam
              </label>
            </div>

            {/* Document Upload */}
            {config.allowDocuments && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Reference Documents
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#F2B2BC] transition-colors">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleDocumentUpload}
                    className="hidden"
                    id="reference-documents"
                  />
                  <label htmlFor="reference-documents" className="cursor-pointer">
                    <div className="space-y-2">
                      <svg className="mx-auto h-8 w-8 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium text-[#F2B2BC] hover:text-[#E8A0AC]">Click to upload</span> reference documents
                      </div>
                      <p className="text-xs text-gray-500">PDF, DOC, DOCX, TXT files</p>
                    </div>
                  </label>
                </div>

                {/* Uploaded Documents List */}
                {config.documents.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">Uploaded Documents:</h4>
                    {config.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm text-gray-600 truncate">{doc.name}</span>
                        <button
                          onClick={() => removeDocument(index)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm font-bold shadow-lg transition cursor-pointer"
            style={{boxShadow: '0 4px 0 #9CA3AF'}}
          >
            Back
          </button>
          <button
            onClick={handleGenerateExam}
            className="bg-[#F2B2BC] hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm text-white font-bold rounded-xl px-8 py-3 text-lg shadow-lg border-2 border-[#F2B2BC] transition cursor-pointer"
            style={{boxShadow: '0 4px 0 #E8A0AC'}}
          >
            Generate Exam
          </button>
        </div>
      </div>
    </div>
  );
} 