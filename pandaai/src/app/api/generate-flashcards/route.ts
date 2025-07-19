import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "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",
  defaultHeaders: {
    "HTTP-Referer": "https://pandaai.vercel.app",
    "X-Title": "PandaAI",
  },
});

export async function POST(request: NextRequest) {
  try {
    const { subject, flashcardCount, difficulty, language = 'English' } = await request.json();

    if (!subject || !flashcardCount || !difficulty) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const prompt = `Generate ${flashcardCount} flashcards about "${subject}" with ${difficulty} difficulty level in ${language}.

For each flashcard, provide:
1. A clear question or concept on the front
2. A detailed answer or explanation on the back

Format the response as a JSON object with this structure:
{
  "flashcards": [
    {
      "front": "Question or concept here?",
      "back": "Detailed answer or explanation here"
    }
  ]
}

Make sure the flashcards are:
- Relevant to the subject
- Appropriate for the difficulty level
- Educational and informative
- Clear and concise
- Cover different aspects of the topic`;

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1-0528:free",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const response = completion.choices[0].message.content;
    
    // Try to parse the JSON response
    let flashcardData;
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = response?.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        flashcardData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse flashcard response:', response, parseError);
      return NextResponse.json(
        { error: 'Failed to generate flashcards. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(flashcardData);

  } catch (error) {
    console.error('Error generating flashcards:', error);
    return NextResponse.json(
      { error: 'Failed to generate flashcards. Please try again.' },
      { status: 500 }
    );
  }
} 