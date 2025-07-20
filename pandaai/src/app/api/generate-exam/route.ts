import { NextRequest, NextResponse } from 'next/server';

interface ExamConfig {
  duration: number;
  allowDocuments: boolean;
  allowCalculator: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  questionCount: number;
  extractedText: string;
}

interface GeneratedExam {
  title: string;
  instructions: string;
  questions: {
    type: 'quiz' | 'exercise' | 'text' | 'mixed';
    question: string;
    options?: string[];
    correctAnswer?: number;
    explanation: string;
  }[];
}

export async function POST(request: NextRequest) {
  try {
    console.log('Generate exam API called');
    const body = await request.json();
    console.log('Request body:', body);
    
    const { duration, allowDocuments, allowCalculator, extractedText }: ExamConfig = body;

    if (!extractedText) {
      console.error('No extracted text provided');
      return NextResponse.json(
        { error: 'No document content provided' },
        { status: 400 }
      );
    }

    console.log('Analyzing exam type...');
    // Analyze exam type from extracted text
    const examType = analyzeExamType(extractedText);
    console.log('Exam type detected:', examType);
    
    console.log('Generating exam with AI...');
    // Generate exam using DeepSeek
    const examContent = await generateExamWithAI(extractedText, examType, duration);
    console.log('Exam content generated:', examContent);

    const response = {
      success: true,
      exam: {
        duration,
        allowDocuments,
        allowCalculator,
        type: examType,
        content: examContent
      }
    };

    console.log('Sending response:', response);
    return NextResponse.json(response);

  } catch (error) {
    console.error('Generate exam error:', error);
    return NextResponse.json(
      { error: 'Error generating exam: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}

function analyzeExamType(content: string): 'quiz' | 'exercise' | 'mixed' {
  // Analyze content to determine if it's a quiz, exercise, or mixed
  const hasQuestions = /question|exercice|problème|calcul|résoudre/i.test(content);
  const hasMultipleChoice = /a\)|b\)|c\)|d\)|choix|option/i.test(content);
  const hasMath = /[+\-*/=]|\d+[+\-*/]\d+|\sqrt|log|sin|cos/i.test(content);
  
  if (hasMath && hasQuestions) return 'exercise';
  if (hasMultipleChoice) return 'quiz';
  return 'mixed';
}

async function generateExamWithAI(content: string, examType: 'quiz' | 'exercise' | 'mixed', duration: number): Promise<GeneratedExam> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  
  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY not found');
  }

  const prompt = `Analyze this exam document and generate a comprehensive new exam with multiple questions.

Original document:
${content}

Detected exam type: ${examType}
Duration: ${duration} minutes

Generate an exam that:
1. Creates 5-8 questions based on the document content
2. Follows the same structure and style as the original
3. Uses the same question types (quiz, exercises, or mixed)
4. Covers different aspects of the document content
5. Is adapted to the specified duration
6. If it's an exercise, create detailed statements with written questions
7. If it's a quiz, create multiple choice questions with 4 options each
8. If it's mixed, combine both types appropriately

IMPORTANT: 
- Generate 5-8 questions minimum
- For exercises: create detailed statements with open questions
- For quiz: create multiple choice questions with 4 options (A, B, C, D)
- Each question should test different concepts from the document
- Provide detailed explanations for each answer
- Make questions challenging but fair

JSON response format:
{
  "title": "Generated Exam Title",
  "instructions": "Detailed instructions for the student",
  "questions": [
    {
      "type": "quiz|exercise|text",
      "question": "Question or detailed statement",
      "options": ["A", "B", "C", "D"] (only if quiz type),
      "correctAnswer": 0 (only if quiz type, 0=A, 1=B, 2=C, 3=D),
      "explanation": "Detailed explanation of the answer"
    }
  ]
}

Generate exactly 5-8 questions based on the document content.`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://pandaai.com',
        'X-Title': 'PandaAI Exam Generator'
      },
      body: JSON.stringify({
        model: 'deepseek-ai/deepseek-coder:33b-instruct',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    // Try to parse JSON response
    try {
      return JSON.parse(aiResponse);
    } catch {
      // If JSON parsing fails, return structured response
      return {
        title: "Generated Exam",
        instructions: "Answer the following questions",
        questions: [
          {
            type: examType,
            question: aiResponse,
            options: examType === 'quiz' ? ["A", "B", "C", "D"] : [],
            correctAnswer: 0,
            explanation: "AI generated response"
          }
        ]
      };
    }
  } catch (error) {
    console.error('AI generation error:', error);
    
    // Fallback: return a basic exam structure
    console.log('Using fallback exam generation');
    return {
      title: "Generated Exam",
      instructions: "Answer the following questions based on the provided document.",
      questions: [
        {
          type: examType,
          question: `Based on the provided document, answer the following question: ${content.substring(0, 200)}...`,
          options: examType === 'quiz' ? ["Option A", "Option B", "Option C", "Option D"] : [],
          correctAnswer: examType === 'quiz' ? 0 : undefined,
          explanation: "This question is based on the content of the uploaded document."
        }
      ]
    };
  }
} 