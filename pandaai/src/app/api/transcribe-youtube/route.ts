import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    console.log('Received YouTube URL:', url);
    
    if (!url) {
      return NextResponse.json(
        { error: 'No YouTube URL provided' },
        { status: 400 }
      );
    }

    // Validation de l'URL YouTube
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)[a-zA-Z0-9_-]+/;
    if (!youtubeRegex.test(url)) {
      return NextResponse.json(
        { error: 'Please enter a valid YouTube URL' },
        { status: 400 }
      );
    }

    // Extraire l'ID de la vidéo depuis l'URL
    const videoId = extractVideoId(url);
    console.log('Extracted video ID:', videoId);
    
    if (!videoId) {
      return NextResponse.json(
        { error: 'Invalid YouTube URL' },
        { status: 400 }
      );
    }

    try {
      // Essayer d'obtenir les sous-titres via l'API YouTube
      const response = await fetch(`https://www.youtube.com/watch?v=${videoId}`);
      const html = await response.text();
      
      // Chercher les sous-titres dans le HTML
      const captionMatch = html.match(/"captionTracks":\s*\[([^\]]*)\]/);
      
      if (!captionMatch) {
        return NextResponse.json({
          transcription: "This video doesn't have captions available. Please try a different YouTube video that has captions enabled, or use the audio recording option.",
          success: false,
          message: 'No captions available'
        });
      }
      
      // Pour l'instant, retourner une transcription de test pour permettre la génération
      const testTranscription = `This is a test transcription for demonstration purposes. 

The video appears to have captions available, but automatic extraction is currently limited. However, we can still demonstrate the smart notes generation functionality.

Key topics that might be covered in this video include:
- Introduction to the subject matter
- Main concepts and definitions
- Examples and practical applications
- Summary and conclusions

This transcription allows you to test the smart notes generation features including:
1. Smart Notes - organized study materials
2. Summary - key points overview
3. Detailed Transcript - formatted text
4. Mind Map - visual connections

You can now try generating different types of notes from this content to see how the system works.`;
      
      return NextResponse.json({
        transcription: testTranscription,
        success: true,
        message: 'Test transcription provided for demonstration'
      });
      
    } catch (error) {
      console.error('Transcript fetch error:', error);
      return NextResponse.json({
        transcription: "Unable to get transcript for this YouTube video. Please try a different video that has captions enabled, or use the audio recording option.",
        success: false,
        message: 'Transcript not available'
      });
    }

  } catch (error) {
    console.error('YouTube transcription error:', error);
    return NextResponse.json(
      { error: 'Failed to transcribe YouTube video' },
      { status: 500 }
    );
  }
}

// Fonction pour extraire l'ID de la vidéo depuis différentes formes d'URL YouTube
function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    /youtu\.be\/([^&\n?#]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
} 