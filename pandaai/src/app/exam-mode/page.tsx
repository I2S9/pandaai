"use client";
import React, { useState } from 'react';
import Image from 'next/image';

export default function ExamModePage() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleNext = async () => {
    if (!file) return;
    
    try {
      console.log('Uploading file:', file);
      
      // Upload the file to get extracted text
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/extract-pdf', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('File uploaded successfully:', data);
        
        // Store the extracted text for the configuration page
        localStorage.setItem('uploadedFileData', JSON.stringify({
          filename: file.name,
          extractedText: data.extractedText,
          contentType: data.contentType,
          pages: data.pages
        }));
        
        // Redirect to configuration page
        window.location.href = '/exam-mode/configure';
      } else {
        const errorData = await response.json();
        console.error('Upload failed:', errorData);
        alert('Erreur lors de l\'upload: ' + (errorData.error || 'Erreur inconnue'));
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Erreur lors de l\'upload du fichier. Vérifiez votre connexion internet.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex flex-col items-center py-12 px-4">
      {/* Titre */}
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-8">Exam Mode</h1>
      
      {/* Image */}
      <div className="mb-16">
        <Image 
          src="/exam-mode-section.png" 
          alt="Exam mode illustration" 
          width={400} 
          height={300}
          className="w-auto h-auto max-w-full"
        />
      </div>

      {/* Étapes */}
      <div className="flex flex-col md:flex-row justify-center gap-12 w-full max-w-6xl mb-10">
        {/* Step 1 */}
        <div className="flex-1 flex flex-row items-start text-left">
          <span className="text-[80px] font-bold text-[#F2B2BC] opacity-40 mr-4 leading-none">1</span>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 whitespace-nowrap overflow-hidden text-ellipsis">Upload Past Exam Papers</h2>
            <p className="text-base text-gray-800 max-w-xs">Upload previous exam papers or past exam questions. Our AI analyzes the content and structure to generate a similar exam experience.</p>
          </div>
        </div>
        {/* Step 2 */}
        <div className="flex-1 flex flex-row items-start text-left">
          <span className="text-[80px] font-bold text-[#F2B2BC] opacity-40 mr-4 leading-none">2</span>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 whitespace-nowrap overflow-hidden text-ellipsis">Set Exam Parameters</h2>
            <p className="text-base text-gray-800 max-w-xs">Define your exam duration, number of questions, difficulty level, and specific topics you want to focus on for your practice session.</p>
          </div>
        </div>
        {/* Step 3 */}
        <div className="flex-1 flex flex-row items-start text-left">
          <span className="text-[80px] font-bold text-[#F2B2BC] opacity-40 mr-4 leading-none">3</span>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 whitespace-nowrap overflow-hidden text-ellipsis">Get Score & Detailed Feedback</h2>
            <p className="text-base text-gray-800 max-w-xs">Complete your AI-generated exam and receive an instant score with detailed explanations for each answer to help you improve.</p>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Upload Your Documents</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Past Exam Papers
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#F2B2BC] transition-colors">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
              id="exam-upload"
            />
            <label htmlFor="exam-upload" className="cursor-pointer">
              <div className="space-y-2">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-[#F2B2BC] hover:text-[#E8A0AC]">Click to upload</span> or drag and drop
                </div>
                <p className="text-xs text-gray-500">PDF, DOC, DOCX files only</p>
              </div>
            </label>
          </div>
          {file && (
            <p className="mt-2 text-sm text-green-600">✓ {file.name} selected</p>
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={!file}
          className="bg-[#F2B2BC] hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm text-white font-bold rounded-xl px-8 py-3 text-lg shadow-lg border-2 border-[#F2B2BC] transition w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          style={{boxShadow: '0 4px 0 #E8A0AC'}}
        >
          Next
        </button>
      </div>
    </div>
  );
} 