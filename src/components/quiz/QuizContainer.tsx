'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quiz, Question, QuizResult as QuizResultType } from '@/types/quiz';
import { ChevronRight, Info } from 'lucide-react';
import QuizResult from './QuizResult';

interface QuizContainerProps {
  quiz: Quiz;
}

export default function QuizContainer({ quiz }: QuizContainerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<QuizResultType | null>(null);

  const questions = quiz.questions || [];
  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (optionScores: Record<string, number>) => {
    const newScores = { ...scores };
    Object.entries(optionScores).forEach(([type, value]) => {
      newScores[type] = (newScores[type] || 0) + value;
    });
    setScores(newScores);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateResult(newScores);
    }
  };

  const calculateResult = (finalScores: Record<string, number>) => {
    if (!quiz.results) return;

    let bestMatch = '';
    let maxScore = -Infinity;

    Object.entries(finalScores).forEach(([type, score]) => {
      if (score > maxScore) {
        maxScore = score;
        bestMatch = type;
      }
    });

    const finalResult = quiz.results.find(r => r.personality_type === bestMatch) || quiz.results[0];
    setResult(finalResult);

    // Track analytics event (Phase 1)
    // trackEvent('quiz_completed', { quiz_id: quiz.id, result_type: bestMatch });
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScores({});
    setResult(null);
  };

  if (result) {
    return <QuizResult quiz={quiz} result={result} onReset={resetQuiz} />;
  }

  if (!currentQuestion) return (
    <div className="flex items-center justify-center p-20">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
  );

  const progress = ((currentQuestionIndex) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Section */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-4">
          <div className="space-y-1">
            <span className="text-blue-400 font-bold uppercase tracking-widest text-xs">Question {currentQuestionIndex + 1} of {questions.length}</span>
            <p className="text-white/60 text-xs flex items-center gap-1 italic">
              <Info size={12} />
              Almost there! High accuracy expected.
            </p>
          </div>
          <span className="text-white font-bold text-sm tracking-tighter">{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden border border-white/5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-blue-400 to-purple-500 shadow-[0_0_20px_rgba(96,165,250,0.5)]"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 leading-snug relative z-10">
            {currentQuestion.text}
          </h2>

          <div className="grid gap-4 relative z-10">
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.scores)}
                className="group relative flex items-center justify-between text-left p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-400/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl overflow-hidden"
              >
                <span className="text-lg text-gray-200 relative z-10 group-hover:text-white font-medium pr-10">
                  {option.text}
                </span>
                <div className="bg-blue-400/20 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all transform scale-75 group-hover:scale-100">
                  <ChevronRight className="text-blue-400" size={24} />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <p className="text-center mt-12 text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em]">
        © PAWPERSONA EMPIRE • TRUSTED BY 1M+ USERS
      </p>
    </div>
  );
}
