# PandasAi

>  PandasAi is an AI-powered study companion that makes learning interactive and fun. A kawaii panda guide accompanies you through study sessions, quizzes, and note-taking, all wrapped in a cute pastel-themed interface.

<img width="1080" height="720" alt="Mockup(24)" src="https://github.com/user-attachments/assets/bb9f949b-5ec7-48c8-86a7-3f2bf65beffb" />

## Features 
- **Pomodoro timer**: structured study sessions with breaks to boost focus and productivity  
- **Customizable profile**: unlock badges based on performance and personalize your panda avatar and background  
- **Statistics dashboard**: track total lessons completed, average quiz score, study time, and activity trends over time  
- **AI quiz generator**: create on‑the‑fly quizzes from uploaded documents with instant grading and hints  
- **AI flashcard generator**: generate tailored flashcards from any text input or document to reinforce learning  
- **Smart Notes**: record voice conversations or paste a YouTube link to get detailed, concise, or in‑depth summaries and notes  
- **Exam Mode**: upload past exams and choose settings (calculator allowed, permitted documents, time limit) to generate a realistic mock exam with detailed corrections  
- **Panda AI Coach**: chatbot for instant explanations, guidance, and support when you’re stuck on a concept or exercise

## Tech Stack

- **Next.js** (App Router) – Server and client rendering  
- **Tailwind CSS** – Utility-first styling with JIT mode  
- **Clerk** – Authentication and user management  
- **Supabase** – Postgres database, storage, and real-time API  
- **React Query** – Data fetching and caching  
- **Open Router (Deepseek API)** – AI-driven quiz, flashcard, and summary generation  
- **Vercel** – Continuous deployment and edge functions

## Getting Started

Clone the repository and go to the current directory

```bash
git clone git@github.com:I2S9/pandaai.git
cd pandaai
```
Install dependencies
```bash
npm install
```

Create a `.env` file and add your [OpenRouter](https://openrouter.ai/) API key
```bash
OPENROUTER_API_KEY=your-api-key
```

Start the development server
```bash
npm run dev
```
