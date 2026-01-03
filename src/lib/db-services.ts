import { supabase } from './supabase';
import { Quiz, Question, QuizResult, QuizSubmission } from '@/types/quiz';

export const getQuizBySlug = async (slug: string): Promise<Quiz | null> => {
  const { data: quiz, error: quizError } = await supabase
    .from('quizzes')
    .select('*')
    .eq('slug', slug)
    .single();

  if (quizError || !quiz) return null;

  const { data: questions, error: questionsError } = await supabase
    .from('questions')
    .select(`
      *,
      options (*)
    `)
    .eq('quiz_id', quiz.id)
    .order('order_index', { ascending: true });

  if (questionsError) return null;

  const { data: results, error: resultsError } = await supabase
    .from('results')
    .select('*')
    .eq('quiz_id', quiz.id);

  if (resultsError) return null;

  return {
    ...quiz,
    questions,
    results
  };
};

export const submitQuizResult = async (submission: Omit<QuizSubmission, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('quiz_submissions')
    .insert([submission])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getBlogPosts = async () => {
  // Mocking database fetch for blog posts if they aren't in Supabase yet
  // Once tables are set up, this will be:
  // const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
  // return data;
  return []; // Placeholder
};
