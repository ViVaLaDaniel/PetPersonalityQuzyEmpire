import { NextRequest, NextResponse } from 'next/server';
import { generateQuiz } from '@/lib/ai/gemini';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const quizData = await generateQuiz(topic);

    // Optional: Save to database if needed, but for now just return it
    // In a real scenario, you'd want to store this in the 'quizzes' table
    
    return NextResponse.json(quizData);
  } catch (error: any) {
    console.error('Quiz generation error:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate quiz' }, { status: 500 });
  }
}
