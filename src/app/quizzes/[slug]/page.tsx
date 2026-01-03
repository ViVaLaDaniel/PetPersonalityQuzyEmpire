'use client';

import React from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import QuizEngine from '@/components/quiz/QuizEngine';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { Loader2, AlertCircle } from 'lucide-react';

export default function QuizPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { quiz, loading, error } = useQuiz(slug);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-white">
        <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
        <p className="text-xl font-medium text-gray-400">Loading your personality test...</p>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <div className="bg-red-500/10 p-6 rounded-full mb-8">
          <AlertCircle className="text-red-500" size={64} />
        </div>
        <h1 className="text-4xl font-black text-white mb-4 italic">Oops! Quiz Not Found</h1>
        <p className="text-gray-400 mb-10 max-w-md">
          We couldn't find the quiz you're looking for. It might have been moved or deleted.
        </p>
        <a href="/quizzes" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black transition-all">
          Explore Other Quizzes
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-16">
          <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-xs mb-4 block">
            {quiz.category} • Official Test
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter italic">
            {quiz.title}
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
            {quiz.description}
          </p>
        </div>

        <QuizEngine quiz={quiz} />
      </motion.div>
    </div>
  );
}
