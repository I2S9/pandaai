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
    const { subject, numQuestions, difficulty, language } = await request.json();

    if (!subject || !numQuestions || !difficulty || !language) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const prompt = `Generate a ${difficulty.toLowerCase()} level quiz about "${subject}" with exactly ${numQuestions} multiple choice questions in ${language}. 

For each question, provide:
1. A clear question
2. 4 answer options (A, B, C, D)
3. The correct answer (A, B, C, or D)
4. A brief explanation of why the correct answer is right

Format the response as a JSON object with this structure:
{
  "quiz": {
    "title": "Quiz about [subject]",
    "questions": [
      {
        "question": "Question text here?",
        "options": {
          "A": "Option A",
          "B": "Option B", 
          "C": "Option C",
          "D": "Option D"
        },
        "correctAnswer": "A",
        "explanation": "Brief explanation of why A is correct"
      }
    ]
  }
}

Make sure the questions are relevant to the subject, appropriate for the difficulty level, and the explanations are educational.`;

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
    let quizData;
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = response?.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        quizData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse quiz response:', response, parseError);
      return NextResponse.json(
        { error: 'Failed to generate quiz. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(quizData);

  } catch (error) {
    console.error('Error generating quiz:', error);
    return NextResponse.json(
      { error: 'Failed to generate quiz. Please try again.' },
      { status: 500 }
    );
  }
} 