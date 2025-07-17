import { NextRequest, NextResponse } from 'next/server';
import { YoutubeTranscript, TranscriptSegment } from 'youtube-transcript-api';
import ytdl from 'ytdl-core';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json(
        { error: 'No YouTube URL provided' },
        { status: 400 }
      );
    }

    // Valider l'URL YouTube
    if (!ytdl.validateURL(url)) {
      return NextResponse.json(
        { error: 'Invalid YouTube URL' },
        { status: 400 }
      );
    }

    // Extraire l'ID de la vidéo
    const videoId = ytdl.getVideoID(url);
    
    try {
      // Obtenir la transcription
      const transcript = await YoutubeTranscript.fetchTranscript(videoId);
      
      // Combiner tous les segments
      const fullText = transcript
        .map((segment: TranscriptSegment) => segment.text)
        .join(' ');

      return NextResponse.json({
        transcription: fullText,
        success: true
      });
    } catch {
      // If transcript is not available, try to extract audio and transcribe
      console.log('Transcript not available, trying audio extraction...');
      
      try {
        // Extract audio stream from YouTube
        const audioStream = ytdl(url, { 
          filter: 'audioonly',
          quality: 'highestaudio'
        });
        
        // Convert audio stream to buffer
        const chunks: Buffer[] = [];
        for await (const chunk of audioStream) {
          chunks.push(chunk);
        }
        const audioBuffer = Buffer.concat(chunks);
        
        // Create a temporary file for Whisper
        const tempFile = new File([audioBuffer], 'audio.webm', { type: 'audio/webm' });
        
        // Transcribe with Whisper API
        const transcription = await openai.audio.transcriptions.create({
          file: tempFile,
          model: "whisper-1",
          language: "auto",
        });
        
        return NextResponse.json({
          transcription: transcription.text,
          success: true,
          message: 'Audio transcription completed'
        });
      } catch {
        return NextResponse.json({
          transcription: "Unable to process this YouTube video. Please try a different video or use the audio recording option.",
          success: false,
          message: 'Video processing failed'
        });
      }
    }

  } catch (error) {
    console.error('YouTube transcription error:', error);
    return NextResponse.json(
      { error: 'Failed to transcribe YouTube video' },
      { status: 500 }
    );
  }
} 