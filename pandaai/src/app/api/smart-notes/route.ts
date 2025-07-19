import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { content, outputType } = await request.json();
    console.log('Smart Notes API called with:', { outputType, contentLength: content?.length });

    if (!content || !outputType) {
      console.log('Missing required fields:', { content: !!content, outputType: !!outputType });
      return NextResponse.json(
        { error: 'Content and output type are required' },
        { status: 400 }
      );
    }

    // Définir les prompts selon le type de sortie
    const prompts = {
      smart_notes: `Create comprehensive smart notes from the following transcription. Organize the content with clear headings, bullet points, and key takeaways. Make it easy to study and review:

${content}

Please format the notes with:
- Clear section headings
- Bullet points for key concepts
- Important definitions or terms
- Summary points at the end`,
      
      summary: `Create a concise summary of the following transcription. Focus on the main points and key takeaways:

${content}

Please provide:
- A brief overview
- Main points (3-5 key ideas)
- Key takeaways
- Important concepts mentioned`,
      
      detailed_transcript: `Create a detailed, well-formatted transcript from the following content. Organize it with proper paragraphs, speaker identification if applicable, and clear structure:

${content}

Please format with:
- Clear paragraph breaks
- Proper punctuation and grammar
- Logical flow and organization
- Any relevant timestamps or sections`
    };

    const prompt = prompts[outputType as keyof typeof prompts] || prompts.smart_notes;

    // Appel à l'API Open Router
    console.log('Calling OpenRouter API with prompt length:', prompt.length);
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://pandaai.com',
        'X-Title': 'PandaAI Smart Notes'
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI assistant that creates educational content and study materials. Always respond in English and provide well-structured, clear content.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.7
      })
    });

    console.log('OpenRouter response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error:', errorText);
      throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('OpenRouter response data:', data);
    const generatedContent = data.choices[0]?.message?.content || 'No content generated';
    console.log('Generated content length:', generatedContent.length);

    return NextResponse.json({
      content: generatedContent,
      success: true
    });

  } catch (error) {
    console.error('Smart Notes generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate smart notes' },
      { status: 500 }
    );
  }
} 