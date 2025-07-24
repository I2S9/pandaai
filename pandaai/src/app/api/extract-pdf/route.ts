import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Check if it's a PDF
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are accepted' },
        { status: 400 }
      );
    }

    // Check file size (max 20MB)
    if (file.size > 20 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File is too large (max 20MB)' },
        { status: 400 }
      );
    }

    console.log('Processing PDF:', file.name, 'Size:', file.size);

    // Extract text from PDF
    const extractedText = await extractPDFText(file);
    const contentType = analyzeContentType(extractedText);

    return NextResponse.json({
      success: true,
      filename: file.name,
      extractedText: extractedText,
      contentType: contentType,
      pages: 1, // We'll get this from the extraction
      message: 'Content extracted successfully'
    });

  } catch (error) {
    console.error('PDF extraction error:', error);
    return NextResponse.json(
      { error: 'Error extracting PDF: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}

async function extractPDFText(file: File): Promise<string> {
  try {
    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // First try: Extract text using pdf-parse
    try {
      const { default: pdfParse } = await import('pdf-parse');
      const data = await pdfParse(buffer);
      
      if (data && data.text && data.text.trim().length > 50) {
        console.log('Text extracted successfully with pdf-parse');
        return cleanExtractedText(data.text);
      }
    } catch (error) {
      console.log('pdf-parse failed, trying OCR...', error);
    }

    // Second try: OCR extraction for image-based PDFs
    try {
      const ocrText = await extractTextWithOCR();
      if (ocrText && ocrText.trim().length > 50) {
        console.log('Text extracted successfully with OCR');
        return cleanExtractedText(ocrText);
      }
    } catch (error) {
      console.log('OCR extraction failed:', error);
    }

    // Fallback: Try to extract any readable content
    const fallbackText = await extractFallbackContent(buffer);
    return cleanExtractedText(fallbackText);

  } catch (error) {
    console.error('Error in extractPDFText:', error);
    throw error;
  }
}

async function extractTextWithOCR(): Promise<string> {
  try {
    console.log('Attempting OCR extraction with Tesseract...');
    
    // Import the OCR module
    const { extractTextFromPDFImages } = await import('../../../lib/ocr');
    return await extractTextFromPDFImages();
    
  } catch (error) {
    console.error('OCR extraction error:', error);
    throw error;
  }
}

async function extractFallbackContent(buffer: Buffer): Promise<string> {
  try {
    // Try to extract any readable content using different methods
    const { default: pdfParse } = await import('pdf-parse');
    
    // Try with default options
    const data = await pdfParse(buffer);
    
    if (data && data.text) {
      return data.text;
    }
    
    // If still no text, return a generic message
    return "This PDF appears to contain images or scanned content. The text extraction was limited. Please ensure your PDF contains selectable text for better results.";
    
  } catch (error) {
    console.error('Fallback extraction error:', error);
    return "Unable to extract text from this PDF. Please try uploading a PDF with selectable text or contact support.";
  }
}

function cleanExtractedText(text: string): string {
  return text
    .replace(/\s+/g, ' ') // Replace multiple spaces
    .replace(/\n\s*\n/g, '\n\n') // Clean up line breaks
    .trim();
}

function analyzeContentType(text: string): {
  type: 'text' | 'image' | 'mixed';
  hasQuestions: boolean;
  hasMath: boolean;
  hasMultipleChoice: boolean;
  examType: 'quiz' | 'exercise' | 'mixed';
} {
  const hasQuestions = /question|exercice|problème|calcul|résoudre|énoncé|problem|solve|calculate/i.test(text);
  const hasMultipleChoice = /a\)|b\)|c\)|d\)|choix|option|\(a\)|\(b\)|\(c\)|\(d\)|multiple choice/i.test(text);
  const hasMath = /[+\-*/=]|\d+[+\-*/]\d+|\sqrt|log|sin|cos|π|∫|∑|equation|formula/i.test(text);
  const hasImages = /image|figure|graphique|schéma|diagram|chart/i.test(text);
  
  let examType: 'quiz' | 'exercise' | 'mixed' = 'mixed';
  if (hasMath && hasQuestions) examType = 'exercise';
  else if (hasMultipleChoice) examType = 'quiz';
  
  return {
    type: hasImages ? 'mixed' : 'text',
    hasQuestions,
    hasMath,
    hasMultipleChoice,
    examType
  };
} 