import { useState, useEffect } from 'react';
import { Quiz } from '@/types/quiz';
import { getQuizBySlug } from '@/lib/db-services';

export function useQuiz(slug: string) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQuiz() {
      try {
        setLoading(true);
        const data = await getQuizBySlug(slug);
        if (data) {
          setQuiz(data);
        } else {
          setError('Quiz not found');
        }
      } catch (err) {
        setError('Failed to fetch quiz');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchQuiz();
    }
  }, [slug]);

  return { quiz, loading, error };
}
