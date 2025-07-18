"use client";
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function SmartNotesPage() {
  const router = useRouter();
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        await processAudio();
      };

      mediaRecorder.start();
      setIsRecording(true);
      setError('');
    } catch {
      setError('Unable to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const processAudio = async () => {
    setIsProcessing(true);
    setError('');
    
    try {
      // Créer un blob audio à partir des chunks enregistrés
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      
      // Envoyer à l'API de transcription
      const formData = new FormData();
      formData.append('audio', audioBlob);
      
      const response = await fetch('/api/transcribe-audio', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to transcribe audio');
      }

      const data = await response.json();
      // Rediriger vers la page de résultats avec la transcription
      router.push(`/smart-notes-results?transcription=${encodeURIComponent(data.transcription)}`);
    } catch {
      setError('Failed to process audio recording.');
      setIsProcessing(false);
    }
  };

  const processYoutubeUrl = async () => {
    if (!youtubeUrl.trim()) {
      setError('Please enter a YouTube URL');
      return;
    }

    setIsProcessing(true);
    setError('');
    
    try {
      const response = await fetch('/api/transcribe-youtube', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: youtubeUrl })
      });

      if (!response.ok) {
        throw new Error('Failed to transcribe YouTube video');
      }

      const data = await response.json();
      // Rediriger vers la page de résultats avec la transcription
      router.push(`/smart-notes-results?transcription=${encodeURIComponent(data.transcription)}`);
    } catch {
      setError('Failed to process YouTube video.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12 px-4">
      {/* Titre */}
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">Smart Notes</h1>
      
      {/* Étapes */}
      <div className="flex flex-col md:flex-row justify-center gap-12 w-full max-w-6xl mb-16">
        {/* Step 1 */}
        <div className="flex-1 flex flex-row items-start text-left">
          <span className="text-[80px] font-bold text-[#F7DC6F] opacity-80 mr-4 leading-none">1</span>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Input Content</h2>
            <p className="text-base text-gray-800 max-w-xs">Copy the YouTube video link of your choice for your studies or record a free conversation from your course with your professor. Start by either pasting a YouTube URL or recording audio from your class or study session.</p>
          </div>
        </div>
        
        {/* Step 2 */}
        <div className="flex-1 flex flex-row items-start text-left">
          <span className="text-[80px] font-bold text-[#F7DC6F] opacity-80 mr-4 leading-none">2</span>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Transcribe</h2>
            <p className="text-base text-gray-800 max-w-xs">Transcribe what was said during the audio or video. Our AI will automatically transcribe the content, converting speech to text with high accuracy.</p>
          </div>
        </div>
        
        {/* Step 3 */}
        <div className="flex-1 flex flex-row items-start text-left">
          <span className="text-[80px] font-bold text-[#F7DC6F] opacity-80 mr-4 leading-none">3</span>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Generate Notes</h2>
            <p className="text-base text-gray-800 max-w-xs">Transform this into smart notes by generating summaries, detailed transcriptions, or mind mapping. Choose your preferred format: smart notes, summaries, detailed transcripts, or mind maps for better understanding.</p>
          </div>
        </div>
      </div>

      {/* Options d'entrée */}
      <div className="w-full max-w-4xl mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Choose Your Input Method</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Enregistrement audio */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full border-4 border-[#F7DC6F] flex items-center justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-[#F9E6A0] flex items-center justify-center">
                <svg width="32" height="32" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="12" y1="19" x2="12" y2="23" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="8" y1="23" x2="16" y2="23" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Record Audio</h3>
            <p className="text-base text-gray-600 text-center mb-6">Record your class or study session</p>
            <div className="w-full flex-1 flex items-end">
              <button
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isProcessing}
                className={`w-full rounded-xl px-8 py-4 font-bold text-lg shadow-lg border-2 transition cursor-pointer ${
                  isRecording
                    ? 'bg-red-500 hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm text-white border-red-500'
                    : 'bg-[#F7DC6F] hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm text-white border-[#F7DC6F]'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                style={{boxShadow: isRecording ? '0 4px 0 #DC2626' : '0 4px 0 #E6C95A'}}
              >
                {isRecording ? 'Recording...' : 'Start Recording'}
              </button>
            </div>
          </div>

          {/* URL YouTube */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full border-4 border-[#F7DC6F] flex items-center justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-[#F9E6A0] flex items-center justify-center">
                <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="11" fill="none" stroke="white" strokeWidth="2"/>
                  <path d="M9 6l7 6-7 6V6z"/>
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">YouTube URL</h3>
            <p className="text-base text-gray-600 text-center mb-6">Paste a YouTube video link</p>
            <div className="w-full flex-1 flex flex-col justify-end">
              <input
                type="url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://youtube.com/..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:border-[#F7DC6F] text-lg"
                disabled={isProcessing}
              />
              <button
                onClick={processYoutubeUrl}
                disabled={!youtubeUrl.trim() || isProcessing}
                className="w-full bg-[#F7DC6F] hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm text-white font-bold rounded-xl px-8 py-4 text-lg shadow-lg border-2 border-[#F7DC6F] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                style={{boxShadow: '0 4px 0 #E6C95A'}}
              >
                {isProcessing ? 'Processing...' : 'Process Video'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 max-w-2xl">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {isProcessing && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 max-w-2xl">
          <p className="text-blue-800">Processing your content... Please wait.</p>
        </div>
      )}
    </div>
  );
} 