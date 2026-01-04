import { NextRequest, NextResponse } from 'next/server';
import { analyzePersonality } from '@/lib/ai/gemini';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const { quizTitle, personalityType, userAnswers } = await req.json();

    if (!quizTitle || !personalityType || !userAnswers) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const analysis = await analyzePersonality(quizTitle, personalityType, userAnswers);

    return NextResponse.json(analysis);
  } catch (error: any) {
    console.error('Personality analysis error:', error);
    return NextResponse.json({ error: error.message || 'Failed to analyze personality' }, { status: 500 });
  }
}
